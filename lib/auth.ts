import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

// Hardcoded admin credentials
const ADMIN_EMAIL = "admin@test.com";
// This is the bcrypt hash for password: 'testpassword'
const ADMIN_PASSWORD_HASH =
  "$2a$10$ysmi9o1dJCszVk8rw0u4jO3YWkPqCf7/nhb4bobvs/a113V1nBncq";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const JWT_EXPIRES_IN = "1d";

export async function validateCredentials(email: string, password: string) {
  if (email !== ADMIN_EMAIL) return false;
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export function createAuthToken() {
  return jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyAuthToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest) {
  const cookie = req.cookies.get("token");
  if (cookie) return cookie.value;
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }
  return null;
}
