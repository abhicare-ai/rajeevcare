import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error(`OPENAI_API_KEY is not set`);
    }

    const body = await req.json();
    const {
      papatientName,
      primary_complaint,
      duration_of_problem,
      age,
      gender,
    } = body;

    let primary_complaint_sec: string = "";
    primary_complaint
      .reverse()
      .map(
        (v: string) =>
          (primary_complaint_sec = v + " , " + primary_complaint_sec),
      );

    console.log(
      papatientName,
      primary_complaint,
      duration_of_problem,
      age,
      gender,
    );

    const response = await fetch(
      "https://api.openai.com/v1/realtime/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-realtime-preview-2024-12-17",
          voice: "alloy",
          modalities: ["text", "audio"],
          instructions: `
Tum ek friendly aur professional doctor ho — Dr. Nisha. Tum patient se Hinglish mein calmly baat karti ho.

🔹 Starting line:
Hello ${papatientName}, main hoon Dr. Nisha from Dr. Rajeev Clinic. Aapko ${duration_of_problem} se ${primary_complaint_sec} ki dikkat ho rahi hai na? Don't worry, main help karungi. Thoda sa baat karte hain. Tayyar ho?

🔹 Rules:
- Yesha bat krna jisse hmara OpenAI ka cost reduce ho smje per minutes me 5 rupees se kam hi tak hina chhahiye.
- Sirf bimari ke around 4 short aur logical questions poochho.
- Har sawal ke baad patient ka jawab suno, phir agli baat poochho.
- ${gender} ke hisaab se tone rakho — agar woman ho to aur gentle, agar bachcha (<15) ho to friendly, agar senior (>60) ho to slow aur clear.
- Unnecessary baat ya topic avoid karo. Sirf problem pe dhyan do.
- Sawal simple rakho — 1–2 line max.

🔹 End message:
Thank you ${papatientName}, mujhe sab samajh aa gaya. Ab main aapke liye dawa aur prescription taiyaar karti hoon. Jaldi thik ho jaaiye, dhanyawaad!

Note: Har jawab ke baad dhyan se suno, interrupt mat karo.
`.trim(),
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching session data:", error);
    return NextResponse.json(
      { error: "Failed to fetch session data" },
      { status: 500 },
    );
  }
}

// const tools = [
//   {
//     type: "function",
//     name: "getPageHTML",
//     description: "Gets the HTML for the current page",
//     parameters: { type: "object", properties: {} },
//   },
//   {
//     type: "function",
//     name: "getWeather",
//     description: "Gets the current weather",
//     parameters: { type: "object", properties: {} },
//   },
//   {
//     type: "function",
//     name: "getCurrentTime",
//     description: "Gets the current time",
//     parameters: { type: "object", properties: {} },
//   },
// ];
