"use server";

import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";

import {
  getFeedBackDataInclude,
  PrisciptionData,
} from "@/lib/types";
import { createFeedBackSchema } from "@/lib/vallidaion";

export async function submitFeedBack({
  presciption,
  content,
}: {
  presciption: PrisciptionData;
  content: string;
}) {
 
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createFeedBackSchema.parse({ content });

  const newFeedBack = await prisma.feedback.create({
    data: {
      userId: user.id,
      apptId: presciption.appointment.id,
      deasesId: presciption.id,
      content: contentValidated,
    },
    include: getFeedBackDataInclude(presciption.appointment.id),
  });

  return newFeedBack;
}

// export async function deleteComment(id: string) {
//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const comment = await prisma.comment.findUnique({
//     where: { id },
//   });

//   if (!comment) throw new Error("Comment not found");

//   if (comment.userId !== user.id) throw new Error("Unauthorized");

//   const deletedComment = await prisma.comment.delete({
//     where: { id },
//     include: getCommentDataInclude(user.id),
//   });

//   return deletedComment;
// }
