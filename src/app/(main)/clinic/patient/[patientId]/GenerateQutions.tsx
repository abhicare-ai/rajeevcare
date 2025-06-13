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
import { calculateAge, formatDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingButton from "@/components/LoadingButton";
import { generateDeasesQuations } from "./actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import OpenAISpeechDialog from "./OpenAISpeechDialog";

interface GenerateQutionsProps {
  open: boolean;
  onclose: () => void;
  patientData: AppoinmentData;
}

export default function GenerateQutions({
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
    },
  });

  const [ispending, startTransation] = useTransition();
  const [ShowSpeechDialog, setShowSpeechDialog] = useState(false);
  const [questionsList, setQuestionsList] = useState();

  function handleDialogClose() {
    if (!ispending) {
      onclose();
    }
  }

  const onSubmit = async (input: GenerateQuationValues) => {
    startTransation(async () => {
      const { error, result } = await generateDeasesQuations(input);

      if (error) {
        toast.error(error);
      }

      if (result) {
        onclose();
        setShowSpeechDialog(true);
        setQuestionsList(result);
      }
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-center font-bold">
              Prescription Generator with Doctor
            </DialogTitle>
          </DialogHeader>

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
              <LoadingButton
                loading={ispending}
                className="w-full"
                type="submit"
              >
                Generate Disease Questions{" "}
              </LoadingButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {questionsList && (
        <OpenAISpeechDialog
          onclose={() => setShowSpeechDialog(true)}
          open={ShowSpeechDialog}
          patientData={patientData}
          compaintData={questionsList}
        />
      )}
    </>
  );
}
