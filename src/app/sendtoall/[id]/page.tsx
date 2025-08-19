import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";

import { safeParsePrescription } from "@/lib/utils";
import AlldataPatient from "./AlldataPatient";
import SymtomForm from "./AlldataPatient";


const getPrescriptionOrDoctor = cache(async (id: string) => {
  // 🔹 Step 1: Try prescription
  let record: any = await prisma.prisciption.findFirst({
    where: { id: id },
    include: { attachments: true },
  });

  // 🔹 Step 2: If not found, try doctor modal
  if (!record) {
    record = await prisma.doctor.findFirst({
      where: { id: id },
    });
  }

  if (!record) notFound();

  return record;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getPrescriptionOrDoctor(id);

  return {
    title: `${user.papatientName ?? user.atientFullName ?? "Doctor"} (@${user.id})`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await getPrescriptionOrDoctor(id);

  // Agar prescription hai to parse karo
  const isPrescription = record && "presciption" in record;
  const rawPrescription = isPrescription ? record.presciption : null;

  const parsedPrescription = rawPrescription
    ? safeParsePrescription(rawPrescription)
    : {};

  return (
    <>
      {isPrescription ? (
        <SymtomForm
          finalData={{ ...parsedPrescription, ...record }}
          prescitonData={{
            id: record.id?.toString() ?? "",
            apptId: record.apptId?.toString() ?? "",
            primary_complaint: record.primary_complaint ?? [],
            duration_of_problem: record.duration_of_problem ?? "",
            age: record.age?.toString() ?? "",
            gender: record.gender ?? "",
            papatientName: record.papatientName ?? "",
            Patient_Number: record.Patient_Number ?? "",
            DOB: record.DOB ?? "",
            Ai_Check_Up_Date: record.Ai_Check_Up_Date ?? "",
            caseidIdx: record.caseidId?.toString() ?? "",
            pmsId: record.pmsId ?? "",
            refrenshby: record.refrenshby ?? "",
            patientAddress: record.patientAddress ?? "",
            patientEmial: record.patientEmial ?? "",
            patinetDiet: record.patinetDiet ?? "",
            branch: record.branch ?? "",
            patientWeight: record.patientWeight ?? "",
            bp: record.bp ?? "",
          }}
        />
      ) : (
        ""
      )}
    </>
  );
}
