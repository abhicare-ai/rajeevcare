"use server";
import { OpenAI } from "@/hooks/openAI";
import { PrescitopnTypes } from "@/lib/conversations";
import { prisma } from "@/lib/prisma";
import { safeParsePrescriptionAction } from "@/lib/utils";
import {
  doctorSchema,
  DoctorValues,
  FinalPresciptionValues,
} from "@/lib/vallidaion";
import axios from "axios";

export async function doctor(conversation: {
  input?: DoctorValues;

  values?: FinalPresciptionValues;
}) {
  const { input, values } = conversation;
  console.log("input", input);
  console.log("value", values);

  if (input) {
    const {
      address,
      age,
      atientFullName,
      contact_Number,
      date_of_Case_Taking,
      gender,
      id,
      marital_Status,
      occupation,
      //2
      list_complaints_in_order_of_priority,
      when_did_it_start,
      how_long_has_it_persisted,
      progression,
      sequence,
      associated_symptoms,

      //3
      what_increases_the_problem,
      time,
      Position,
      Emotions,
      What,

      //4
      Temperament,
      Fears,
      Anxiety,
      Confidence,
      Social,
      Dreams,
      Past,

      // 5. Physical Generals
      Appetite,
      Thirst,
      Food_Cravings,
      Food_Aversions,
      Sweat,
      Sleep,
      Stool,
      Urine,
      Thermal_Reaction,

      // 6. Particular Symptoms
      Specific_Organ_or_System,
      Type_of_Pain_or_Sensation,
      Timing_and_Frequency,
      Influencing_Factors,
      Visible_Swelling_or_Discharge,

      // 7. Concomitant Symptoms
      Accompanying_Symptoms,

      // 8. Causation (Trigger Factors)
      Trigger_Factors,
      Physical_Trauma,
      Emotional_Shock,
      Environmental_Exposure,
      Diet_or_Climate_Change,

      // 9. Thermal Reaction
      Temperature_Sensitivity,
      Comfort_Preferences,
      Seasonal_Reaction,

      // 10. Past Medical History
      Childhood_Diseases,
      Previous_Illnesses,
      Accidents_or_Surgeries,
      Long_Term_Medications,

      // 11. Family History
      Hereditary_Illnesses,

      // 12. Menstrual / Sexual History
      Age_at_First_Menses,
      Menstrual_Cycle,
      Menstrual_Pain_or_Flow,
      Leucorrhoea,
      Sexual_History,

      // 13. Personal History
      Diet,
      Addictions,
      Daily_Routine,
      Physical_Activity,
      Sleep_Habits,
      Allergies,

      // 14. Physician’s Observation
      Physical_Appearance,
      Posture_and_Gait,
      Facial_Expression,
      Speech,
      Behavior,

      // 15. Clinical Diagnosis & Reports
      Investigation_Reports,
      Current_or_Past_Diagnoses,
      Current_Medications,

      // 16. Totality of Symptoms & Remedy Selection
      Summary_of_Symptoms,
      Remedy_Prescribed,
      Name_of_remedy,

      Potency,
      Repetition_Schedule,
      Follow_Up_Instructions,

      papatientName,
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
    } = doctorSchema.parse(input);

    const result = await prisma.doctor.create({
      data: {
        prisciptionId: id,
        address,
        age,
        atientFullName,
        contact_Number,
        date_of_Case_Taking,
        gender,
        marital_Status,
        occupation,
        //2
        list_complaints_in_order_of_priority: {
          set: list_complaints_in_order_of_priority,
        },
        when_did_it_start,
        how_long_has_it_persisted,
        progression,
        sequence,
        associated_symptoms,

        //3
        what_increases_the_problem,
        time,
        Position,
        Emotions,
        What,

        //4
        Temperament,
        Fears,
        Anxiety,
        Confidence,
        Social,
        Dreams,
        Past,

        // 5. Physical Generals
        Appetite,
        Thirst,
        Food_Cravings,
        Food_Aversions,
        Sweat,
        Sleep,
        Stool,
        Urine,
        Thermal_Reaction,

        // 6. Particular Symptoms
        Specific_Organ_or_System,
        Type_of_Pain_or_Sensation,
        Timing_and_Frequency,
        Influencing_Factors,
        Visible_Swelling_or_Discharge,

        // 7. Concomitant Symptoms
        Accompanying_Symptoms,

        // 8. Causation (Trigger Factors)
        Trigger_Factors,
        Physical_Trauma,
        Emotional_Shock,
        Environmental_Exposure,
        Diet_or_Climate_Change,

        // 9. Thermal Reaction
        Temperature_Sensitivity,
        Comfort_Preferences,
        Seasonal_Reaction,

        // 10. Past Medical History
        Childhood_Diseases,
        Previous_Illnesses,
        Accidents_or_Surgeries,
        Long_Term_Medications,

        // 11. Family History
        Hereditary_Illnesses,

        // 12. Menstrual / Sexual History
        Age_at_First_Menses,
        Menstrual_Cycle,
        Menstrual_Pain_or_Flow,
        Leucorrhoea,
        Sexual_History,

        // 13. Personal History
        Diet,
        Addictions,
        Daily_Routine,
        Physical_Activity,
        Sleep_Habits,
        Allergies,

        // 14. Physician’s Observation
        Physical_Appearance,
        Posture_and_Gait,
        Facial_Expression,
        Speech,
        Behavior,

        // 15. Clinical Diagnosis & Reports
        Investigation_Reports,
        Current_or_Past_Diagnoses,
        Current_Medications,

        // 16. Totality of Symptoms & Remedy Selection
        Summary_of_Symptoms,
        Remedy_Prescribed,
        Name_of_remedy,

        Potency,
        Repetition_Schedule,
        Follow_Up_Instructions,

        papatientName,
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
    });

    const { data } = await axios.post("http://localhost:3000/api/wallness", {
      diseaseName: JSON.stringify(
        list_complaints_in_order_of_priority.join(", "),
      ),
    });
    const wellnessProductsJson = JSON.stringify(data.products);
    console.log("wellnessProductsJson", wellnessProductsJson);

    const formattedMessages = JSON.stringify(result);

    const PriscitonsResult = await OpenAI.getChatCompletions(
      process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME!,
      [
        {
          role: "system",
          content: `
You are a homeopathic doctor.

tumko eske throw ${formattedMessages} prisciption genretae krna hai 



🧠 IMPORTANT: 
- wellness priducts me name or link dono hona chahiye.
- ${wellnessProductsJson} wellness product ka name or link esme se ${wellnessProductsJson} aa rha hai apne se mat kuch wallness prodcut me dalana smja n 
❌ ${wellnessProductsJson} agar ye null ya empty array hai to wellness product ko blank hi rakhna. 
  


A) X-Ray
    1) Chest P A
    2) P N S
    3) Pelvic
    4) Cervical Spine AP & LAT
    5) Lumbar Spine AP & LAT
    6) Knee (Right & Left) AP & LAT
    7) Tomography (OPG)

B) Fluro Contrast Studies
    1) Hysterosalpingogram (HSG)
    2) Barium Swallow
    3) Barium Follow Through
    4) Small Bowel Enema
    5) IVP

C) Ultrasound  
    1) Whole Abdomen  
    2) Upper Abdomen  
    3) K U B  
    4) Kidney  
    5) Neck  
    6) Thyroid  
    7) Breast  
    8) Musculoskeletal Ultrasound - Shoulder  
    9) Musculoskeletal Ultrasound - Elbow  
    10) Musculoskeletal Ultrasound - Wrist  
    11) Musculoskeletal Ultrasound - Hip  
    12) Musculoskeletal Ultrasound - Knee  
    13) Musculoskeletal Ultrasound - Ankle  
    14) Musculoskeletal Ultrasound - Soft Tissue  
    15) Ultrasound IV Contrast Study

D) US Doppler Study  
    1) Both Carotid & Vertebral  
    2) Single Limb Arterial / Venous (Right/Left) (Upper / Lower)  
    3) Both Limb Arterial / Venous (Upper / Lower)  
    4) Scrotal  
    5) Renal  
    6) Transrectal  
    7) Penile  

 E) C.T. Scan  
    1) Brain  
    2) Chest  
    3) Upper Abdomen  
    4) Lower Abdomen  
    5) Whole Abdomen  
    6) Spine  
    7) P N S  
    8) Neck  
    9) KUB  
   10) Angio Neck Vessels  
   11) Angio Intracranial Vessels  
   12) Pulmonary Angio  
   13) Aortogram  
   14) Abdominal Angio  
   15) Peripheral Angio  
   
F) M.R.I.  
    1) Brain  
    2) M R I Spine  
    3) MRI Chest  
    4) MRI Angio  
    5) MRI Abdomen  
    6) M R C P  
    7) MRI Pelvis  
    8) M S K  
    9) MRI KUB  

G) Nuclear Medicine
    1) Thyroid Imaging (Tc-99m)
    2) Thyroid Uptake (I-131)
    3) I-131 Whole Body Scan
    4) Rest MUGA
    5) Bone Whole Body Scan
    6) (BULIDA) Hepato Biliary Scan
    7) Myocardial Perfusion Study (Rest Only)
    8) Myocardial Perfusion Study (Rest & Stress)
    9) GE Reflux
   10) Lung Perfusion Scan / Lung Ventilation Scan
   11) GI Bleeds / Meckel’s Diverticulum
   12) DMSA Scan
   13) Diuretic Renal Scan (DTPA)

H) General Fever Panel  
    1) CBC (Complete Blood Count)  
    2) ESR (Erythrocyte Sedimentation Rate)  
    3) CRP (C-Reactive Protein)  
    4) Widal Test  
    5) Dengue IgG/IgM  
    6) Malaria Antigen  
    7) Typhidot  
    8) Blood Culture  
    9) Procalcitonin (for sepsis) 

I) Skin Allergy Panel  
    1) IgE Total  
    2) CBC with Eosinophil count  
    3) ANA (Antinuclear Antibody – for autoimmune skin disorders)  
    4) Vitamin D, B12  
    5) Patch Test (for specific allergy)  
    6) Food Allergy Panel (IgG-based)  

J) ENT / Respiratory Panel  
    1) AEC (Absolute Eosinophil Count)  
    2) Total IgE  
    3) Chest X-ray  
    4) Nasal Swab Culture  
    5) COVID-19 RTPCR or Antibody  
    6) CRP  
    7) TB Gold or Mantoux Test  

K) Gastro Liver Panel
    1) LFT (Liver Function Test – SGOT, SGPT, Bilirubin, ALP)
    2) Amylase & Lipase (for pancreas)
    3) H. Pylori IgG / Stool Antigen
    4) Stool Routine & Culture
    5) Hepatitis B (HBsAg), Hepatitis C (HCV)
    6) PT-INR (Liver clotting function)
    7) Albumin, Globulin ratio

L) Neuro / Psych Panel
    1) Serum Electrolytes (Na, K, Ca, Mg)
    2) Vitamin B12 (for neuropathy)
    3) TSH (Hypothyroid-related depression/anxiety)
    4) Serum Cortisol (for stress/fatigue)
    5) EEG / MRI (as supportive, not blood test)
    6) Folic Acid
    7) HbA1c (for diabetic neuropathy)

M) Ortho / Rheuma / Joint Pain Panel
    1) RA Factor (Rheumatoid Arthritis)
    2) Anti-CCP
    3) CRP, ESR
    4) Uric Acid (Gout)
    5) HLA B27 (Ankylosing Spondylitis)
    6) ANA Profile (Lupus, SLE)
    7) Vitamin D, Calcium, PTH

N) Gynecology / Hormonal Disorders
     1) CBC
     2) TSH, FT3, FT4
     3) FSH, LH
     4) Prolactin
     5) AMH (Ovarian reserve)
     6) Progesterone / Estradiol
     7) HbA1c (if PCOD)
     8) USG Pelvis (non-blood but essential) 

O) Thyroid & Endocrinology
     1) T3, T4, TSH
     2) Anti-TPO (Autoimmune thyroiditis)
     3) Vitamin D, Calcium
     4) Fasting & PP Blood Sugar
     5) HbA1c
     6) Lipid Profile
     7) Insulin (Fasting/C-Peptide if required)

P) Diabetes & Metabolic
     1) FBS (Fasting Blood Sugar)
     2) PPBS (Postprandial Blood Sugar)
     3) HbA1c
     4) Insulin (fasting or post meal)
     5) Lipid Profile
     6) Microalbuminuria
     7) Serum Creatinine, Urea (Kidney status)

Q) Urology / Kidney / Prostate
     1) KFT (Kidney Function Test – Urea, Creatinine)
     2) Urine Routine & Microscopy
     3) Urine Culture
     4) PSA (Prostate Specific Antigen)
     5) Microalbuminuria
     6) Sodium, Potassium
     7) Calcium, Uric Acid
     8) Cystatin C (Advanced kidney marker)
     
U) Pediatrics / Autism / ADHD
     1) Vitamin D
     2) Vitamin B12
     3) Serum Ferritin
     4) Lead, Mercury (Heavy Metal Test if regression)
     5) Thyroid Profile
     6) CBC + ESR
     7) EEG, MRI Brain (if seizures or delay)
     8) Stool for parasites (if GI complaints)

V) Reproductive / Sexual Health
     1) VDRL / TPHA (Syphilis)
     2) HIV I & II
     3) HBsAg
     4) HCV
     5) Semen Analysis
     6) FSH, LH, Testosterone (Male)
     7) Prolactin, Estradiol (Female)
     8) Urine Culture / Swab Culture

W) Cardiology (BP, Cholesterol, Heart Disease)
     1) Lipid Profile
     2) ECG (not blood but essential)
     3) Troponin I or T (For acute chest pain)
     4) CRP (hsCRP for inflammation risk)
     5) Homocysteine
     6) Blood Sugar & HbA1c
     7) TSH (Thyroid affects heart rhythm)

X)  Oncology / Tumor Screening (As per Symptoms)
      1) CBC 
      2) ESR 
      3) LDH 
      4) CA-125 (Ovary)
      5) PSA (Prostate)
      6) AFP (Liver) 
      7) CEA (Colon, Breast) 
      8) CA 19-9 (Pancreas)

Y)  Pre-Operative / Routine Full Body Check
      1) CBC
      2) Blood Group
      3) LFT + KFT
      4) RBS + HbA1c
      5) ECG + Chest X-ray
      6) HIV, HBsAg, HCV
      7) Urine R/M
      8) PT/INR

Z)  General Oncology
      1) CBC – Anemia, WBC ↑↓, Platelets ↓
      2) ESR / CRP – Inflammation markers
      3) LDH (Lactate Dehydrogenase) – Non-specific tumor activity
      4) Ferritin – Inflammation or malignancy
      5) β2-Microglobulin – Multiple myeloma, lymphoma

A1)  Breast Cancer
      1) CA 15-3 – Most common marker
      2) CEA (Carcinoembryonic Antigen) – Also used in colon & breast
      3) HER2/neu – Serum or tissue-based
      4) Estrogen / Progesterone Receptor (ER/PR) – Immunohistochemistry (IHC)
      5) BRCA1 & BRCA2 Gene Testing – For genetic predisposition

A2)  Ovarian Cancer
      1) CA 125 – Primary marker
      2) HE4 (Human Epididymis Protein 4)
      3) OVA1 Panel – Advanced test
      4) AFP – If germ cell tumor suspected
      5) CEA – If mucinous type

A3)  Cervical / Uterine Cancer
      1) SCC (Squamous Cell Carcinoma Antigen)
      2) CA 125 – If endometrial cancer suspected
      3) HPV DNA Typing – Not a blood test, but important
      4) CEA – If spread suspected

A4)  Prostate Cancer
      1) PSA (Total & Free)
      2) PAP (Prostatic Acid Phosphatase)
      3) PSA Density / Velocity
  
A5)  Liver Cancer
      1) AFP (Alpha-Fetoprotein)
      2) LFT (SGOT, SGPT, ALP, GGT, Bilirubin)
      3) CEA & CA 19-9
      4) Hepatitis B/C Testing

A6)  Pancreatic Cancer
      1) CA 19-9
      2) CEA
      3) Amylase/Lipase
      4) BRCA2 mutation

A7)  Colorectal Cancer
      1) CEA (Carcinoembryonic Antigen)
      2) CA 19-9
      3) FOBT (Stool occult blood)
      4) KRAS, NRAS mutation

A8)  Lung Cancer
      1) NSE (Neuron Specific Enolase)
      2) ProGRP (Pro-gastrin releasing peptide)
      3) CYFRA 21-1
      4) CEA 
      5) EGFR, ALK mutation

A9)  Testicular Cancer 
      1) AFP (Alpha-Fetoprotein)
      2) β-hCG (Beta Human Chorionic Gonadotropin)
      3) LDH
      4) Ultrasound

A10)  Urine Test
      1) Urine Routine & Microscopy (R/M)
      2) Urine Culture & Sensitivity (C/S)
      3) Urine Pregnancy Test (UPT)
      4) Urine Ketone Bodies
      5) Urine Sugar
      6) Urine Protein
      7) Urine pH
      8) Urine Specific Gravity
      9) Urine Microscopy


   ❌ Agar koi  test ki zarurat nahi hai to is section ko blank hi rakho

---



📌 Sirf wahi tests suggest kare jo symptoms se medically justified ho.  
Zarurat na ho to kuch bhi suggest na kare — section blank chhode.


❌  Do not add any extra text, explanations, or formatting.
   
Format strictly like this:
{
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
      link: string,
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
  labreportFor:string[],

  XRayTest: string[],
  FluroContrastStudies: string[],
  UltrasoundTest: string[],
  USDopplerStudy: string[],
  CTScanTest: string[],
  MRItest: string[],
  NuclearMedicineTest: string[],
  GeneralFeverPanel: string[],
  SkinAllergyPanel: string[],
  EntRespiratoryPanel: string[],
  GastroLiverPanel: string[],
  NeuroPsychPanel: string[],
  OrthoRheumaPanel: string[],

  GynecologyHormonalDisorders: string[],
  ThyroidEndocrinology: string[],
  DiabetesMetabolic: string[],
  UrologyKidneyProstate: string[],
  PediatricsAutismADHD: string[],
  ReproductiveSexualHealth: string[],
  Cardiology: string[],
  OncologyTumorScreening: string[],
  PreOperativeFullBodyCheck: string[],
  GeneralOncology: string[],
  BreastCancer: string[],
  OvarianCancer: string[],
  CervicalUterineCancer: string[],

   ProstateCancer: string[],
   LiverCancer: string[],
   PancreaticCancer: string[],
   ColorectalCancer: string[],
   LungCancer: string[],
   TesticularCancer: string[],
   urineTest: string[],
};


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

    console.log(presciptionGenerate);

    const resultd = await prisma.doctor.update({
      where: {
        id: result.id,
      },
      data: {
        presciption: presciptionGenerate,
      },
    });

    return resultd;
  }

  if (values) {
    console.log("values.id", values.id);

    const prescitonData = await prisma.doctor.findUnique({
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
    if ("XRayTest" in values) newPrescription.XRayTest = values.XRayTest;
    if ("FluroContrastStudies" in values)
      newPrescription.FluroContrastStudies = values.FluroContrastStudies;
    if ("UltrasoundTest" in values)
      newPrescription.UltrasoundTest = values.UltrasoundTest;
    if ("USDopplerStudy" in values)
      newPrescription.USDopplerStudy = values.USDopplerStudy;
    if ("CTScanTest" in values) newPrescription.CTScanTest = values.CTScanTest;
    if ("MRItest" in values) newPrescription.MRItest = values.MRItest;
    if ("NuclearMedicineTest" in values)
      newPrescription.NuclearMedicineTest = values.NuclearMedicineTest;
    if ("GeneralFeverPanel" in values)
      newPrescription.GeneralFeverPanel = values.GeneralFeverPanel;
    if ("SkinAllergyPanel" in values)
      newPrescription.SkinAllergyPanel = values.SkinAllergyPanel;
    if ("EntRespiratoryPanel" in values)
      newPrescription.EntRespiratoryPanel = values.EntRespiratoryPanel;
    if ("GastroLiverPanel" in values)
      newPrescription.GastroLiverPanel = values.GastroLiverPanel;
    if ("NeuroPsychPanel" in values)
      newPrescription.NeuroPsychPanel = values.NeuroPsychPanel;
    if ("OrthoRheumaPanel" in values)
      newPrescription.OrthoRheumaPanel = values.OrthoRheumaPanel;
    if ("GynecologyHormonalDisorders" in values)
      newPrescription.GynecologyHormonalDisorders =
        values.GynecologyHormonalDisorders;
    if ("ThyroidEndocrinology" in values)
      newPrescription.ThyroidEndocrinology = values.ThyroidEndocrinology;
    if ("DiabetesMetabolic" in values)
      newPrescription.DiabetesMetabolic = values.DiabetesMetabolic;
    if ("UrologyKidneyProstate" in values)
      newPrescription.UrologyKidneyProstate = values.UrologyKidneyProstate;
    if ("PediatricsAutismADHD" in values)
      newPrescription.PediatricsAutismADHD = values.PediatricsAutismADHD;
    if ("ReproductiveSexualHealth" in values)
      newPrescription.ReproductiveSexualHealth =
        values.ReproductiveSexualHealth;
    if ("Cardiology" in values) newPrescription.Cardiology = values.Cardiology;
    if ("OncologyTumorScreening" in values)
      newPrescription.OncologyTumorScreening = values.OncologyTumorScreening;
    if ("PreOperativeFullBodyCheck" in values)
      newPrescription.PreOperativeFullBodyCheck =
        values.PreOperativeFullBodyCheck;
    if ("GeneralOncology" in values)
      newPrescription.GeneralOncology = values.GeneralOncology;
    if ("BreastCancer" in values)
      newPrescription.BreastCancer = values.BreastCancer;
    if ("OvarianCancer" in values)
      newPrescription.OvarianCancer = values.OvarianCancer;
    if ("CervicalUterineCancer" in values)
      newPrescription.CervicalUterineCancer = values.CervicalUterineCancer;
    if ("ProstateCancer" in values)
      newPrescription.ProstateCancer = values.ProstateCancer;
    if ("LiverCancer" in values)
      newPrescription.LiverCancer = values.LiverCancer;
    if ("PancreaticCancer" in values)
      newPrescription.PancreaticCancer = values.PancreaticCancer;
    if ("ColorectalCancer" in values)
      newPrescription.ColorectalCancer = values.ColorectalCancer;
    if ("LungCancer" in values) newPrescription.LungCancer = values.LungCancer;
    if ("TesticularCancer" in values)
      newPrescription.TesticularCancer = values.TesticularCancer;
    if ("urineTest" in values) newPrescription.urineTest = values.urineTest;

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

    const result = await prisma.doctor.update({
      where: { id: values.id },
      data: {
        presciption: JSON.stringify(mergedPrescription),
      },
    });

    return result;
  }
}
