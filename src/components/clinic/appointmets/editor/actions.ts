"use server";
import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { getAppoimentDataInclude } from "@/lib/types";
import {
  createAppointmentSchema,
  CreateAppointmentSchemaValues,
} from "@/lib/vallidaion";

export async function appoinment(input: CreateAppointmentSchemaValues) {
  const {
    phoneNumber,
    patientName,
    gendar,
    patientDOB,
    appointmentDate,
    consultationFees,
    pmsId,
    refrenshby,
    patientAddress,
    patientEmial,
    patientWeight,
    patinetDiet,
    bp
  } = createAppointmentSchema.parse(input);

  const { user } = await validateRequest();
  if (!user) throw Error("User not found");

  // ✅ Get latest token for this user
  const latest = await prisma.appointment.findFirst({
    where: { userId: user.id },
    orderBy: { tokenNo: "desc" },
    select: { tokenNo: true },
  });

  const newTokenNo = (Number(latest?.tokenNo) || 0) + 1;

  // ✅ Create new appointment
  const appoinmentData = await prisma.appointment.create({
    data: {
      userId: user.id,
      tokenNo: newTokenNo,
      phoneNumber,
      patientName,
      gendar,
      patientDOB,
      appointmentDate,
      consultationFees,
      pmsId,
      refrenshby,
      patientAddress,
      patientEmial,

      patientWeight,
      patinetDiet,
      branch: user.branch,
      bp
    },
    include: getAppoimentDataInclude(user.id),
  });

  return appoinmentData;
}
