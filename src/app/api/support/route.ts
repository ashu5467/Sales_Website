import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_LjH1wbbZ_NmoR4i3reo1Mxd9nBhtXW5ud");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required parameters for support inquiry." },
        { status: 400 }
      );
    }

    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const adminEmail = process.env.ADMIN_EMAIL || fromEmail;

    // Send ticket details email to support inbox
    await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `[devmotive Support] ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #4f46e5; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Support inquiry Received</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold; width: 120px;">Customer Name:</td>
              <td style="padding: 8px 0; color: #1e293b;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Customer Email:</td>
              <td style="padding: 8px 0; color: #1e293b;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: bold;">Subject:</td>
              <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${subject}</td>
            </tr>
          </table>
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-top: 16px;">
            <p style="margin-top: 0; color: #64748b; font-size: 11px; font-weight: bold; text-transform: uppercase;">Message Body</p>
            <p style="margin-bottom: 0; color: #334155; line-height: 1.5; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Support API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to dispatch support ticket." },
      { status: 500 }
    );
  }
}
