import { signJwtAccessToken, signJwtRefreshToken } from "@/lib/jwt";
import { db } from "@/lib/db";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface RequestBody {
  email: string;
  password: string;
}
export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
  const user = await db.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const refreshToken = signJwtRefreshToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    db.user.update({
      where: {
        email: body.email,
      },
      data: {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
    return NextResponse.json(result);
  } else {
    return NextResponse.json({
      message: "Invalid credentials",
    }, {
      status: 401
    })
  }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
