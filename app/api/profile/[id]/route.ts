import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// GET - pobranie profilu użytkownika
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const profile = await prisma.user.findUnique({
      where: { id: id },
    });

    if (!profile) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to get user" }, { status: 500 });
  }
};