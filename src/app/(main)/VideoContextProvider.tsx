// app/components/VideoContextProvider.tsx
"use client";
import { nanoid } from "nanoid";
import { useAppSelector } from "@/hooks/hooks";

import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getToken } from "./clinic/patient/[patientId]/actions";

export default function VideoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const vidioClient = useIntialVidioClient();
  if (!vidioClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }
  return <StreamVideo client={vidioClient}>{children}</StreamVideo>;
}

function useIntialVidioClient() {
  const { user } = useAppSelector((sate) => sate.publicAuthSlice);

  const [vidioClient, setVidioClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    let stremUser: User;

    if (user?.id) {
      stremUser = {
        id: user.id,
        name: "Dr. Mridula",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJu-PalNLype77rVV-6AeFIeoDPm22_ruvpA&s",
      };
    } else {
      const id = nanoid();
      stremUser = {
        id,
        type: "guest",
        name: `Guest ${id}`,
      };
    }

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREM_KEY!,
      user: stremUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVidioClient(client);

    return () => {
      client.disconnectUser();
      setVidioClient(null);
    };
  }, [user?.id, user?.branch]);
  return vidioClient;
}
