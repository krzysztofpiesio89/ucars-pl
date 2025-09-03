import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";





// GET all cars with optional filters
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    


    // Pobieramy i sanityzujemy parametry
    const model = searchParams.get("model")?.trim() || undefined;
    const manufacturer = searchParams.get("manufacturer")?.trim() || undefined;
    const fuelType = searchParams.get("fuelType")?.trim() || undefined;
    const year = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : undefined;
    let limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 25;

    if (isNaN(limit) || limit <= 0) limit = 25; // bezpieczeństwo

    // Budujemy dynamiczny obiekt 'where' do Prisma
    const where: Record<string, any> = {};
    if (model && model !== "undefined") where.model = model;
    if (manufacturer && manufacturer !== "undefined") where.make = manufacturer;
    if (fuelType && fuelType !== "undefined") where.fuelType = fuelType;
    if (year && !isNaN(year)) where.year = year;

    console.log("WHERE:", where);

    const allCars = await prisma.car.findMany({
      where,
      take: limit,
      orderBy: { id: "desc" }, // opcjonalnie sortowanie od najnowszych
    });
    console.log("CARS:", allCars);


    return NextResponse.json(allCars, { status: 200 });
  } catch (error) {
    console.error("GET /api/car error:", error);
    return NextResponse.json({ message: "Failed to fetch all cars" }, { status: 500 });
  }
};


