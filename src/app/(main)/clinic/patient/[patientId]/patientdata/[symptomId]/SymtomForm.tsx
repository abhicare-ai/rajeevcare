"use client";

import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
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
import { conversationWithAI } from "../../actions";
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
} from "./TestName";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CaseHostory from "./CaseHostory";

interface SymtomFormProps {
  finalData: PrescitopnTypes;
  prescitonData: {
    id: string;
    apptId: string;

    primary_complaint: string[];
    duration_of_problem: string;
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

export default function SymtomForm({
  finalData,
  prescitonData,
}: SymtomFormProps) {
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
  const [ispending, startTransation] = useTransition();
  const {
    formState: { isDirty },
  } = form;

  const onSubmit = async (values: FinalPresciptionValues) => {
    console.log("✅ Final Submitted Values:", values);

    startTransation(async () => {
      const res = await conversationWithAI({ values: values });
      if (!res) toast.error("Failed to update prescription.");
      if (res) {
        form.reset(values);
        toast.success("Prescription updated successfully!");
      }
    });
  };

  const [loading, setloding] = useState(false);
  const sendtodr = async () => {
    setloding(true);
    if (typeof window !== "undefined") {
      const { data } = await axios.post("/api/messagin", {
        inpute: window.location.href,
        casehistory: prescitonData.caseidIdx,
      });

      if (!data) {
        toast.error("Failed to send message.");
      } else {
        toast.success(data.message || "Message sent successfully!");
      }
    }
    setloding(false);
  };
  const [loadinga, setlodinga] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState("");

  const handleSendToCounter = async (toEmail: string) => {
    const url = window.location.href;
    const patientDataId = url.split("/patientdata/")[1]; // extracts part after /patientdata/

    try {
      setlodinga(true);
      const { data } = await axios.post(`/api/sentocounter`, {
        id: patientDataId,
        to: toEmail,
        casehistory: prescitonData.caseidIdx,
      });

      if (!data) {
        toast.error("Failed to send message.");
        setSelectedCounter("");
      } else {
        toast.success(data.message || "Message sent successfully!");
        setSelectedCounter("");
      }
    } catch (error) {
      setlodinga(false);
      setSelectedCounter("");
      toast.error("Failed to send message.");
    } finally {
      setSelectedCounter("");
      setlodinga(false);
    }
  };

  const [loadingal, setlodingal] = useState(false);
  const [selectedLab, setSelectedLab] = useState("");

  const handleSendToLab = async (toEmail: string) => {
    const url = window.location.href;
    const patientDataId = url.split("/patientdata/")[1]; // extracts part after /patientdata/

    try {
      setlodingal(true);
      const { data } = await axios.post(`/api/sentlab`, {
        id: patientDataId,
        to: toEmail,
        casehistory: prescitonData.caseidIdx,
      });

      if (!data) {
        toast.error("Failed to send message.");
        setSelectedLab("");
      } else {
        toast.success(data.message || "Message sent successfully!");
        setSelectedLab("");
      }
    } catch (error) {
      setlodingal(false);
      setSelectedLab("");
      toast.error("Failed to send message.");
    } finally {
      setSelectedLab("");
      setlodingal(false);
    }
  };

  const [prevLink, setPrevLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const trimmedUrl = currentUrl.split("patientdata")[0];
      setPrevLink(trimmedUrl);
    }
  }, []);

  const { user } = useAppSelector((state) => state.authSlice);
  if (!user) {
    throw Error(" You are not logged in");
  }

  const [ploding, setPloding] = useState(false);
  const sendToPatient = async () => {
    const url = window.location.href;
    const patientDataId = url.split("/patientdata/")[1]; // extracts part after /patientdata/

    try {
      setPloding(true);
      const { data } = await axios.post(`/api/patienwatsappsend`, {
        id: patientDataId,
        to: prescitonData.patientEmial,
        casehistory: prescitonData.caseidIdx,
        patienName: prescitonData.papatientName,
      });

      if (!data) {
        toast.error("Failed to send message.");
      } else {
        toast.success(data.message || "Message sent successfully!");
      }
    } catch (error) {
      setPloding(false);
      toast.error("Failed to send message.");
    } finally {
      setPloding(false);
    }
  };

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
  const section10Ref = useRef<HTMLDivElement>(null);
  const section21Ref = useRef<HTMLDivElement>(null);
  const section22Ref = useRef<HTMLDivElement>(null);
  const section23Ref = useRef<HTMLDivElement>(null);
  const section24Ref = useRef<HTMLDivElement>(null);
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

