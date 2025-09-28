import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// GET a car by stock number
export const GET = async (req: Request, { params }: { params: { stock: string } }) => {
  const { stock } = params;

  try {
    const specificCar = await prisma.car.findUnique({
      where: { stock: stock },
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