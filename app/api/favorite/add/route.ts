import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export const POST = async (req: Request) => {
  try {
    const favCar = await req.json();
    const { carId, creatorId } = favCar;

    if (!carId || !creatorId) {
      return NextResponse.json(
        { message: "Missing carId or creatorId" },
        { status: 400 }
      );
    }

    // Sprawdzamy, czy favorite już istnieje
    const existingFavorite = await prisma.favorite.findFirst({
      where: { carId, creatorId },
    });

    if (existingFavorite) {
      return NextResponse.json(
        { message: "Favorite already exists" },
        { status: 409 }
      );
    }

    // Tworzymy nowy rekord
    const newFavorite = await prisma.favorite.create({
      data: {
        carId,
        creatorId,
      },
    });

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to add favorite" },
      { status: 500 }
    );
  }
};
