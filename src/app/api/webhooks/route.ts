// app/api/realtime/route.ts
import { streamVidio } from "@/lib/stream-vidio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { callId, patientData } = await req.json();
    const call = streamVidio.video.call("default", callId);

    const realtimeClient = await streamVidio.video.connectOpenAi({
      call,
      openAiApiKey: process.env.OPENAI_API_KEY!,
      agentUserId: "ai-doctor-01",
    });

    await realtimeClient.updateSession({
      instructions: `
You are a smart, kind and professional AI homeopathy doctor.
Speak in simple Hinglish, with warmth and empathy.

The patient is experiencing symptoms like ${patientData.primary_complaint.join(", ")} for ${patientData.duration_of_problem}.
Patient is ${patientData.age} years old, ${patientData.gender}.

Start the conversation with:
"Namaste, main AI Doctor Rajeev hoon. Aapko ${patientData.primary_complaint.join(" aur ")} hai ${patientData.duration_of_problem} se. Aapka age ${patientData.age} hai. Main aapki madad karne ke liye yahan hoon. Kya aap bata sakte hain aur kya dikkat ho rahi hai?"

Ask only one question at a time.
Wait for the user to finish speaking before responding.
Use short, clear sentences and avoid jargon.
Your goal is to understand the patient and help generate a prescription.
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ AI Session Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
