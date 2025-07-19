import VideoContextProvider from "@/app/(main)/VideoContextProvider";
import { validateRequest } from "@/authSlice";
import React from "react";
import StoreProvider from "./SetionProvider";
import SetionProvider from "./StoreProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();
 
  return (
    <StoreProvider>
      <SetionProvider value={session}>
        {" "}
        <VideoContextProvider>{children}</VideoContextProvider>{" "}
      </SetionProvider>{" "}
    </StoreProvider>
  );
}
