// app/api/send-sms/route.ts
import { NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
  const body = await req.json();
  const { id, to } = body;

  try {

    const response = await client.messages.create({
      to: `whatsapp:${to}`, // e.g., +91xxxxxxxxxx
      from: "whatsapp:+15557486713",
      body: `Namaste! This is Dr. Rajeev's Homeopathy Clinic.\nPlease access your prescription here:\nhttps://drrajeevswellnessai.com/sendtoall/${id}`,
    });

    return NextResponse.json({ success: true, sid: response.sid });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
