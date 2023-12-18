import { db } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await getCurrentUser();
    const accessToken = req.headers.get("Authorization");

    if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, description, campaign_name, employment, year_salary, location } = body;

    await db.post.create({
      data: {
        title,
        description,
        campaign_name,
        employment,
        year_salary,
        location,
        authorId: user?.id
      }
    });

    return NextResponse.json({ message: "The post have added" });
  } catch (error) {
    NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);

    const postId = url.searchParams.get("postId");

    const accessToken = req.headers.get("Authorization");

    if (!accessToken || !verifyJwt(accessToken)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!postId) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    const post = await db.post.findFirst({
      where: {
        id: postId
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

    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");
    const accessToken = req.headers.get("Authorization");
    const jwtData = verifyJwt(accessToken!);

    if (!postId) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (!accessToken || !jwtData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const postAuthorId = await db.post.findFirst({
      where: {
        id: postId
      },
      include: {
        author: {
          select: {
            id: true
          }
        }
      }
    });

    if (postAuthorId?.author?.id !== jwtData.id) {
      return NextResponse.json(
        { message: "Forbidden. You are not the author of this post" },
        { status: 403 }
      );
    }

    const post = await db.post.update({
      where: {
        id: postId
      },
      data: {
        ...body
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get("postId");
    const accessToken = req.headers.get("Authorization");
    const jwtData = verifyJwt(accessToken!);

    if (!postId) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (!accessToken || !jwtData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const postAuthorId = await db.post.findFirst({
      where: {
        id: postId
      },
      include: {
        author: {
          select: {
            id: true
          }
        }
      }
    });

    if (postAuthorId?.author?.id !== jwtData.id) {
      return NextResponse.json(
        { message: "Forbidden. You are not the author of this post" },
        { status: 403 }
      );
    }

    await db.post.delete({
      where: {
        id: postId
      }
    });

    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
  }
}
