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
      patientEmial,
      patientWeight,
      patinetDiet,
      branch,
      bp,
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
        patientEmial,
        patientWeight,
        patinetDiet,
        branch,
        bp,
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
        patientEmial: true,
        patientWeight: true,
        patinetDiet: true,
        branch: true,
        bp: true,
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

  const findProsciptionData = await prisma.prisciption.findFirst({
    where: {
      id: patientId,
    },
  });

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
🧠 Agar patient ka diet "Vegetarian" hai, to sirf vegetarian food items ka hi diet plan generate hoga — non-vegetarian section blank rahega.

👨‍⚕️ Aur agar patient ka diet "Non-Vegetarian" hai, to sirf non-veg items ka diet plan banega — vegetarian section blank rahega.

Yeh diet patient ke preference ${findProsciptionData?.patinetDiet} ke basis par automatically decide hoga.


🧠 Patient ke conversation (${formattedMessages}) ke basis par AI ko ye decide karna hai ki:

1. **Blood Test**  
   Agar patient ke symptoms ya disease se lagta hai ki infection, thyroid, blood sugar, ya vitamin deficiency ho sakti hai, to AI khud se suggest kare:
   - CBC  
   - ESR  
   - Thyroid (T3, T4, TSH)  
   - FBS / PPBS  
   - CRP  
   - Vitamin D / B12  
   ✅ Agar zarurat ho to suggest kare  
   ❌ Agar nahi ho to blank chhode

2. **Urine Test**  
   Agar symptoms me urine infection, kidney problem ya burning urination type ki dikkat ho to suggest kare:
   - Urine Routine  
   - Urine Culture  
   ✅ Zarurat ho to suggest kare  
   ❌ Nahi ho to blank chhode

3. **Radiology Test**  
   Agar patient ke symptoms se lagta hai ki imaging ki zarurat hai (jaise chest pain, joint pain, swelling, back pain, etc.), tabhi neeche diye gaye **Radiology Test options** me se relevant tests suggest kare:

   ✅ Radiology Tests (select only from below image options):

X-RAY  
- Chest PA  
- PNS  
- Pelvic  
- Cervical Spine AP & LAT  
- Lumbar Spine AP & LAT  
- Knee (Right & Left) AP & LAT  
- PAN Tomography (OPG)  
- Others  

FLURO CONTRAST STUDIES  
- Hysterosalpingogram (HSG)  
- Barium Swallow  
- Barium Follow Through  
- Small Bowel Enema  

ULTRASOUND  
- Upper Abdomen  
- Lower Abdomen  
- Whole Abdomen  
- KUB  
- Neck  
- Thyroid  
- Breast  

Musculo Skeletal Ultrasound  
- Shoulder  
- Elbow  
- Knee  
- Hip  
- Ankle  
- Soft Tissue  
- Ultrasound by Contrast Study  
- Others  

DOPPLER STUDY  
- Both Carotid & Vertebral  
- Upper Limb Arterial / Venous (Right/Left)  
- Lower Limb Arterial / Venous (Upper / Lower)  
- Abdominal  
- Renal  
- Scrotal  
- Transrectal  
- Others  

C.T. SCAN (Plain / Contrast)  
- Brain  
- Chest  
- Upper Abdomen  
- Lower Abdomen  
- Whole Abdomen  
- Spine  
- PNS  
- Neck  
- KUB  
- Angio Neck Vessels  
- Angio Intracranial Vessels  
- Pulmonary Angio  
- Abdominal Angio  
- Peripheral Angio  
- Others  

MRI (Plain / Contrast)  
- R.L.  
- MRI Brain  
- MRI Spine  
- MRI Chest  
- MRI Angio  
- MRI Abdomen  
- MRI K C P  
- MRI Pelvis  
- M S K  
- MRI KUB  
- Others  

NUCLEAR MEDICINE  
- Thyroid Imaging (Tc99m)  
- Thyroid Uptake (I-131)  
- I-131 Whole Body Scan  
- Rest MUGA  
- Bone Whole Body Scan  
- (BULIDA) Hepato Biliary Scan  
- Myocardial Perfusion Study (Rest Only)  
- Myocardial Perfusion Study (Rest & Stress)  
- GE Reflux  
- Lung Perfusion Scan / Lung Ventilation Scan  
- L.E. / Bleeds / Meckel's Diverticulum  
- DMSA Scan  
- Diuretic Renal Scan (DTPA)  
- Others  

   ❌ Agar koi Radiology test ki zarurat nahi hai to is section ko blank hi rakhe

---

📌 Sirf wahi tests suggest kare jo symptoms se medically justified ho.  
Zarurat na ho to kuch bhi suggest na kare — section blank chhode.


Format strictly like this:
//json//{
  summary: string,
  qa: [
    { question: string, answer: string }
  ],
  symptoms: string[],
  diagnosis: string[],
  medicines: [
    {
      name: string,
      ml: string,
      dose: string,
      frequency: string,
      quantity: string
    }
  ],
  dietPlan: {
      sunday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      },
      monday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      },
      tuesday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      },
      wednesday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      },
      thursday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      },
      friday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      },
      saturday: {
        breakfast: [{ name: string }],
        lunch: [{ name: string }],
        dinner: [{ name: string }],
        do: [{ name: string }],
        dontdo: [{ name: string }]
      }
  },
  workoutPlan: {
    yoga: string[],
    exercise: string[],
    note: string
  },
 blooTest: {
    "name": string
  },
  rediologyTest: {
    "name": string
  },
  urintest: {
    "name": string
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
    if ("DietPlan" in values) newPrescription.dietPlan = values.DietPlan;
    if ("BloodTest" in values) newPrescription.blooTest = values.BloodTest;
    if ("RediologyTest" in values)
      newPrescription.rediologyTest = values.RediologyTest;
    if ("UrineTest" in values) newPrescription.urintest = values.UrineTest;

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
