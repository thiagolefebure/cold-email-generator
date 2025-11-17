import { NextResponse } from "next/server";

import Stripe from "stripe";



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {

  apiVersion: "2023-10-16",

});



export async function POST() {

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

  } catch (err) {

    console.error("Stripe checkout error", err);

    return NextResponse.json(

      { error: "Unable to create checkout session" },

      { status: 500 }

    );

  }

}

