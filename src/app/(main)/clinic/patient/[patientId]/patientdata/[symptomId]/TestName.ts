export type textTypes = {
  id: string;
  testname: string;
};

export const XRayTest: textTypes[] = [
  { id: "Chest P A", testname: "Chest P A" },
  { id: "P N S", testname: "P N S" },
  { id: "Pelvic", testname: "Pelvic" },
  { id: "Cervical Spine AP & LAT", testname: "Cervical Spine AP & LAT" },
  { id: "Lumbar Spine AP & LAT", testname: "Lumbar Spine AP & LAT" },
  {
    id: "Knee (Right & Left) AP & LAT",
    testname: "Knee (Right & Left) AP & LAT",
  },
  { id: "Tomography (OPG)", testname: "Tomography (OPG)" },
];

export const FluroContrastStudies: textTypes[] = [
  { id: "Hysterosalpingogram (HSG)", testname: "Hysterosalpingogram (HSG)" },
  { id: "Barium Swallow", testname: "Barium Swallow" },
  { id: "Barium Follow Through", testname: "Barium Follow Through" },
  { id: "Small Bowel Enema", testname: "Small Bowel Enema" },
  { id: "IVP", testname: "IVP" },
];

export const UltrasoundTest: textTypes[] = [
  { id: "Whole Abdomen", testname: "Whole Abdomen" },
  { id: "Upper Abdomen", testname: "Upper Abdomen" },
  { id: "K U B", testname: "K U B" },
  { id: "Kidney", testname: "Kidney" },
  { id: "Neck", testname: "Neck" },
  { id: "Thyroid", testname: "Thyroid" },
  { id: "Breast", testname: "Breast" },
  {
    id: "Musculoskeletal Ultrasound - Shoulder",
    testname: "Musculoskeletal Ultrasound - Shoulder",
  },
  {
    id: "Musculoskeletal Ultrasound - Elbow",
    testname: "Musculoskeletal Ultrasound - Elbow",
  },
  {
    id: "Musculoskeletal Ultrasound - Wrist",
    testname: "Musculoskeletal Ultrasound - Wrist",
  },
  {
    id: "Musculoskeletal Ultrasound - Hip",
    testname: "Musculoskeletal Ultrasound - Hip",
  },
  {
    id: "Musculoskeletal Ultrasound - Knee",
    testname: "Musculoskeletal Ultrasound - Knee",
  },
  {
    id: "Musculoskeletal Ultrasound - Ankle",
    testname: "Musculoskeletal Ultrasound - Ankle",
  },
  {
    id: "Musculoskeletal Ultrasound - Soft Tissue",
    testname: "Musculoskeletal Ultrasound - Soft Tissue",
  },
  {
    id: "Ultrasound IV Contrast Study",
    testname: "Ultrasound IV Contrast Study",
  },
];

export const USDopplerStudy: textTypes[] = [
  { id: "Both Carotid & Vertebral", testname: "Both Carotid & Vertebral" },
  {
    id: "Single Limb Arterial / Venous (Right/Left) (Upper / Lower)",
    testname: "Single Limb Arterial / Venous (Right/Left) (Upper / Lower)",
  },
  {
    id: "Both Limb Arterial / Venous (Upper / Lower)",
    testname: "Both Limb Arterial / Venous (Upper / Lower)",
  },
  { id: "Scrotal", testname: "Scrotal" },
  { id: "Renal", testname: "Renal" },
  { id: "Transrectal", testname: "Transrectal" },
  { id: "Penile", testname: "Penile" },
];

export const CTScanTest: textTypes[] = [
  { id: "Brain", testname: "Brain" },
  { id: "Chest", testname: "Chest" },
  { id: "Upper Abdomen", testname: "Upper Abdomen" },
  { id: "Lower Abdomen", testname: "Lower Abdomen" },
  { id: "Whole Abdomen", testname: "Whole Abdomen" },
  { id: "Spine", testname: "Spine" },
  { id: "P N S", testname: "P N S" },
  { id: "Neck", testname: "Neck" },
  { id: "KUB", testname: "KUB" },
  { id: "Angio Neck Vessels", testname: "Angio Neck Vessels" },
  { id: "Angio Intracranial Vessels", testname: "Angio Intracranial Vessels" },
  { id: "Pulmonary Angio", testname: "Pulmonary Angio" },
  { id: "Aortogram", testname: "Aortogram" },
  { id: "Abdominal Angio", testname: "Abdominal Angio" },
  { id: "Peripheral Angio", testname: "Peripheral Angio" },
];

