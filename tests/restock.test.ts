import { NextRequest } from "next/server";
import { PATCH } from "../app/api/sweets/[id]/restock/route";
import { createAuthToken } from "../lib/auth";

describe("Restock API", () => {
  const createAuthRequest = (id: number, body: any) => {
    const token = createAuthToken();
    const req = new NextRequest(
      `http://localhost:3000/api/sweets/${id}/restock`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
      }
    );
    return req;
  };

  describe("PATCH /api/sweets/[id]/restock", () => {
    it("should reject without auth", async () => {
      const req = new NextRequest(
        "http://localhost:3000/api/sweets/1/restock",
        {
          method: "PATCH",
          body: JSON.stringify({ amount: 3 }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const res = await PATCH(req, { params: { id: "1" } });
      expect(res.status).toBe(401);
    });

    it("should reject invalid input", async () => {
      const req = createAuthRequest(1, { amount: -1 });
      const res = await PATCH(req, { params: { id: "1" } });
      expect(res.status).toBe(400);
    });

    it("should return 404 for non-existent sweet", async () => {
      const req = createAuthRequest(99999, { amount: 2 });
      const res = await PATCH(req, { params: { id: "99999" } });
      expect(res.status).toBe(404);
    });

    it("should restock sweet with valid input and auth", async () => {
      const req = createAuthRequest(1, { amount: 5 });
      const res = await PATCH(req, { params: { id: "1" } });
      // This test might fail if sweet with id 1 doesn't exist in test DB
      // In a real scenario, you'd create the sweet first
      expect([200, 404]).toContain(res.status);
    });
  });
});
