import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { embeddings } from "@/hooks/openAI";

const pinecone = new PineconeClient();

// Will automatically read the PINECONE_API_KEY env var
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});
