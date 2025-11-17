import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  // 1) Validate env vars first
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Missing STRIPE_SECRET_KEY");
    return NextResponse.json(
      { error: "Server misconfigured: STRIPE_SECRET_KEY missing" },
      { status: 500 }
    );
  }

  if (!process.env.STRIPE_PRICE_ID) {
    console.error("Missing STRIPE_PRICE_ID");
    return NextResponse.json(
      { error: "Server misconfigured: STRIPE_PRICE_ID missing" },
      { status: 500 }
    );
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    console.error("Missing NEXT_PUBLIC_BASE_URL");
    return NextResponse.json(
      { error: "Server misconfigured: NEXT_PUBLIC_BASE_URL missing" },
      { status: 500 }
    );
  }

  // No apiVersion here – let Stripe use the default from your account
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error", err);
    return NextResponse.json(
      { error: err?.message ?? "Unable to create checkout session" },
      { status: 500 }
    );
  }
}


