"use client";

import { useState, useEffect } from "react";



export default function Home() {

  const [form, setForm] = useState({

    industry: "",

    role: "",

    offer: "",

    tone: "friendly",

    company: "",

  });

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<string>("");

  const [credits, setCredits] = useState<number>(() => {

    if (typeof window === "undefined") return 5;

    const v = localStorage.getItem("credits");

    return v ? parseInt(v) : 5;

  });

  const [isPro, setIsPro] = useState(false);

  useEffect(() => {

    if (typeof window === "undefined") return;

    const pro = localStorage.getItem("is_pro") === "true";

    setIsPro(pro);

  }, []);



  async function onSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (!isPro && credits <= 0) {

      alert("You've used your free credits. Please upgrade to continue.");

      return;

    }

    setLoading(true);

    setResult("");

    const res = await fetch("/api/generate", {

      method: "POST",

      headers: { "content-type": "application/json" },

      body: JSON.stringify(form),

    });

    const data = await res.json();

    setResult(data.output || "No result");

    setLoading(false);

    if (!isPro) {

      setCredits((c) => {

        const next = c - 1;

        localStorage.setItem("credits", String(next));

        return next;

      });

    }

  }



  return (

    <main className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 space-y-6">

        <h1 className="text-2xl font-bold text-gray-900">{process.env.NEXT_PUBLIC_APP_NAME}</h1>

        <p className="text-xs text-gray-500">
          Plan: {isPro ? "Pro (unlimited generations)" : "Free (5 credits)"}
        </p>

        <p className="text-sm text-gray-500">Free credits left: {credits}</p>

        {!isPro && (
          <a href="/pricing" className="text-sm text-blue-600 underline">
            Upgrade to Pro
          </a>
        )}

        <p className="text-gray-600">Generate 3 personalized cold emails + 2 follow-ups in seconds. First 5 generations are free.</p>

        <a href="/landing" className="text-sm text-blue-600 underline">
          Join the waitlist
        </a>



        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">

          <input

            required

            className="border rounded-lg p-3 text-gray-900 placeholder:text-gray-500"

            placeholder="Industry (e.g., SaaS, eCom)"

            value={form.industry}

            onChange={(e) => setForm({ ...form, industry: e.target.value })}

          />

          <input

            required

            className="border rounded-lg p-3 text-gray-900 placeholder:text-gray-500"

            placeholder="Target role (e.g., Head of Marketing)"

            value={form.role}

            onChange={(e) => setForm({ ...form, role: e.target.value })}

          />

          <input

            required

            className="border rounded-lg p-3 md:col-span-2 text-gray-900 placeholder:text-gray-500"

            placeholder="Your offer (what you sell)"

            value={form.offer}

            onChange={(e) => setForm({ ...form, offer: e.target.value })}

          />

          <input

            className="border rounded-lg p-3 text-gray-900 placeholder:text-gray-500"

            placeholder="Prospect company (optional)"

            value={form.company}

            onChange={(e) => setForm({ ...form, company: e.target.value })}

          />

          <select

            className="border rounded-lg p-3 text-gray-900 placeholder:text-gray-500"

            value={form.tone}

            onChange={(e) => setForm({ ...form, tone: e.target.value })}

          >

            <option value="friendly">Friendly</option>

            <option value="concise">Concise</option>

            <option value="professional">Professional</option>

            <option value="casual">Casual</option>

          </select>



          <button

            disabled={loading}

            className="md:col-span-2 bg-black text-white rounded-lg p-3 disabled:opacity-50"

          >

            {loading ? "Generating..." : "Generate Emails"}

          </button>

        </form>



        <div className="grid gap-2">

          <h2 className="font-semibold text-gray-900">Output</h2>

          <textarea

            className="w-full h-80 border rounded-lg p-3 font-mono text-sm text-gray-900 placeholder:text-gray-500"

            value={result}

            onChange={(e) => setResult(e.target.value)}

          />

        </div>

      </div>

    </main>

  );

}
