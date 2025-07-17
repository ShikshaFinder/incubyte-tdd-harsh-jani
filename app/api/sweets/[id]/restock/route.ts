import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { getTokenFromRequest, verifyAuthToken } from "../../../../../lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = getTokenFromRequest(req);
  const user = token ? verifyAuthToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { amount } = await req.json();
  const id = Number(params.id);
  if (!amount || typeof amount !== "number" || amount <= 0 || isNaN(id)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const updated = await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity + amount },
  });
  return NextResponse.json(updated);
}
