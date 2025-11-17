"use client";



export default function Pricing() {

  async function goToCheckout() {

    const res = await fetch("/api/checkout", {

      method: "POST",

    });



    if (!res.ok) {

      alert("Error starting checkout. Please try again.");

      return;

    }



    const data = await res.json();

    if (data.url) {

      window.location.href = data.url;

    } else {

      alert("No checkout URL returned.");

    }

  }



  return (

    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow max-w-md w-full p-6 space-y-4">

        <h1 className="text-2xl font-bold">Upgrade to ColdStart Pro</h1>

        <p className="text-gray-600">

          <strong>$19/month</strong> — unlimited cold email generations, priority prompt quality,

          and all future features.

        </p>



        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">

          <li>Unlimited AI cold email generations</li>

          <li>Follow-up sequences included</li>

          <li>No "free credits" limit</li>

        </ul>



        <button

          onClick={goToCheckout}

          className="w-full bg-black text-white rounded-lg py-3 font-medium mt-2"

        >

          Go to Checkout

        </button>



        <p className="text-xs text-gray-500">

          You'll be redirected to a secure Stripe Checkout page.

        </p>

      </div>

    </main>

  );

}

