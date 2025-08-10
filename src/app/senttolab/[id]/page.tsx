import { prisma } from "@/lib/prisma";
import { safeParsePrescription } from "@/lib/utils";
import AlldataPatient from "./AlldataPatient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const prescitonData = await prisma.prisciption.findFirst({
    where: {
      id: id,
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
    <AlldataPatient
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
