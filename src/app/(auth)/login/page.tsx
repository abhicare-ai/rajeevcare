import React from "react";
import Image from "next/image";
import logonImage from "@/assets/login-image.jpg";
import { Metadata } from "next";
import LoginForm from "./LoginForm";
export const metadata: Metadata = {
  title: "Log In",
};
export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className=" flex  bg-sidebar h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Login to Dr Rajeev CMS</h1>
          </div>

          <LoginForm />
        </div>
        <Image
          src={logonImage}
          alt=""
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
}
