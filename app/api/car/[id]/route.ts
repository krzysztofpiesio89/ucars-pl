import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// GET a car by id
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    // Prisma używa int dla id w Twoim modelu, więc konwertujemy z string
    const carId = parseInt(id, 10);

    const specificCar = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!specificCar) {
      return NextResponse.json({ message: "Car not found" }, { status: 404 });
    }

    return NextResponse.json(specificCar, { status: 200 });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ message: "Failed to get a specific car" }, { status: 500 });
  }
};