export const MRItest: textTypes[] = [
  { id: "Brain", testname: "Brain" },
  { id: "M R I Spine", testname: "M R I Spine" },
  { id: "MRI Chest", testname: "MRI Chest" },
  { id: "MRI Angio", testname: "MRI Angio" },
  { id: "MRI Abdomen", testname: "MRI Abdomen" },
  { id: "M R C P", testname: "M R C P" },
  { id: "MRI Pelvis", testname: "MRI Pelvis" },
  { id: "M S K", testname: "M S K" },
  { id: "MRI KUB", testname: "MRI KUB" },
];

export const NuclearMedicineTest: textTypes[] = [
  { id: "Thyroid Imaging (Tc-99m)", testname: "Thyroid Imaging (Tc-99m)" },
  { id: "Thyroid Uptake (I-131)", testname: "Thyroid Uptake (I-131)" },
  { id: "I-131 Whole Body Scan", testname: "I-131 Whole Body Scan" },
  { id: "Rest MUGA", testname: "Rest MUGA" },
  { id: "Bone Whole Body Scan", testname: "Bone Whole Body Scan" },
  {
    id: "(BULIDA) Hepato Biliary Scan",
    testname: "(BULIDA) Hepato Biliary Scan",
  },
  {
    id: "Myocardial Perfusion Study (Rest Only)",
    testname: "Myocardial Perfusion Study (Rest Only)",
  },
  {
    id: "Myocardial Perfusion Study (Rest & Stress)",
    testname: "Myocardial Perfusion Study (Rest & Stress)",
  },
  { id: "GE Reflux", testname: "GE Reflux" },
  {
    id: "Lung Perfusion Scan / Lung Ventilation Scan",
    testname: "Lung Perfusion Scan / Lung Ventilation Scan",
  },
  {
    id: "GI Bleeds / Meckel’s Diverticulum",
    testname: "GI Bleeds / Meckel’s Diverticulum",
  },
  { id: "DMSA Scan", testname: "DMSA Scan" },
  { id: "Diuretic Renal Scan (DTPA)", testname: "Diuretic Renal Scan (DTPA)" },
  { id: "Others", testname: "Others" },
];

////blod test


export const GeneralFeverPanel: textTypes[] = [
  { id: "CBC (Complete Blood Count)", testname: "CBC (Complete Blood Count)" },
  { id: "ESR (Erythrocyte Sedimentation Rate)", testname: "ESR (Erythrocyte Sedimentation Rate)" },
  { id: "CRP (C-Reactive Protein)", testname: "CRP (C-Reactive Protein)" },
  { id: "Widal Test", testname: "Widal Test" },
  { id: "Dengue IgG/IgM", testname: "Dengue IgG/IgM" },
  { id: "Malaria Antigen", testname: "Malaria Antigen" },
  { id: "Typhidot", testname: "Typhidot" },
  { id: "Blood Culture", testname: "Blood Culture" },
  { id: "Procalcitonin (for sepsis)", testname: "Procalcitonin (for sepsis)" },
];

export const SkinAllergyPanel: textTypes[] = [
  { id: "IgE Total", testname: "IgE Total" },
  { id: "CBC with Eosinophil count", testname: "CBC with Eosinophil count" },
  { id: "ANA (Antinuclear Antibody – for autoimmune skin disorders)", testname: "ANA (Antinuclear Antibody – for autoimmune skin disorders)" },
  { id: "Vitamin D, B12", testname: "Vitamin D, B12" },
  { id: "Patch Test (for specific allergy)", testname: "Patch Test (for specific allergy)" },
  { id: "Food Allergy Panel (IgG-based)", testname: "Food Allergy Panel (IgG-based)" },
];

export const EntRespiratoryPanel: textTypes[] = [
  { id: "AEC (Absolute Eosinophil Count)", testname: "AEC (Absolute Eosinophil Count)" },
  { id: "Total IgE", testname: "Total IgE" },
  { id: "Chest X-ray", testname: "Chest X-ray" },
  { id: "Nasal Swab Culture", testname: "Nasal Swab Culture" },
  { id: "COVID-19 RTPCR or Antibody", testname: "COVID-19 RTPCR or Antibody" },
  { id: "CRP", testname: "CRP" },
  { id: "TB Gold or Mantoux Test", testname: "TB Gold or Mantoux Test" },
];


