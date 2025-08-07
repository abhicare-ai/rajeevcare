// app/api/wallness/route.ts
import { NextResponse } from "next/server";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import { LangchainChatModel } from "@/hooks/openAI";
import wallnessTool from "@/hooks/tools/wallnessTool";

const ProductSchema = z.object({
  name: z.string().min(1),
  link: z.string().url(),
});
const ProductsSchema = z.array(ProductSchema);

function extractJsonArray(s: string): string | null {
  const start = s.indexOf("[");
  const end = s.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;
  return s.slice(start, end + 1);
}

function splitInputToItems(input: string): string[] {
  return input
    .split(/[,;\n]/) // split by comma, semicolon or newline
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawInput = String(body?.diseaseName || "").trim();
    if (!rawInput) {
      return NextResponse.json({ error: "diseaseName is required" }, { status: 400 });
    }

    // split incoming into items (keeps multiple names)
    const items = splitInputToItems(rawInput);
    if (items.length === 0) {
      return NextResponse.json({ error: "No valid disease names found" }, { status: 400 });
    }

    // Prepare a single prompt asking for a JSON array of corrected names
    const correctionPrompt = `
You are a medical text normalizer. The user provided multiple possibly-typo'd disease/symptom names.
Return ONLY a JSON array of corrected canonical short disease/symptom names (lowercase, one or two words max each).
Keep the order corresponding to the input items. If you cannot correct confidently, return the original item unchanged.

Input items: ${JSON.stringify(items)}

Example output: ["fever", "stomach ache"]
Do not add any extra commentary, only return the JSON array.
`.trim();

    const correctionMessage = new HumanMessage({ content: correctionPrompt });
    const correctionRes = await LangchainChatModel.invoke([correctionMessage]);
    const rawCorrection = String(correctionRes?.content?.toString?.() ?? "").trim();

    // Try to parse JSON array from model output (with fallback to extraction)
    let correctedItems: string[] = [];
    try {
      correctedItems = JSON.parse(rawCorrection);
      if (!Array.isArray(correctedItems)) correctedItems = [];
    } catch {
      const extracted = extractJsonArray(rawCorrection);
      if (extracted) {
        try {
          const parsed = JSON.parse(extracted);
          if (Array.isArray(parsed)) correctedItems = parsed;
        } catch {
          correctedItems = [];
        }
      }
    }

    // If LLM failed, fallback: use a safer "first-line" splitting of response or original items
    if (!correctedItems || correctedItems.length !== items.length) {
      // Try best-effort: split first line by comma
      const firstLine = (rawCorrection.split("\n")[0] || "").trim();
      if (firstLine.includes(",")) {
        correctedItems = firstLine.split(",").map((s) => s.trim());
      } else {
        // fallback to original items (keep as-is)
        correctedItems = items;
      }
    }

    // Ensure each corrected item is a non-empty string and fallback individually to original if empty
    correctedItems = correctedItems.map((c, idx) => {
      const s = String(c || "").trim();
      return s.length ? s : items[idx] ?? "";
    });

    // Now call the scraper tool for each corrected disease and aggregate products
    const allProducts: { name: string; link: string; sourceFor: string }[] = [];
    const seenLinks = new Set<string>();

    for (const disease of correctedItems) {
      let toolOutput = "[]";
      try {
        toolOutput = await (wallnessTool as any).call(disease);
        if (typeof toolOutput !== "string") toolOutput = JSON.stringify(toolOutput);
      } catch (toolErr) {
        console.error("Scraper tool error for", disease, toolErr);
        toolOutput = "[]";
      }

      let productsRaw: any[] = [];
      try {
        productsRaw = JSON.parse(toolOutput);
      } catch {
        const extracted = extractJsonArray(toolOutput);
        if (extracted) {
          try {
            productsRaw = JSON.parse(extracted);
          } catch {
            productsRaw = [];
          }
        } else {
          productsRaw = [];
        }
      }

      // validate each product and attach which disease it came from
      const v = ProductsSchema.safeParse(productsRaw);
      const products = v.success ? v.data : [];

      for (const p of products) {
        if (!seenLinks.has(p.link)) {
          seenLinks.add(p.link);
          allProducts.push({ ...p, sourceFor: disease });
        }
      }
    }

    return NextResponse.json(
      {
        diseaseName: rawInput,
        correctedQueries: correctedItems, // now an array
        products: allProducts,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("wallness correction+scrape error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
