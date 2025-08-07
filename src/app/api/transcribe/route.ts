// /app/api/transcribe/route.ts
import { OpenAI } from "@/hooks/openAI";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("audio") as File;

  const arrayBuffer = await file.arrayBuffer();

  const audio = new Uint8Array(arrayBuffer);

  const result = await OpenAI.getAudioTranscription(
    process.env.AZURE_DEPLOYMENT_NAME!,
    audio,
  );
  const text = result.text;
  return NextResponse.json(text);
}
