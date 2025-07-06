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

import { useFieldArray, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useEffect, useRef, useState, useTransition } from "react";
import { PrescitopnTypes } from "@/lib/conversations";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
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
  };
}

export default function AlldataPatient({
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
      Breakfast: finalData.dietPlan.breakfast || [],
      Lunch: finalData.dietPlan.lunch || [],
      Dinner: finalData.dietPlan.dinner || [],
      Do: finalData.dietPlan.do || [],
      DontDo: finalData.dietPlan.dontdo || [],
      Yoga: finalData.workoutPlan.yoga || [],
      Exercize: finalData.workoutPlan.exercise || [],

      Note: finalData.workoutPlan.note || "",
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

  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-8 p-3" ref={contentRef}>
      <div className="bg-sidebar rounded-md border p-3">
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <Image src={logo} alt="logo" width={160} />
            <p className="text-center font-bold">
              This is Dr. Rajeev's Homeopathy Clinic, ranked #2 in India. To
              purchase your prescribed medicines, please visit:
              <a
                href={"https://www.drrajeevswellness.com/"}
                target="_blank"
                className="text-blue-500"
              >
                {" "}
                https://www.drrajeevswellness.com/
              </a>
            </p>
          </div>

          <p className="text-2xl font-bold">Personal Information</p>

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
          <form className="space-y-6">
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
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                      size="sm"
                    >
                      <XIcon />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    ml: "",
                    dose: "",
                    frequency: "",
                    quantity: "",
                  })
                }
                variant="default"
                className="printer"
              >
                <PlusIcon /> Add Medicine
              </Button>
            </div>

            {/* Medicine section with reponsove  end here*/}

            <p className="text-muted-foreground text-[1.5rem] font-bold">
              Diet
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="Breakfast"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Breakfast</FormLabel>
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
                name="Lunch"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Lunch</FormLabel>
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
                name="Dinner"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Dinner</FormLabel>
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
                name="Do"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Do</FormLabel>
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
                name="DontDo"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Don't Do</FormLabel>
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
            </div>

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
