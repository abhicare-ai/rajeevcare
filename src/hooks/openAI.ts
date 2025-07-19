import { AzureKeyCredential, OpenAIClient } from "@azure/openai";
import { AzureChatOpenAI, AzureOpenAIEmbeddings } from "@langchain/openai";
// import { Pinecone } from "@pinecone-database/pinecone";

export const OpenAI = new OpenAIClient(
  process.env.AZURE_ENDPOINT!,
  new AzureKeyCredential(process.env.AZURE_API_KEY!),
);

export const LangchainChatModel = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_API_KEY!,
  azureOpenAIApiInstanceName: "ai-rajeevcare",
  azureOpenAIApiDeploymentName: "gpt-4o",
  azureOpenAIApiVersion: "2024-02-15-preview",
});

export const embeddings = new AzureOpenAIEmbeddings({
  azureOpenAIApiKey: process.env.AZURE_API_KEY!,
  azureOpenAIApiInstanceName: "ai-rajeevcare",
  azureOpenAIApiDeploymentName: "gpt-4o",
  azureOpenAIApiEmbeddingsDeploymentName:
    process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME!,
  azureOpenAIApiVersion: "2024-02-15-preview",
});
