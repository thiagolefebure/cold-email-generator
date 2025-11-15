"use client";

import { useState } from "react";



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



  async function onSubmit(e: React.FormEvent) {

    e.preventDefault();

    if (credits <= 0) {

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

    setCredits((c) => {

      const next = c - 1;

      localStorage.setItem("credits", String(next));

      return next;

    });

  }



  return (

    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 space-y-6">

        <h1 className="text-2xl font-bold">{process.env.NEXT_PUBLIC_APP_NAME}</h1>

        <p className="text-gray-600">Generate 3 personalized cold emails + 2 follow-ups in seconds. First 5 generations are free.</p>

        <a href="/landing" className="text-sm text-blue-600 underline">
          Join the waitlist
        </a>

        <p className="text-sm text-gray-500">Free credits left: {credits}</p>



        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">

          <input

            required

            className="border rounded-lg p-3"

            placeholder="Industry (e.g., SaaS, eCom)"

            value={form.industry}

            onChange={(e) => setForm({ ...form, industry: e.target.value })}

          />

          <input

            required

            className="border rounded-lg p-3"

            placeholder="Target role (e.g., Head of Marketing)"

            value={form.role}

            onChange={(e) => setForm({ ...form, role: e.target.value })}

          />

          <input

            required

            className="border rounded-lg p-3 md:col-span-2"

            placeholder="Your offer (what you sell)"

            value={form.offer}

            onChange={(e) => setForm({ ...form, offer: e.target.value })}

          />

          <input

            className="border rounded-lg p-3"

            placeholder="Prospect company (optional)"

            value={form.company}

            onChange={(e) => setForm({ ...form, company: e.target.value })}

          />

          <select

            className="border rounded-lg p-3"

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

          <h2 className="font-semibold">Output</h2>

          <textarea

            className="w-full h-80 border rounded-lg p-3 font-mono text-sm"

            value={result}

            onChange={(e) => setResult(e.target.value)}

          />

        </div>

      </div>

    </main>

  );

}
