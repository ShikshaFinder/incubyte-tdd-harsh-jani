import { NextRequest } from "next/server";
import { GET, POST } from "../app/api/sweets/route";
import { createAuthToken } from "../lib/auth";
import { DELETE } from "../app/api/sweets/[id]/route";

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

  describe("GET /api/sweets (search & sort)", () => {
    const token = createAuthToken();
    const baseUrl = "http://localhost:3000/api/sweets";
    const headers = { Cookie: `token=${token}` };

    beforeAll(async () => {
      // Add some sweets for searching/sorting
      const sweets = [
        { name: "Barfi", category: "Indian", price: 15, quantity: 10 },
        { name: "Candy", category: "Western", price: 5, quantity: 50 },
        { name: "Jalebi", category: "Indian", price: 12, quantity: 20 },
      ];
      for (const sweet of sweets) {
        const req = new NextRequest(baseUrl, {
          method: "POST",
          body: JSON.stringify(sweet),
          headers: { "Content-Type": "application/json", ...headers },
        });
        await POST(req);
      }
    });

    it("should search by name", async () => {
      const req = new NextRequest(`${baseUrl}?name=Barfi`, {
        method: "GET",
        headers,
      });
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.some((s: any) => s.name === "Barfi")).toBe(true);
    });

    it("should search by category", async () => {
      const req = new NextRequest(`${baseUrl}?category=Western`, {
        method: "GET",
        headers,
      });
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.every((s: any) => s.category === "Western")).toBe(true);
    });

    it("should filter by price range", async () => {
      const req = new NextRequest(`${baseUrl}?minPrice=10&maxPrice=15`, {
        method: "GET",
        headers,
      });
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.every((s: any) => s.price >= 10 && s.price <= 15)).toBe(true);
    });

    it("should sort by price desc", async () => {
      const req = new NextRequest(`${baseUrl}?sortBy=price&sortOrder=desc`, {
        method: "GET",
        headers,
      });
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      for (let i = 1; i < data.length; i++) {
        expect(data[i - 1].price >= data[i].price).toBe(true);
      }
    });

    it("should sort by name asc", async () => {
      const req = new NextRequest(`${baseUrl}?sortBy=name&sortOrder=asc`, {
        method: "GET",
        headers,
      });
      const res = await GET(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      for (let i = 1; i < data.length; i++) {
        expect(data[i - 1].name.localeCompare(data[i].name) <= 0).toBe(true);
      }
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

  describe("DELETE /api/sweets/[id]", () => {
    const createDeleteRequest = (id: number) => {
      const token = createAuthToken();
      return new NextRequest(`http://localhost:3000/api/sweets/${id}`, {
        method: "DELETE",
        headers: { Cookie: `token=${token}` },
      });
    };

    it("should reject without auth", async () => {
      const req = new NextRequest("http://localhost:3000/api/sweets/1", {
        method: "DELETE",
      });
      const res = await DELETE(req, { params: { id: "1" } });
      expect(res.status).toBe(401);
    });

    it("should return 404 for non-existent sweet", async () => {
      const req = createDeleteRequest(99999);
      const res = await DELETE(req, { params: { id: "99999" } });
      expect(res.status).toBe(404);
    });

    it("should delete sweet with valid auth", async () => {
      // First, create a sweet
      const createReq = createAuthRequest("POST", {
        name: "DeleteMe",
        category: "Test",
        price: 1,
        quantity: 1,
      });
      const createRes = await POST(createReq);
      expect(createRes.status).toBe(201);
      const sweet = await createRes.json();
      // Now, delete it
      const deleteReq = createDeleteRequest(sweet.id);
      const deleteRes = await DELETE(deleteReq, {
        params: { id: String(sweet.id) },
      });
      expect(deleteRes.status).toBe(200);
    });
  });
});