  const handlePrintSection20 = useReactToPrint({
    contentRef: section10Ref,
  });
  const handlePrintSection21 = useReactToPrint({
    contentRef: section21Ref,
  });
  const handlePrintSection22 = useReactToPrint({
    contentRef: section22Ref,
  });

  const handlePrintSection23 = useReactToPrint({
    contentRef: section23Ref,
  });

  const handlePrintSection24 = useReactToPrint({
    contentRef: section24Ref,
  });

  return (
    <Tabs defaultValue="1">
      <TabsList>
        <TabsTrigger value="1">AI Doctor</TabsTrigger>
        <TabsTrigger value="2">Doctor</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <div className="space-y-8 p-3">
          <div className="bg-sidebar rounded-md border p-3">
            <div className="space-y-6">
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
                      <p className="uppercase">{prescitonData?.gender}</p> ,{" "}
                      {"  "}
                      <p className="uppercase">{prescitonData?.age}</p>
                    </div>

                    <p className="">DOB :- {prescitonData.DOB}</p>
                    <p className="">
                      Phone No. :- {prescitonData.Patient_Number}
                    </p>
                    <p className="">
                      Patient Email :- {prescitonData.patientEmial}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <p className="">
                      Case History Id :- {prescitonData.caseidIdx}
                    </p>
                    <p className="">Patient Id :- {prescitonData.pmsId}</p>
                    <p className="">
                      Patient Diet :- {prescitonData.patinetDiet}
                    </p>
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
                    <p className="">
                      Address :- {prescitonData.patientAddress}
                    </p>
                    <p className="">
                      Reference By :- {prescitonData.refrenshby}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1" ref={section10Ref}>
                <AccordionTrigger>Patient Case History</AccordionTrigger>
                <AccordionContent>
                  <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="border-r">Summary</TableHead>
                        <TableHead>Patient Conversation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="align-top">
                      <TableRow>
                        <TableCell className="w border-r align-top whitespace-normal md:w-[600px]">
                          {finalData.summary}
                        </TableCell>
                        <TableCell className="whitespace-normal">
                          {finalData.qa.map(
                            (
                              v: { question: string; answer: string },
                              i: number,
                            ) => (
                              <div key={i} className="mb-4 space-y-1">
                                <p>
                                  <span className="text-primary font-bold">
                                    Doctor:
                                  </span>{" "}
                                  {v.question}
                                </p>
                                <p>
                                  <span className="font-bold text-green-500">
                                    Patient:
                                  </span>{" "}
                                  {v.answer}
                                </p>
                              </div>
                            ),
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2}>
                          <Button
                            onClick={handlePrintSection20}
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

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <input
                    type="hidden"
                    {...form.register("id")}
                    value={prescitonData.id}
                  />
                  <AccordionItem value="item-2" ref={section1Ref}>
                    <AccordionTrigger>Patient Diagnosis</AccordionTrigger>
                    <AccordionContent>
                      <Table className="w-[1000px] overflow-x-auto md:w-full">
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="border-r">Symptoms</TableHead>
                            <TableHead>Diagnosis</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="align-top">
                            <TableCell className="borderB space-y-4 border-r align-top whitespace-normal">
                              {symtemFields.fields.map((field, index) => (
                                <div className="flex items-center gap-2.5">
                                  <div className="font-bold">{index + 1}</div>{" "}
                                  <div
                                    key={field.id}
                                    className="flex w-full items-center gap-2"
                                  >
                                    <FormField
                                      control={form.control}
                                      name={`Symptoms.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full space-y-1">
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Night fever, Headache for 10 days"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      onClick={() => symtemFields.remove(index)}
                                      className="printer"
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <div className="flex gap-5">
                                <Button
                                  type="button"
                                  onClick={() =>
                                    symtemFields.append({ name: "" })
                                  }
                                  className="printer"
                                >
                                  + Add Symptom
                                </Button>
                                <Button
                                  onClick={handlePrintSection1}
                                  type="button"
                                  className="printer"
                                >
                                  <Printer className="mr-2 h-4 w-4" /> Print
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="borderB space-y-4 align-top whitespace-normal">
                              {diagnosisFields.fields.map((field, index) => (
                                <div className="flex items-center gap-2.5">
                                  <div className="font-bold">{index + 1}</div>{" "}
                                  <div
                                    key={field.id}
                                    className="flex w-full items-center gap-2"
                                  >
                                    <FormField
                                      control={form.control}
                                      name={`Diagnosis.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full space-y-1">
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Respiratory infection, Sinusitis"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      className="printer"
                                      onClick={() =>
                                        diagnosisFields.remove(index)
                                      }
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <Button
                                type="button"
                                className="printer"
                                onClick={() =>
                                  diagnosisFields.append({ name: "" })
                                }
                              >
                                + Add Diagnosis
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3" ref={section21Ref}>
                    <AccordionTrigger>Rediology Test</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table">
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                          <TableRow>
                            <TableCell className="w-full">
                              <Button
                                onClick={handlePrintSection21}
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

                  <AccordionItem value="item-20" ref={section22Ref}>
                    <AccordionTrigger>Blood Test</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table">
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                          <TableRow>
                            <TableCell className="w-full">
                              <Button
                                onClick={handlePrintSection22}
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

                  <AccordionItem value="item-21" ref={section23Ref}>
                    <AccordionTrigger>Blood Cancer Test</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table">
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                          <TableRow>
                            <TableCell className="w-full">
                              <Button
                                onClick={handlePrintSection23}
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

                  <AccordionItem value="item-22" ref={section24Ref}>
                    <AccordionTrigger>Urine Test</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table">
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
                                            checked={field.value?.includes(
                                              item.id,
                                            )}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([
                                                    ...(field.value ?? []),
                                                    item.id,
                                                  ])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) =>
                                                        value !== item.id,
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
                          <TableRow>
                            <TableCell className="w-full">
                              <Button
                                onClick={handlePrintSection24}
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

                  <AccordionItem value="item-4" ref={section3Ref}>
                    <AccordionTrigger>Medicine</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="w-8 border-r">#</TableHead>{" "}
                            {/* 👈 Index column */}
                            <TableHead className="border-r">Name</TableHead>
                            <TableHead className="border-r">Dose</TableHead>
                            <TableHead className="border-r">Days</TableHead>
                            <TableHead className="printer">Action</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {medicineFields.fields.map((field, index) => (
                            <TableRow key={field.id}>
                              {/* 👇 Index Cell */}
                              <TableCell className="text-muted-foreground borderB border-r font-bold">
                                {index + 1}
                              </TableCell>

                              {/* Name */}
                              <TableCell className="borderB border-r">
                                <FormField
                                  control={form.control}
                                  name={`Medicines.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem className="w-full space-y-1">
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="e.g. Ferrum Phosphoricum 6X"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              {/* Dose */}
                              <TableCell className="borderB border-r">
                                <FormField
                                  control={form.control}
                                  name={`Medicines.${index}.dose`}
                                  render={({ field }) => (
                                    <FormItem className="w-full space-y-1">
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="e.g. 2 tablets"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              {/* Days */}
                              <TableCell className="printer border-r">
                                <FormField
                                  control={form.control}
                                  name={`Medicines.${index}.day`}
                                  render={({ field }) => (
                                    <FormItem className="w-full space-y-1">
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="e.g. 5 din"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              {/* Action */}
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  className="printer"
                                  onClick={() => medicineFields.remove(index)}
                                >
                                  <XIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}

                          {/* Add Button */}
                          <TableRow>
                            <TableCell colSpan={1}>
                              <Button
                                type="button"
                                onClick={() =>
                                  medicineFields.append({
                                    name: "",
                                    dose: "",
                                    day: "",
                                  })
                                }
                                className="printer"
                              >
                                + Add Medicine
                              </Button>
                            </TableCell>
                            <TableCell colSpan={4}>
                              <Button
                                onClick={handlePrintSection3}
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

                  <AccordionItem value="item-5" ref={section4Ref}>
                    <AccordionTrigger>Wellness Product</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="w-8 border-r">#</TableHead>{" "}
                            {/* 👈 Index column */}
                            <TableHead className="border-r">Name</TableHead>
                            <TableHead className="border-r">Link</TableHead>
                            <TableHead className="printer">Action</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {walnessproductFields.fields.map((field, index) => (
                            <TableRow key={field.id}>
                              {/* 👇 Index Cell */}
                              <TableCell className="text-muted-foreground borderB border-r font-bold">
                                {index + 1}
                              </TableCell>

                              {/* Dose */}
                              <TableCell className="borderB border-r">
                                <FormField
                                  control={form.control}
                                  name={`WallnessProduct.${index}.name`}
                                  render={({ field }) => (
                                    <FormItem className="w-full space-y-1">
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="e.g. Tulsi Drops, Ashwagandha Tablets"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              {/* Days */}
                              <TableCell className="printer border-r">
                                <FormField
                                  control={form.control}
                                  name={`WallnessProduct.${index}.link`}
                                  render={({ field }) => (
                                    <FormItem className="w-full space-y-1">
                                      <FormControl>
                                        <Textarea
                                          {...field}
                                          placeholder="e.g. https://www.drrajeevswellness.com/"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </TableCell>

                              {/* Action */}
                              <TableCell>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  className="printer"
                                  onClick={() =>
                                    walnessproductFields.remove(index)
                                  }
                                >
                                  <XIcon />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}

                          {/* Add Button */}
                          <TableRow>
                            <TableCell colSpan={1}>
                              <Button
                                type="button"
                                onClick={() =>
                                  walnessproductFields.append({
                                    name: "",
                                    link: "",
                                  })
                                }
                                className="printer"
                              >
                                + Add Medicine
                              </Button>
                            </TableCell>
                            <TableCell colSpan={4}>
                              <Button
                                onClick={handlePrintSection3}
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

                  <AccordionItem value="item-6" ref={section5Ref}>
                    <AccordionTrigger>Diet</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="border-r">Day</TableHead>
                            <TableHead className="border-r">
                              Breakfast
                            </TableHead>
                            <TableHead className="border-r">Lunch</TableHead>
                            <TableHead className="border-r">Dinner</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {days.map((day) => (
                            <TableRow key={day} className="align-top">
                              <TableCell className="borderB border-r font-semibold">
                                {day.slice(0, 3).toUpperCase()}
                              </TableCell>

                              {/* BREAKFAST */}
                              <TableCell className="borderB space-y-2 border-r align-top">
                                {fieldArrays[day].breakfast.fields.map(
                                  (field: any, index: number) => (
                                    <div
                                      key={field.id}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="flex w-6 justify-center pt-2 font-bold">
                                        {index + 1}
                                      </div>
                                      <div className="flex w-full items-center gap-2">
                                        <FormField
                                          control={form.control}
                                          name={`DietPlan.${day}.breakfast.${index}.name`}
                                          render={({ field }) => (
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Poha"
                                            />
                                          )}
                                        />
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          className="printer"
                                          onClick={() =>
                                            fieldArrays[day].breakfast.remove(
                                              index,
                                            )
                                          }
                                        >
                                          <XIcon />
                                        </Button>
                                      </div>
                                    </div>
                                  ),
                                )}

                                <Button
                                  type="button"
                                  className="printer"
                                  onClick={() =>
                                    fieldArrays[day].breakfast.append({
                                      name: "",
                                    })
                                  }
                                >
                                  + Add
                                </Button>
                              </TableCell>

                              {/* LUNCH */}
                              <TableCell className="borderB space-y-2 border-r align-top">
                                {fieldArrays[day].lunch.fields.map(
                                  (field: any, index: number) => (
                                    <div
                                      key={field.id}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="flex w-6 justify-center pt-2 font-bold">
                                        {index + 1}
                                      </div>
                                      <div className="flex w-full items-center gap-2">
                                        <FormField
                                          control={form.control}
                                          name={`DietPlan.${day}.lunch.${index}.name`}
                                          render={({ field }) => (
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Dal, Rice"
                                            />
                                          )}
                                        />
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          className="printer"
                                          onClick={() =>
                                            fieldArrays[day].lunch.remove(index)
                                          }
                                        >
                                          <XIcon />
                                        </Button>
                                      </div>
                                    </div>
                                  ),
                                )}
                                <Button
                                  type="button"
                                  onClick={() =>
                                    fieldArrays[day].lunch.append({ name: "" })
                                  }
                                  className="printer"
                                >
                                  + Add
                                </Button>
                              </TableCell>

                              {/* DINNER */}
                              <TableCell className="borderB space-y-2 align-top">
                                {fieldArrays[day].dinner.fields.map(
                                  (field: any, index: number) => (
                                    <div
                                      key={field.id}
                                      className="flex items-center gap-2"
                                    >
                                      <div className="flex w-6 justify-center pt-2 font-bold">
                                        {index + 1}
                                      </div>
                                      <div className="flex w-full items-center gap-2">
                                        <FormField
                                          control={form.control}
                                          name={`DietPlan.${day}.dinner.${index}.name`}
                                          render={({ field }) => (
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Khichdi"
                                            />
                                          )}
                                        />
                                        <Button
                                          type="button"
                                          variant="destructive"
                                          className="printer"
                                          onClick={() =>
                                            fieldArrays[day].dinner.remove(
                                              index,
                                            )
                                          }
                                        >
                                          <XIcon />
                                        </Button>
                                      </div>
                                    </div>
                                  ),
                                )}
                                <Button
                                  type="button"
                                  className="printer"
                                  onClick={() =>
                                    fieldArrays[day].dinner.append({ name: "" })
                                  }
                                >
                                  + Add
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableCell className="printer">
                            <Button
                              onClick={handlePrintSection5}
                              type="button"
                              className="printer"
                            >
                              <Printer className="mr-2 h-4 w-4" /> Print
                            </Button>
                          </TableCell>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7" ref={section6Ref}>
                    <AccordionTrigger>Work Out</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="border-r">Yoga</TableHead>
                            <TableHead className="border-r">Exercise</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="align-top">
                            {/* ✅ Yoga Column */}
                            <TableCell className="borderB space-y-4 border-r align-top whitespace-normal">
                              {workoutFields.yoga.fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex items-center gap-2.5"
                                >
                                  <div className="font-bold">{index + 1}</div>{" "}
                                  <div className="flex w-full items-center gap-2">
                                    <FormField
                                      control={form.control}
                                      name={`WorkoutPlan.yoga.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full space-y-1">
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Surya Namaskar"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      className="printer"
                                      onClick={() =>
                                        workoutFields.yoga.remove(index)
                                      }
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <div className="printer flex gap-5">
                                <Button
                                  type="button"
                                  onClick={() =>
                                    workoutFields.yoga.append({ name: "" })
                                  }
                                >
                                  + Add Yoga
                                </Button>
                                <Button
                                  onClick={handlePrintSection6}
                                  type="button"
                                  className="printer"
                                >
                                  <Printer className="mr-2 h-4 w-4" /> Print
                                </Button>
                              </div>
                            </TableCell>

                            {/* ✅ Exercise Column */}
                            <TableCell className="borderB space-y-4 border-r align-top whitespace-normal">
                              {workoutFields.exercise.fields.map(
                                (field, index) => (
                                  <div
                                    key={field.id}
                                    className="flex items-center gap-2.5"
                                  >
                                    <div className="font-bold">{index + 1}</div>{" "}
                                    <div className="flex w-full items-center gap-2">
                                      <FormField
                                        control={form.control}
                                        name={`WorkoutPlan.exercise.${index}.name`}
                                        render={({ field }) => (
                                          <FormItem className="w-full space-y-1">
                                            <FormControl>
                                              <Textarea
                                                {...field}
                                                placeholder="e.g. Brisk walking"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        className="printer"
                                        onClick={() =>
                                          workoutFields.exercise.remove(index)
                                        }
                                      >
                                        <XIcon />
                                      </Button>
                                    </div>
                                  </div>
                                ),
                              )}
                              <Button
                                type="button"
                                className="printer"
                                onClick={() =>
                                  workoutFields.exercise.append({ name: "" })
                                }
                              >
                                + Add Exercise
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8" ref={section7Ref}>
                    <AccordionTrigger>Special Note</AccordionTrigger>
                    <AccordionContent>
                      <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="border-r">Do</TableHead>
                            <TableHead className="border-r">Don't Do</TableHead>
                            <TableHead className="border-r">Note</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="align-top">
                            {/* ✅ DO Column */}
                            <TableCell className="borderB space-y-4 border-r align-top whitespace-normal">
                              {noteFields.do.fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex items-center gap-2.5"
                                >
                                  <div className="font-bold">{index + 1}</div>
                                  <div className="flex w-full items-center gap-2">
                                    <FormField
                                      control={form.control}
                                      name={`Specialnotes.do.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full space-y-1">
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Take rest properly"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      className="printer"
                                      onClick={() =>
                                        noteFields.do.remove(index)
                                      }
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <div className="printer flex gap-5">
                                <Button
                                  type="button"
                                  onClick={() =>
                                    noteFields.do.append({ name: "" })
                                  }
                                >
                                  + Add Do
                                </Button>
                                <Button
                                  onClick={handlePrintSection7}
                                  type="button"
                                  className="printer"
                                >
                                  <Printer className="mr-2 h-4 w-4" /> Print
                                </Button>
                              </div>
                            </TableCell>

                            {/* ❌ DON'T DO Column */}
                            <TableCell className="borderB space-y-4 border-r align-top whitespace-normal">
                              {noteFields.dontdo.fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex items-center gap-2.5"
                                >
                                  <div className="font-bold">{index + 1}</div>
                                  <div className="flex w-full items-center gap-2">
                                    <FormField
                                      control={form.control}
                                      name={`Specialnotes.dontdo.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full space-y-1">
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Avoid cold drinks"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      className="printer"
                                      onClick={() =>
                                        noteFields.dontdo.remove(index)
                                      }
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <Button
                                type="button"
                                className="printer"
                                onClick={() =>
                                  noteFields.dontdo.append({ name: "" })
                                }
                              >
                                + Add Don't Do
                              </Button>
                            </TableCell>

                            {/* 📝 NOTE Column */}
                            <TableCell className="borderB space-y-4 border-r align-top whitespace-normal">
                              {noteFields.note.fields.map((field, index) => (
                                <div
                                  key={field.id}
                                  className="flex items-center gap-2.5"
                                >
                                  <div className="font-bold">{index + 1}</div>
                                  <div className="flex w-full items-center gap-2">
                                    <FormField
                                      control={form.control}
                                      name={`Specialnotes.note.${index}.name`}
                                      render={({ field }) => (
                                        <FormItem className="w-full space-y-1">
                                          <FormControl>
                                            <Textarea
                                              {...field}
                                              placeholder="e.g. Repeat medicine if needed"
                                            />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      className="printer"
                                      onClick={() =>
                                        noteFields.note.remove(index)
                                      }
                                    >
                                      <XIcon />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                              <Button
                                type="button"
                                className="printer"
                                onClick={() =>
                                  noteFields.note.append({ name: "" })
                                }
                              >
                                + Add Note
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-9">
                    <AccordionTrigger>
                      Lab Report Image That's Given By Patient
                    </AccordionTrigger>
                    <AccordionContent>
                      <Table>
                        <TableHeader className="bg-sidebar">
                          <TableRow>
                            <TableHead className="border-r">
                              Image Link
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="align-top">
                            {/* ✅ Image */}
                            <TableCell className="border-r align-top whitespace-normal">
                              {finalData?.attachments.length >= 1 ? (
                                <div className="flex flex-wrap gap-4">
                                  {finalData?.attachments?.map(
                                    (v: any, i: number) => (
                                      <a
                                        key={i}
                                        href={v.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block max-w-[160px] sm:max-w-[200px] md:max-w-[240px]"
                                      >
                                        <Image
                                          src={v.url}
                                          width={400}
                                          height={400}
                                          alt={`attachment-${i}`}
                                          className="h-[400px] w-full rounded object-cover shadow"
                                        />
                                      </a>
                                    ),
                                  )}
                                </div>
                              ) : (
                                <div>No Lab Report Image Given By Patient</div>
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </AccordionContent>
                  </AccordionItem>
                  <Table>
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="text-left">Submit</TableHead>
                        <TableHead className="text-left">Send to Dr</TableHead>
                        <TableHead className="text-left">
                          Send to Counter
                        </TableHead>
                        <TableHead className="text-left">Send to Lab</TableHead>

                        <TableHead className="text-left">
                          Send to Patient
                        </TableHead>
                        <TableHead className="text-left">
                          Patient History
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        {/* Submit */}
                        <TableCell>
                          <LoadingButton
                            loading={ispending}
                            className="w-full"
                            type="submit"
                            disabled={!isDirty}
                          >
                            {isDirty ? "Update" : "Submit"}
                          </LoadingButton>
                        </TableCell>

                        {/* Send to Dr */}
                        <TableCell>
                          <LoadingButton
                            type="button"
                            disabled={loading}
                            loading={loading}
                            onClick={sendtodr}
                            className="w-full"
                          >
                            <MessageCircleMore className="mr-2 h-4 w-4" /> Dr.
                            Rajeev Sir
                          </LoadingButton>
                        </TableCell>

                        {/* Send to Counter */}
                        <TableCell>
                          <Select
                            value={selectedCounter}
                            onValueChange={(val) => {
                              setSelectedCounter(val);
                              handleSendToCounter(val);
                            }}
                            disabled={loadinga}
                          >
                            <SelectTrigger
                              disabled={loadinga}
                              className="bg-primary w-full"
                            >
                              <SelectValue placeholder="To Counter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="medicine.ranchi@rajeevclinic.com">
                                Ranchi Medicine Counter
                              </SelectItem>
                              <SelectItem value="medicine.patna@rajeevclinic.com">
                                Patna Medicine Counter
                              </SelectItem>
                              <SelectItem value="medicine.gaurcity@rajeevclinic.com">
                                Gaur City Medicine Counter
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>

                        {/* Send to lab */}
                        <TableCell>
                          <Select
                            value={selectedLab}
                            onValueChange={(val) => {
                              setSelectedLab(val);
                              handleSendToLab(val);
                            }}
                            disabled={loadingal}
                          >
                            <SelectTrigger
                              disabled={loadingal}
                              className="bg-primary w-full"
                            >
                              <SelectValue placeholder="To Lab" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ranchilab@rajeevclinic.com">
                                Ranchi Lab
                              </SelectItem>
                              <SelectItem value="patnalab@rajeevclinic.com">
                                Patna Lab
                              </SelectItem>
                              <SelectItem value="gaurcitylab@rajeevclinic.com">
                                Gaur City Lab
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>

                        {/* Send to Patient */}
                        <TableCell>
                          <LoadingButton
                            type="button"
                            loading={ploding}
                            onClick={sendToPatient}
                            className="w-full"
                          >
                            To Patient
                          </LoadingButton>
                        </TableCell>
                        {/* View History */}
                        <TableCell>
                          <Button
                            type="button"
                            variant="default"
                            className="w-full"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            <Link href={prevLink}>History</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </form>
              </Form>
            </Accordion>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="2">
        <CaseHostory id={prescitonData.id} />
      </TabsContent>
    </Tabs>
  );
}
