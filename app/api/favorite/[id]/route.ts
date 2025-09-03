import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// GET all favorites for a specific user
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const userId = parseInt(id, 10);

    const favorites = await prisma.favorite.findMany({
      where: { creatorId: userId },
      include: { creator: true, car: true }, // jeśli chcesz pobrać też powiązane car i creator
    });

    return NextResponse.json(favorites, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Unable to fetch all favorites" }, { status: 500 });
  }
};
