import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const loginSchema = z.object({
  email: requiredString.email("Invalid email"),
  branch: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createAppointmentSchema = z.object({
  phoneNumber: requiredString,
  patientName: requiredString,
  gendar: requiredString,
  patientDOB: z.date({
    required_error: "Required",
  }),
  appointmentDate: z.date({
    required_error: "Required",
  }),
  consultationFees: requiredString,
  pmsId: requiredString,
  refrenshby: requiredString,
  patientAddress: requiredString,
  patientEmial: requiredString.email("Invalid email"),
  patientWeight: requiredString,
  patinetDiet: requiredString,

  bp: requiredString,
});

export type CreateAppointmentSchemaValues = z.infer<
  typeof createAppointmentSchema
>;

export const generateQuationSchema = z.object({
  primary_complaint: z
    .array(z.string())
    .nonempty("Please at least one disease name "),
  duration_of_problem: requiredString,
  age: requiredString,
  gender: requiredString,
  id: requiredString,
  papatientName: requiredString,
  Patient_Number: requiredString,
  DOB: requiredString,
  Ai_Check_Up_Date: requiredString,
  caseidId: z.number(),

  pmsId: requiredString,
  refrenshby: requiredString,
  patientAddress: requiredString,
  patientEmial: requiredString.email("Invalid email"),
  patientWeight: requiredString,
  patinetDiet: requiredString,
  branch: requiredString,

  bp: requiredString,
  mediaIds: z
    .array(z.string())
    .max(5, "Cannot have more than 5 lab reports")
    .optional(),
});

export type GenerateQuationValues = z.infer<typeof generateQuationSchema>;

const medicineSchema = z.object({
  name: requiredString,
  dose: requiredString,
  day: requiredString,
});

const mealItemSchema = z.object({
  name: requiredString,
});

const dayPlanSchema = z.object({
  breakfast: z.array(mealItemSchema).min(1, "Add at least one breakfast item"),
  lunch: z.array(mealItemSchema).min(1, "Add at least one lunch item"),
  dinner: z.array(mealItemSchema).min(1, "Add at least one dinner item"),
 
});

export const dietPlanSchema = z.object({
  sunday: dayPlanSchema,
  monday: dayPlanSchema,
  tuesday: dayPlanSchema,
  wednesday: dayPlanSchema,
  thursday: dayPlanSchema,
  friday: dayPlanSchema,
  saturday: dayPlanSchema,
});

export const bloodTest = z.object({
  name: z.string().trim(),
});
export const rediologyTest = z.object({
  name: z.string().trim(),
});
export const urintestTest = z.object({
  name: z.string().trim(),
});
const symptoms = z.object({
  name: requiredString,
});
const diagnosis = z.object({
  name: requiredString,
});

const wallnessProduct = z.object({
  name: requiredString,
});
const namedArray = z.array(z.object({ name: requiredString }));

const workoutPlanSchema = z.object({
  yoga: namedArray.nonempty("Please add at least one yoga"),
  exercise: namedArray.nonempty("Please add at least one exercise"),
});

const specialNotesSchema = z.object({
  note: namedArray.nonempty("Please add at least one note"),
  do: namedArray.nonempty("Please add at least one do"),
  dontdo: namedArray.nonempty("Please add at least one don't do"),
});

export const finalPresciptionSchema = z.object({
  id: requiredString,
  Symptoms: z.array(symptoms).nonempty("Please at least one symptoms name "),
  Diagnosis: z.array(diagnosis).nonempty("Please at least one diagnosis name "),
  Medicines: z.array(medicineSchema).min(1, "Add at least one medicine"),
  DietPlan: dietPlanSchema,
  WorkoutPlan: workoutPlanSchema,

  WallnessProduct: z
    .array(wallnessProduct)
    .nonempty("Please at least one  wallness Product"),
  Specialnotes: specialNotesSchema,
  BloodTest: z.array(bloodTest).optional(),
  RediologyTest: z.array(rediologyTest).optional(),
  UrineTest: z.array(urintestTest).optional(),
  LabReportFor: z.array(z.string().optional()).optional()
});

export type FinalPresciptionValues = z.infer<typeof finalPresciptionSchema>;

export const createFeedBackSchema = z.object({
  content: requiredString,
});
