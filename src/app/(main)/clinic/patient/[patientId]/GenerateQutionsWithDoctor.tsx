"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppoinmentData } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateQuationSchema, GenerateQuationValues } from "@/lib/vallidaion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagsInput } from "@/components/TagsInput";
import { Input } from "@/components/ui/input";
import { calculateAge, cn, formatDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingButton from "@/components/LoadingButton";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import useMediaUplods, {
  Attachment,
} from "@/components/clinic/appointmets/editor/useMediaUplods";
import Image from "next/image";
import { ImageIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiSpeechDialogBox from "./AiSpeechDialogBox";
import { generateDeasesQuations } from "./actions";

interface GenerateQutionsProps {
  open: boolean;
  onclose: () => void;
  patientData: AppoinmentData;
}

export default function GenerateQutionsWithDoctor({
  open,
  onclose,
  patientData,
}: GenerateQutionsProps) {
  const form = useForm<GenerateQuationValues>({
    resolver: zodResolver(generateQuationSchema),
    defaultValues: {
      primary_complaint: [],
      duration_of_problem: "",
      age: calculateAge(patientData.patientDOB),
      gender: patientData.gendar,
      id: patientData.id,
      papatientName: patientData.patientName,

      Patient_Number: patientData.phoneNumber,
      DOB: formatDate(patientData.patientDOB),
      Ai_Check_Up_Date: formatDate(patientData.appointmentDate),
      caseidId: patientData.tokenNo,

      pmsId: patientData.pmsId,
      refrenshby: patientData.refrenshby,
      patientAddress: patientData.patientAddress,
      patientEmial: patientData.patientEmial,
      patientWeight: patientData.patientWeight,
      patinetDiet: patientData.patinetDiet,
      branch: patientData.branch,
      bp: patientData.bp,
    },
  });

  const [ispending, startTransation] = useTransition();
  const [ShowSpeechDialog, setShowSpeechDialog] = useState(false);
  const [questionsList, setQuestionsList] = useState();
  const {
    startUpload,
    attachment,
    isUploading,
    uploadProgress,
    removeAttachment,
    reset: resetMediaUpload,
  } = useMediaUplods();

  function handleDialogClose() {
    if (!ispending) {
      onclose();
    }
  }

  const onSubmit = async (input: GenerateQuationValues) => {
    startTransation(async () => {
      const payload = {
        ...input,
        mediaIds: attachment.map((a) => a.mediaId).filter(Boolean) as string[],
      };
      const { error, result } = await generateDeasesQuations(payload);

      if (error) {
        toast.error(error);
      }

      if (result) {
        onclose();
        setShowSpeechDialog(true);
        setQuestionsList(result);
        resetMediaUpload();
      }
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="!h-[500px] overflow-y-auto">
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-center font-bold">
              Prescription Generator with Doctor
            </DialogTitle>
          </DialogHeader>
          {!!attachment.length && (
            <AttachmentPreviews
              attachments={attachment}
              removeAttachment={removeAttachment}
            />
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="primary_complaint"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Primary Complaint </FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="Enter Primary Complaint"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration_of_problem"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Since</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Since" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Since less than 1 month">
                          Since less than 1 month
                        </SelectItem>
                        <SelectItem value="Since less than 3 months">
                          Since less than 3 months
                        </SelectItem>
                        <SelectItem value="Since 3 months to 6 months">
                          Since 3 months to 6 months
                        </SelectItem>
                        <SelectItem value="Since 6 months to 1 year">
                          Since 6 months to 1 year
                        </SelectItem>
                        <SelectItem value="Since more than 1 year">
                          Since more than 1 year
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="papatientName"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Patient Name </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Age </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="!w-full">
                    <FormLabel>Gender </FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      /> */}

              <FormField
                control={form.control}
                name="Patient_Number"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel>Phone Number </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="DOB"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel> DOB </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Ai_Check_Up_Date"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel> Check Up Date </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="caseidId"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel> Case History Id </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pmsId"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel> Case History Id </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="refrenshby"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel> Case History Id </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientAddress"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel> Case History Id </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientEmial"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel>Patient Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientWeight"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel>Patient Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patinetDiet"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel>Patient Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel>Patient Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bp"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
                    <FormLabel>Patient Name </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        readOnly
                        type="hidden"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex">
                <div className="w-1/2">
                  {isUploading && (
                    <>
                      <span className="text-sm">{uploadProgress ?? 0}%</span>
                      <Loader2 className="text-primary size-5 animate-spin" />
                    </>
                  )}
                  <AddAttachmentsButton
                    onFilesSelected={startUpload}
                    disabled={isUploading || attachment.length >= 5}
                  />
                </div>

                <LoadingButton
                  loading={ispending}
                  disabled={isUploading}
                  type="submit"
                >
                  Generate Disease Questions{" "}
                </LoadingButton>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {questionsList && (
        <AiSpeechDialogBox
          onclose={() => setShowSpeechDialog(true)}
          open={ShowSpeechDialog}
          patientData={patientData}
          compaintData={questionsList}
        />
      )}
    </>
  );
}

interface AddAttachmentsButtonProps {
  onFilesSelected: (files: File[]) => void;
  disabled: boolean;
}

function AddAttachmentsButton({
  onFilesSelected,
  disabled,
}: AddAttachmentsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        variant="secondary"
        type="button"
        className="text-primary hover:text-primary"
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon size={20} /> Upload Lap Report
      </Button>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="sr-only hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (files.length) {
            onFilesSelected(files);
            e.target.value = "";
          }
        }}
      />
    </>
  );
}

interface AttachmentPreviewsProps {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
}

function AttachmentPreviews({
  attachments,
  removeAttachment,
}: AttachmentPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((attachment) => (
        <AttachmentPreview
          key={attachment.file.name}
          attachment={attachment}
          onRemoveClick={() => removeAttachment(attachment.file.name)}
        />
      ))}
    </div>
  );
}

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemoveClick: () => void;
}

function AttachmentPreview({
  attachment: { file, mediaId, isUploading },
  onRemoveClick,
}: AttachmentPreviewProps) {
  const src = URL.createObjectURL(file);

  return (
    <div
      className={cn("relative mx-auto size-fit", isUploading && "opacity-50")}
    >
      {file.type.startsWith("image") ? (
        <Image
          src={src}
          alt="Attachment preview"
          width={500}
          height={500}
          className="size-fit max-h-[30rem] rounded-2xl"
        />
      ) : (
        ""
      )}
      {!isUploading && (
        <button
          onClick={onRemoveClick}
          type="button"
          className="bg-foreground text-background hover:bg-foreground/60 absolute top-3 right-3 rounded-full p-1.5 transition-colors"
        >
          <X size={20} className="cursor-pointer" />
        </button>
      )}
    </div>
  );
}
