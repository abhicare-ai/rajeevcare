"use client";

import LoadingButton from "@/components/LoadingButton";
import { TagsInput } from "@/components/TagsInput";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  finalPresciptionSchema,
  FinalPresciptionValues,
} from "@/lib/vallidaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, MessageCircleMore, PlusIcon, Printer, XIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFieldArray, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState, useTransition } from "react";
import { PrescitopnTypes } from "@/lib/conversations";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

import { useAppSelector } from "@/hooks/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import logo from "@/assets/web_logo_2.png";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BreastCancer,
  Cardiology,
  CervicalUterineCancer,
  ColorectalCancer,
  CTScanTest,
  DiabetesMetabolic,
  EntRespiratoryPanel,
  FluroContrastStudies,
  GastroLiverPanel,
  GeneralFeverPanel,
  GeneralOncology,
  GynecologyHormonalDisorders,
  LiverCancer,
  LungCancer,
  MRItest,
  NeuroPsychPanel,
  NuclearMedicineTest,
  OncologyTumorScreening,
  OrthoRheumaPanel,
  OvarianCancer,
  PancreaticCancer,
  PediatricsAutismADHD,
  PreOperativeFullBodyCheck,
  ProstateCancer,
  ReproductiveSexualHealth,
  SkinAllergyPanel,
  TesticularCancer,
  ThyroidEndocrinology,
  UltrasoundTest,
  urineTest,
  UrologyKidneyProstate,
  USDopplerStudy,
  XRayTest,
} from "@/app/(main)/clinic/patient/[patientId]/patientdata/[symptomId]/TestName";

interface SymtomFormProps {
  finalData: PrescitopnTypes;
  prescitonData: {
    id: string;
   
    age: string;
    gender: string;
    papatientName: string;

    Patient_Number: string;
    DOB: string;
    Ai_Check_Up_Date: string;
    caseidIdx: string;

    pmsId: string;
    refrenshby: string;
    patientAddress: string;
    patientEmial: string;

    patientWeight: string;
    patinetDiet: string;
    branch: string;
    bp: string;
  };
}

