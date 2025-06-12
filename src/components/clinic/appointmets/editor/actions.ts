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
  } = createAppointmentSchema.parse(input);

  const { user } = await validateRequest();
  if (!user) throw Error("User not found");

  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      phoneNumber: {
        equals: phoneNumber,
        mode: "insensitive",
      },
    },
  });

  if (existingAppointment) {
    return { message: "Appointment already exists." };
  }

  // ✅ Get the last patientId and increment
  const lastAppointment = await prisma.appointment.findFirst({
    orderBy: {
      tokenNo: "desc",
    },
    select: {
      tokenNo: true,
    },
  });

  const newPatientId = lastAppointment?.tokenNo
    ? lastAppointment.tokenNo + 1
    : 1;

  const appoinmentData = await prisma.appointment.create({
    data: {
      userId: user.id,
      tokenNo: String(newPatientId),
      phoneNumber,
      patientName,
      gendar,
      patientDOB,
      appointmentDate,
      consultationFees,
    },
    include: getAppoimentDataInclude(user.id),
  });

  return appoinmentData;
}
