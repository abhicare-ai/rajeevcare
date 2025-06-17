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
  } = createAppointmentSchema.parse(input);

  const { user } = await validateRequest();
  if (!user) throw Error("User not found");

  // ✅ Check if appointment already exists for this phone number
  const existingAppointment = await prisma.appointment.findFirst({
    where: {
      phoneNumber: {
        equals: phoneNumber,
        mode: "insensitive",
      },
      appointmentDate: appointmentDate,
    },
  });

  if (existingAppointment) {
    return { message: "Appointment already exists." };
  }

  // ✅ Get the start and end of the appointment day
  const startOfDay = new Date(appointmentDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(appointmentDate);
  endOfDay.setHours(23, 59, 59, 999);

  // ✅ Find max token for the same appointmentDate
  const maxTokenToday = await prisma.appointment.aggregate({
    _max: {
      tokenNo: true,
    },
    where: {
      appointmentDate: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const newTokenNo = maxTokenToday._max.tokenNo
    ? String(Number(maxTokenToday._max.tokenNo) + 1)
    : "1";

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
    },
    include: getAppoimentDataInclude(user.id),
  });

  return appoinmentData;
}
