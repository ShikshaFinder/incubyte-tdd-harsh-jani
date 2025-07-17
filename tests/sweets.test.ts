import { NextRequest } from "next/server";
import { GET, POST } from "../app/api/sweets/route";
import { createAuthToken } from "../lib/auth";

describe("Sweets API", () => {
  const createAuthRequest = (method: string, body?: any) => {
    const token = createAuthToken();
    const req = new NextRequest("http://localhost:3000/api/sweets", {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
    });
    return req;
  };

  describe("GET /api/sweets", () => {
    it("should reject without auth", async () => {
      const req = new NextRequest("http://localhost:3000/api/sweets", {
        method: "GET",
      });
      const res = await GET(req);
      expect(res.status).toBe(401);
    });

    it("should allow GET with auth", async () => {
      const req = createAuthRequest("GET");
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data)).toBe(true);
    });
  });

  describe("POST /api/sweets", () => {
    it("should reject without auth", async () => {
      const req = new NextRequest("http://localhost:3000/api/sweets", {
        method: "POST",
        body: JSON.stringify({
          name: "Ladoo",
          category: "Indian",
          price: 10,
          quantity: 5,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const res = await POST(req);
      expect(res.status).toBe(401);
    });

    it("should reject with invalid input", async () => {
      const req = createAuthRequest("POST", {
        name: "",
        category: "",
        price: -1,
        quantity: -1,
      });
      const res = await POST(req);
      expect(res.status).toBe(400);
    });

    it("should allow POST with valid input and auth", async () => {
      const req = createAuthRequest("POST", {
        name: "Ladoo",
        category: "Indian",
        price: 10,
        quantity: 5,
      });
      const res = await POST(req);
      expect(res.status).toBe(201);
      const data = await res.json();
      expect(data.name).toBe("Ladoo");
    });
  });
});
