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
  link: requiredString,
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
  LabReportFor: z.array(z.string().optional()).optional(),

  XRayTest: z.array(z.string()).optional(),
  FluroContrastStudies: z.array(z.string()).optional(),
  UltrasoundTest: z.array(z.string()).optional(),
  USDopplerStudy: z.array(z.string()).optional(),
  CTScanTest: z.array(z.string()).optional(),
  MRItest: z.array(z.string()).optional(),
  NuclearMedicineTest: z.array(z.string()).optional(),

  //brod test
  GeneralFeverPanel: z.array(z.string()).optional(),
  SkinAllergyPanel: z.array(z.string()).optional(),
  EntRespiratoryPanel: z.array(z.string()).optional(),
  GastroLiverPanel: z.array(z.string()).optional(),
  NeuroPsychPanel: z.array(z.string()).optional(),
  OrthoRheumaPanel: z.array(z.string()).optional(),

  GynecologyHormonalDisorders: z.array(z.string()).optional(),
  ThyroidEndocrinology: z.array(z.string()).optional(),
  DiabetesMetabolic: z.array(z.string()).optional(),
  UrologyKidneyProstate: z.array(z.string()).optional(),
  PediatricsAutismADHD: z.array(z.string()).optional(),
  ReproductiveSexualHealth: z.array(z.string()).optional(),
  Cardiology: z.array(z.string()).optional(),

  OncologyTumorScreening: z.array(z.string()).optional(),
  PreOperativeFullBodyCheck: z.array(z.string()).optional(),

  GeneralOncology: z.array(z.string()).optional(),
  BreastCancer: z.array(z.string()).optional(),
  OvarianCancer: z.array(z.string()).optional(),
  CervicalUterineCancer: z.array(z.string()).optional(),
  ProstateCancer: z.array(z.string()).optional(),
  LiverCancer: z.array(z.string()).optional(),
  PancreaticCancer: z.array(z.string()).optional(),
  ColorectalCancer: z.array(z.string()).optional(),
  LungCancer: z.array(z.string()).optional(),
  TesticularCancer: z.array(z.string()).optional(),
});

export type FinalPresciptionValues = z.infer<typeof finalPresciptionSchema>;

export const createFeedBackSchema = z.object({
  content: requiredString,
});
