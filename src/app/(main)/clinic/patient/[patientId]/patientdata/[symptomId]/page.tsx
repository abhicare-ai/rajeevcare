import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import SymtomForm from "./SymtomForm";
import { safeParsePrescription } from "@/lib/utils";

const getUser = cache(async (symptomId: string) => {
  const user = await prisma.prisciption.findFirst({
    where: {
      id: {
        equals: symptomId,
        mode: "insensitive",
      },
    },
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ symptomId: string }>;
}): Promise<Metadata> {
  const { symptomId } = await params;
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(symptomId);

  return {
    title: `${user.papatientName} (@${user.id})`,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ symptomId: string }>;
}) {
  const { symptomId } = await params;
  const prescitonData = await prisma.prisciption.findFirst({
    where: {
      id: symptomId,
    },
    include:{
      attachments:true
    }
  });
  if (!prescitonData) {
    return {};
  }

  const rawPrescription = prescitonData.presciption;
  const parsedPrescription = safeParsePrescription(rawPrescription);

  return (
    <SymtomForm
      finalData={{ ...parsedPrescription, ...prescitonData }}
      prescitonData={{
        id: prescitonData?.id,
        apptId: prescitonData?.apptId,
        primary_complaint: prescitonData?.primary_complaint,
        duration_of_problem: prescitonData?.duration_of_problem,
        age: prescitonData?.age,
        gender: prescitonData?.gender,
        papatientName: prescitonData?.papatientName,
        Patient_Number: prescitonData?.Patient_Number,
        DOB: prescitonData?.DOB,
        Ai_Check_Up_Date: prescitonData?.Ai_Check_Up_Date,
        caseidIdx: prescitonData?.caseidId?.toString(),
        pmsId: prescitonData?.pmsId,
        refrenshby: prescitonData?.refrenshby,
        patientAddress: prescitonData?.patientAddress,
        patientEmial: prescitonData?.patientEmial,

        patinetDiet: prescitonData.patinetDiet,
        branch: prescitonData.branch,
        patientWeight: prescitonData.patientWeight,

        bp: prescitonData.bp,
      }}
    />
  );
}
