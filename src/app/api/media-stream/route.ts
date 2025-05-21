// app/api/media-stream/route.ts
import { WebSocketServer } from "ws";
import { NextRequest } from "next/server";
import WebSocket from "ws";
import { IncomingMessage } from "http";

// Type definitions
type TwilioMediaMessage = {
  event: string;
  streamSid?: string;
  media?: {
    payload: string;
  };
};

type OpenAIEvent = {
  type: string;
  delta?: string;
  session?: {
    turn_detection?: { type: string };
    input_audio_format?: string;
    output_audio_format?: string;
    voice?: string;
    instructions?: string;
    modalities?: string[];
    temperature?: number;
  };
};

export const runtime = "edge";

// Constants
const SYSTEM_MESSAGE = "You are a helpful and bubbly AI assistant who loves to chat about anything the user is interested about and is prepared to offer them facts.";
const VOICE = "alloy";
const LOG_EVENT_TYPES = [
  "response.content.done",
  "rate_limits.updated",
  "response.done",
  "input_audio_buffer.committed",
  "input_audio_buffer.speech_stopped",
  "input_audio_buffer.speech_started",
  "session.created",
];

export async function GET(request: NextRequest) {
  if (request.headers.get("upgrade") !== "websocket") {
    return new Response("Not a WebSocket request", { status: 400 });
  }

  const wss = new WebSocketServer({ noServer: true });

  // Handle the upgrade manually
  const { socket, head } = request as unknown as { socket: any; head: any };
  wss.handleUpgrade(
    request as unknown as IncomingMessage,
    socket,
    head,
    (ws) => {
      handleConnection(ws);
    }
  );

  return new Response(null, { status: 101 });
}

function handleConnection(connection: WebSocket) {
  console.log("Client connected");

  if (!process.env.OPENAI_API_KEY) {
    console.error("Missing OpenAI API key");
    connection.close();
    return;
  }

  const openAiWs = new WebSocket(
    "wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-10-01",
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "OpenAI-Beta": "realtime=v1",
      },
    }
  );

  let streamSid: string | null = null;

  const sendSessionUpdate = () => {
    const sessionUpdate: OpenAIEvent = {
      type: "session.update",
      session: {
        turn_detection: { type: "server_vad" },
        input_audio_format: "g711_ulaw",
        output_audio_format: "g711_ulaw",
        voice: VOICE,
        instructions: SYSTEM_MESSAGE,
        modalities: ["text", "audio"],
        temperature: 0.8,
      },
    };
    console.log("Sending session update:", JSON.stringify(sessionUpdate));
    openAiWs.send(JSON.stringify(sessionUpdate));
  };

  // OpenAI WebSocket handlers
  openAiWs.on("open", () => {
    console.log("Connected to the OpenAI Realtime API");
    setTimeout(sendSessionUpdate, 250);
  });

  openAiWs.on("message", (data: WebSocket.Data) => {
    try {
      const response = JSON.parse(data.toString()) as OpenAIEvent;
      
      if (LOG_EVENT_TYPES.includes(response.type)) {
        console.log(`Received event: ${response.type}`, response);
      }

      if (response.type === "session.updated") {
        console.log("Session updated successfully:", response);
      }

      if (response.type === "response.audio.delta" && response.delta && streamSid) {
        const audioDelta = {
          event: "media",
          streamSid,
          media: {
            payload: Buffer.from(response.delta, "base64").toString("base64"),
          },
        };
        connection.send(JSON.stringify(audioDelta));
      }
    } catch (error) {
      console.error("Error processing OpenAI message:", error, "Raw message:", data);
    }
  });

  // Twilio connection handlers
  connection.on("message", (message: WebSocket.Data) => {
    try {
      const data = JSON.parse(message.toString()) as TwilioMediaMessage;
      
      switch (data.event) {
        case "media":
          if (openAiWs.readyState === WebSocket.OPEN) {
            const audioAppend = {
              type: "input_audio_buffer.append",
              audio: data.media?.payload,
            };
            openAiWs.send(JSON.stringify(audioAppend));
          }
          break;
        case "start":
          streamSid = data.streamSid || null;
          console.log("Incoming stream has started", streamSid);
          break;
        default:
          console.log("Received non-media event:", data.event);
          break;
      }
    } catch (error) {
      console.error("Error parsing message:", error, "Message:", message);
    }
  });

  // Cleanup handlers
  connection.on("close", () => {
    if (openAiWs.readyState === WebSocket.OPEN) {
      openAiWs.close();
    }
    console.log("Client disconnected");
  });

  openAiWs.on("close", () => {
    console.log("Disconnected from the OpenAI Realtime API");
  });

  openAiWs.on("error", (error: Error) => {
    console.error("Error in the OpenAI WebSocket:", error);
  });

  connection.on("error", (error: Error) => {
    console.error("Error in the Twilio WebSocket:", error);
  });
}