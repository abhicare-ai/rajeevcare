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
import { Heart, Printer } from "lucide-react";
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
    },
  });

  const values = form.getValues();

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
          doctorData.list_complaints_in_order_of_priority || [],
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
        <DialogHeader className="hidden space-y-6">
          <DialogTitle className="text-center font-bold">Form Data</DialogTitle>
        </DialogHeader>
        <div className="space-y-5 rounded-md border p-4" ref={section16Ref}>
          <h1 className="mb-4 text-center text-xl font-bold">
            Case History Data
          </h1>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 1. General Information
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Patient Name:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.atientFullName}
                  </span>
                </li>
                <li>
                  Age:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.age}
                  </span>
                </li>
                <li>
                  Gender:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.gender}
                  </span>
                </li>
                <li>
                  Marital Status:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.marital_Status}
                  </span>
                </li>
                <li>
                  Address:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.address}
                  </span>
                </li>
                <li>
                  Contact Number:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.contact_Number}
                  </span>
                </li>
                <li>
                  Occupation:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.occupation}
                  </span>
                </li>
                <li>
                  Date of Case Taking:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.date_of_Case_Taking}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 2. Chief Complaints
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  List complaints in order of priority:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.list_complaints_in_order_of_priority}
                  </span>
                </li>
                <li>
                  Onset (When did it start?):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.when_did_it_start}
                  </span>
                </li>
                <li>
                  Duration (How long has it persisted?):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.how_long_has_it_persisted}
                  </span>
                </li>
                <li>
                  Progression (Improving / worsening / unchanged?):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.progression}
                  </span>
                </li>
                <li>
                  Sequence (Which symptom came first?):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.sequence}
                  </span>
                </li>
                <li>
                  Associated symptoms:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.associated_symptoms}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 3. Modalities (Aggravation &
                Amelioration)
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  What increases the problem?{" "}
                  <span className="font-semibold text-blue-600">
                    {values.what_increases_the_problem}
                  </span>
                </li>
                <li>
                  Time (morning, evening, night):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.time}
                  </span>
                </li>
                <li>
                  Position (standing, lying down, walking, etc.):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Position}
                  </span>
                </li>
                <li>
                  Emotions, weather, stress, food, exertion:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Emotions}
                  </span>
                </li>
                <li>
                  What relieves the symptoms?{" "}
                  <span className="font-semibold text-blue-600">
                    {values.What}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 4. Mind Symptoms (Mental State &
                Personality)
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Temperament (angry, anxious, calm, irritable, sensitive):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Temperament}
                  </span>
                </li>
                <li>
                  Fears (darkness, disease, height, death, etc.):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Fears}
                  </span>
                </li>
                <li>
                  Anxiety / Depression / Irritability:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Anxiety}
                  </span>
                </li>
                <li>
                  Confidence / Communication style:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Confidence}
                  </span>
                </li>
                <li>
                  Social behavior with family, society, crowds:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Social}
                  </span>
                </li>
                <li>
                  Dreams (falling, running, flying, frightening, recurring):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Dreams}
                  </span>
                </li>
                <li>
                  Past emotional trauma, grief, insult:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Past}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 5. Physical Generals
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Appetite (normal, low, increased):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Appetite}
                  </span>
                </li>
                <li>
                  Thirst (quantity, frequency, type of water):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Thirst}
                  </span>
                </li>
                <li>
                  Food cravings:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Food_Cravings}
                  </span>
                </li>
                <li>
                  Food aversions:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Food_Aversions}
                  </span>
                </li>
                <li>
                  Sweat (amount, area, odor, staining):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Sweat}
                  </span>
                </li>
                <li>
                  Sleep (quality, position, talking, refreshed or not):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Sleep}
                  </span>
                </li>
                <li>
                  Stool (frequency, color, consistency, ease of passing):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Stool}
                  </span>
                </li>
                <li>
                  Urine (frequency, color, burning, urgency):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Urine}
                  </span>
                </li>
                <li>
                  Thermal reaction (feels hot or chilly generally):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Thermal_Reaction}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 6. Particular Symptoms
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Specific organ/system affected:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Specific_Organ_or_System}
                  </span>
                </li>
                <li>
                  Type of pain or sensation (burning, cramping, dull, shooting,
                  etc.):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Type_of_Pain_or_Sensation}
                  </span>
                </li>
                <li>
                  Timing and frequency:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Timing_and_Frequency}
                  </span>
                </li>
                <li>
                  Factors influencing the complaint (posture, weather, motion,
                  rest):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Influencing_Factors}
                  </span>
                </li>
                <li>
                  Any visible swelling, discharge, deformity:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Visible_Swelling_or_Discharge}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 7. Concomitant Symptoms
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  What other symptoms accompany the chief complaint? (e.g.,
                  nausea with headache, anxiety with palpitations):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Accompanying_Symptoms}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 8. Causation (Trigger Factors)
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  What triggered the disease/complaint?:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Trigger_Factors}
                  </span>
                </li>
                <li>
                  Physical trauma:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Physical_Trauma}
                  </span>
                </li>
                <li>
                  Emotional shock, grief, insult:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Emotional_Shock}
                  </span>
                </li>
                <li>
                  Exposure to cold/heat:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Environmental_Exposure}
                  </span>
                </li>
                <li>
                  Diet, change of place or climate:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Diet_or_Climate_Change}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 9. Thermal Reaction (Sensitivity to
                Temperature)
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Do you feel hotter or colder than others?:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Temperature_Sensitivity}
                  </span>
                </li>
                <li>
                  Preference for fan, blanket, air-conditioning, or warm
                  clothes:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Comfort_Preferences}
                  </span>
                </li>
                <li>
                  Reaction to seasons (summer, winter, rainy):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Seasonal_Reaction}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 10. Past Medical History
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Childhood diseases (measles, mumps, etc.):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Childhood_Diseases}
                  </span>
                </li>
                <li>
                  Previous major illnesses (typhoid, TB, dengue, etc.):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Previous_Illnesses}
                  </span>
                </li>
                <li>
                  Accidents, surgeries, hospitalizations:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Accidents_or_Surgeries}
                  </span>
                </li>
                <li>
                  History of long-term medication use:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Long_Term_Medications}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 11. Family History
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Illnesses in parents, grandparents, or siblings: Diabetes,
                  hypertension, cancer, asthma, mental illness, skin diseases,
                  thyroid disorders, etc.:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Hereditary_Illnesses}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 12. Menstrual / Sexual History (if
                applicable)
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Age at first menses:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Age_at_First_Menses}
                  </span>
                </li>
                <li>
                  Menstrual cycle – regular or irregular?:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Menstrual_Cycle}
                  </span>
                </li>
                <li>
                  Painful? Heavy? Scanty?:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Menstrual_Pain_or_Flow}
                  </span>
                </li>
                <li>
                  Leucorrhoea – color, nature, odor:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Leucorrhoea}
                  </span>
                </li>
                <li>
                  Sexual history – libido, marital life, fertility status:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Sexual_History}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 13. Personal History
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Diet: Vegetarian / Non-vegetarian:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Diet}
                  </span>
                </li>
                <li>
                  Addictions: Smoking, alcohol, tobacco, etc.:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Addictions}
                  </span>
                </li>
                <li>
                  Daily routine: Meals, sleep, work, rest:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Daily_Routine}
                  </span>
                </li>
                <li>
                  Exercise / Yoga / Physical activity:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Physical_Activity}
                  </span>
                </li>
                <li>
                  Sleep habits and environment:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Sleep_Habits}
                  </span>
                </li>
                <li>
                  Known allergies or skin issues:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Allergies}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 14. Physician’s Observation
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Patient’s physical appearance and build:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Physical_Appearance}
                  </span>
                </li>
                <li>
                  Posture and gait:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Posture_and_Gait}
                  </span>
                </li>
                <li>
                  Facial expression and eye contact:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Facial_Expression}
                  </span>
                </li>
                <li>
                  Speech (clear, slow, fast, emotional):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Speech}
                  </span>
                </li>
                <li>
                  Behavior and body language during interview:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Behavior}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 15. Clinical Diagnosis & Reports
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Available investigation reports: CBC, USG, X-ray, MRI, etc.:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Investigation_Reports}
                  </span>
                </li>
                <li>
                  Current or past diagnoses (allopathic or otherwise):{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Current_or_Past_Diagnoses}
                  </span>
                </li>
                <li>
                  Current medications being taken regularly:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Current_Medications}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex items-center gap-1 font-semibold">
                <Heart fill="#FF0000" /> 16. Totality of Symptoms & Remedy
                Selection
              </h3>
              <ul className="list-inside list-disc space-y-1">
                <li>
                  Summary of Mind + Physical Generals + Particulars + PQRS
                  symptoms:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Summary_of_Symptoms}
                  </span>
                </li>
                <li>
                  Remedy prescribed with reasoning:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Remedy_Prescribed}
                  </span>
                </li>
                <li>
                  Name of remedy:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Name_of_remedy}
                  </span>
                </li>
                <li>
                  Potency:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Potency}
                  </span>
                </li>
                <li>
                  Repetition schedule:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Repetition_Schedule}
                  </span>
                </li>
                <li>
                  Follow-up instructions and next visit plan:{" "}
                  <span className="font-semibold text-blue-600">
                    {values.Follow_Up_Instructions}
                  </span>
                </li>
              </ul>
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
