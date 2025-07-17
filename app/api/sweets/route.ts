import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getTokenFromRequest, verifyAuthToken } from "../../../lib/auth";

export async function GET(req: NextRequest) {
  const token = getTokenFromRequest(req);
  const user = token ? verifyAuthToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") || undefined;
  const category = searchParams.get("category") || undefined;
  const minPrice = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const sortBy = searchParams.get("sortBy") || undefined; // name, category, price, quantity
  const sortOrder = searchParams.get("sortOrder") === "desc" ? "desc" : "asc";

  const where: any = {};
  if (name) {
    where.name = { contains: name, mode: "insensitive" };
  }
  if (category) {
    where.category = { contains: category, mode: "insensitive" };
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  const orderBy = sortBy ? { [sortBy]: sortOrder } : undefined;

  const sweets = await prisma.sweet.findMany({
    where,
    orderBy,
  });
  return NextResponse.json(sweets);
}

export async function POST(req: NextRequest) {
  const token = getTokenFromRequest(req);
  const user = token ? verifyAuthToken(token) : null;
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { name, category, price, quantity } = await req.json();
  if (
    !name ||
    !category ||
    typeof price !== "number" ||
    typeof quantity !== "number" ||
    price < 0 ||
    quantity < 0
  ) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const sweet = await prisma.sweet.create({
    data: { name, category, price, quantity },
  });
  return NextResponse.json(sweet, { status: 201 });
}
