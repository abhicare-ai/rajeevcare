


// app/api/send-sms/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  const body = await req.json();
  const { casehistory,inpute } = body;

  try {

    const response = await client.messages.create({
      to: `whatsapp:+919263049994`, // e.g., +91xxxxxxxxxx
      from: "whatsapp:+15557486713",
      body: `A new prescription has been generated for Case History ID ${casehistory}:\n${inpute}`,
    });

    return NextResponse.json({ success: true, sid: response.sid });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
