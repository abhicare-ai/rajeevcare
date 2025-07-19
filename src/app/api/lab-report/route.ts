// /app/api/lab-report/route.ts

import { getLatestSavedVector } from "@/hooks/tools/findPatientData";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {  patientId } = await req.json();
  const data = await getLatestSavedVector(patientId);
  return NextResponse.json({ report: data?.pageContent || null });
}


