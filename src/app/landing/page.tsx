"use client";

import { useEffect } from "react";



const TALLY_URL = "https://tally.so/r/QKKe67";



export default function Landing() {

  // Optional: append current page UTM params to the embedded form URL

  useEffect(() => {

    const iframe = document.getElementById("tally-embed") as HTMLIFrameElement | null;

    if (!iframe) return;

    try {

      const url = new URL(iframe.src);

      const params = new URLSearchParams(window.location.search);

      params.forEach((v, k) => url.searchParams.set(k, v));

      iframe.src = url.toString();

    } catch {

      /* no-op */

    }

  }, []);



  return (

    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 space-y-6">

        <header className="space-y-2">

          <h1 className="text-3xl font-bold text-gray-900">ColdStart — Cold emails that get replies</h1>

          <p className="text-gray-600">

            Join the waitlist to get <strong>5 free generations</strong> and early-access discounts.

          </p>

        </header>



        <div className="w-full aspect-[4/3]">

          <iframe

            id="tally-embed"

            src={TALLY_URL}

            width="100%"

            height="100%"

            className="rounded-xl border"

            title="Join the Waitlist"

          />

        </div>



        <p className="text-xs text-gray-500">

          We'll email you product updates and a discount code. Unsubscribe anytime.

        </p>

      </div>

    </main>

  );

}

