"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { doctorSchema, DoctorValues } from "@/lib/vallidaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { Printer } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";

interface CaseHistoryFormPrintProps {
  open: boolean;
  onclose: () => void;
  doctorData: any;
  id: string;
}

export default function CaseHistoryFormPrint({
  open,
  onclose,
  doctorData,
  id,
}: CaseHistoryFormPrintProps) {
  function handleDialogClose() {
    onclose();
  }

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
  const onSubmit = () => {};

  const section16Ref = useRef<HTMLDivElement>(null);
  const handlePrintSection16 = useReactToPrint({
    contentRef: section16Ref,
  });
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className={`h-[500px] overflow-auto md:!max-w-[900px]`}>
        <DialogHeader className="space-y-6 hidden">
          <DialogTitle className="text-center font-bold">Form Data</DialogTitle>
        </DialogHeader>
        <div className="rounded-md border" ref={section16Ref}>
          <h1 className="text-center font-bold text-lg">Form Data</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="printable-table border">
                <h3 className="bg-primary p-3 font-bold">
                  General Information
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Patient Name</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Age</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Gender</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Marital Status</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Address</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Contact Number</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Occupation</h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Date Of Case Taking</h3>
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
                  </div>
                </div>
              </div>
              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">Chief Complaints</h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      List complaints in order of priority
                    </h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Onset: When did it start?
                    </h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Duration: How long has it persisted?
                    </h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Progression: Improving / worsening / unchanged?
                    </h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Sequence: Which symptom came first?
                    </h3>
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
                  </div>

                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Associated symptoms?</h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Modalities (Aggravation & Amelioration)
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* What increases the problem? */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      What increases the problem?
                    </h3>
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
                  </div>

                  {/* Time */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Time (morning, evening, night)
                    </h3>
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
                  </div>

                  {/* Position */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Position (standing, lying down, walking, etc.)
                    </h3>
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
                  </div>

                  {/* Emotions, weather, stress, food, exertion */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Emotions, weather, stress, food, exertion
                    </h3>
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
                  </div>

                  {/* What relieves the symptoms? */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      What relieves the symptoms?
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Mind Symptoms (Mental State & Personality)
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Temperament */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Temperament (angry, anxious, calm, irritable, sensitive)
                    </h3>
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
                  </div>

                  {/* Fears */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Fears (darkness, disease, height, death, etc.)
                    </h3>
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
                  </div>

                  {/* Anxiety / Depression / Irritability */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Anxiety / Depression / Irritability
                    </h3>
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
                  </div>

                  {/* Confidence / Communication style */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Confidence / Communication style
                    </h3>
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
                  </div>

                  {/* Social behavior */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Social behavior with family, society, crowds
                    </h3>
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
                  </div>

                  {/* Dreams */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Dreams (falling, running, flying, frightening, recurring)
                    </h3>
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
                  </div>

                  {/* Past emotional trauma */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Past emotional trauma, grief, insult
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">Physical Generals</h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Appetite */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Appetite (normal, low, increased)
                    </h3>
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
                  </div>

                  {/* Thirst */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Thirst (quantity, frequency, type of water)
                    </h3>
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
                  </div>

                  {/* Food Cravings */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Food cravings</h3>
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
                  </div>

                  {/* Food Aversions */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Food aversions</h3>
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
                  </div>

                  {/* Sweat */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Sweat (amount, area, odor, staining)
                    </h3>
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
                  </div>

                  {/* Sleep */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Sleep (quality, position, talking, refreshed or not)
                    </h3>
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
                  </div>

                  {/* Stool */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Stool (frequency, color, consistency, ease of passing)
                    </h3>
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
                  </div>

                  {/* Urine */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Urine (frequency, color, burning, urgency)
                    </h3>
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
                  </div>

                  {/* Thermal Reaction */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Thermal reaction (feels hot or chilly generally)
                    </h3>
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
                  </div>

                  {/* Print Button */}
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Particular Symptoms
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Specific organ/system affected */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Specific organ/system affected
                    </h3>
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
                  </div>

                  {/* Type of pain or sensation */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Type of pain or sensation (burning, cramping, dull,
                      shooting, etc.)
                    </h3>
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
                  </div>

                  {/* Timing and frequency */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Timing and frequency</h3>
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
                  </div>

                  {/* Factors influencing the complaint */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Factors influencing the complaint (posture, weather,
                      motion, rest)
                    </h3>
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
                  </div>

                  {/* Any visible swelling, discharge, deformity */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Any visible swelling, discharge, deformity
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Concomitant Symptoms
                </h3>
                <div className="grid grid-cols-1 gap-4 p-2">
                  {/* Accompanying Symptoms */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      What other symptoms accompany the chief complaint? (e.g.,
                      nausea with headache, anxiety with palpitations)
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Causation (Trigger Factors)
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* What triggered the disease/complaint */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      What triggered the disease/complaint?
                    </h3>
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
                  </div>

                  {/* Physical trauma */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Physical trauma</h3>
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
                  </div>

                  {/* Emotional shock, grief, insult */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Emotional shock, grief, insult
                    </h3>
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
                  </div>

                  {/* Exposure to cold/heat */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Exposure to cold/heat
                    </h3>
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
                  </div>

                  {/* Diet, change of place or climate */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Diet, change of place or climate
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Thermal Reaction (Sensitivity to Temperature)
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Do you feel hotter or colder than others? */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Do you feel hotter or colder than others?
                    </h3>
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
                  </div>

                  {/* Preference for fan, blanket, air-conditioning, or warm clothes */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Preference for fan, blanket, air-conditioning, or warm
                      clothes
                    </h3>
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
                  </div>

                  {/* Reaction to seasons (summer, winter, rainy) */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Reaction to seasons (summer, winter, rainy)
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Past Medical History
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Childhood diseases */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Childhood diseases (measles, mumps, etc.)
                    </h3>
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
                  </div>

                  {/* Previous major illnesses */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Previous major illnesses (typhoid, TB, dengue, etc.)
                    </h3>
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
                  </div>

                  {/* Accidents, surgeries, hospitalizations */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Accidents, surgeries, hospitalizations
                    </h3>
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
                  </div>

                  {/* History of long-term medication use */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      History of long-term medication use
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">Family History</h3>
                <div className="grid grid-cols-1 gap-4 p-2">
                  {/* Hereditary Illnesses */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Illnesses in parents, grandparents, or siblings: Diabetes,
                      hypertension, cancer, asthma, mental illness, skin
                      diseases, thyroid disorders, etc.
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Menstrual / Sexual History (if applicable)
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Age at first menses */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Age at first menses</h3>
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
                  </div>

                  {/* Menstrual cycle */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Menstrual cycle – regular or irregular?
                    </h3>
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
                  </div>

                  {/* Painful / Heavy / Scanty */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Painful? Heavy? Scanty?
                    </h3>
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
                  </div>

                  {/* Leucorrhoea */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Leucorrhoea – color, nature, odor
                    </h3>
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
                  </div>

                  {/* Sexual history */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Sexual history – libido, marital life, fertility status
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">Personal History</h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Diet */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Diet: Vegetarian / Non-vegetarian
                    </h3>
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
                  </div>

                  {/* Addictions */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Addictions: Smoking, alcohol, tobacco, etc.
                    </h3>
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
                  </div>

                  {/* Daily routine */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Daily routine: Meals, sleep, work, rest
                    </h3>
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
                  </div>

                  {/* Exercise / Physical activity */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Exercise / Yoga / Physical activity
                    </h3>
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
                  </div>

                  {/* Sleep habits */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Sleep habits and environment
                    </h3>
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
                  </div>

                  {/* Allergies */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Known allergies or skin issues
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Physician’s Observation
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Physical Appearance */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Patient’s physical appearance and build
                    </h3>
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
                  </div>

                  {/* Posture and Gait */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Posture and gait</h3>
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
                  </div>

                  {/* Facial Expression */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Facial expression and eye contact
                    </h3>
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
                  </div>

                  {/* Speech */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Speech (clear, slow, fast, emotional)
                    </h3>
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
                  </div>

                  {/* Behavior */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Behavior and body language during interview
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Clinical Diagnosis & Reports
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Investigation Reports */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Available investigation reports: CBC, USG, X-ray, MRI,
                      etc.
                    </h3>
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
                  </div>

                  {/* Current or Past Diagnoses */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Current or past diagnoses (allopathic or otherwise)
                    </h3>
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
                  </div>

                  {/* Current Medications */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Current medications being taken regularly
                    </h3>
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
                  </div>
                </div>
              </div>

              <div className="printable-table mt-5 border">
                <h3 className="bg-primary p-3 font-bold">
                  Totality of Symptoms & Remedy Selection
                </h3>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {/* Summary of Symptoms */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Summary of Mind + Physical Generals + Particulars + PQRS
                      symptoms
                    </h3>
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
                  </div>

                  {/* Remedy Prescribed */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Remedy prescribed with reasoning
                    </h3>
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
                  </div>

                  {/* Name of Remedy */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Name of remedy</h3>
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
                  </div>

                  {/* Potency */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Potency</h3>
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
                  </div>

                  {/* Repetition Schedule */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">Repetition schedule</h3>
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
                  </div>

                  {/* Follow-Up Instructions */}
                  <div className="space-y-2 border p-2">
                    <h3 className="border-b font-bold">
                      Follow-up instructions and next visit plan
                    </h3>
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
                  </div>
                </div>
              </div>

              {/* Print Button */}
              <Table className="printer">
                <TableHeader className="bg-sidebar">
                  <TableRow>
                    <TableHead className="text-left">Print</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button
                        className="w-fit"
                        type="button"
                        onClick={handlePrintSection16}
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
      </DialogContent>
    </Dialog>
  );
}