export const GastroLiverPanel: textTypes[] = [
  { id: "LFT (Liver Function Test – SGOT, SGPT, Bilirubin, ALP)", testname: "LFT (Liver Function Test – SGOT, SGPT, Bilirubin, ALP)" },
  { id: "Amylase & Lipase (for pancreas)", testname: "Amylase & Lipase (for pancreas)" },
  { id: "H. Pylori IgG / Stool Antigen", testname: "H. Pylori IgG / Stool Antigen" },
  { id: "Stool Routine & Culture", testname: "Stool Routine & Culture" },
  { id: "Hepatitis B (HBsAg), Hepatitis C (HCV)", testname: "Hepatitis B (HBsAg), Hepatitis C (HCV)" },
  { id: "PT-INR (Liver clotting function)", testname: "PT-INR (Liver clotting function)" },
  { id: "Albumin, Globulin ratio", testname: "Albumin, Globulin ratio" },
];

export const NeuroPsychPanel: textTypes[] = [
  { id: "Serum Electrolytes (Na, K, Ca, Mg)", testname: "Serum Electrolytes (Na, K, Ca, Mg)" },
  { id: "Vitamin B12 (for neuropathy)", testname: "Vitamin B12 (for neuropathy)" },
  { id: "TSH (Hypothyroid-related depression/anxiety)", testname: "TSH (Hypothyroid-related depression/anxiety)" },
  { id: "Serum Cortisol (for stress/fatigue)", testname: "Serum Cortisol (for stress/fatigue)" },
  { id: "EEG / MRI (as supportive, not blood test)", testname: "EEG / MRI (as supportive, not blood test)" },
  { id: "Folic Acid", testname: "Folic Acid" },
  { id: "HbA1c (for diabetic neuropathy)", testname: "HbA1c (for diabetic neuropathy)" },
];

export const OrthoRheumaPanel: textTypes[] = [
  { id: "RA Factor (Rheumatoid Arthritis)", testname: "RA Factor (Rheumatoid Arthritis)" },
  { id: "Anti-CCP", testname: "Anti-CCP" },
  { id: "CRP, ESR", testname: "CRP, ESR" },
  { id: "Uric Acid (Gout)", testname: "Uric Acid (Gout)" },
  { id: "HLA B27 (Ankylosing Spondylitis)", testname: "HLA B27 (Ankylosing Spondylitis)" },
  { id: "ANA Profile (Lupus, SLE)", testname: "ANA Profile (Lupus, SLE)" },
  { id: "Vitamin D, Calcium, PTH", testname: "Vitamin D, Calcium, PTH" },
];






export const GynecologyHormonalDisorders: textTypes[] = [
  { id: "CBC", testname: "CBC" },
  { id: "TSH_FT3_FT4", testname: "TSH, FT3, FT4" },
  { id: "FSH_LH", testname: "FSH, LH" },
  { id: "Prolactin", testname: "Prolactin" },
  { id: "AMH", testname: "AMH (Ovarian reserve)" },
  { id: "Progesterone_Estradiol", testname: "Progesterone / Estradiol" },
  { id: "HbA1c_PCOD", testname: "HbA1c (if PCOD)" },
  { id: "USG_Pelvis", testname: "USG Pelvis (non-blood but essential)" }
];

export const ThyroidEndocrinology: textTypes[] = [
  { id: "T3_T4_TSH", testname: "T3, T4, TSH" },
  { id: "Anti_TPO", testname: "Anti-TPO (Autoimmune thyroiditis)" },
  { id: "VitaminD_Calcium", testname: "Vitamin D, Calcium" },
  { id: "Fasting_PP_BloodSugar", testname: "Fasting & PP Blood Sugar" },
  { id: "HbA1c", testname: "HbA1c" },
  { id: "Lipid_Profile", testname: "Lipid Profile" },
  { id: "Insulin_Fasting_CPeptide", testname: "Insulin (Fasting/C-Peptide if required)" }
];

export const DiabetesMetabolic: textTypes[] = [
  { id: "FBS", testname: "FBS (Fasting Blood Sugar)" },
  { id: "PPBS", testname: "PPBS (Postprandial Blood Sugar)" },
  { id: "HbA1c", testname: "HbA1c" },
  { id: "Insulin", testname: "Insulin (fasting or post meal)" },
  { id: "Lipid_Profile", testname: "Lipid Profile" },
  { id: "Microalbuminuria", testname: "Microalbuminuria" },
  { id: "Creatinine_Urea", testname: "Serum Creatinine, Urea (Kidney status)" }
];

