"use server";
import { OpenAI } from "@/hooks/openAI";
import { Conversation, PrescitopnTypes } from "@/lib/conversations";
import { prisma } from "@/lib/prisma";
import { safeParsePrescriptionAction } from "@/lib/utils";
import {
  FinalPresciptionValues,
  generateQuationSchema,
  GenerateQuationValues,
} from "@/lib/vallidaion";

export async function generateDeasesQuations(
  input: GenerateQuationValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ error?: string; result?: any }> {
  try {
    const {
      papatientName,
      age,
      gender,
      primary_complaint,
      duration_of_problem,
      id,

      Patient_Number,
      DOB,
      Ai_Check_Up_Date,
      caseidId,
      pmsId,
      refrenshby,
      patientAddress,
      patientEmial
    } = generateQuationSchema.parse(input);

    const result = await prisma.prisciption.create({
      data: {
        apptId: id,
        papatientName,
        age,
        gender,
        primary_complaint,
        duration_of_problem,

        Patient_Number,
        DOB,
        Ai_Check_Up_Date,
        caseidId,
        pmsId,
        refrenshby,
        patientAddress,
        patientEmial
      },
      select: {
        id: true,
        apptId: true,
        papatientName: true,
        age: true,
        gender: true,
        primary_complaint: true,
        duration_of_problem: true,
        createdAt: true,
        Patient_Number: true,
        DOB: true,
        Ai_Check_Up_Date: true,
        caseidId: true,

        pmsId: true,
        refrenshby: true,
        patientAddress: true,
        patientEmial:true
      },
    });

    return { result };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}

export async function conversationWithAI(conversation: {
  patientId?: string;
  message?: Conversation[];

  values?: FinalPresciptionValues;
}) {
  const { message, patientId, values } = conversation;

  if (message) {
    const formattedMessages = message
      .map(
        (msg) => `${msg.role === "user" ? "Patient" : "Doctor"}: ${msg.text}`,
      )
      .join("\n");

    const PriscitonsResult = await OpenAI.getChatCompletions(
      process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME!,
      [
        {
          role: "system",
          content: `
You are a homeopathic doctor.

The conversation below is a **voice-to-text transcript** between the AI doctor (Dr. Mridula) and the patient. It is in Hinglish and includes natural speech patterns like "uh-huh", "haan", "hmm", and incomplete sentences.

Your task is to **understand and cleanly interpret** this voice-style conversation and return a structured **JSON object** only (no markdown, no \`\`\`, no extra text).

🧠 "Theek hai, kripya apna pura problem detail mein bataiye — jo bhi takleef ho sab share kijiye."  es wala question or eska answer tumko qa me dalna hi dalna hai smje. 
🧠 sara kuch simple Hinglish me summary or qa hona chhiaye smje.
🧠 tumko pura conversation jo ${formattedMessages} esme aa rha hai pura dalna hai qa me smje
🧠  Agar multiple bimariyon ka zikr ho (jaise "fever aur vomiting"), toh pehle pehli bimari ka Q&A complete karo, fir uske baad doosri bimari ka Q&A likho — dono ko mix mat karo.

Format strictly like this:
//json//{
  summary: string,
  qa: [
    { question: string, answer: string }
  ],
  symptoms: string[],
  diagnosis: string[],
  medicines: [
    { name: string,ml: string, dose: string, frequency: string,quantity : string }
  ],
  dietPlan: {
    breakfast: string[],
    lunch: string[],
    dinner: string[],
    do: string[]
    dontdo: string[]
  },
  workoutPlan: {
    yoga: string[],
    exercise: string[]
    note: string
  }
}

🟡 Instructions:
- In the **summary**, convert the full conversation into simple English — from start ("Namaste...") to end ("Thank you...") in a fluent and factual way. Don’t add or assume anything.
- In **qa**, clearly format every exchange as a question and answer. If the patient says “uh-huh” or “hmm”, interpret it appropriately (e.g., "Haan", "Nahi") based on the context.
- Extract **all symptoms** mentioned directly or indirectly.
- Add possible **diagnosis** based on symptoms.
- Recommend suitable **homeopathic medicines** with dose and frequency.
- Create a simple **diet plan** (breakfast, lunch, dinner) and include helpful dietary tips.
- Include a short **morning workout** and helpful health note.

⚠️ Don’t include markdown, explanations, or any extra formatting. Return clean and valid JSON only.
`.trim(),
        },
        {
          role: "user",
          content: formattedMessages,
        },
      ],
    );

    const presciptionGenerate = PriscitonsResult.choices[0].message?.content;

    const res = await prisma.prisciption.update({
      where: {
        id: patientId,
      },
      data: {
        presciption: presciptionGenerate,
      },
    });
    return res;
  }

  if (values) {
    const prescitonData = await prisma.prisciption.findUnique({
      where: { id: values.id },
      select: { presciption: true },
    });

    const rawPrescription: any = prescitonData?.presciption;

    // Parse with fallback fix for unquoted keys
    const oldPrescription: PrescitopnTypes =
      safeParsePrescriptionAction(rawPrescription);

    // ✅ Merge with new values (only override if exists in values)
    const newPrescription: Partial<PrescitopnTypes> = {};

    if ("Symptoms" in values) newPrescription.symptoms = values.Symptoms;
    if ("Diagnosis" in values) newPrescription.diagnosis = values.Diagnosis;
    if ("Medicines" in values) newPrescription.medicines = values.Medicines;

    newPrescription.dietPlan = {
      ...oldPrescription.dietPlan,
      ...(values.Breakfast && { breakfast: values.Breakfast }),
      ...(values.Lunch && { lunch: values.Lunch }),
      ...(values.Dinner && { dinner: values.Dinner }),
      ...(values.Do && { do: values.Do }),
      ...(values.DontDo && { dontdo: values.DontDo }),
    };

    newPrescription.workoutPlan = {
      ...oldPrescription.workoutPlan,
      ...(values.Yoga && { yoga: values.Yoga }),
      ...(values.Exercize && { exercise: values.Exercize }),
      ...(values.Note && { note: values.Note }),
    };

    // ✅ Merge final updated object
    const mergedPrescription: PrescitopnTypes = {
      ...oldPrescription,
      ...newPrescription,
    };

    const res = await prisma.prisciption.update({
      where: { id: values.id },
      data: {
        presciption: JSON.stringify(mergedPrescription),
      },
    });

    return res;
  }
}
