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
  symptoms: {
    name: string;
  }[];
  diagnosis: {
    name: string;
  }[];
  medicines: {
    name: string;
    dose: string;
    day: string;
  }[];
  dietPlan: {
    sunday: DietDay;
    monday: DietDay;
    tuesday: DietDay;
    wednesday: DietDay;
    thursday: DietDay;
    friday: DietDay;
    saturday: DietDay;
  };
  workoutPlan: {
    yoga: {
      name: string;
    }[];
    exercise: {
      name: string;
    }[];
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
  wallnessProduct: {
    name: string;
  }[];
  specialnotes: {
    note: {
      name: string;
    }[];
    do: {
      name: string;
    }[];
    dontdo: {
      name: string;
    }[];
  };
  labreportFor: string[];
  attachments:[]
}

interface DietDay {
  breakfast: {
    name: string;
  }[];
  lunch: {
    name: string;
  }[];
  dinner: {
    name: string;
  }[];
}

export interface detaForCove {
  id: string;
  apptId: string;
  papatientName: string;
  primary_complaint: string[];
  duration_of_problem: string;
  age: string;
  gender: string;
}