export const UrologyKidneyProstate: textTypes[] = [
  { id: "KFT", testname: "KFT (Kidney Function Test – Urea, Creatinine)" },
  { id: "Urine_Routine", testname: "Urine Routine & Microscopy" },
  { id: "Urine_Culture", testname: "Urine Culture" },
  { id: "PSA", testname: "PSA (Prostate Specific Antigen)" },
  { id: "Microalbuminuria", testname: "Microalbuminuria" },
  { id: "Sodium_Potassium", testname: "Sodium, Potassium" },
  { id: "Calcium_UricAcid", testname: "Calcium, Uric Acid" },
  { id: "Cystatin_C", testname: "Cystatin C (Advanced kidney marker)" }
];



export const PediatricsAutismADHD: textTypes[] = [
  { id: "Vitamin D", testname: "Vitamin D" },
  { id: "Vitamin B12", testname: "Vitamin B12" },
  { id: "Serum Ferritin", testname: "Serum Ferritin" },
  { id: "Lead, Mercury (Heavy Metal Test if regression)", testname: "Lead, Mercury (Heavy Metal Test if regression)" },
  { id: "Thyroid Profile", testname: "Thyroid Profile" },
  { id: "CBC + ESR", testname: "CBC + ESR" },
  { id: "EEG, MRI Brain (if seizures or delay)", testname: "EEG, MRI Brain (if seizures or delay)" },
  { id: "Stool for parasites (if GI complaints)", testname: "Stool for parasites (if GI complaints)" },
];
export const ReproductiveSexualHealth: textTypes[] = [
  { id: "VDRL / TPHA (Syphilis)", testname: "VDRL / TPHA (Syphilis)" },
  { id: "HIV I & II", testname: "HIV I & II" },
  { id: "HBsAg", testname: "HBsAg" },
  { id: "HCV", testname: "HCV" },
  { id: "Semen Analysis", testname: "Semen Analysis" },
  { id: "FSH, LH, Testosterone (Male)", testname: "FSH, LH, Testosterone (Male)" },
  { id: "Prolactin, Estradiol (Female)", testname: "Prolactin, Estradiol (Female)" },
  { id: "Urine Culture / Swab Culture", testname: "Urine Culture / Swab Culture" },
];
export const Cardiology: textTypes[] = [
  { id: "Lipid Profile", testname: "Lipid Profile" },
  { id: "ECG (not blood but essential)", testname: "ECG (not blood but essential)" },
  { id: "Troponin I or T (For acute chest pain)", testname: "Troponin I or T (For acute chest pain)" },
  { id: "CRP (hsCRP for inflammation risk)", testname: "CRP (hsCRP for inflammation risk)" },
  { id: "Homocysteine", testname: "Homocysteine" },
  { id: "Blood Sugar & HbA1c", testname: "Blood Sugar & HbA1c" },
  { id: "TSH (Thyroid affects heart rhythm)", testname: "TSH (Thyroid affects heart rhythm)" },
];


export const OncologyTumorScreening: textTypes[] = [
  { id: "CBC", testname: "CBC" },
  { id: "ESR", testname: "ESR" },
  { id: "LDH", testname: "LDH" },
  { id: "CA-125 (Ovary)", testname: "CA-125 (Ovary)" },
  { id: "PSA (Prostate)", testname: "PSA (Prostate)" },
  { id: "AFP (Liver)", testname: "AFP (Liver)" },
  { id: "CEA (Colon, Breast)", testname: "CEA (Colon, Breast)" },
  { id: "CA 19-9 (Pancreas)", testname: "CA 19-9 (Pancreas)" },
];
export const PreOperativeFullBodyCheck: textTypes[] = [
  { id: "CBC", testname: "CBC" },
  { id: "Blood Group", testname: "Blood Group" },
  { id: "LFT + KFT", testname: "LFT + KFT" },
  { id: "RBS + HbA1c", testname: "RBS + HbA1c" },
  { id: "ECG + Chest X-ray", testname: "ECG + Chest X-ray" },
  { id: "HIV, HBsAg, HCV", testname: "HIV, HBsAg, HCV" },
  { id: "Urine R/M", testname: "Urine R/M" },
  { id: "PT/INR", testname: "PT/INR" },
];



