import { Prisma } from "@prisma/client";



export function getUserDataSelect() {
  return {
    id: true,
    email: true,
    branch: true,
    createdAt: true,
    isAdmin: true,

    _count: {
      select: {
        Appointment: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export function getAppoimentDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(),
    },
    Prisciption: {
      where: {
        apptId: loggedInUserId,
      },
      select: {
        apptId: true,
        createdAt: true,
        id: true,
      },
    },
    _count: {
      select: {
        Prisciption: true,
      },
    },
  } satisfies Prisma.AppointmentInclude;
}

export type AppoinmentData = Prisma.AppointmentGetPayload<{
  include: ReturnType<typeof getAppoimentDataInclude>;
}>;

export interface AppoinmentsPage {
  appoinments: AppoinmentData[];
  nextCursor: string | null;
}

// ...........

export function getAppoimentDataSelect(PasentId: string) {
  return {
    id: true,
    tokenNo: true,
    patinetAvatar: true,
    phoneNumber: true,
    patientName: true,
    gendar: true,
    patientDOB: true,
    appointmentDate: true,
    consultationFees: true,
    audio: true,
    presciption: true,
    createdAt: true,
    Prisciption: {
      where: {
        apptId: PasentId,
      },
    },
    user: {
      select: getUserDataSelect(),
    },
    _count: {
      select: {
        Prisciption: true,
      },
    },
  } satisfies Prisma.AppointmentSelect;
}

export type AllAppointmentData = Prisma.AppointmentGetPayload<{
  select: ReturnType<typeof getAppoimentDataSelect>;
}>;

//// ..................

export function getPrisciptionDataInclude(appoinmetId: string) {
  return {
    appointment: {
      select: getAppoimentDataSelect(appoinmetId),
    },
    _count: {
      select: {
        Feedback: true,
      },
    },
  } satisfies Prisma.PrisciptionInclude;
}

//main deta sara deta yaha pe hai
export type PrisciptionData = Prisma.PrisciptionGetPayload<{
  include: ReturnType<typeof getPrisciptionDataInclude>;
}>;

export interface PrisciptionPage {
  prisciption: PrisciptionData[];
  nextCursor: string | null;
}

//  feedBacks

export function getFeedBackDataInclude(pateintId: string) {
  return {
    appointment: {
      select: getAppoimentDataSelect(pateintId),
    },
  } satisfies Prisma.FeedbackInclude;
}

export type FeedbacksData = Prisma.FeedbackGetPayload<{
  include: ReturnType<typeof getFeedBackDataInclude>;
}>;

export interface FeedbacksPage {
  Feedback: FeedbacksData[];
  previousCursor: string | null;
}

