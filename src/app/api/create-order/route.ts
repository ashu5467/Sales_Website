import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_T52eSEEaoGoURo",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "tTP9tNkewW1YNWjmsIgcgvC6",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productKey, priceUSD } = body;

    if (!productKey || !priceUSD) {
      return NextResponse.json(
        { error: "Product Key and Price are required parameters." },
        { status: 400 }
      );
    }

    // Backend price security mapping (never trust frontend prices)
    const priceMapping: Record<string, number> = {
      "linkedin-applier": 49,
      intai: 99,
    };

    const validatedPriceUSD = priceMapping[productKey];
    if (!validatedPriceUSD) {
      return NextResponse.json(
        { error: "Invalid product key requested." },
        { status: 400 }
      );
    }

    // Convert USD to INR (approximate rate 1 USD = 83 INR) for Razorpay standard transaction (in Paise)
    const exchangeRate = 83;
    const amountInPaise = Math.round(validatedPriceUSD * exchangeRate * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_${uuidv4().substring(0, 10)}`,
      notes: {
        productKey,
        originalUSD: validatedPriceUSD,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create payment order." },
      { status: 500 }
    );
  }
}
