import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const memberships = await prisma.membership.findMany();
  return NextResponse.json(memberships);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newMembership = await prisma.membership.create({
    data: {
      id: data.id,
      name: data.name,
      issueDate: new Date(data.issueDate),
      endDate: new Date(data.endDate),
      price: parseFloat(data.price),
    },
  });
  return NextResponse.json(newMembership);
}
