"use client";

import LoadingButton from "@/components/LoadingButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
import { doctorSchema, DoctorValues } from "@/lib/vallidaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { doctor } from "./actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { TagsInput } from "@/components/TagsInput";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import CaseHistoryFormPrint from "./CaseHistoryFormPrint";

interface CaseHistoryFormProps {
  doctorData: any;
  id: string;
}

export default function CaseHistoryForm({
  doctorData,
  id,
}: CaseHistoryFormProps) {
  const form = useForm<DoctorValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      atientFullName: "",
      age: "",
      gender: "",
      marital_Status: "",
      address: "",
      contact_Number: "",
      occupation: "",
      date_of_Case_Taking: "",

      // 2
      list_complaints_in_order_of_priority: "",
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
    },
  });

  // Pre-fill form when doctorData changes
  useEffect(() => {
    if (doctorData && !form.formState.isDirty) {
      form.reset({
        id: id,
        atientFullName: doctorData.atientFullName || "",
        age: doctorData.age || "",
        gender: doctorData.gender || "",
        marital_Status: doctorData.marital_Status || "",
        address: doctorData.address || "",
        contact_Number: doctorData.contact_Number || "",
        occupation: doctorData.occupation || "",
        date_of_Case_Taking: doctorData.date_of_Case_Taking || "",

        list_complaints_in_order_of_priority:
          doctorData.list_complaints_in_order_of_priority || "",
        when_did_it_start: doctorData.when_did_it_start || "",
        how_long_has_it_persisted: doctorData.how_long_has_it_persisted || "",
        progression: doctorData.progression || "",
        sequence: doctorData.sequence || "",
        associated_symptoms: doctorData.associated_symptoms || "",

        what_increases_the_problem: doctorData.what_increases_the_problem || "",
        time: doctorData.time || "",
        Position: doctorData.Position || "",
        Emotions: doctorData.Emotions || "",
        What: doctorData.What || "",

        Temperament: doctorData.Temperament || "",
        Fears: doctorData.Fears || "",
        Anxiety: doctorData.Anxiety || "",
        Confidence: doctorData.Confidence || "",
        Social: doctorData.Social || "",
        Dreams: doctorData.Dreams || "",
        Past: doctorData.Past || "",

        Appetite: doctorData.Appetite || "",
        Thirst: doctorData.Thirst || "",
        Food_Cravings: doctorData.Food_Cravings || "",
        Food_Aversions: doctorData.Food_Aversions || "",
        Sweat: doctorData.Sweat || "",
        Sleep: doctorData.Sleep || "",
        Stool: doctorData.Stool || "",
        Urine: doctorData.Urine || "",
        Thermal_Reaction: doctorData.Thermal_Reaction || "",

        Specific_Organ_or_System: doctorData.Specific_Organ_or_System || "",
        Type_of_Pain_or_Sensation: doctorData.Type_of_Pain_or_Sensation || "",
        Timing_and_Frequency: doctorData.Timing_and_Frequency || "",
        Influencing_Factors: doctorData.Influencing_Factors || "",
        Visible_Swelling_or_Discharge:
          doctorData.Visible_Swelling_or_Discharge || "",

        Accompanying_Symptoms: doctorData.Accompanying_Symptoms || "",

        Trigger_Factors: doctorData.Trigger_Factors || "",
        Physical_Trauma: doctorData.Physical_Trauma || "",
        Emotional_Shock: doctorData.Emotional_Shock || "",
        Environmental_Exposure: doctorData.Environmental_Exposure || "",
        Diet_or_Climate_Change: doctorData.Diet_or_Climate_Change || "",

        Temperature_Sensitivity: doctorData.Temperature_Sensitivity || "",
        Comfort_Preferences: doctorData.Comfort_Preferences || "",
        Seasonal_Reaction: doctorData.Seasonal_Reaction || "",

        Childhood_Diseases: doctorData.Childhood_Diseases || "",
        Previous_Illnesses: doctorData.Previous_Illnesses || "",
        Accidents_or_Surgeries: doctorData.Accidents_or_Surgeries || "",
        Long_Term_Medications: doctorData.Long_Term_Medications || "",

        Hereditary_Illnesses: doctorData.Hereditary_Illnesses || "",

        Age_at_First_Menses: doctorData.Age_at_First_Menses || "",
        Menstrual_Cycle: doctorData.Menstrual_Cycle || "",
        Menstrual_Pain_or_Flow: doctorData.Menstrual_Pain_or_Flow || "",
        Leucorrhoea: doctorData.Leucorrhoea || "",
        Sexual_History: doctorData.Sexual_History || "",

        Diet: doctorData.Diet || "",
        Addictions: doctorData.Addictions || "",
        Daily_Routine: doctorData.Daily_Routine || "",
        Physical_Activity: doctorData.Physical_Activity || "",
        Sleep_Habits: doctorData.Sleep_Habits || "",
        Allergies: doctorData.Allergies || "",

        Physical_Appearance: doctorData.Physical_Appearance || "",
        Posture_and_Gait: doctorData.Posture_and_Gait || "",
        Facial_Expression: doctorData.Facial_Expression || "",
        Speech: doctorData.Speech || "",
        Behavior: doctorData.Behavior || "",

        Investigation_Reports: doctorData.Investigation_Reports || "",
        Current_or_Past_Diagnoses: doctorData.Current_or_Past_Diagnoses || "",
        Current_Medications: doctorData.Current_Medications || "",

        Summary_of_Symptoms: doctorData.Summary_of_Symptoms || "",
        Remedy_Prescribed: doctorData.Remedy_Prescribed || "",
        Name_of_remedy: doctorData.Name_of_remedy || "",
        Potency: doctorData.Potency || "",
        Repetition_Schedule: doctorData.Repetition_Schedule || "",
        Follow_Up_Instructions: doctorData.Follow_Up_Instructions || "",
      });
    }
  }, [doctorData, id, form]);

  const [isPending, startTransition] = useTransition();

  const {
    formState: { isDirty },
  } = form;
  const section1Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection1 = useReactToPrint({
    contentRef: section1Ref,
  });

  const section2Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection2 = useReactToPrint({
    contentRef: section2Ref,
  });

  const section3Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection3 = useReactToPrint({
    contentRef: section3Ref,
  });

  const section4Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection4 = useReactToPrint({
    contentRef: section4Ref,
  });

  const section5Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection5 = useReactToPrint({
    contentRef: section5Ref,
  });

  const section6Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection6 = useReactToPrint({
    contentRef: section6Ref,
  });

  const section7Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection7 = useReactToPrint({
    contentRef: section7Ref,
  });

  const section8Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection8 = useReactToPrint({
    contentRef: section8Ref,
  });

  const section9Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection9 = useReactToPrint({
    contentRef: section9Ref,
  });

  const section10Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection10 = useReactToPrint({
    contentRef: section10Ref,
  });

  const section11Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection11 = useReactToPrint({
    contentRef: section11Ref,
  });

  const section12Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection12 = useReactToPrint({
    contentRef: section12Ref,
  });

  const section13Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection13 = useReactToPrint({
    contentRef: section13Ref,
  });

  const section14Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection14 = useReactToPrint({
    contentRef: section14Ref,
  });

  const section15Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection15 = useReactToPrint({
    contentRef: section15Ref,
  });

  const section16Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection16 = useReactToPrint({
    contentRef: section16Ref,
  });

  const onSubmit = () => {};
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" ref={section1Ref}>
              <AccordionTrigger>General Information</AccordionTrigger>
              <AccordionContent>
                <Table className="printable-table w-[3000px] border-collapse overflow-x-auto">
                  <TableHeader className="bg-sidebar">
                    <TableRow>
                      <TableHead className="border-r">Patient Name</TableHead>
                      <TableHead className="border-r">Age</TableHead>
                      <TableHead className="border-r">Gender</TableHead>
                      <TableHead className="border-r">Marital Status</TableHead>
                      <TableHead className="border-r">Address</TableHead>
                      <TableHead className="border-r">Contact Number</TableHead>
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

                      {/* Age */}
                      <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                        <FormField
                          control={form.control}
                          name="age"
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

                      {/* Gender */}
                      <TableCell className="border-r align-top whitespace-normal md:w-[600px]">
                        <FormField
                          control={form.control}
                          name="gender"
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection1}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" ref={section2Ref}>
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection2}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" ref={section3Ref}>
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
                  <TableRow>
                    <TableCell>
                      <Button
                        onClick={handlePrintSection3}
                        type="button"
                        className="printer"
                      >
                        <Printer className="mr-2 h-4 w-4" /> Print
                      </Button>
                    </TableCell>
                  </TableRow>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" ref={section4Ref}>
              <AccordionTrigger>
                {" "}
                Mind Symptoms (Mental State & Personality)
              </AccordionTrigger>
              <AccordionContent>
                <Table className="printable-table w-[3000px] overflow-x-auto">
                  <TableHeader className="bg-sidebar">
                    <TableRow>
                      <TableHead className="border-r">
                        Temperament (angry, anxious, calm, irritable, sensitive)
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
                        Past emotional trauma, grief, insult
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection4}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" ref={section5Ref}>
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
                      <TableHead className="border-r">Food cravings</TableHead>
                      <TableHead className="border-r">Food aversions</TableHead>
                      <TableHead className="border-r">
                        Sweat (amount, area, odor, staining)
                      </TableHead>
                      <TableHead className="border-r">
                        Sleep (quality, position, talking, refreshed or not)
                      </TableHead>{" "}
                      <TableHead className="border-r">
                        Stool (frequency, color, consistency, ease of passing)
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection5}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" ref={section6Ref}>
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection6}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" ref={section7Ref}>
              <AccordionTrigger> Concomitant Symptoms</AccordionTrigger>
              <AccordionContent>
                <Table className="printable-table w-[3000px] overflow-x-auto">
                  <TableHeader className="bg-sidebar">
                    <TableRow>
                      <TableHead className="border-r">
                        What other symptoms accompany the chief complaint? •
                        (e.g., nausea with headache, anxiety with palpitations)
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection7}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" ref={section8Ref}>
              <AccordionTrigger> Causation (Trigger Factors)</AccordionTrigger>
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection8}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" ref={section9Ref}>
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
                        Preference for fan, blanket, air-conditioning, or warm
                        clothes
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection9}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" ref={section10Ref}>
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection10}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" ref={section11Ref}>
              <AccordionTrigger> Family History</AccordionTrigger>
              <AccordionContent>
                <Table className="printable-table w-[3000px] overflow-x-auto">
                  <TableHeader className="bg-sidebar">
                    <TableRow>
                      <TableHead className="border-r">
                        Illnesses in parents, grandparents, or siblings:
                        Diabetes, hypertension, cancer, asthma, mental illness,
                        skin diseases, thyroid disorders, etc.
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
                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection11}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" ref={section12Ref}>
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
                        Sexual history – libido, marital life, fertility status
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

                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection12}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" ref={section13Ref}>
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

                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection13}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14" ref={section14Ref}>
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

                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection14}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15" ref={section15Ref}>
              <AccordionTrigger>Clinical Diagnosis & Reports</AccordionTrigger>
              <AccordionContent>
                <Table className="printable-table w-[3000px] overflow-x-auto">
                  <TableHeader className="bg-sidebar">
                    <TableRow>
                      <TableHead className="border-r">
                        Available investigation reports: CBC, USG, X-ray, MRI,
                        etc.
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

                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection15}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-16" ref={section16Ref}>
              <AccordionTrigger>
                {" "}
                Totality of Symptoms & Remedy Selection
              </AccordionTrigger>
              <AccordionContent>
                <Table className="printable-table w-[3000px] overflow-x-auto">
                  <TableHeader className="bg-sidebar">
                    <TableRow>
                      <TableHead className="border-r">
                        Summary of Mind + Physical Generals + Particulars + PQRS
                        symptoms
                      </TableHead>
                      <TableHead className="border-r">
                        Remedy prescribed with reasoning
                      </TableHead>
                      <TableHead className="border-r">Name of remedy</TableHead>
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

                    <TableRow>
                      <TableCell>
                        <Button
                          onClick={handlePrintSection16}
                          type="button"
                          className="printer"
                        >
                          <Printer className="mr-2 h-4 w-4" /> Print
                        </Button>
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
                <TableHead className="text-left">Print</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="w-full"
                    type="button"
                  >
                    Print
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </form>
      </Form>

      <CaseHistoryFormPrint
        onclose={() => setDialogOpen(false)}
        open={dialogOpen}
        doctorData={doctorData}
        id={id}
      />
    </>
  );
}
