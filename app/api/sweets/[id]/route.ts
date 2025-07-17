import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getTokenFromRequest, verifyAuthToken } from "../../../../lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = getTokenFromRequest(req);
  const user = token ? verifyAuthToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  const sweet = await prisma.sweet.findUnique({ where: { id } });
  if (!sweet) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.sweet.delete({ where: { id } });
  return NextResponse.json({ message: "Sweet deleted" }, { status: 200 });
}
