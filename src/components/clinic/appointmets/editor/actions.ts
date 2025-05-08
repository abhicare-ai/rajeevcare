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

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  const { user } = await validateRequest();

  if (!user) throw Error("User not found");

  const apptNumber = await prisma.appointment.findFirst({
    where: {
      phoneNumber: {
        equals: phoneNumber,
        mode: "insensitive",
      },
    },
  });

  if (apptNumber) {
    return {
      message: "Appointment already exist.",
    };
  }
  const appoinmentData = await prisma.appointment.create({
    data: {
      userId: user.id,
      tokenNo: `ahh${randomNumber}`,
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
