"use server";

import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const imgegenrate = async (imgScript: any) => {
  const imgScriptPrompt = imgScript.map((v: any) => v.imagePrompt);
  const publicFolderPath = path.join(process.cwd(), "xyz", "generated");

  // Ensure directory exists
  await fs.mkdir(publicFolderPath, { recursive: true });

  const imagePromises = imgScriptPrompt.map(async (prompt: string) => {
    const res = await fetch(process.env.DALL_E_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.DALL_E_API_KEY!,
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: "1024x1024",
      }),
    });

    const json = await res.json();
    const imageUrl = json.data?.[0]?.url;

    if (!imageUrl) return null;

    const imageRes = await fetch(imageUrl);
    const buffer = await imageRes.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    const fileName = `img-${uuidv4()}.png`;
    const filePath = path.join(publicFolderPath, fileName);
    await fs.writeFile(filePath, imageBuffer);

    // ✅ Return both local file path and public URL
    return {
      filePath, // example: C:\app\public\generated\img-xyz.png
      publicUrl: `/generated/${fileName}`,
    };
  });

  const imageResults = await Promise.all(imagePromises);
  return imageResults.filter(Boolean);
};

