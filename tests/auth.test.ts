import { NextRequest } from "next/server";
import { POST } from "../app/api/auth/login/route";
import {
  validateCredentials,
  createAuthToken,
  verifyAuthToken,
} from "../lib/auth";

describe("Auth API", () => {
  describe("validateCredentials", () => {
    it("should reject invalid credentials", async () => {
      const isValid = await validateCredentials("admin@test.com", "wrong");
      expect(isValid).toBe(false);
    });

    it("should accept valid credentials", async () => {
      const isValid = await validateCredentials(
        "admin@test.com",
        "testpassword"
      );
      expect(isValid).toBe(true);
    });
  });

  describe("JWT functions", () => {
    it("should create and verify token", () => {
      const token = createAuthToken();
      const decoded = verifyAuthToken(token);
      expect(decoded).toBeTruthy();
      expect(decoded).toHaveProperty("email", "admin@test.com");
    });

    it("should reject invalid token", () => {
      const decoded = verifyAuthToken("invalid-token");
      expect(decoded).toBeNull();
    });
  });

  describe("POST /api/auth/login", () => {
    it("should reject invalid credentials", async () => {
      const req = new NextRequest("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: "admin@test.com", password: "wrong" }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);
      expect(res.status).toBe(401);
    });

    it("should accept valid credentials and set cookie", async () => {
      const req = new NextRequest("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: "admin@test.com",
          password: "testpassword",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);
      expect(res.status).toBe(200);
      const cookies = res.headers.get("set-cookie");
      expect(cookies).toBeTruthy();
    });
  });
});
