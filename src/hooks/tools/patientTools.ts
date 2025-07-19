import { HumanMessage } from "@langchain/core/messages";
import { LangchainChatModel } from "../openAI";

export async function extractTextAndDisease(imageUrls: string[]) {
  if (!imageUrls || imageUrls.length === 0) {
    return [];
  }

  const results: {
    imgUrl: string;
    imgText: string;
    labReportFor: string[];
  }[] = [];

  for (const url of imageUrls) {
    // Step 1: Extract plain text from image
    const extractMessage = new HumanMessage({
      content: [
        {
          type: "text",
          text: "Extract and return all visible text from this medical report image. Use plain text only, no formatting or explanation.",
        },
        {
          type: "image_url",
          image_url: { url },
        },
      ],
    });

    const extractRes = await LangchainChatModel.invoke([extractMessage]);
    const imgText = extractRes?.content?.toString() || "";

    // Step 2: Detect disease name(s) from text
    const detectDiseaseMessage = new HumanMessage({
      content: `
Below is extracted lab report text:

${imgText}

From the above content, identify which disease or health condition the report is related to (e.g. Diabetes, Typhoid, COVID-19, Migraine, etc.). Just return a JSON array of probable disease names like:

["Migraine", "Hypertension"]

Return only disease names. If unclear, return ["Unknown"]
      `.trim(),
    });

    const diseaseRes = await LangchainChatModel.invoke([detectDiseaseMessage]);
    let labReportFor: string[] = [];

    try {
      labReportFor = JSON.parse(diseaseRes?.content.toString().trim() || "[]");
    } catch {
      labReportFor = ["Unknown"];
    }

    results.push({
      imgUrl: url,
      imgText,
      labReportFor,
    });
  }

  return results;
}
