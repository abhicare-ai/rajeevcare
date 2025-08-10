import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { PrescitopnTypes } from "./conversations";
import JSON5 from "json5";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateAge = (dobInput?: string | Date): string => {
  if (!dobInput) return "";

  const dob = new Date(dobInput);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age.toString();
};

export function formatDate(dateInput: string | Date): string {
  try {
    return format(new Date(dateInput), "d/M/yyyy"); // eg: 5 May 2025
  } catch {
    return ""; // fallback in case of invalid date
  }
}

export function formatTime(timeInput: string | Date): string {
  try {
    return format(new Date(timeInput), "h:mm a");
    // Example output: "6:00 AM"
  } catch {
    return "";
  }
}

export function safeParsePrescription(raw: string | null): any | null {
  if (!raw || typeof raw !== "string") return null;

  try {
    // Clean the string
    const cleaned = raw.trim().replace(/^\/\/json\/\/\s*/, "");

    // Try parsing with JSON5 (handles unquoted keys, comments, trailing commas, etc.)
    const parsed = JSON5.parse(cleaned);

    // Ensure it's a valid object
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("Parsed JSON is not an object");
    }

    return parsed;
  } catch (err: any) {
    console.error("❌ Prescription JSON parsing failed:", err.message);
    return {
      summary: "Unable to parse prescription data due to format issue.",
      error: true,
    };
  }
}

// Utility function to safely parse the prescription JSON
export function safeParsePrescriptionAction(
  raw: string | null,
): PrescitopnTypes {
  if (!raw || typeof raw !== "string") return getEmptyPrescription();

  try {
    const cleaned = raw.trim().replace(/^\/\/json\/\/\s*/, "");
    const parsed = JSON5.parse(cleaned); // Use JSON5 instead of JSON
    if (typeof parsed !== "object" || parsed === null)
      throw new Error("Invalid object");

    return parsed as PrescitopnTypes;
  } catch (err: any) {
    console.error("❌ Prescription JSON parsing failed:", err.message);
    return getEmptyPrescription();
  }
}

function getEmptyPrescription(): PrescitopnTypes {
  const emptyDietDay = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  return {
    summary: "N/A",
    qa: [],
    symptoms: [],
    diagnosis: [],
    medicines: [],
    dietPlan: {
      sunday: { ...emptyDietDay },
      monday: { ...emptyDietDay },
      tuesday: { ...emptyDietDay },
      wednesday: { ...emptyDietDay },
      thursday: { ...emptyDietDay },
      friday: { ...emptyDietDay },
      saturday: { ...emptyDietDay },
    },
    workoutPlan: {
      yoga: [],
      exercise: [],
    },

    wallnessProduct: [],
    specialnotes: {
      note: [],
      do: [],
      dontdo: [],
    },
    labreportFor: [],
    attachments: [],

    XRayTest: [],
    FluroContrastStudies: [],
    UltrasoundTest: [],
    USDopplerStudy: [],
    CTScanTest: [],
    MRItest: [],
    NuclearMedicineTest: [],

    GeneralFeverPanel: [],
    SkinAllergyPanel: [],
    EntRespiratoryPanel: [],
    GastroLiverPanel: [],
    NeuroPsychPanel: [],
    OrthoRheumaPanel: [],

    GynecologyHormonalDisorders: [],
    ThyroidEndocrinology: [],
    DiabetesMetabolic: [],
    UrologyKidneyProstate: [],
    PediatricsAutismADHD: [],
    ReproductiveSexualHealth: [],
    Cardiology: [],
    OncologyTumorScreening: [],
    PreOperativeFullBodyCheck: [],
    GeneralOncology: [],
    BreastCancer: [],
    OvarianCancer: [],
    CervicalUterineCancer: [],

    ProstateCancer: [],
    LiverCancer: [],
    PancreaticCancer: [],
    ColorectalCancer: [],
    LungCancer: [],
    TesticularCancer: [],
    urineTest: [],
  };
}
