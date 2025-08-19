import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { id } = await req.json();

  const data = await prisma.doctor.findFirst({
    where: { id: id },
  });

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
