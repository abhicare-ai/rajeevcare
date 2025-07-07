interface Conversation {
  id: string; // Unique ID for react rendering and loggin purposes
  role: string; // "user" or "assistant"
  text: string; // User or assistant message
  timestamp: string; // ISO string for message time
  isFinal: boolean; // Whether the transcription is final
  status?: "speaking" | "processing" | "final"; // Status for real-time conversation states
}

export type { Conversation };

export interface PrescitopnTypes {
  summary: string;
  qa: {
    question: string;
    answer: string;
  }[];
  symptoms: string[];
  diagnosis: string[];
  medicines: {
    name: string;
    ml: string;
    dose: string;
    frequency: string;
    quantity: string;
  }[];
  dietPlan: {
    sunday: DayDietPlan;
    monday: DayDietPlan;
    tuesday: DayDietPlan;
    wednesday: DayDietPlan;
    thursday: DayDietPlan;
    friday: DayDietPlan;
    saturday: DayDietPlan;
  };
  workoutPlan: {
    yoga: string[];
    exercise: string[];
    note: string;
  };
  blooTest: {
    name: string;
  }[];
  rediologyTest: {
    name: string;
  }[];
  urintest: {
    name: string;
  }[];
}

interface DayDietPlan {
  breakfast: { name: string }[];
  lunch: { name: string }[];
  dinner: { name: string }[];
  do: { name: string }[];
  dontdo: { name: string }[];
}

export interface detaForCove {
  id: string;
  papatientName: string;
  primary_complaint: string[];
  duration_of_problem: string;
  age: string;
  gender: string;
}
