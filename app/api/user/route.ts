import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { signUpSchema } from "@/schemas/signup.schema";
import { signJwtAccessToken, signJwtRefreshToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = await signUpSchema.validate(body);

    const isEmailExist = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (isEmailExist) {
      return NextResponse.json(
        { errorCode: 409, message: "The user with this email address already exists." },
        { status: 409 }
      );
    }

    const isUsernameExist = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExist || isEmailExist) {
      return NextResponse.json(
        { errorCode: 409, message: "The user with this username already exists." },
        { status: 409 }
      );
    }

    const hashPass = await hash(password, 10);

    const access_token = signJwtAccessToken(body);
    const refresh_token = signJwtRefreshToken(body);

    await db.user.create({
      data: {
        username,
        email,
        password: hashPass,
        access_token,
        refresh_token
      },
    });

    return NextResponse.json({
      message: "The user have been created successful",
    });
  } catch (error) {
    NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: "true" });
}
