import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const body = await req.json();
    
    return NextResponse.json(body)
  } catch (error) {
    NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }

}
