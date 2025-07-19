import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  const twimlResponse = `<?xml version="1.0" encoding="UTF-8"?>
                          <Response>
                              <Say>Please wait while we connect your call to the A.I. voice assistant, powered by Twilio and the Open-A.I. Realtime API</Say>
                              <Pause length="1"/>
                              <Say>O.K. you can start talking!</Say>
                              <Connect>
                                  <Stream url="wss://${request.headers.get("host")}/api/media-stream" />
                              </Connect>
                          </Response>`;
  return NextResponse.json({ message: twimlResponse });
}
