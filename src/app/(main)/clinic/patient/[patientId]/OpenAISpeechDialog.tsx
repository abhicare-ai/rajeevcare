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
  const { status, currentVolume, startSession, stopSession, conversation } =
    useWebRTCAudioSession("alloy", undefined, compaintData);

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
                    status === "Establishing connection..."
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
