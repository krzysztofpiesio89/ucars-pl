import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export const dynamic = 'force-dynamic';

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
    const rawPage = searchParams.get("page");
    let page = rawPage ? parseInt(rawPage, 10) : 1;
    if (isNaN(page)) {
      page = 1;
    }
    const limit = 10;
    const skip = (page - 1) * limit;

    // Budujemy dynamiczny obiekt 'where' do Prisma
    const where: Record<string, any> = {};
    if (model && model !== "undefined") {
      where.model = { contains: model, mode: 'insensitive' };
    }
    if (make && make !== "undefined") {
      where.make = { contains: make, mode: 'insensitive' };
    }
    if (fuelType && fuelType !== "undefined") {
      where.fuelType = { contains: fuelType, mode: 'insensitive' };
    }
    if (year && !isNaN(year)) {
      where.year = year;
    }

    console.log("Filtering with WHERE clause:", where);

    const totalCars = await prisma.car.count({ where });

    const allCars = await prisma.car.findMany({
      where,
      take: limit,
      skip,
      orderBy: { createdAt: "desc" },
    });
    
    console.log(`Found ${allCars.length} cars.`);

    return NextResponse.json({ cars: allCars, totalCars }, { status: 200 });
  } catch (error) {
    console.error("GET /api/car error:", error);
    return NextResponse.json({ message: "Failed to fetch all cars" }, { status: 500 });
  }
};
