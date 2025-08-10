"use server";
import { prisma } from "@/lib/prisma";
import { doctorSchema, DoctorValues } from "@/lib/vallidaion";

export async function doctor(
  input: DoctorValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ error?: string; result?: any }> {
  const {
    address,
    age,
    atientFullName,
    contact_Number,
    date_of_Case_Taking,
    gender,
    id,
    marital_Status,
    occupation,
    //2
    list_complaints_in_order_of_priority,
    when_did_it_start,
    how_long_has_it_persisted,
    progression,
    sequence,
    associated_symptoms,

    //3
    what_increases_the_problem,
    time,
    Position,
    Emotions,
    What,

    //4
    Temperament,
    Fears,
    Anxiety,
    Confidence,
    Social,
    Dreams,
    Past,

    // 5. Physical Generals
    Appetite,
    Thirst,
    Food_Cravings,
    Food_Aversions,
    Sweat,
    Sleep,
    Stool,
    Urine,
    Thermal_Reaction,

    // 6. Particular Symptoms
    Specific_Organ_or_System,
    Type_of_Pain_or_Sensation,
    Timing_and_Frequency,
    Influencing_Factors,
    Visible_Swelling_or_Discharge,

    // 7. Concomitant Symptoms
    Accompanying_Symptoms,

    // 8. Causation (Trigger Factors)
    Trigger_Factors,
    Physical_Trauma,
    Emotional_Shock,
    Environmental_Exposure,
    Diet_or_Climate_Change,

    // 9. Thermal Reaction
    Temperature_Sensitivity,
    Comfort_Preferences,
    Seasonal_Reaction,

    // 10. Past Medical History
    Childhood_Diseases,
    Previous_Illnesses,
    Accidents_or_Surgeries,
    Long_Term_Medications,

    // 11. Family History
    Hereditary_Illnesses,

    // 12. Menstrual / Sexual History
    Age_at_First_Menses,
    Menstrual_Cycle,
    Menstrual_Pain_or_Flow,
    Leucorrhoea,
    Sexual_History,

    // 13. Personal History
    Diet,
    Addictions,
    Daily_Routine,
    Physical_Activity,
    Sleep_Habits,
    Allergies,

    // 14. Physician’s Observation
    Physical_Appearance,
    Posture_and_Gait,
    Facial_Expression,
    Speech,
    Behavior,

    // 15. Clinical Diagnosis & Reports
    Investigation_Reports,
    Current_or_Past_Diagnoses,
    Current_Medications,

    // 16. Totality of Symptoms & Remedy Selection
    Summary_of_Symptoms,
    Remedy_Prescribed,
    Name_of_remedy,

    Potency,
    Repetition_Schedule,
    Follow_Up_Instructions,
  } = doctorSchema.parse(input);

  const result = await prisma.doctor.upsert({
    where: { prisciptionId: id },
    update: {
      address,
      age,
      atientFullName,
      contact_Number,
      date_of_Case_Taking,
      gender,
      marital_Status,
      occupation,
      //2
      list_complaints_in_order_of_priority,
      when_did_it_start,
      how_long_has_it_persisted,
      progression,
      sequence,
      associated_symptoms,

      //3
      what_increases_the_problem,
      time,
      Position,
      Emotions,
      What,

      //4
      Temperament,
      Fears,
      Anxiety,
      Confidence,
      Social,
      Dreams,
      Past,

      // 5. Physical Generals
      Appetite,
      Thirst,
      Food_Cravings,
      Food_Aversions,
      Sweat,
      Sleep,
      Stool,
      Urine,
      Thermal_Reaction,

      // 6. Particular Symptoms
      Specific_Organ_or_System,
      Type_of_Pain_or_Sensation,
      Timing_and_Frequency,
      Influencing_Factors,
      Visible_Swelling_or_Discharge,

      // 7. Concomitant Symptoms
      Accompanying_Symptoms,

      // 8. Causation (Trigger Factors)
      Trigger_Factors,
      Physical_Trauma,
      Emotional_Shock,
      Environmental_Exposure,
      Diet_or_Climate_Change,

      // 9. Thermal Reaction
      Temperature_Sensitivity,
      Comfort_Preferences,
      Seasonal_Reaction,

      // 10. Past Medical History
      Childhood_Diseases,
      Previous_Illnesses,
      Accidents_or_Surgeries,
      Long_Term_Medications,

      // 11. Family History
      Hereditary_Illnesses,

      // 12. Menstrual / Sexual History
      Age_at_First_Menses,
      Menstrual_Cycle,
      Menstrual_Pain_or_Flow,
      Leucorrhoea,
      Sexual_History,

      // 13. Personal History
      Diet,
      Addictions,
      Daily_Routine,
      Physical_Activity,
      Sleep_Habits,
      Allergies,

      // 14. Physician’s Observation
      Physical_Appearance,
      Posture_and_Gait,
      Facial_Expression,
      Speech,
      Behavior,

      // 15. Clinical Diagnosis & Reports
      Investigation_Reports,
      Current_or_Past_Diagnoses,
      Current_Medications,

      // 16. Totality of Symptoms & Remedy Selection
      Summary_of_Symptoms,
      Remedy_Prescribed,
      Name_of_remedy,

      Potency,
      Repetition_Schedule,
      Follow_Up_Instructions,
    },
    create: {
      prisciptionId: id,
      address,
      age,
      atientFullName,
      contact_Number,
      date_of_Case_Taking,
      gender,
      marital_Status,
      occupation,
      //2
      list_complaints_in_order_of_priority,
      when_did_it_start,
      how_long_has_it_persisted,
      progression,
      sequence,
      associated_symptoms,

      //3
      what_increases_the_problem,
      time,
      Position,
      Emotions,
      What,

      //4
      Temperament,
      Fears,
      Anxiety,
      Confidence,
      Social,
      Dreams,
      Past,

      // 5. Physical Generals
      Appetite,
      Thirst,
      Food_Cravings,
      Food_Aversions,
      Sweat,
      Sleep,
      Stool,
      Urine,
      Thermal_Reaction,

      // 6. Particular Symptoms
      Specific_Organ_or_System,
      Type_of_Pain_or_Sensation,
      Timing_and_Frequency,
      Influencing_Factors,
      Visible_Swelling_or_Discharge,

      // 7. Concomitant Symptoms
      Accompanying_Symptoms,

      // 8. Causation (Trigger Factors)
      Trigger_Factors,
      Physical_Trauma,
      Emotional_Shock,
      Environmental_Exposure,
      Diet_or_Climate_Change,

      // 9. Thermal Reaction
      Temperature_Sensitivity,
      Comfort_Preferences,
      Seasonal_Reaction,

      // 10. Past Medical History
      Childhood_Diseases,
      Previous_Illnesses,
      Accidents_or_Surgeries,
      Long_Term_Medications,

      // 11. Family History
      Hereditary_Illnesses,

      // 12. Menstrual / Sexual History
      Age_at_First_Menses,
      Menstrual_Cycle,
      Menstrual_Pain_or_Flow,
      Leucorrhoea,
      Sexual_History,

      // 13. Personal History
      Diet,
      Addictions,
      Daily_Routine,
      Physical_Activity,
      Sleep_Habits,
      Allergies,

      // 14. Physician’s Observation
      Physical_Appearance,
      Posture_and_Gait,
      Facial_Expression,
      Speech,
      Behavior,

      // 15. Clinical Diagnosis & Reports
      Investigation_Reports,
      Current_or_Past_Diagnoses,
      Current_Medications,

      // 16. Totality of Symptoms & Remedy Selection
      Summary_of_Symptoms,
      Remedy_Prescribed,
      Name_of_remedy,

      Potency,
      Repetition_Schedule,
      Follow_Up_Instructions,
    },
  });

  return {
    result,
  };
}
