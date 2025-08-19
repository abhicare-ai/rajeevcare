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
import { doctor } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SymtomFormProps {
  finalData: PrescitopnTypes;
  prescitonData: {
    id: string;
    apptId: string;
    duration_of_problem: string;
    papatientName: string;
    age: string;
    gender: string;
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
  onclose: () => void;
  open: boolean;
}

export default function SystemFormWithFormPrint({
  finalData,
  prescitonData,
  onclose,
  open,
}: SymtomFormProps) {
  console.log(prescitonData.id);
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

  const onSubmit = async (values: FinalPresciptionValues) => {
    console.log("✅ Final Submitted Values:", values);

    startTransation(async () => {
      const res = await doctor({ values: values });
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

  const [Opendialog, setOpendialog] = useState(false);
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

  function handleDialogClose() {
    onclose();
  }
  const se = useRef<HTMLDivElement>(null);
  const printH = useReactToPrint({
    contentRef: se,
  });
  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className={`h-[500px] overflow-auto md:!max-w-[900px]`}>
          <DialogHeader className="space-y-6 hidden">
            <DialogTitle className="text-center font-bold">
              Prescription
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8 p-3" ref={se}>
            <h1 className="text-center font-bold text-lg">Prescription</h1>
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
                        <p className="uppercase">{prescitonData.gender}</p> ,{" "}
                        {"  "}
                        <p className="uppercase">{prescitonData.age}</p>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="printable-table border">
                    <h3 className="bg-primary p-3 font-bold">
                      Patient Diagnosis
                    </h3>
                    <div className="grid grid-cols-2">
                      {/* X-Ray */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">Symptoms</h3>
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
                      </div>

                      {/* Fluro Contrast */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 space-y-5 border-b font-bold">
                          {" "}
                          Diagnosis
                        </h3>
                        {/* ...same code */}
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
                                onClick={() => diagnosisFields.remove(index)}
                              >
                                <XIcon />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="printable-table border">
                    <h3 className="bg-primary p-3 font-bold">Rediology Test</h3>
                    <div className="grid grid-cols-2">
                      {/* X-Ray */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">X-Ray</h3>
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
                      </div>

                      {/* Fluro Contrast */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 space-y-5 border-b font-bold">
                          {" "}
                          Fluro Contrast Studies
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      {/* Ultrasound */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">Ultrasound</h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          US Doppler Study
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          C.T. Scan (Plain / Contrast)
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          M.R.I. (Plain / Contrast)
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Nuclear Medicine
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      {/* Baaki cells bhi aise hi */}
                    </div>
                  </div>

                  <div className="printable-table border">
                    <h3 className="bg-primary p-3 font-bold">Blood Test</h3>
                    <div className="grid grid-cols-2">
                      {/* X-Ray */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          General & Fever Panel
                        </h3>
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
                      </div>

                      {/* Fluro Contrast */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 space-y-5 border-b font-bold">
                          {" "}
                          Skin & Allergy Department
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      {/* Ultrasound */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          ENT & Respiratory
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Gastrointestinal / Liver
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Neurology / Psychology
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Orthopedic / Rheumatology / Joint Pain
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Gynecology / Hormonal Disorders
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Thyroid & Endocrinology
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Diabetes & Metabolic
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Urology / Kidney / Prostate
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Pediatrics / Autism / ADHD
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Reproductive / Sexual Health
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Cardiology (BP, Cholesterol, Heart Disease)
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Oncology / Tumor Screening (As per Symptoms)
                        </h3>
                        {/* ...same code */}
                        {OncologyTumorScreening.map((item) => (
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
                      </div>

                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Pre-Operative / Routine Full Body Check
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      {/* Baaki cells bhi aise hi */}
                    </div>
                  </div>

                  <div className="printable-table border">
                    <h3 className="bg-primary p-3 font-bold">
                      Blood Cancer Test
                    </h3>
                    <div className="grid grid-cols-2">
                      {/* X-Ray */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          General Oncology
                        </h3>
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
                      </div>

                      {/* Fluro Contrast */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 space-y-5 border-b font-bold">
                          {" "}
                          Breast Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      {/* Ultrasound */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Ovarian Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Cervical / Uterine Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Prostate Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Liver Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Pancreatic Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>

                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Colorectal Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Lung Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold">
                          {" "}
                          Testicular Cancer
                        </h3>
                        {/* ...same code */}
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
                      </div>
                    </div>
                  </div>

                  <div className="printable-table border">
                    <h3 className="bg-primary p-3 font-bold">Urine Test</h3>
                    <div className="grid grid-cols-1">
                      {/* X-Ray */}
                      <div className="space-y-5 border p-2">
                        <h3 className="mb-2 border-b font-bold"> Urine Test</h3>
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
                      </div>

                      {/* Baaki cells bhi aise hi */}
                    </div>
                  </div>

                  <h3 className="bg-primary p-3 font-bold">Medicine</h3>
                  <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="w-8 border-r">#</TableHead>{" "}
                        {/* 👈 Index column */}
                        <TableHead className="border-r">Name</TableHead>
                        <TableHead className="border-r">Dose</TableHead>
                        <TableHead className="">Days</TableHead>
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
                          <TableCell className="">
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

                  <h3 className="bg-primary p-3 font-bold">Wellness Product</h3>
                  <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="w-8 border-r">#</TableHead>{" "}
                        {/* 👈 Index column */}
                        <TableHead className="border-r">Name</TableHead>
                        <TableHead className="">Link</TableHead>
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
                          <TableCell className=" ">
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
                              onClick={() => walnessproductFields.remove(index)}
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

                  <h3 className="bg-primary p-3 font-bold">Diet</h3>
                  <Table className="printable-table w-[1000px] overflow-x-auto md:w-full">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="border-r">Day</TableHead>
                        <TableHead className="border-r">Breakfast</TableHead>
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
                                        fieldArrays[day].breakfast.remove(index)
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
                                fieldArrays[day].lunch.append({
                                  name: "",
                                })
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
                                        fieldArrays[day].dinner.remove(index)
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
                                fieldArrays[day].dinner.append({
                                  name: "",
                                })
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

                  <h3 className="bg-primary p-3 font-bold">Work Out</h3>
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
                                workoutFields.yoga.append({
                                  name: "",
                                })
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
                          {workoutFields.exercise.fields.map((field, index) => (
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
                          ))}
                          <Button
                            type="button"
                            className="printer"
                            onClick={() =>
                              workoutFields.exercise.append({
                                name: "",
                              })
                            }
                          >
                            + Add Exercise
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <h3 className="bg-primary p-3 font-bold">Special Note</h3>
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
                                  onClick={() => noteFields.do.remove(index)}
                                >
                                  <XIcon />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <div className="printer flex gap-5">
                            <Button
                              type="button"
                              onClick={() => noteFields.do.append({ name: "" })}
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
                                  onClick={() => noteFields.note.remove(index)}
                                >
                                  <XIcon />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            type="button"
                            className="printer"
                            onClick={() => noteFields.note.append({ name: "" })}
                          >
                            + Add Note
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Table className="printer">
                    <TableHeader className="bg-sidebar">
                      <TableRow>
                        <TableHead className="text-left">Print</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        {/* pront */}
                        <TableCell>
                          <Button
                            className="w-fit"
                            type="button"
                            onClick={printH}
                          >
                            <Printer /> Print
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
