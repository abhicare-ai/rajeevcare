"use server";

import { OpenAI } from "@/hooks/openAI";
import { genrateAudio } from "./genrateAudio";
import { imgegenrate } from "./imgegenrate";

export const genrateText = async (yogaName: string, duration: string) => {
  try {
    const textResult = await OpenAI.getChatCompletions(
      process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME!,
      [
        {
          role: "system",
          content: `
You are a professional creative AI scriptwriter and visual director.

Generate a ${duration}-second short video script about the given topic. Output must be a pure JSON array.

Each scene in the JSON array should contain:
- "imagePrompt": a photorealistic, highly detailed image description for an AI image generator
- "ContentText": a short, vivid narration for that scene

Strictly ensure that the imagePrompt describes a human performing the specific yoga posture named "${yogaName}".
Use keywords like "yoga mat", "Indian woman", "early morning light", "minimal clothing", "flexible body", "natural background", "side view", etc. for realism.


Do not return anything else except the JSON array.
`.trim(),
        },
        {
          role: "user",
          content: `Write a ${duration}-second video script on the topic: "${yogaName}". 

Return a JSON array with fields "imagePrompt" and "ContentText". 
Make sure imagePrompt describes a realistic human doing the yoga pose "${yogaName}". 
Write the narration ("ContentText") in Hinglish (mixed Hindi + English), easy to speak. 
Return only the JSON array.`,
        },
      ],
    );
    if (!textResult.choices[0].message?.content) {
      return {
        message: "No text result returned.",
      };
    }
    const rawContent = textResult.choices[0].message?.content || "";

    // ✅ Clean triple backticks
    const cleanedContent = rawContent.replace(
      /```(?:json)?\n?([\s\S]*?)\n?```/,
      "$1",
    );

    const parseData = JSON.parse(cleanedContent);

    const audio: any = await genrateAudio(parseData);
    const img = await imgegenrate(parseData);

    return {
      filePath: audio.url,
      img,
    };

    ///genrate
  } catch (error) {
    console.error("Error:", error);
    return {
      message: "internal server error",
    };
  }
};
