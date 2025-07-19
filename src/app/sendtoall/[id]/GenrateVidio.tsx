"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { genrateText } from "./actions";
import { useEffect, useState } from "react";
import LoadingButton from "@/components/LoadingButton";
import { Player } from "@remotion/player";
import RemotionVidio from "./RemotionVidio";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import RemotionVideo from "./RemotionVidio";

interface GenrateVidioProps {
  value: string;
  onclose: () => void;
  open: boolean;
}

export interface Frame {
  filePath?: string;
  img?: {
    filePath?: string;
    publicUrl?: string;
  }[];
  message?: string;
}

export default function GenrateVidio({
  value,
  onclose,
  open,
}: GenrateVidioProps) {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState();
  const [audiDuration, setAudioDuration] = useState<number | undefined>();
  const [vidioScript, setVidioScript] = useState<Frame[]>();

  const genratepropmt = async () => {
    try {
      setLoading(true);
      if (!duration) return;
      const result: Frame = await genrateText(value, duration);
      if (result.message) {
        toast.error("Error while generating video.");
        return;
      }

      // ✅ wrap in array
      if (result) {
        setVidioScript([result]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAudioDuration = async () => {
      if (!vidioScript?.[0]?.filePath) return;

      const audio = new Audio(vidioScript[0].filePath);

      audio.onloadedmetadata = () => {
        const durationInSec = audio.duration;
        setAudioDuration(durationInSec); // 👈 Store duration as string
      };
    };

    getAudioDuration();
  }, [vidioScript]);

  const handleOpenChange = () => {
    if (!loading) {
      onclose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader className="space-y-6">
          <DialogTitle className="text-center font-bold">
            Create Video About ("{value}")
          </DialogTitle>
        </DialogHeader>
        {vidioScript && vidioScript.length > 0 && (
          <div className="flex w-full items-center justify-center">
            <Player
              component={RemotionVidio}
              durationInFrames={Math.floor((audiDuration ?? 60) * 30)}
              compositionWidth={350}
              compositionHeight={400}
              fps={30}
              inputProps={{
                frams: vidioScript[0],
                audioDuration: audiDuration ?? 60,
              }} // ✅ Convert Frame to Record<string, unknown>
              controls
            />
          </div>
        )}

        <div className="space-y-5">
          <Select onValueChange={(value: any) => setDuration(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a vidio duration" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="30 sec">30 sec</SelectItem>
              <SelectItem value="60 sec">60 sec</SelectItem>
            </SelectContent>
          </Select>

          <div className="mt-4 flex items-center justify-between gap-5">
            <LoadingButton
              onClick={genratepropmt}
              loading={loading}
              disabled={!duration}
              className="w-full"
            >
              Create Prompt Video
            </LoadingButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
