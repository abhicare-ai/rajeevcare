// app/api/tts-hindi/route.ts

export async function POST(req: Request) {
  const { text } = await req.json();

  const endpoint = "https://ai-rajeevcare.tts.speech.microsoft.com/cognitiveservices/v1";

  const ssml = `
  <speak version='1.0' xml:lang='hi-IN'>
    <voice name='hi-IN-SwaraNeural'>
      ${text}
    </voice>
  </speak>`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/ssml+xml",
      "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_KEY!,
      "X-Microsoft-OutputFormat": "audio-16khz-32kbitrate-mono-mp3",
    },
    body: ssml,
  });

  const audioBuffer = await response.arrayBuffer();
  console.log(audioBuffer)

  return new Response(Buffer.from(audioBuffer), {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}
