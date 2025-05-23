import { NextRequest } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILO_ACCOUNT_SID;
const authToken = process.env.TWILO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    const { inpute } = await req.json();

    const message = await client.messages.create({
      body: `Here is your link:\n${inpute}`,

      from: "whatsapp:+14155238886",
      to: "whatsapp:+919534441837",
    });

    return Response.json(message);
  } catch (err) {
    console.error("Error sending message", err);
    return Response.json({ error: "Message not sent" }, { status: 500 });
  }
}
