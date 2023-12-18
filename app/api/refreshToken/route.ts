import { db } from "@/lib/db";
import { signJwtAccessToken, signJwtRefreshToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await db.user.findFirst({
      where: {
        access_token: body.access_token,
        refresh_token: body.refresh_token,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const accessToken = signJwtAccessToken({
      email: user?.email,
      id: user?.id,
    });

    await db.user.update({
      where: {
        email: user.email,
      },
      data: {
        access_token: accessToken,
      },
    });

    return NextResponse.json({
        access_token: accessToken,
        refresh_token: body.refreshToken
    })
  } catch (error) {
    NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
