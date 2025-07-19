/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import aiSiriAssistsnt from "@/assets/asse.png";

// import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingButton from "@/components/LoadingButton";
import { AppoinmentData } from "@/lib/types";

interface AiSpeechDialogBoxProps {
  open: boolean;
  onclose: () => void;
  patientData: AppoinmentData;
}

export default function AiSpeechDialogBox({
  open,
  onclose,
  patientData,
}: AiSpeechDialogBoxProps) {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showAudio, setShowAudio] = useState(false);
  const [isSubmitPending, setIsSubmitPending] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const router = useRouter();
  // Timer
  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSecond((prev) => {
          if (prev === 59) {
            setMinute((m) => {
              if (m === 59) {
                setHour((h) => h + 1);
                return 0;
              }
              return m + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  const formatTime = (val: number) => String(val).padStart(2, "0");

  // Audio
  const startRecording = async () => {
    if ("MediaRecorder" in window) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };

        mediaRecorder.start();
        setIsRecording(true);
        setIsPaused(false);
        startTimer();
      } catch (err) {
        console.error("Mic permission denied:", err);
      }
    } else {
      toast.error("MediaRecorder not supported");
    }
  };

  const handlePauseClick = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    if (recorder.state === "recording") {
      recorder.pause();
      setIsPaused(true);
      stopTimer();
    } else if (recorder.state === "paused") {
      recorder.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const resetRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (
      recorder &&
      (recorder.state === "recording" || recorder.state === "paused")
    ) {
      recorder.stop();
    }

    audioChunksRef.current = [];
    setIsRecording(false);
    setIsPaused(false);
    setAudioUrl(null);
    setShowAudio(false);
  };

  const handleResetClick = () => {
    resetTimer();
    resetRecording();
  };

  const handleSubmitClick = () => {
    const recorder = mediaRecorderRef.current;
    resetTimer();
    audioChunksRef.current = [];
    setIsRecording(false);
    setIsPaused(false);
    if (recorder && recorder.state !== "inactive") {
      setIsSubmitPending(true);
      recorder.stop();

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const file = new File([audioBlob], "recording.webm", {
          type: "audio/webm",
        });

        
      };
    }
  };

  // const handleSubmitClick = () => {
  //   const recorder = mediaRecorderRef.current;
  //   resetTimer();
  //   audioChunksRef.current = [];
  //   setIsRecording(false);
  //   setIsPaused(false);
  //   if (recorder && recorder.state !== "inactive") {
  //     setIsSubmitPending(true);
  //     recorder.stop();

  //     recorder.onstop = async () => {
  //       const audioBlob = new Blob(audioChunksRef.current, {
  //         type: "audio/webm",
  //       });

  //       const file = new File([audioBlob], "recording.webm", {
  //         type: "audio/webm",
  //       });

  //       try {
  //         const formData = new FormData();
  //         formData.append("audio", file);

  //         await axios.post(`/api/trascript`, formData, {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         });

  //         const url = URL.createObjectURL(audioBlob);
  //         setAudioUrl(url);
  //         setShowAudio(true);
  //       } catch (error) {
  //         console.error("Upload failed", error);
  //       } finally {
  //         setIsSubmitPending(false);
  //       }
  //     };
  //   }
  // };

  const handleStartClick = () => {
    startRecording();
  };

  const handleDialogClose = () => {
    resetTimer();
    resetRecording();
    setShowAudio(false);
    setAudioUrl(null);
    onclose();
  };

  const isSubmitEnabled = second >= 10;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-center">
            Prescription Generator with AI
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center gap-5">
          {isRecording && !isPaused ? (
            <Image
              src="/aiassisatnt.gif" // Animated GIF path
              alt="aiAssistantGif"
              width={110}
              height={110}
              unoptimized
              className="brightness-[1.1] hue-rotate-[30deg] saturate-[1] sepia filter"
            />
          ) : (
            <Image
              src={aiSiriAssistsnt} // Static image import
              alt="aiAssistantStill"
              width={110}
              height={110}
              unoptimized
              className="brightness-[1.1] hue-rotate-[30deg] saturate-[1] sepia filter"
            />
          )}

          <p className="text-muted-foreground text-2xl font-bold">
            {formatTime(hour)}:{formatTime(minute)}:{formatTime(second)}
          </p>

          <div className="flex gap-3">
            <Button
              onClick={handleStartClick}
              disabled={isRecording || isPaused}
              variant="secondary"
            >
              Start
            </Button>

            <Button
              onClick={handlePauseClick}
              disabled={!isRecording}
              variant="secondary"
            >
              {isPaused ? "Resume" : "Pause"}
            </Button>

            <Button onClick={handleResetClick} variant="outline">
              Reset
            </Button>

            <LoadingButton
              onClick={handleSubmitClick}
              disabled={!isSubmitEnabled || isSubmitPending}
              loading={isSubmitPending}
            >
              continue
            </LoadingButton>
          </div>

          {showAudio && audioUrl && (
            <audio className="mt-4" controls>
              <source src={audioUrl} type="audio/webm" />
              Your browser does not support audio.
            </audio>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
