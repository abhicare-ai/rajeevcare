"use server";
import path from "path";
import { Frame } from "./GenrateVidio";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";

export const genrateAudio = async (audioScript: any) => {
  const audioScriptPrompt = audioScript
    .map((v: any) => v.ContentText)
    .join(", ");

  const response = await fetch(process.env.NEXT_PUBLIC_AZURE_TTS_END_POINT!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.AZURE_API_KEY!,
    },
    body: JSON.stringify({
      input: audioScriptPrompt,
      voice: "shimmer",
      model: "tts-1-hd",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Azure TTS Error:", errorText);
    return NextResponse.json({ error: errorText }, { status: 500 });
  }

  const audioBuffer = Buffer.from(await response.arrayBuffer());

  // ✅ Generate unique filename
  const uniqueFilename = `azure-speech-${uuidv4()}.mp3`;
  const filePath = path.resolve("./src/assets/audio", uniqueFilename);

  fs.writeFileSync(filePath, audioBuffer);

  // ✅ Return the public path to the audio file (for frontend use)
  const publicUrl = `/` + uniqueFilename;
  return { url: publicUrl, filePath };
};
