import { StreamClient } from "@stream-io/node-sdk";
export const streamVidio = new StreamClient(
  process.env.NEXT_PUBLIC_STREM_KEY!,
  process.env.NEXT_PUBLIC_STREM_SECRET!,
);
