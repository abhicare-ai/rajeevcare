"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppoinmentData } from "@/lib/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  doctorSchema,
  DoctorValues,
  generateQuationSchema,
  GenerateQuationValues,
} from "@/lib/vallidaion";
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
import { generateDeasesQuations } from "./actions";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import OpenAISpeechDialog from "./OpenAISpeechDialog";
import useMediaUplods, {
  Attachment,
} from "@/components/clinic/appointmets/editor/useMediaUplods";
import Image from "next/image";
import { ImageIcon, Loader2, Printer, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReactToPrint } from "react-to-print";
import { doctor } from "./patientdata/[symptomId]/actions";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";

interface GenerateQutionsProps {
  open: boolean;
  onclose: () => void;
  patientData: AppoinmentData;
}

export default function GenerateQuationswithForm({
  open,
  onclose,
  patientData,
}: GenerateQutionsProps) {
  const form = useForm<DoctorValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      id: patientData.id,
      // 1
      atientFullName: "",
      marital_Status: "",
      address: "",
      contact_Number: "",
      occupation: "",
      date_of_Case_Taking: "",

      // 2
      list_complaints_in_order_of_priority: [],
      when_did_it_start: "",
      how_long_has_it_persisted: "",
      progression: "",
      sequence: "",
      associated_symptoms: "",

      // 3
      what_increases_the_problem: "",
      time: "",
      Position: "",
      Emotions: "",
      What: "",

      // 4
      Temperament: "",
      Fears: "",
      Anxiety: "",
      Confidence: "",
      Social: "",
      Dreams: "",
      Past: "",

      // 5
      Appetite: "",
      Thirst: "",
      Food_Cravings: "",
      Food_Aversions: "",
      Sweat: "",
      Sleep: "",
      Stool: "",
      Urine: "",
      Thermal_Reaction: "",

      // 6
      Specific_Organ_or_System: "",
      Type_of_Pain_or_Sensation: "",
      Timing_and_Frequency: "",
      Influencing_Factors: "",
      Visible_Swelling_or_Discharge: "",

      // 7
      Accompanying_Symptoms: "",

      // 8
      Trigger_Factors: "",
      Physical_Trauma: "",
      Emotional_Shock: "",
      Environmental_Exposure: "",
      Diet_or_Climate_Change: "",

      // 9
      Temperature_Sensitivity: "",
      Comfort_Preferences: "",
      Seasonal_Reaction: "",

      // 10
      Childhood_Diseases: "",
      Previous_Illnesses: "",
      Accidents_or_Surgeries: "",
      Long_Term_Medications: "",

      // 11
      Hereditary_Illnesses: "",

      // 12
      Age_at_First_Menses: "",
      Menstrual_Cycle: "",
      Menstrual_Pain_or_Flow: "",
      Leucorrhoea: "",
      Sexual_History: "",

      // 13
      Diet: "",
      Addictions: "",
      Daily_Routine: "",
      Physical_Activity: "",
      Sleep_Habits: "",
      Allergies: "",

      // 14
      Physical_Appearance: "",
      Posture_and_Gait: "",
      Facial_Expression: "",
      Speech: "",
      Behavior: "",

      // 15
      Investigation_Reports: "",
      Current_or_Past_Diagnoses: "",
      Current_Medications: "",

      // 16
      Summary_of_Symptoms: "",
      Remedy_Prescribed: "",
      Name_of_remedy: "",
      Potency: "",
      Repetition_Schedule: "",
      Follow_Up_Instructions: "",

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

      age: calculateAge(patientData.patientDOB),
      gender: patientData.gendar,
    },
  });

  const [ispending, startTransation] = useTransition();

  function handleDialogClose() {
    if (!ispending) {
      onclose();
    }
  }

  const [isPending, startTransition] = useState(false);
  const router = useRouter();
  const onSubmit = async (input: DoctorValues) => {
    
    try {
      startTransition(true);
      const data = await doctor({ input });

      if (data) {
        startTransition(true);
        router.push(`/clinic/patient/${patientData.id}`);
        startTransition(false);
      }
    } catch (error) {
      startTransition(false);
    } finally {
      startTransition(false);
    }
  };

const {
  register,
  handleSubmit,
  formState: { errors },
} = form;

