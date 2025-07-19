import { NextResponse } from "next/server";

export const runtime = "edge"; // For better performance

export async function POST(request: Request) {
  const host =
    process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") ||
        request.headers.get("host");

  const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
    <Response>
        <Say>Please wait while we connect your call to the A. I. voice assistant, powered by Twilio and the Open-A.I. Realtime API</Say>
        <Pause length="1"/>
        <Say>O.K. you can start talking!</Say>
        <Connect>
            <Stream url="wss://${host}/api/media-stream" />
        </Connect>
    </Response>`;

  return new NextResponse(twimlResponse, {
    headers: { "Content-Type": "text/xml" },
  });
}
