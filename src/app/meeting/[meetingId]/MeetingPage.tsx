"use client";
import { Button } from "@/components/ui/button";

import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface MeetingPageProps {
  id: string;
}
export default function MeetingPage({ id }: MeetingPageProps) {
  const [call, setCall] = useState<Call>();
  const fakeComplaintData = {
    id: "ai-host-id-001", // ✅ Add this line
    apptId: "test-appt-1234",
    papatientName: "Amit Kumar",
    primary_complaint: ["Fever", "Headache"],
    duration_of_problem: "2 din se",
    age: "28",
    gender: "Male",
  };

  const client = useStreamVideoClient();

  if (!client) {
    return;
  }

  if (!call) {
    return (
      <Button
        onClick={async () => {
          const call = client.call("default", id);
          await call.join();
          setCall(call);

          // 🔥 Backend ko inform karo to start OpenAI Realtime Session
          await fetch("/api/webhooks", {
            method: "POST",
            body: JSON.stringify({
              callId: id,
              patientData: fakeComplaintData,
            }),
          });
        }}
      >
        Join Meeting
      </Button>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme className="space-y-3">
        <SpeakerLayout />
        <CallControls />
      </StreamTheme>
    </StreamCall>
  );
}
