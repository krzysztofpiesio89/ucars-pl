import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

// GET all cars with optional filters, adapted for the new schema
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // Pobieramy i sanityzujemy parametry
    const model = searchParams.get("model")?.trim() || undefined;
    // ZMIANA: 'manufacturer' został zastąpiony przez 'make'
    const make = searchParams.get("make")?.trim() || undefined; 
    const fuelType = searchParams.get("fuelType")?.trim() || undefined;
    const year = searchParams.get("year") ? parseInt(searchParams.get("year")!, 10) : undefined;
    let limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 25;

    // Zabezpieczenie na wypadek nieprawidłowej wartości 'limit'
    if (isNaN(limit) || limit <= 0) {
      limit = 25;
    }

    // Budujemy dynamiczny obiekt 'where' do Prisma
    const where: Record<string, any> = {};
    if (model && model !== "undefined") {
      where.model = { contains: model, mode: 'insensitive' };
    }
    if (make && make !== "undefined") {
       // Używamy 'make' zamiast 'manufacturer'
      where.make = { contains: make, mode: 'insensitive' };
    }
    if (fuelType && fuelType !== "undefined") {
      where.fuelType = { contains: fuelType, mode: 'insensitive' };
    }
    if (year && !isNaN(year)) {
      where.year = year;
    }

    console.log("Filtering with WHERE clause:", where);

    const allCars = await prisma.car.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" }, // Sortowanie od najnowszych dodanych
    });
    
    console.log(`Found ${allCars.length} cars.`);

    return NextResponse.json(allCars, { status: 200 });
  } catch (error) {
    console.error("GET /api/car error:", error);
    return NextResponse.json({ message: "Failed to fetch all cars" }, { status: 500 });
  }
};
