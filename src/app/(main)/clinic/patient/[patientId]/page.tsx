import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import PatientDeases from "@/components/patient/patientId/PatientDeases";


const getUser = cache(async (patientId: string) => {
  const user = await prisma.appointment.findFirst({
    where: {
      id: {
        equals: patientId,
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
  params: Promise<{ patientId: string }>;
}): Promise<Metadata> {
  const { patientId } = await params;
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return {};

  const user = await getUser(patientId);

  return {
    title: `${user.patientName} (@${user.id})`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ patientId: string }>;
}) {
  const { patientId } = await params;
  const { user: loggedInUserId } = await validateRequest();
  if (!loggedInUserId)
    return (
      <p className="px-3 text-center">
        You&lsquo;re not authorized to veiw this page.
      </p>
    );
  const pateint = await getUser(patientId);

  return <PatientDeases patinetId={pateint.id} />;
}
