import { vectorStore } from "@/lib/vectorStore";

export async function getLatestSavedVector(apptId: string) {
  try {
    const retriever = vectorStore.asRetriever({
      k: 100, // get all, no filtering by query
      filter: { apptId },
    });

    const results = await retriever.invoke(""); // empty query = no bias
    if (!results.length) return null;

    const sorted = results.sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    return sorted[0];
  } catch (error) {
    console.error("❌ getLatestSavedVector Error:", error);
    return null;
  }
}


export async function filterByLatestData(query: string, apptId: string) {
  try {
    const retriever = vectorStore.asRetriever({
      k: 10, // Enough to allow filtering
      filter: { apptId },
    });

    const results = await retriever.invoke(query);
    if (results.length <= 1) return []; // No old data if only 1 or none

    const sorted = results.sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );

    return sorted.slice(1); // 🔁 Remove latest, return old
  } catch (error) {
    console.error("❌ filterByLatestData Error:", error);
    return [];
  }
}
