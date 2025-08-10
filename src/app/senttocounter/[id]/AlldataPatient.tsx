"use client";

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
  console.log("finalData", finalData);
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
                                      className="cursor-default"
                                      readOnly
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
                                      className="cursor-default"
                                      readOnly
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
                          <TableCell className="border-r">
                            <FormField
                              control={form.control}
                              name={`Medicines.${index}.day`}
                              render={({ field }) => (
                                <FormItem className="w-full space-y-1">
                                  <FormControl>
                                    <Textarea
                                      className="cursor-default"
                                      readOnly
                                      {...field}
                                      placeholder="e.g. 5 din"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* Add Button */}
                      <TableRow>
                        <TableCell colSpan={5}>
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
            </form>
          </Form>
        </Accordion>
      </div>
    </div>
  );
}
