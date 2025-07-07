"use client";

import { TagsInput } from "@/components/TagsInput";

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


import { useFieldArray, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState, useTransition } from "react";
import { PrescitopnTypes } from "@/lib/conversations";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/hooks";

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

      Yoga: finalData.workoutPlan.yoga || [],
      Exercize: finalData.workoutPlan.exercise || [],

      Note: finalData.workoutPlan.note || "",

      BloodTest: finalData.blooTest || [],
      RediologyTest: finalData.rediologyTest || [],
      UrineTest: finalData.urintest || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "Medicines",
  });

  const [ispending, startTransation] = useTransition();
  const {
    formState: { isDirty },
  } = form;

  const onSubmit = async (values: FinalPresciptionValues) => {};

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

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
  const sendtomec = async () => {
    setlodinga(true);
    if (typeof window !== "undefined") {
      const { data } = await axios.post("/api/sentocounter", {
        inpute: window.location.href,
        casehistory: prescitonData.caseidIdx,
      });

      if (!data) {
        toast.error("Failed to send message.");
      } else {
        toast.success(data.message || "Message sent successfully!");
      }
    }
    setlodinga(false);
  };

  const [prevLink, setPrevLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.href;
      const trimmedUrl = currentUrl.split("patientdata")[0];
      setPrevLink(trimmedUrl);
    }
  }, []);

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

    console.log("Patient Data ID:", patientDataId);

    // yahan se aage Twilio ya backend API call kar sakte ho
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
        do: useFieldArray({
          control: form.control,
          name: `DietPlan.${day}.do`,
        }),
        dontdo: useFieldArray({
          control: form.control,
          name: `DietPlan.${day}.dontdo`,
        }),
      };
      return acc;
    },
    {} as Record<(typeof days)[number], any>,
  );

  const bloodTestFields = useFieldArray({
    control: form.control,
    name: "BloodTest",
  });

  const rediologyTestFields = useFieldArray({
    control: form.control,
    name: "RediologyTest",
  });

  const urineTestFields = useFieldArray({
    control: form.control,
    name: "UrineTest",
  });

  return (
    <div className="space-y-8 p-3" ref={contentRef}>
      <div className="bg-sidebar rounded-md border p-3">
        <div className="space-y-6">
          <div className="flex gap-5">
            <div className="bg-secondary text-muted-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full border font-bold uppercase">
              {prescitonData?.papatientName[0]}
            </div>
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
              <p className="">Patient Email :- {prescitonData.patientEmial}</p>
              <p className="">Case History Id :- {prescitonData.caseidIdx}</p>
              <p className="">Patient Id :- {prescitonData.pmsId}</p>
              <p className="">Patient Diet :- {prescitonData.patinetDiet}</p>
              <p className="">
                Patient Weight :- {prescitonData.patientWeight}
              </p>
              <p className="">Patient BP :- {prescitonData.bp}</p>
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

      <div className="rounded-md border">
        <p className="p-3 text-2xl font-bold"> Overview</p>
        <div className="space-y-6">
          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary"> Summary</TabsTrigger>
              <TabsTrigger value="transcript">Transcript</TabsTrigger>
            </TabsList>
            <TabsContent value="summary" className="p-3">
              {finalData.summary}
            </TabsContent>
            <TabsContent value="transcript" className="space-y-6 p-3">
              {finalData.qa.map(
                (v: { question: string; answer: string }, i: number) => (
                  <div key={i} className="space-y-2">
                    <p>
                      <span className="font-bold">Doctor :</span> {v.question}
                    </p>
                    <p>
                      <span className="font-bold">Patient :</span> {v.answer}
                    </p>
                  </div>
                ),
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="space-y-6 rounded-md border p-3">
        <p className="text-2xl font-bold">Final</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="hidden"
              {...form.register("id")}
              value={prescitonData.id}
            />

            <FormField
              control={form.control}
              name="Symptoms"
              render={({ field }) => (
                <FormItem className="!w-full space-y-2">
                  <FormLabel className="font-bold">Symptoms</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Diagnosis"
              render={({ field }) => (
                <FormItem className="!w-full space-y-2">
                  <FormLabel className="font-bold">Diagnosis</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onValueChange={field.onChange}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Medicine section with reponsove  start here*/}
            <div className="hidden space-y-4 md:block">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-4">
                  {/* Sr. No directly in div */}
                  <div className="flex w-12 items-center">
                    <div className="font-bold">{index + 1}</div>{" "}
                    {/* Display Sr. No */}
                  </div>

                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">
                            Medicine Name
                          </FormLabel>
                        )}

                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. Paracetamol"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.ml`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">ML</FormLabel>
                        )}

                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 450ml"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.dose`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">Dose</FormLabel>
                        )}

                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 500mg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.frequency`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">Frequency</FormLabel>
                        )}

                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 2 times a day"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">Quantity</FormLabel>
                        )}

                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 2 tablets"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <div className="block space-y-4 md:hidden">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 items-end gap-4 md:grid-cols-6"
                >
                  {/* Sr. No */}
                  <div className="flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  {/* Medicine Name */}
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">
                            Medicine Name
                          </FormLabel>
                        )}
                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. Paracetamol"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* ML */}
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.ml`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">ML</FormLabel>
                        )}
                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 450ml"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Dose */}
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.dose`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">Dose</FormLabel>
                        )}
                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 500mg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Frequency */}
                  <FormField
                    control={form.control}
                    name={`Medicines.${index}.frequency`}
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        {index === 0 && (
                          <FormLabel className="font-bold">Frequency</FormLabel>
                        )}
                        <FormControl>
                          <Textarea
                            className="resize"
                            {...field}
                            placeholder="e.g. 2 times a day"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quantity + Remove */}
                  <div className="flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name={`Medicines.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          {index === 0 && (
                            <FormLabel className="font-bold">
                              Quantity
                            </FormLabel>
                          )}
                          <FormControl>
                            <Textarea
                              className="resize"
                              {...field}
                              placeholder="e.g. 2 tablets"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Medicine section with reponsove  end here*/}

            <p className="text-muted-foreground text-[1.5rem] font-bold">
              Diet
            </p>

            <Tabs defaultValue="sunday">
              <TabsList>
                {days.map((day) => (
                  <TabsTrigger key={day} value={day}>
                    {day.slice(0, 3).toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>

              {days.map((day) => (
                <TabsContent key={day} value={day}>
                  <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                    {["breakfast", "lunch"].map((meal) => (
                      <div key={meal} className="w-full space-y-2">
                        <p className="text-lg font-semibold capitalize">
                          {meal}
                        </p>
                        {fieldArrays[day][meal].fields.map(
                          (field: any, index: number) => (
                            <div
                              key={field.id}
                              className="flex items-center gap-2"
                            >
                              <FormField
                                control={form.control}
                                name={`DietPlan.${day}.${meal as "breakfast" | "lunch"}.${index}.name`}
                                render={({ field }) => (
                                  <FormItem className="w-full space-y-1">
                                    <FormControl>
                                      <Textarea
                                        {...field}
                                        placeholder={`e.g. ${meal === "breakfast" ? "Oats" : "Veg curry"}`}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          ),
                        )}
                      </div>
                    ))}
                  </div>

                  {/* 🍽 Dinner */}
                  <div className="mt-6 space-y-2">
                    <p className="text-lg font-semibold">Dinner</p>
                    {fieldArrays[day].dinner.fields.map(
                      (field: any, index: number) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`DietPlan.${day}.dinner.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="w-full space-y-1">
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="e.g. Khichdi"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ),
                    )}
                  </div>

                  {/* ✅ Do */}
                  <div className="mt-6 space-y-2">
                    <p className="font-semibold text-green-600">Do</p>
                    {fieldArrays[day].do.fields.map(
                      (field: any, index: number) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`DietPlan.${day}.do.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="w-full space-y-1">
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="e.g. Eat on time"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ),
                    )}
                  </div>

                  {/* ❌ Don't Do */}
                  <div className="mt-6 space-y-2">
                    <p className="text-destructive font-semibold">Don't Do</p>
                    {fieldArrays[day].dontdo.fields.map(
                      (field: any, index: number) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <FormField
                            control={form.control}
                            name={`DietPlan.${day}.dontdo.${index}.name`}
                            render={({ field }) => (
                              <FormItem className="w-full space-y-1">
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    placeholder="e.g. Avoid spicy food"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            <p className="text-muted-foreground mt-6 text-[1.5rem] font-bold">
              Tests
            </p>

            <Tabs defaultValue="blood">
              <TabsList>
                <TabsTrigger value="blood">Blood Test</TabsTrigger>
                <TabsTrigger value="radiology">Radiology</TabsTrigger>
                <TabsTrigger value="urine">Urine Test</TabsTrigger>
              </TabsList>

              {/* 🩸 Blood Test */}
              <TabsContent value="blood" className="space-y-4 pt-4">
                {bloodTestFields.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`BloodTest.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full space-y-1">
                          <FormControl>
                            <Textarea {...field} placeholder="e.g. CBC, LFT" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </TabsContent>

              {/* 🧲 Radiology Test */}
              <TabsContent value="radiology" className="space-y-4 pt-4">
                {rediologyTestFields.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`RediologyTest.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full space-y-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="e.g. X-Ray, MRI"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </TabsContent>

              {/* 🚽 Urine Test */}
              <TabsContent value="urine" className="space-y-4 pt-4">
                {urineTestFields.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`UrineTest.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="w-full space-y-1">
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="e.g. Urine routine"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </TabsContent>
            </Tabs>

            <p className="text-muted-foreground text-[1.5rem] font-bold">
              Work Out
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="Yoga"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Yoga</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Exercize"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Exercize</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Note"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Note</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
