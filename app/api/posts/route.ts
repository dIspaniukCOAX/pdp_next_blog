import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const accessToken = req.headers.get("Authorization");
    if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const posts = await db.post.findMany({
      orderBy: {
        created_at: "desc"
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            username: true,
            created_at: true,
            updated_at: true
          }
        }
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
