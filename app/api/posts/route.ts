import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    const accessToken = req.headers.get('Authorization');
    
    if(!accessToken || !verifyJwt(accessToken)){
      NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    const {
      title,
      description,
      campaignName,
      yearSalary,
      location,
      employment,
    } = body;

    await db.post.create({
      data: {
        title,
        description,
        campaign_name: campaignName,
        year_salary: yearSalary,
        location,
        employment,
        authorId: user?.id,
      },
    });

    return NextResponse.json({ message: "The post have added" });
  } catch (error) {
    NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, res: Response) {
  try {
    const accessToken = req.headers.get('Authorization')
    if(!accessToken || !verifyJwt(accessToken)){
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const posts = await db.post.findMany({
      orderBy: {
        created_at: 'desc'
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            username: true,
            created_at: true,
            updated_at: true,
          }
        }
      }
    });

    return NextResponse.json(posts);
  } catch (error) {
    NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
