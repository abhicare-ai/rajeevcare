"use server";
import { OpenAI } from "@/hooks/openAI";
import { Conversation, PrescitopnTypes } from "@/lib/conversations";
import { prisma } from "@/lib/prisma";
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
    } = generateQuationSchema.parse(input);

    const result = await prisma.prisciption.create({
      data: {
        apptId: id,
        papatientName,
        age,
        gender,
        primary_complaint,
        duration_of_problem,
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
You are a homeopathic doctor. Speak in simple English so that the patient can understand clearly. You will provide only homeopathic treatments.

Based on the conversation below, summarize the conversation and return a **JSON** object with the following structure:

{
  summary: string,
  qa: [
    { question: string, answer: string }
  ],
  symptoms: string[],
  diagnosis: string[],
  medicines: [
    { name: string, dose: string, frequency: string }
  ],
  dietPlan: {
    breakfast: string[],
    lunch: string[],
    dinner: string[],
    extras: string[]
  },
  workoutPlan: {
    morning: string,
    note: string
  }
}

You must:
- Convert the conversation into **simple question-answer format**.
- Keep the language **simple, clear**, and **easy to understand**.
- If the message from the patient includes symptoms, convert them into **symptoms list** and include all symptoms mentioned in the conversation.
- If the diagnosis is clear, mention it in the **diagnosis list**.
- Include **medicines** with name, dose, and frequency for treatment.
- Suggest **diet plans** for breakfast, lunch, and dinner.
- Include **morning workout plans** and general notes.

For example:
- If the patient says, "I have a sore throat, fever, and body aches for the last 3 days," 
  then generate:
    - Question: "What symptoms are you facing?"
    - Answer: "I have a sore throat, fever, and body aches for 3 days."

- If the patient says, "I feel weak, tired, and have headaches," then:
    - Question: "Do you have any other symptoms?"
    - Answer: "I feel weak, tired, and have headaches."

- **Important**: The **complete symptom list** should include everything the patient has mentioned in their responses, even if it's in different messages or at different points in the conversation.

Keep everything **concise**, **structured**, and **focused on the treatment**.

Do not use unnecessary technical details. Just focus on what is needed to create a **homeopathic treatment plan**.
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

    const rawPrescription = prescitonData?.presciption;

    // Parse with fallback fix for unquoted keys
    const oldPrescription: PrescitopnTypes = rawPrescription
      ? JSON.parse(rawPrescription.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":'))
      : {
          summary: "N/A",
          qa: [],
          symptoms: [],
          diagnosis: [],
          medicines: [],
          dietPlan: {
            breakfast: [],
            lunch: [],
            dinner: [],
            extras: [],
          },
          workoutPlan: {
            morning: "",
            note: "",
          },
        };

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
      ...(values.Extras && { extras: values.Extras }),
    };

    newPrescription.workoutPlan = {
      ...oldPrescription.workoutPlan,
      ...(values.Morning && { morning: values.Morning }),
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
