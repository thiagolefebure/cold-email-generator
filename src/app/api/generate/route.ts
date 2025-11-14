import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

import { z } from "zod";



const bodySchema = z.object({

  industry: z.string().min(2),

  role: z.string().min(2),

  offer: z.string().min(2),

  tone: z.string().default("friendly"),

  company: z.string().optional(),

});



export async function POST(req: NextRequest) {

  try {

    const json = await req.json();

    const input = bodySchema.parse(json);



    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



    const systemPrompt = `

You are an expert SDR. Write high-reply cold emails for B2B outreach.

Rules:

- Personalize to the industry and role.

- Keep body 75-120 words. No fluff.

- 1 crisp CTA. No calendar links in first email.

- Avoid spam words. Use plain language.

- Provide 3 subject lines per email.

Output format:

EMAIL 1

Subject options:

-

-

-

Body:

[...]

EMAIL 2

...

FOLLOW-UPS (2)

---



If company is provided, reference a plausible benefit tied to their role & industry.`;



    const userPrompt = `

Industry: ${input.industry}

Target role: ${input.role}

Offer: ${input.offer}

Tone: ${input.tone}

Prospect company: ${input.company || "N/A"}

Please generate 3 distinct first-touch emails + 2 short follow-ups.`;



    const completion = await client.chat.completions.create({

      model: "gpt-4o-mini",

      messages: [

        { role: "system", content: systemPrompt },

        { role: "user", content: userPrompt },

      ],

      temperature: 0.7,

      max_tokens: 2000,

    });



    const output =

      completion.choices[0]?.message?.content ??

      "No output. Please try again with more specific inputs.";



    return NextResponse.json({ output });

  } catch (e: any) {

    console.error(e);

    return NextResponse.json(

      { error: e?.message ?? "Unknown error" },

      { status: 400 }

    );

  }

}

