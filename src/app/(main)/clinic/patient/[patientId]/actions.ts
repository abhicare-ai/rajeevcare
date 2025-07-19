"use server";
import { validateRequest } from "@/authSlice";
import { OpenAI } from "@/hooks/openAI";
import { generateAvatarUri } from "@/lib/avatar";
import { Conversation, PrescitopnTypes } from "@/lib/conversations";
import { prisma } from "@/lib/prisma";
import { streamVidio } from "@/lib/stream-vidio";
import { safeParsePrescriptionAction } from "@/lib/utils";
import {
  FinalPresciptionValues,
  generateQuationSchema,
  GenerateQuationValues,
} from "@/lib/vallidaion";
import { vectorStore } from "@/lib/vectorStore";
import { StreamClient } from "@stream-io/node-sdk";

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

      mediaIds,
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

        attachments: {
          connect: mediaIds?.map((id) => ({ id })),
        },
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
        presciption: true,
        attachments: true,
      },
    });
    // 🔥 Generate full page content for embedding
    const pageContent = `
Patient Name: ${result.papatientName}
Age/Gender: ${result.age} / ${result.gender}
Primary Complaint: ${result.primary_complaint.join(", ")}
Duration of Problem: ${result.duration_of_problem}
Weight: ${result.patientWeight}
BP: ${result.bp}
Diet: ${result.patinetDiet}
Address: ${result.patientAddress}
DOB: ${result.DOB}
Checkup Date: ${result.Ai_Check_Up_Date}
Lab Reports: ${result.attachments.map((a) => a.imgText).join(", ")}
Lab Reports For: ${result.attachments.map((a) => a.labReportFor).join(", ")}
Ai Q/A And Presciptions: ${result.presciption}
`.trim();

    const metadata = {
      apptId: result.apptId,
      patientId: result.id,
      source: "AI_Prescription",
      date: result.createdAt.toISOString(),
    };
    try {
      await vectorStore.addDocuments([{ pageContent, metadata }], {
        ids: [result.id],
      });

      console.log("✅ Document added to Pinecone");
    } catch (e) {
      console.error("❌ Pinecone Error:", e);
    }
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
    include: {
      attachments: true,
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
  qa: [{ question: string, answer: string }],
  symptoms: [
    {
      name: string,
    },
  ],
  diagnosis: [
    {
      name: string,
    },
  ],
  medicines: [
    {
      name: string,
      dose: string,
      day: string,
    },
  ],
  dietPlan: {
    sunday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
    monday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
    tuesday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
    wednesday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
    thursday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
    friday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
    saturday: {
      breakfast: [{ name: string }],
      lunch: [{ name: string }],
      dinner: [{ name: string }],
    },
  },
  workoutPlan: {
    yoga: [
      {
        name: string,
      },
    ],
    exercise: [
      {
        name: string,
      },
    ],
  },
  blooTest: [
    {
      name: string,
    },
  ],
  rediologyTest: [
    {
      name: string,
    },
  ],
  urintest: [
    {
      name: string,
    },
  ],
  wallnessProduct: [
    {
      name: string,
    },
  ],
  specialnotes: {
    note: [
      {
        name: string,
      },
    ],
    do: [
      {
        name: string,
      },
    ],
    dontdo: [
      {
        name: string,
      },
    ],
  },
  labreportFor:string[]
};


