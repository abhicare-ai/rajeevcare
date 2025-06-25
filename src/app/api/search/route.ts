import { validateRequest } from "@/authSlice";
import { prisma } from "@/lib/prisma";
import { AppoinmentsPage, getAppoimentDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchTerm = req.nextUrl.searchParams.get("search") || "";
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const searchQuery = searchTerm.split(" ").join(" & ");

    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.appointment.findMany({
      where: {
        OR: [
          {
            tokenNo: {
              equals: Number(searchQuery), // match exact token number
            },
          },
          {
            pmsId: {
              search: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
      include: getAppoimentDataInclude(user.id),
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;
    //yani post ke 11 lenght ka id nikalega

    const appoinments: AppoinmentsPage = {
      appoinments: posts.slice(0, pageSize), //startIndex, endIndex //endIndex include nhi hota
      nextCursor,
    };
    return Response.json(appoinments);
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Interval server error" }, { status: 500 });
  }
}
