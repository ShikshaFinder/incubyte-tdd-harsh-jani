import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createAuthToken } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const isValid = await validateCredentials(email, password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = createAuthToken();
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return res;
}
