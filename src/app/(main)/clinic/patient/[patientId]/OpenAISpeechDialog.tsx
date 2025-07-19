"use client";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppoinmentData } from "@/lib/types";
import Image from "next/image";
import AiDoctors from "@/assets/ai-avatar.png";
import avtar from "@/assets/avatar-placeholder.png";
import { Button } from "@/components/ui/button";

import { Mic, MicOff } from "lucide-react";
import useWebRTCAudioSession from "@/hooks/use-webrtc";
import { useRouter } from "next/navigation";
import { conversationWithAI } from "./actions";
import { detaForCove } from "@/lib/conversations";
import { useEffect, useState } from "react";
import { Tool } from "@langchain/core/tools";

interface VapiSpeechDialogBoxProps {
  open: boolean;
  onclose: () => void;
  patientData: AppoinmentData;
  compaintData: detaForCove;
}

export default function OpenAISpeechDialog({
  open,
  onclose,
  patientData,
  compaintData,
}: VapiSpeechDialogBoxProps) {
  const primary_complaint_sec = compaintData.primary_complaint.join(", ");
  const [latestSummary, setLatestSummary] = useState(
    "Fetching latest report...",
  );
  const [loading, setLoading] = useState(false); // spelling fix: loding -> loading

  useEffect(() => {
    async function fetchLatest() {
      setLoading(true); // ✅ loading start

      try {
        const res = await fetch("/api/lab-report", {
          method: "POST",
          body: JSON.stringify({
            complaint: primary_complaint_sec,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const json = await res.json();
        const content = json.report;

        setLatestSummary(
          content
            ? `🟢 Latest Report:\n${content}`
            : "❌ Koi latest report nahi mili.",
        );

        // GPT tool registration
        registerFunction("get_latest_lab_report", async () => {
          return {
            result: content || "❌ Koi lab report nahi mili.",
          };
        });
      } catch (error) {
        console.error("Lab report fetch error:", error);
        setLatestSummary("❌ Error fetching lab report.");
      } finally {
        setLoading(false); // ✅ loading end
      }
    }

    fetchLatest();
  }, [compaintData, patientData]);

  //   const tools: Tool[] = [
  //   {
  //     type: "function",
  //     name: "get_latest_lab_report",
  //     description: "Fetch the latest lab report for the patient based on complaint and appointment ID.",
  //     parameters: {
  //       type: "object",
  //       properties: {}, // GPT se koi input nahi le rahe
  //     },
  //   },
  // ];

  const {
    status,
    currentVolume,
    startSession,
    stopSession,
    conversation,
    registerFunction,
  } = useWebRTCAudioSession("alloy", undefined, compaintData, latestSummary);

  function handleDialogClose() {
    onclose();
  }

  const router = useRouter();

  const AIMessageHandler = async () => {
    const res = await conversationWithAI({
      patientId: compaintData.id,
      message: conversation,
    });
    if (res) {
      router.push(`/clinic/patient/${patientData.id}`);
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className={`md:!max-w-[900px]`}>
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-center font-bold">
              Prescription Generator with Doctor
            </DialogTitle>

            <div className="flex gap-5">
              {/* vapi card */}
              <Card className="bg-secondary flex flex-col items-center justify-center space-y-4 md:w-1/2">
                <div className="relative flex justify-center">
                  {/* Sound Pulse Animation - perfectly centered */}
                  {currentVolume > 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-primary absolute inline-flex h-[90px] w-[90px] animate-ping rounded-full opacity-75"></span>
                      <span className="bg-primary relative inline-flex h-[90px] w-[90px] rounded-full opacity-20"></span>
                    </div>
                  )}

                  {/* AI Doctor Image */}
                  <div className="relative z-10 h-[130px] w-[130px] overflow-hidden rounded-full">
                    <Image
                      src={AiDoctors}
                      alt="AI Doctor"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2">
                  <h5 className="text-center font-bold">
                    Dr. Mridula (MD BHMS)
                  </h5>
                  <h5 className="text-center font-bold">Doctor</h5>

                  {status === "Session established successfully!" ? (
                    <p className="text-primary">
                      <span className="rounded-lg border p-1 text-xs">
                        {currentVolume > 0
                          ? "Dr is speaking..."
                          : "Listening..."}
                      </span>
                    </p>
                  ) : (
                    <p className="text-destructive">
                      <span className="rounded-lg border p-1 text-xs">
                        Waiting...
                      </span>
                    </p>
                  )}
                </div>
              </Card>

              {/* users card */}

              <Card className="flex flex-col items-center justify-center space-y-4 md:w-1/2">
                <div className="relative flex justify-center">
                  {/*User Image */}
                  <div className="relative z-10 h-[130px] w-[130px] overflow-hidden rounded-full">
                    <Image
                      src={avtar}
                      alt="AI Doctor"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-center font-bold">You</h5>
                  <h5 className="text-center font-bold">
                    {patientData?.patientName}
                  </h5>
                  <div className="flex justify-center">
                    <p className="text-primary">
                      <span className="rounded-lg border p-1 text-xs">
                        Ready...
                      </span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="relative flex flex-col justify-center gap-5">
              {status === "Session established successfully!" ? (
                <Button
                  variant="destructive"
                  onClick={() => {
                    AIMessageHandler(); // 👈 this sets your state
                    stopSession(); // 👈 start the voice session
                  }}
                  className="w-full"
                >
                  <MicOff className="mr-2 h-4 w-4" />
                  End Conversation
                </Button>
              ) : (
                <Button
                  onClick={startSession}
                  className="w-full"
                  disabled={
                    status === "Fetching ephemeral token..." ||
                    status === "Establishing connection..." ||
                    loading
                  }
                >
                  <Mic className="mr-2 h-4 w-4" />
                  Start Conversation
                </Button>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
