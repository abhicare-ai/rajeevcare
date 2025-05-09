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
  qa: { question: string; answer: string }[];
  symptoms: string[];
  diagnosis: string[];
  medicines: {
    name: string;
    dose: string;
    frequency: string;
  }[];
  dietPlan: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    extras: string[];
  };
  workoutPlan: {
    morning: string;
    note: string;
  };
}

export interface detaForCove {
  id:string
  papatientName : string;
  primary_complaint :string[];
  duration_of_problem :string;
  age :string;
  gender :string;
}