export default function AlldataPatient({
  finalData,
  prescitonData,
}: SymtomFormProps) {
  console.log("finalData", finalData.symptoms);
  const form = useForm<FinalPresciptionValues>({
    resolver: zodResolver(finalPresciptionSchema),
    defaultValues: {
      id: prescitonData.id,
      Symptoms: finalData.symptoms || [],
      Diagnosis: finalData.diagnosis || [],
      Medicines: finalData.medicines || [],

      DietPlan: finalData.dietPlan || {
        sunday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
        monday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
        tuesday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
        wednesday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
        thursday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
        friday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
        saturday: { breakfast: [], lunch: [], dinner: [], do: [], dontdo: [] },
      },

      WorkoutPlan: finalData.workoutPlan || {
        yoga: [],
        exercise: [],
      },

      Specialnotes: finalData.specialnotes || {
        do: [],
        dontdo: [],
        note: [],
      },
      WallnessProduct: finalData.wallnessProduct || [],

      XRayTest: finalData.XRayTest || [],
      FluroContrastStudies: finalData.FluroContrastStudies || [],
      UltrasoundTest: finalData.UltrasoundTest || [],
      USDopplerStudy: finalData.USDopplerStudy || [],
      CTScanTest: finalData.CTScanTest || [],
      MRItest: finalData.MRItest || [],
      NuclearMedicineTest: finalData.NuclearMedicineTest || [],

      GeneralFeverPanel: finalData.GeneralFeverPanel || [],
      SkinAllergyPanel: finalData.SkinAllergyPanel || [],
      EntRespiratoryPanel: finalData.EntRespiratoryPanel || [],
      GastroLiverPanel: finalData.GastroLiverPanel || [],
      NeuroPsychPanel: finalData.NeuroPsychPanel || [],
      OrthoRheumaPanel: finalData.OrthoRheumaPanel || [],
      GynecologyHormonalDisorders: finalData.GynecologyHormonalDisorders || [],
      ThyroidEndocrinology: finalData.ThyroidEndocrinology || [],
      DiabetesMetabolic: finalData.DiabetesMetabolic || [],
      UrologyKidneyProstate: finalData.UrologyKidneyProstate || [],

      PediatricsAutismADHD: finalData.PediatricsAutismADHD || [],
      ReproductiveSexualHealth: finalData.ReproductiveSexualHealth || [],
      Cardiology: finalData.Cardiology || [],

      OncologyTumorScreening: finalData.OncologyTumorScreening || [],
      PreOperativeFullBodyCheck: finalData.PreOperativeFullBodyCheck || [],

      GeneralOncology: finalData.GeneralOncology || [],
      BreastCancer: finalData.BreastCancer || [],
      OvarianCancer: finalData.OvarianCancer || [],
      CervicalUterineCancer: finalData.CervicalUterineCancer || [],
      ProstateCancer: finalData.ProstateCancer || [],
      LiverCancer: finalData.LiverCancer || [],
      PancreaticCancer: finalData.PancreaticCancer || [],
      ColorectalCancer: finalData.ColorectalCancer || [],
      LungCancer: finalData.LungCancer || [],
      TesticularCancer: finalData.TesticularCancer || [],
      urineTest: finalData.urineTest || [],
    },
  });

  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;

  const fieldArrays = days.reduce(
    (acc, day) => {
      acc[day] = {
        breakfast: useFieldArray({
          control: form.control,
          name: `DietPlan.${day}.breakfast`,
        }),
        lunch: useFieldArray({
          control: form.control,
          name: `DietPlan.${day}.lunch`,
        }),
        dinner: useFieldArray({
          control: form.control,
          name: `DietPlan.${day}.dinner`,
        }),
      };
      return acc;
    },
    {} as Record<(typeof days)[number], any>,
  );

  const symtemFields = useFieldArray({
    control: form.control,
    name: "Symptoms",
  });

  const diagnosisFields = useFieldArray({
    control: form.control,
    name: "Diagnosis",
  });
  const workoutFields = {
    yoga: useFieldArray({
      control: form.control,
      name: "WorkoutPlan.yoga",
    }),
    exercise: useFieldArray({
      control: form.control,
      name: "WorkoutPlan.exercise",
    }),
  };

  const medicineFields = useFieldArray({
    control: form.control,
    name: "Medicines",
  });

  const noteFields = {
    do: useFieldArray({
      control: form.control,
      name: "Specialnotes.do",
    }),
    dontdo: useFieldArray({
      control: form.control,
      name: "Specialnotes.dontdo",
    }),
    note: useFieldArray({
      control: form.control,
      name: "Specialnotes.note",
    }),
  };
  const walnessproductFields = useFieldArray({
    control: form.control,
    name: "WallnessProduct",
  });

  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const section7Ref = useRef<HTMLDivElement>(null);
  // 👇 React to Print functions for each
  const handlePrintSection1 = useReactToPrint({
    contentRef: section1Ref,
  });
  const handlePrintSection2 = useReactToPrint({
    contentRef: section2Ref,
  });
  const handlePrintSection3 = useReactToPrint({
    contentRef: section3Ref,
  });
  const handlePrintSection4 = useReactToPrint({
    contentRef: section4Ref,
  });
  const handlePrintSection5 = useReactToPrint({
    contentRef: section5Ref,
  });
  const handlePrintSection6 = useReactToPrint({
    contentRef: section6Ref,
  });
  const handlePrintSection7 = useReactToPrint({
    contentRef: section7Ref,
  });

  const [value, setValue] = useState<string>();
  const [showDeletDailog, setShowDeletDialog] = useState(false);
  const genrateVidio = (e: string) => {
    setValue(e);
    setShowDeletDialog(true);
  };

  return (
    <div className="space-y-8 p-3">
      <div className="bg-sidebar rounded-md border p-3">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <Image src={logo} width={150} alt="Dr. Rajeev's Logo" />
            <p className="text-2xl">
              Powered by{" "}
              <span className="">Dr. Rajeev's Homeopathy Clinic</span>. Buy
              wellness products from here:{" "}
              <a
                href="https://www.drrajeevswellness.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                www.drrajeevswellness.com
              </a>
            </p>
          </div>

          <div className="flex gap-5">
            <div className="bg-secondary text-muted-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full border font-bold uppercase">
              {prescitonData?.papatientName[0]}
            </div>
            <div className="flex flex-col space-y-3 md:flex-row md:gap-10">
              <div className="space-y-3">
                <p className="font-bold uppercase">
                  {prescitonData?.papatientName}
                </p>
                <div className="flex gap-1">
                  <p className="uppercase">{prescitonData?.gender}</p> , {"  "}
                  <p className="uppercase">{prescitonData?.age}</p>
                </div>

                <p className="">DOB :- {prescitonData.DOB}</p>
                <p className="">Phone No. :- {prescitonData.Patient_Number}</p>
                <p className="">
                  Patient Email :- {prescitonData.patientEmial}
                </p>
              </div>

              <div className="space-y-3">
                <p className="">Case History Id :- {prescitonData.caseidIdx}</p>
                <p className="">Patient Id :- {prescitonData.pmsId}</p>
                <p className="">Patient Diet :- {prescitonData.patinetDiet}</p>
                <p className="">
                  Patient Weight :- {prescitonData.patientWeight}
                </p>
                <p className="">Patient BP :- {prescitonData.bp}</p>
              </div>

              <div className="space-y-3">
                <p className="">Branch :- {prescitonData.branch}</p>

                <p className="">
                  Chek Up Date :- {prescitonData.Ai_Check_Up_Date}
                </p>
                <p className="">Address :- {prescitonData.patientAddress}</p>
                <p className="">Reference By :- {prescitonData.refrenshby}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Accordion type="single" collapsible>
          <Form {...form}>
            <form>
              <input
                type="hidden"
                {...form.register("id")}
                value={prescitonData.id}
              />
              <AccordionItem value="item-3">
                <AccordionTrigger>Rediology Test</AccordionTrigger>
                <AccordionContent>
                  <Table className="">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="border-r font-bold">
                          X-Ray
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Fluro Contrast Studies
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Ultrasound
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          US Doppler Study
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          C.T. Scan (Plain / Contrast)
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          M.R.I. (Plain / Contrast)
                        </TableHead>

                        <TableHead className="font-bold">
                          Nuclear Medicine
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="align-top">
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {XRayTest.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="XRayTest"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {FluroContrastStudies.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="FluroContrastStudies"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {UltrasoundTest.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="UltrasoundTest"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {USDopplerStudy.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="USDopplerStudy"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {CTScanTest.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="CTScanTest"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {MRItest.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="MRItest"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 align-top whitespace-normal">
                          {NuclearMedicineTest.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="NuclearMedicineTest"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-20">
                <AccordionTrigger>Blood Test</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="border-r font-bold">
                          General & Fever Panel
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Skin & Allergy Department
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          ENT & Respiratory
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Gastrointestinal / Liver
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Neurology / Psychology
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Orthopedic / Rheumatology / Joint Pain
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Gynecology / Hormonal Disorders
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Thyroid & Endocrinology
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Diabetes & Metabolic
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Urology / Kidney / Prostate
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Pediatrics / Autism / ADHD
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Reproductive / Sexual Health
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Cardiology (BP, Cholesterol, Heart Disease)
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Oncology / Tumor Screening (As per Symptoms)
                        </TableHead>
                        <TableHead className="font-bold">
                          Pre-Operative / Routine Full Body Check
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="align-top">
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {GeneralFeverPanel.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="GeneralFeverPanel"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {SkinAllergyPanel.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="SkinAllergyPanel"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {EntRespiratoryPanel.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="EntRespiratoryPanel"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {GastroLiverPanel.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="GastroLiverPanel"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {NeuroPsychPanel.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="NeuroPsychPanel"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {OrthoRheumaPanel.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="OrthoRheumaPanel"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {GynecologyHormonalDisorders.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="GynecologyHormonalDisorders"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {ThyroidEndocrinology.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="ThyroidEndocrinology"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {DiabetesMetabolic.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="DiabetesMetabolic"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {UrologyKidneyProstate.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="UrologyKidneyProstate"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {PediatricsAutismADHD.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="PediatricsAutismADHD"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {ReproductiveSexualHealth.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="ReproductiveSexualHealth"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {Cardiology.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="Cardiology"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>{" "}
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {OncologyTumorScreening.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="OncologyTumorScreening"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 align-top whitespace-normal">
                          {PreOperativeFullBodyCheck.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="PreOperativeFullBodyCheck"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-21">
                <AccordionTrigger>Blood Cancer Test</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="border-r font-bold">
                          General Oncology
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Breast Cancer
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Ovarian Cancer
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Cervical / Uterine Cancer
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Prostate Cancer
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Liver Cancer
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Pancreatic Cancer
                        </TableHead>

                        <TableHead className="border-r font-bold">
                          Colorectal Cancer
                        </TableHead>
                        <TableHead className="border-r font-bold">
                          Lung Cancer
                        </TableHead>
                        <TableHead className="font-bold">
                          Testicular Cancer
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="align-top">
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {GeneralOncology.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="GeneralOncology"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {BreastCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="BreastCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {OvarianCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="OvarianCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {CervicalUterineCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="CervicalUterineCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {ProstateCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="ProstateCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {LiverCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="LiverCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {PancreaticCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="PancreaticCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {ColorectalCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="ColorectalCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {LungCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="LungCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                        <TableCell className="borderB space-y-5 align-top whitespace-normal">
                          {TesticularCancer.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="TesticularCancer"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-22">
                <AccordionTrigger>Urine Test</AccordionTrigger>
                <AccordionContent>
                  <Table className="">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="border-r font-bold">
                          Urine Test
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="align-top">
                        <TableCell className="borderB space-y-5 border-r align-top whitespace-normal">
                          {urineTest.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="urineTest"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center gap-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...(field.value ?? []),
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="cursor-pointer text-sm font-normal">
                                      {item.testname}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </form>
          </Form>
        </Accordion>
      </div>
    </div>
  );
}
