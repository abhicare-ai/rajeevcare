"use server";

import { lucia } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/vallidaion";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(
  credential: LoginValues,
): Promise<{ error: string }> {
  try {
    // const { email, branch, password } = loginSchema.parse(credential);

    // //login...........
    // const existingUser = await prisma.user.findFirst({
    //   where: {
    //     email: {
    //       equals: email,
    //       mode: "insensitive",
    //     },
    //   },
    // });

    // if (!existingUser || !existingUser.branch || !existingUser.passwordHash) {
    //   return {
    //     error: "Incorreact email or password or branch",
    //   };
    // }

    // const existingBranch = existingUser.branch === branch;

    // if (!existingBranch) {
    //   return {
    //     error: "Incorreact email or password or branch",
    //   };
    // }

    // const validPassword = await verify(existingUser.passwordHash, password, {
    //   memoryCost: 19456,
    //   timeCost: 2,
    //   outputLen: 32,
    //   parallelism: 1,
    // });

    // if (!validPassword) {
    //   return {
    //     error: "Incorreact email or password or branch",
    //   };
    // }

    // const session = await lucia.createSession(existingUser.id, {});
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // (await cookies()).set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes,
    // );

    // return redirect("/");

    //signup....

      const passwordHash = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      const userId = generateIdFromEntropySize(10);

     await prisma.user.create({
        data: {
          id: userId,
          branch,
          email,
          passwordHash,
        },
      });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      (await cookies()).set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return {
      error: "Interval server error.",
    };
  }
}
