"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import aiTestImg from "@/assets/ai-Bj-G7DKh.png";
import menualTestImg from "@/assets/books-CBYtHSs0.png";
import Image from "next/image";
import { useState } from "react";
import AiSpeechDialogBox from "./AiSpeechDialogBox";
import { AppoinmentData } from "@/lib/types";
import GenerateQutions from "./GenerateQutions";

interface DeasesGenerationDialogBoxProps {
  open: boolean;
  onclose: () => void;
  patientData: AppoinmentData;
}

export default function DeasesGenerationDialogBox({
  open,
  onclose,
  patientData,
}: DeasesGenerationDialogBoxProps) {
  function handlerOpenChange() {
    onclose();
  }
  const [showDeletDailog, setShowDeletDialog] = useState(false);
  const [showVapiDailog, setShowVapiDialog] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={handlerOpenChange}>
        <DialogContent>
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-center font-bold">
              Create Prescription{" "}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            <div
              className="flex cursor-pointer flex-col items-center gap-5 rounded-md border p-3 shadow-md sm:flex-row"
              onClick={() => {
                onclose();
                setShowDeletDialog(true);
              }}
            >
              <Image src={aiTestImg} alt="aitextimg" width={100} height={100} />
              <div>
                <h3 className="text-2xl font-bold">With AI </h3>
                <p className="text-muted-foreground">
                  Elevate patient care with AI-driven prescriptions for tailored
                  treatments.
                </p>
              </div>
            </div>
            <div
              className="flex cursor-pointer flex-col items-center gap-5 rounded-md border p-3 shadow-md sm:flex-row"
              onClick={() => {
                onclose();

                setShowVapiDialog(true);
              }}
            >
              <Image
                src={menualTestImg}
                alt="aitextimg"
                width={100}
                height={100}
              />
              <div>
                <h3 className="text-2xl font-bold">Manually </h3>
                <p className="text-muted-foreground">
                  Crafting personalized prescriptions with care and expertise,
                  one line at a time.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AiSpeechDialogBox
        onclose={() => setShowDeletDialog(false)}
        open={showDeletDailog}
        patientData={patientData}
      />
      <GenerateQutions
        onclose={() => setShowVapiDialog(false)}
        open={showVapiDailog}
        patientData={patientData}
      />
    </>
  );
}
