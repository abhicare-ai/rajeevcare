"use server";

import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { getAppoimentDataInclude } from "@/lib/types";
export async function deletAppoinmet(id: string) {
  const { user } = await validateRequest();
  if (!user) throw new Error("Unauthorized");

  const post = await prisma.appointment.findUnique({
    where: { id },
  });

  if (!post) throw new Error("Appointment not found.");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deletedPost = await prisma.appointment.delete({
    where: { id },
    include: getAppoimentDataInclude(user.id),
  });

  return deletedPost;
}
