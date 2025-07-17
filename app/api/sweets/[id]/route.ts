import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getTokenFromRequest, verifyAuthToken } from "../../../../lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = getTokenFromRequest(req);
  const user = token ? verifyAuthToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const idNum = Number(id);
  if (isNaN(idNum)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  const sweet = await prisma.sweet.findUnique({ where: { id: idNum } });
  if (!sweet) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await prisma.sweet.delete({ where: { id: idNum } });
  return NextResponse.json({ message: "Sweet deleted" }, { status: 200 });
}