export const GeneralOncology: textTypes[] = [
  { id: "CBC", testname: "CBC – Anemia, WBC ↑↓, Platelets ↓" },
  { id: "ESR / CRP", testname: "ESR / CRP – Inflammation markers" },
  { id: "LDH", testname: "LDH (Lactate Dehydrogenase) – Non-specific tumor activity" },
  { id: "Ferritin", testname: "Ferritin – Inflammation or malignancy" },
  { id: "β2-Microglobulin", testname: "β2-Microglobulin – Multiple myeloma, lymphoma" },
];

export const BreastCancer: textTypes[] = [
  { id: "CA 15-3", testname: "CA 15-3 – Most common marker" },
  { id: "CEA", testname: "CEA (Carcinoembryonic Antigen) – Also used in colon & breast" },
  { id: "HER2/neu", testname: "HER2/neu – Serum or tissue-based" },
  { id: "Estrogen / Progesterone Receptor", testname: "Estrogen / Progesterone Receptor (ER/PR) – Immunohistochemistry (IHC)" },
  { id: "BRCA1 & BRCA2", testname: "BRCA1 & BRCA2 Gene Testing – For genetic predisposition" },
];

export const OvarianCancer: textTypes[] = [
  { id: "CA 125", testname: "CA 125 – Primary marker" },
  { id: "HE4", testname: "HE4 (Human Epididymis Protein 4)" },
  { id: "OVA1 Panel", testname: "OVA1 Panel – Advanced test" },
  { id: "AFP", testname: "AFP – If germ cell tumor suspected" },
  { id: "CEA", testname: "CEA – If mucinous type" },
];

export const CervicalUterineCancer: textTypes[] = [
  { id: "SCC", testname: "SCC (Squamous Cell Carcinoma Antigen)" },
  { id: "CA 125", testname: "CA 125 – If endometrial cancer suspected" },
  { id: "HPV DNA Typing", testname: "HPV DNA Typing – Not a blood test, but important" },
  { id: "CEA", testname: "CEA – If spread suspected" },
];





export const ProstateCancer: textTypes[] = [
  { id: "PSA (Total & Free)", testname: "PSA (Total & Free)" },
  { id: "PAP (Prostatic Acid Phosphatase)", testname: "PAP (Prostatic Acid Phosphatase)" },
  { id: "PSA Density / Velocity", testname: "PSA Density / Velocity" },
];

export const LiverCancer: textTypes[] = [
  { id: "AFP (Alpha-Fetoprotein)", testname: "AFP (Alpha-Fetoprotein)" },
  { id: "LFT (SGOT, SGPT, ALP, GGT, Bilirubin)", testname: "LFT (SGOT, SGPT, ALP, GGT, Bilirubin)" },
  { id: "CEA & CA 19-9", testname: "CEA & CA 19-9" },
  { id: "Hepatitis B/C Testing", testname: "Hepatitis B/C Testing" },
];

export const PancreaticCancer: textTypes[] = [
  { id: "CA 19-9", testname: "CA 19-9" },
  { id: "CEA", testname: "CEA" },
  { id: "Amylase/Lipase", testname: "Amylase/Lipase" },
  { id: "BRCA2 mutation", testname: "BRCA2 mutation" },
];

export const ColorectalCancer: textTypes[] = [
  { id: "CEA (Carcinoembryonic Antigen)", testname: "CEA (Carcinoembryonic Antigen)" },
  { id: "CA 19-9", testname: "CA 19-9" },
  { id: "FOBT (Stool occult blood)", testname: "FOBT (Stool occult blood)" },
  { id: "KRAS, NRAS mutation", testname: "KRAS, NRAS mutation" },
];

export const LungCancer: textTypes[] = [
  { id: "NSE (Neuron Specific Enolase)", testname: "NSE (Neuron Specific Enolase)" },
  { id: "ProGRP (Pro-gastrin releasing peptide)", testname: "ProGRP (Pro-gastrin releasing peptide)" },
  { id: "CYFRA 21-1", testname: "CYFRA 21-1" },
  { id: "CEA", testname: "CEA" },
  { id: "EGFR, ALK mutation", testname: "EGFR, ALK mutation" },
];

export const TesticularCancer: textTypes[] = [
  { id: "AFP (Alpha-Fetoprotein)", testname: "AFP (Alpha-Fetoprotein)" },
  { id: "β-hCG (Beta Human Chorionic Gonadotropin)", testname: "β-hCG (Beta Human Chorionic Gonadotropin)" },
  { id: "LDH", testname: "LDH" },
  { id: "Ultrasound", testname: "Ultrasound" },
];