console.log(errors);

  return (
    <>
      {isPending && (
        <div className="fixed top-0 right-0 z-[999] flex h-screen w-full items-center justify-center bg-black/80">
          <div className="space-y-5">
            <HashLoader color="#FFFF00" className="mx-auto" />
            <p className="text-center text-3xl font-bold text-white">
              Please wait! Don't refresh
            </p>
          </div>
        </div>
      )}
      <Dialog open={open} onOpenChange={handleDialogClose} modal={true}>
        <DialogContent className="!h-[500px] md:!max-w-[900px] overflow-y-auto" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader className="space-y-6">
            <DialogTitle className="text-center font-bold">
              Prescription Generator with AI
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="hidden !w-full">
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
                  <FormItem className="hidden !w-full">
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

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>General Information</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] border-collapse overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Patient Name
                          </TableHead>

                          <TableHead className="border-r">
                            Marital Status
                          </TableHead>
                          <TableHead className="border-r">Address</TableHead>
                          <TableHead className="border-r">
                            Contact Number
                          </TableHead>
                          <TableHead className="border-r">Occupation</TableHead>
                          <TableHead className="border-r">
                            Date Of Case Taking
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="atientFullName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          {/* Marital Status */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="marital_Status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          {/* Address */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          {/* Contact Number */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="contact_Number"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          {/* Occupation */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="occupation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          {/* Date of Case Taking */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="date_of_Case_Taking"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger> Chief Complaints</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            List complaints in order of priority
                          </TableHead>
                          <TableHead className="border-r">
                            Onset: When did it start?
                          </TableHead>
                          <TableHead className="border-r">
                            Duration: How long has it persisted?
                          </TableHead>
                          <TableHead className="border-r">
                            Progression: Improving / worsening / unchanged?
                          </TableHead>
                          <TableHead className="border-r">
                            Sequence: Which symptom came first?
                          </TableHead>
                          <TableHead className="border-r">
                            Associated symptoms?
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="list_complaints_in_order_of_priority"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <TagsInput
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      placeholder="Enter List complaints in order of priority"
                                      className="w-full"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="when_did_it_start"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="how_long_has_it_persisted"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="progression"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="sequence"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="associated_symptoms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {" "}
                    Modalities (Aggravation & Amelioration)
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            What increases the problem?
                          </TableHead>
                          <TableHead className="border-r">
                            Time (morning, evening, night)
                          </TableHead>
                          <TableHead className="border-r">
                            Position (standing, lying down, walking, etc.)
                          </TableHead>
                          <TableHead className="border-r">
                            Emotions, weather, stress, food, exertion
                          </TableHead>
                          <TableHead className="border-r">
                            What relieves the symptoms?
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="what_increases_the_problem"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Position"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Emotions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="What"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    {" "}
                    Mind Symptoms (Mental State & Personality)
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Temperament (angry, anxious, calm, irritable,
                            sensitive)
                          </TableHead>
                          <TableHead className="border-r">
                            Fears (darkness, disease, height, death, etc.)
                          </TableHead>
                          <TableHead className="border-r">
                            Anxiety / Depression / Irritability
                          </TableHead>
                          <TableHead className="border-r">
                            Confidence / Communication style
                          </TableHead>
                          <TableHead className="border-r">
                            Social behavior with family, society, crowds
                          </TableHead>
                          <TableHead className="border-r">
                            Dreams (falling, running, flying, frightening,
                            recurring)
                          </TableHead>{" "}
                          <TableHead className="border-r">
                            ast emotional trauma, grief, insult
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Temperament"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Fears"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Anxiety"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Confidence"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Social"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Dreams"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Past"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger> Physical Generals</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Appetite (normal, low, increased)
                          </TableHead>
                          <TableHead className="border-r">
                            Thirst (quantity, frequency, type of water)
                          </TableHead>
                          <TableHead className="border-r">
                            Food cravings
                          </TableHead>
                          <TableHead className="border-r">
                            Food aversions
                          </TableHead>
                          <TableHead className="border-r">
                            Sweat (amount, area, odor, staining)
                          </TableHead>
                          <TableHead className="border-r">
                            Sleep (quality, position, talking, refreshed or not)
                          </TableHead>{" "}
                          <TableHead className="border-r">
                            Stool (frequency, color, consistency, ease of
                            passing)
                          </TableHead>
                          <TableHead className="border-r">
                            Urine (frequency, color, burning, urgency)
                          </TableHead>
                          <TableHead className="border-r">
                            Thermal reaction (feels hot or chilly generally)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Appetite"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Thirst"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Food_Cravings"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Food_Aversions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Sweat"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Sleep"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Stool"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Urine"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Thermal_Reaction"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger> Particular Symptoms</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Specific organ/system affected
                          </TableHead>
                          <TableHead className="border-r">
                            Type of pain or sensation (burning, cramping, dull,
                            shooting, etc.)
                          </TableHead>
                          <TableHead className="border-r">
                            Timing and frequency
                          </TableHead>
                          <TableHead className="border-r">
                            Factors influencing the complaint (posture, weather,
                            motion, rest)
                          </TableHead>
                          <TableHead className="border-r">
                            Any visible swelling, discharge, deformity
                          </TableHead>{" "}
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Specific_Organ_or_System"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Type_of_Pain_or_Sensation"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Timing_and_Frequency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Influencing_Factors"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Visible_Swelling_or_Discharge"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger> Concomitant Symptoms</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            What other symptoms accompany the chief complaint? •
                            (e.g., nausea with headache, anxiety with
                            palpitations)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Accompanying_Symptoms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>
                    {" "}
                    Causation (Trigger Factors)
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            What triggered the disease/complaint?
                          </TableHead>
                          <TableHead className="border-r">
                            Physical trauma
                          </TableHead>
                          <TableHead className="border-r">
                            Emotional shock, grief, insult
                          </TableHead>
                          <TableHead className="border-r">
                            Exposure to cold/heat
                          </TableHead>
                          <TableHead className="border-r">
                            Diet, change of place or climate
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Trigger_Factors"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Physical_Trauma"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Emotional_Shock"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Environmental_Exposure"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Diet_or_Climate_Change"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>
                    {" "}
                    Thermal Reaction (Sensitivity to Temperature)
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Do you feel hotter or colder than others?
                          </TableHead>
                          <TableHead className="border-r">
                            Preference for fan, blanket, air-conditioning, or
                            warm clothes
                          </TableHead>
                          <TableHead className="border-r">
                            Reaction to seasons (summer, winter, rainy)
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Temperature_Sensitivity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Comfort_Preferences"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Seasonal_Reaction"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger> Past Medical History</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Childhood diseases (measles, mumps, etc.)
                          </TableHead>
                          <TableHead className="border-r">
                            Previous major illnesses (typhoid, TB, dengue, etc.)
                          </TableHead>
                          <TableHead className="border-r">
                            Accidents, surgeries, hospitalizations
                          </TableHead>
                          <TableHead className="border-r">
                            History of long-term medication use
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Childhood_Diseases"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Previous_Illnesses"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Accidents_or_Surgeries"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Long_Term_Medications"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger> Family History</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Illnesses in parents, grandparents, or siblings:
                            Diabetes, hypertension, cancer, asthma, mental
                            illness, skin diseases, thyroid disorders, etc.
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Hereditary_Illnesses"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>
                    {" "}
                    Menstrual / Sexual History (if applicable)
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Age at first menses
                          </TableHead>
                          <TableHead className="border-r">
                            Menstrual cycle – regular or irregular?
                          </TableHead>
                          <TableHead className="border-r">
                            Painful? Heavy? Scanty?
                          </TableHead>
                          <TableHead className="border-r">
                            Leucorrhoea – color, nature, odor
                          </TableHead>
                          <TableHead className="border-r">
                            Sexual history – libido, marital life, fertility
                            status
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Age_at_First_Menses"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Menstrual_Cycle"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Menstrual_Pain_or_Flow"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Leucorrhoea"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Sexual_History"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger> Personal History</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Diet: Vegetarian / Non-vegetarian
                          </TableHead>
                          <TableHead className="border-r">
                            Addictions: Smoking, alcohol, tobacco, etc.
                          </TableHead>
                          <TableHead className="border-r">
                            Daily routine: Meals, sleep, work, rest
                          </TableHead>
                          <TableHead className="border-r">
                            Exercise / Yoga / Physical activity
                          </TableHead>
                          <TableHead className="border-r">
                            Sleep habits and environment
                          </TableHead>
                          <TableHead className="border-r">
                            Known allergies or skin issues
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Diet"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Addictions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Daily_Routine"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Physical_Activity"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Sleep_Habits"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Allergies"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger> Physician’s Observation</AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Patient’s physical appearance and build
                          </TableHead>
                          <TableHead className="border-r">
                            Posture and gait
                          </TableHead>
                          <TableHead className="border-r">
                            Facial expression and eye contact
                          </TableHead>
                          <TableHead className="border-r">
                            Speech (clear, slow, fast, emotional)
                          </TableHead>
                          <TableHead className="border-r">
                            Behavior and body language during interview
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Physical_Appearance"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Posture_and_Gait"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Facial_Expression"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Speech"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Behavior"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger>
                    Clinical Diagnosis & Reports
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Available investigation reports: CBC, USG, X-ray,
                            MRI, etc.
                          </TableHead>
                          <TableHead className="border-r">
                            Current or past diagnoses (allopathic or otherwise)
                          </TableHead>
                          <TableHead className="border-r">
                            Current medications being taken regularly
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Investigation_Reports"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Current_or_Past_Diagnoses"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Current_Medications"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-16">
                  <AccordionTrigger>
                    {" "}
                    Totality of Symptoms & Remedy Selection
                  </AccordionTrigger>
                  <AccordionContent>
                    <Table className="printable-table w-[3000px] overflow-x-auto">
                      <TableHeader className="bg-sidebar">
                        <TableRow>
                          <TableHead className="border-r">
                            Summary of Mind + Physical Generals + Particulars +
                            PQRS symptoms
                          </TableHead>
                          <TableHead className="border-r">
                            Remedy prescribed with reasoning
                          </TableHead>
                          <TableHead className="border-r">
                            Name of remedy
                          </TableHead>
                          <TableHead className="border-r">Potency</TableHead>
                          <TableHead className="border-r">
                            Repetition schedule
                          </TableHead>
                          <TableHead className="border-r">
                            Follow-up instructions and next visit plan
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="align-top">
                        <TableRow>
                          {/* Patient Name */}
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Summary_of_Symptoms"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Remedy_Prescribed"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Name_of_remedy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>

                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Potency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Repetition_Schedule"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                            <FormField
                              control={form.control}
                              name="Follow_Up_Instructions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Textarea {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Submit Button */}
              <Table>
                <TableHeader className="bg-sidebar">
                  <TableRow>
                    <TableHead className="text-left">Submit</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <LoadingButton
                        loading={isPending}
                        className="w-full"
                        type="submit"
                      >
                        Submit
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
