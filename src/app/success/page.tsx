"use client";

import { useEffect } from "react";



export default function Success() {

  useEffect(() => {

    // Very simple: mark user as "Pro" in localStorage for now

    if (typeof window !== "undefined") {

      localStorage.setItem("is_pro", "true");

    }

  }, []);



  return (

    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow max-w-md w-full p-6 space-y-4">

        <h1 className="text-2xl font-bold">You're Pro 🎉</h1>

        <p className="text-gray-700">

          Your subscription is active. You now have unlimited generations.

        </p>

        <a

          href="/"

          className="inline-block mt-2 bg-black text-white px-4 py-2 rounded-lg text-sm"

        >

          Go back to the app

        </a>

      </div>

    </main>

  );

}