🟡 Instructions:
- In the **summary**, convert the full conversation into simple English — from start ("Namaste...") to end ("Thank you...") in a fluent and factual way. Don’t add or assume anything.
- In **qa**, clearly format every exchange as a question and answer. If the patient says “uh-huh” or “hmm”, interpret it appropriately (e.g., "Haan", "Nahi") based on the context.
- Extract **all symptoms** mentioned directly or indirectly.
- Add possible **diagnosis** based on symptoms.
- Recommend suitable **homeopathic medicines** with dose and frequency.
- Create a simple **diet plan** (breakfast, lunch, dinner) and include helpful dietary tips.
- Include a short **morning workout** and helpful health note.
- labreportFor ${findProsciptionData?.primary_complaint} labReportFor me ye dal do.

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

    const result = await prisma.prisciption.update({
      where: {
        id: patientId,
      },
      data: {
        presciption: presciptionGenerate,
      },
      include: {
        attachments: true,
      },
    });

    // 🔥 Generate full page content for embedding
    const UpdatedpageContent = `
Patient Name: ${result.papatientName}
Age/Gender: ${result.age} / ${result.gender}
Primary Complaint: ${result.primary_complaint.join(", ")}
Duration of Problem: ${result.duration_of_problem}
Weight: ${result.patientWeight}
BP: ${result.bp}
Diet: ${result.patinetDiet}
Address: ${result.patientAddress}
DOB: ${result.DOB}
Checkup Date: ${result.Ai_Check_Up_Date}
Lab Reports: ${result.attachments.map((a) => a.imgText).join(", ")}
Lab Reports For: ${result.attachments.map((a) => a.labReportFor).join(", ")}
Ai Q/A And Presciptions: ${result.presciption}
`.trim();

    const Updatedmetadata = {
      apptId: result.apptId,
      patientId: result.id,
      source: "AI_Prescription",
      date: result.createdAt.toISOString(),
    };
    try {
      await vectorStore.addDocuments(
        [{ pageContent: UpdatedpageContent, metadata: Updatedmetadata }],
        {
          ids: [result.id],
        },
      );

      console.log("✅ Document added to Pinecone");
    } catch (e) {
      console.error("❌ Pinecone Error:", e);
    }
    return result;
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
    if ("WorkoutPlan" in values)
      newPrescription.workoutPlan = values.WorkoutPlan;
    if ("WallnessProduct" in values)
      newPrescription.wallnessProduct = values.WallnessProduct;
    if ("Specialnotes" in values)
      newPrescription.specialnotes = values.Specialnotes;

    newPrescription.labreportFor = {
      ...oldPrescription.labreportFor,
    };

    // ✅ Merge final updated object
    const mergedPrescription: PrescitopnTypes = {
      ...oldPrescription,
      ...newPrescription,
    };

    const result = await prisma.prisciption.update({
      where: { id: values.id },
      data: {
        presciption: JSON.stringify(mergedPrescription),
      },
      include: {
        attachments: true,
      },
    });

    // 🔥 Generate full page content for embedding
    const UpdatedpageContent = `
Patient Name: ${result.papatientName}
Age/Gender: ${result.age} / ${result.gender}
Primary Complaint: ${result.primary_complaint.join(", ")}
Duration of Problem: ${result.duration_of_problem}
Weight: ${result.patientWeight}
BP: ${result.bp}
Diet: ${result.patinetDiet}
Address: ${result.patientAddress}
DOB: ${result.DOB}
Checkup Date: ${result.Ai_Check_Up_Date}
Lab Reports: ${result.attachments.map((a) => a.imgText).join(", ")}
Lab Reports For: ${result.attachments.map((a) => a.labReportFor).join(", ")}
Ai Q/A And Presciptions: ${result.presciption}
`.trim();

    const updatedMetadata = {
      apptId: result.apptId,
      patientId: result.id,
      source: "AI_Prescription",
      date: result.createdAt.toISOString(),
    };
    try {
      await vectorStore.addDocuments(
        [{ pageContent: UpdatedpageContent, metadata: updatedMetadata }],
        {
          ids: [result.id],
        },
      );

      console.log("✅ Document added to Pinecone");
    } catch (e) {
      console.error("❌ Pinecone Error:", e);
    }

    return result;
  }
}

export const getToken = async () => {
  const apiKey = process.env.NEXT_PUBLIC_STREM_KEY!;
  const apiSecret = process.env.NEXT_PUBLIC_STREM_SECRET!;
  const { user } = await validateRequest();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const streamClient = new StreamClient(apiKey, apiSecret);

  const now = Math.floor(Date.now() / 1000);
  const expirationTime = now + 60 * 60;

  const payload = {
    user_id: user.id,
    role: "user", // ✅ VERY IMPORTANT
    exp: expirationTime,
    iat: now,
  };

  const token = streamClient.createToken(
    payload.user_id,
    payload.exp,
    payload.iat,
  );
  return token;
};
