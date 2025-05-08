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
import { Input } from "@/components/ui/input";
import {
  finalPresciptionSchema,
  FinalPresciptionValues,
} from "@/lib/vallidaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, Printer, XIcon } from "lucide-react";

import { useFieldArray, useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import { useRef, useTransition } from "react";
import { conversationWithAI } from "../../actions";
import { PrescitopnTypes } from "@/lib/conversations";
import { toast } from "sonner";

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
      Breakfast: finalData.dietPlan.breakfast || [],
      Lunch: finalData.dietPlan.lunch || [],
      Dinner: finalData.dietPlan.dinner || [],
      Extras: finalData.dietPlan.extras || [],
      Morning: finalData.workoutPlan.morning || "",
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

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  return (
    <div className="space-y-8 p-3" ref={contentRef}>
      <div className="bg-sidebar rounded-md border p-3">
        <div className="space-y-6">
          <p className="text-2xl font-bold">Personal Information</p>
          <div className="flex items-center gap-5">
            <div className="bg-secondary text-muted-foreground flex h-[45px] w-[45px] items-center justify-center rounded-full border font-bold uppercase">
              {prescitonData?.papatientName[0]}
            </div>
            <div>
              <p className="uppercase">{prescitonData?.papatientName}</p>
              <div className="flex gap-1">
                <p className="uppercase">{prescitonData?.gender}</p> , {"  "}
                <p className="uppercase">{prescitonData?.age}</p>
              </div>
              <p>Patinet ID :- ahh123</p>
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

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-end space-x-4">
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
                          <Input {...field} placeholder="e.g. Paracetamol" />
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
                          <Input {...field} placeholder="e.g. 500mg" />
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
                          <Input {...field} placeholder="e.g. 2 times a day" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    variant="destructive"
                    className="printer"
                  >
                    <XIcon />
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                onClick={() => append({ name: "", dose: "", frequency: "" })}
                variant="default"
                className="printer"
              >
                <PlusIcon /> Add Medicine
              </Button>
            </div>

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
                name="Extras"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Extras</FormLabel>
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
                name="Morning"
                render={({ field }) => (
                  <FormItem className="!w-full space-y-2">
                    <FormLabel className="font-bold">Morning</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="printer grid grid-cols-1 gap-4 md:grid-cols-2">
              <LoadingButton
                loading={ispending}
                className="w-full"
                type="submit"
                disabled={!isDirty}
              >
                {isDirty ? "Update" : "Submit"}
              </LoadingButton>
              <Button
                onClick={reactToPrintFn}
                type="button"
                disabled={ispending}
              >
                <Printer /> Print
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
