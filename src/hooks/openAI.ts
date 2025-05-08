import { AzureKeyCredential, OpenAIClient } from "@azure/openai";

export const OpenAI = new OpenAIClient(
  process.env.AZURE_ENDPOINT!,
  new AzureKeyCredential(process.env.AZURE_API_KEY!),
);
