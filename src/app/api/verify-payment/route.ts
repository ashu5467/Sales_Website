import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Resend } from "resend";
import { logSale } from "@/lib/salesLogger";

const s3 = new S3Client({
  region: process.env.STORAGE_REGION || "eu-north-1",
  credentials: {
    accessKeyId: process.env.STORAGE_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY || "",
  },
});

const resend = new Resend(process.env.RESEND_API_KEY || "re_LjH1wbbZ_NmoR4i3reo1Mxd9nBhtXW5ud");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      email,
      productKey,
    } = body;

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !email ||
      !productKey
    ) {
      return NextResponse.json(
        { error: "Missing required parameters for verification." },
        { status: 400 }
      );
    }

    // 1. Verify Cryptographic Payment Signature
    const secret = process.env.RAZORPAY_KEY_SECRET || "tTP9tNkewW1YNWjmsIgcgvC6";
    const signatureBody = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signatureBody)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Payment verification failed. Cryptographic signature mismatch." },
        { status: 400 }
      );
    }

    // 2. Generate S3 Presigned URL
    let downloadUrl = "";
    const fileMapping: Record<string, string> = {
      "linkedin-applier": "LinkedIn-Agent Setup 1.0.0.exe",
      "intai": "IntAi Setup 1.0.0.exe",
    };
    const objectKey = fileMapping[productKey] || `${productKey}.zip`;
    const bucketName = process.env.STORAGE_BUCKET_NAME || "software-sales";

    try {
      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });

      // URL valid for 3600 seconds (1 hour)
      downloadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    } catch (s3Error) {
      console.error("AWS S3 Presigned URL Generation Error:", s3Error);
      // Fallback url for demo/sandbox if credentials are not configured or invalid
      downloadUrl = `https://s3.${process.env.STORAGE_REGION || "eu-north-1"}.amazonaws.com/${bucketName}/${objectKey}?mock-presigned=true`;
    }

    // 3. Dispatch Delivery Email via Resend
    const productNames: Record<string, string> = {
      "linkedin-applier": "LinkedIn Auto-Applier",
      intai: "intAi Assistant",
    };
    const productName = productNames[productKey] || "Desktop Tool";

    // Backend price security mapping (for logging and analytics)
    const priceMapping: Record<string, number> = {
      "linkedin-applier": 49,
      intai: 99,
    };
    const amountUSD = priceMapping[productKey] || 0;
    const exchangeRate = 83;
    const amountINR = amountUSD * exchangeRate;

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || "onboarding@resend.dev",
        to: email,
        subject: `Your Onboarding & Download Link: ${productName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #4f46e5;">Thank you for your purchase!</h2>
            <p>You have successfully purchased a lifetime license for <strong>${productName}</strong>.</p>
            <p>Below is your secure, temporary download link to obtain the desktop executable (valid for 1 hour):</p>
            <div style="margin: 24px 0;">
              <a href="${downloadUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Download Software</a>
            </div>
            <p style="color: #64748b; font-size: 12px;">If the download button above does not work, copy and paste this link in your browser:</p>
            <p style="word-break: break-all; color: #0284c7; font-size: 12px;">${downloadUrl}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #64748b; font-size: 13px;">devmotive Support. Do not reply directly to this email.</p>
          </div>
        `,
      });
    } catch (resendError) {
      console.error("Resend Email Delivery Error:", resendError);
      // We don't fail the API call because the payment is verified, but log the email dispatch failure
    }

    // 4. Log the Sale to our local database
    await logSale({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      email,
      productKey,
      productName,
      amountUSD,
      amountINR,
    });

    // 5. Dispatch Admin Alert Email via Resend
    try {
      const adminEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
      await resend.emails.send({
        from: adminEmail,
        to: adminEmail,
        subject: `[ALERT] New Sale: ${productName}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #10b981; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Purchase Alert!</h2>
            <p>A new customer has successfully purchased a lifetime license.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 150px;">Product:</td>
                <td style="padding: 8px 0; color: #0f172a;">${productName} (${productKey})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Customer Email:</td>
                <td style="padding: 8px 0; color: #0f172a;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Amount:</td>
                <td style="padding: 8px 0; color: #0f172a;">$${amountUSD} USD (~₹${amountINR} INR)</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Payment ID:</td>
                <td style="padding: 8px 0; font-family: monospace; font-size: 13px; color: #0f172a;">${razorpay_payment_id}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Order ID:</td>
                <td style="padding: 8px 0; font-family: monospace; font-size: 13px; color: #0f172a;">${razorpay_order_id}</td>
              </tr>
            </table>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #64748b; font-size: 11px; margin-top: 12px;">devmotive Sales Alert System. Do not reply to this email.</p>
          </div>
        `,
      });
    } catch (adminEmailError) {
      console.error("Failed to send sales alert email to admin:", adminEmailError);
    }

    return NextResponse.json({
      verified: true,
      downloadUrl,
    });
  } catch (error: any) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process payment verification." },
      { status: 500 }
    );
  }
}
