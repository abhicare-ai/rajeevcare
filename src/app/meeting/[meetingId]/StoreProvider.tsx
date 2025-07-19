"use client";

import { useAppDispatch } from "@/hooks/hooks";
import { sessionHandler } from "@/hooks/publicAuthSlice";
import { Session, User } from "lucia";
import { useState } from "react";

interface SessionContext {
  user?: User | null;
  session?: Session | null;
}

export default function SetionProvider({
  value,
  children,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  const dispatch = useAppDispatch();
  const [initialized, setInitilized] = useState(false);

  // Check if we have already dispatched the session
  if (!initialized) {
    setInitilized(true);

    // Dispatch the sessionHandler action with value
    dispatch(
      sessionHandler({
        ...value,
        session: value.session
          ? {
              ...value.session,
              expiresAt: value.session.expiresAt.getTime(), // ✅ safe if session exists
            }
          : null, // ✅ agar session undefined ho
      }),
    );
  }

  return <>{children}</>;
}
