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
  caseidId:requiredString
});

export type GenerateQuationValues = z.infer<typeof generateQuationSchema>;

const medicineSchema = z.object({
  name: requiredString,
  ml: requiredString,
  dose: requiredString,
  frequency: requiredString,
  quantity: requiredString,
});

export const finalPresciptionSchema = z.object({
  id: requiredString,
  Symptoms: z.array(z.string()).nonempty("Please at least one symptoms name "),
  Diagnosis: z
    .array(z.string())
    .nonempty("Please at least one diagnosis name "),
  Medicines: z.array(medicineSchema).min(1, "Add at least one medicine"),

  Breakfast: z.array(z.string()).nonempty("Please at least one  diet paln "),
  Lunch: z.array(z.string()).nonempty("Please at least one  diet paln "),
  Dinner: z.array(z.string()).nonempty("Please at least one  diet paln "),
  Do: z.array(z.string()).nonempty("Please at least one do diet paln "),
  DontDo: z.array(z.string()).nonempty("Please at least one don't diet paln "),
  Yoga: z.array(z.string()).nonempty("Please at least one  yoga  "),
  Exercize: z.array(z.string()).nonempty("Please at least one  exercise  "),
  Note: z.string().trim(),
});

export type FinalPresciptionValues = z.infer<typeof finalPresciptionSchema>;

export const createFeedBackSchema = z.object({
  content: requiredString,
});
