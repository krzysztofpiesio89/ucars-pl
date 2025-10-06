import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export const dynamic = 'force-dynamic';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    // --- POPRAWKA: Odczytujemy parametry ZAWSZE małymi literami ---
    const model = searchParams.get("model")?.trim() || undefined;
    const brand = searchParams.get("brand")?.trim() || undefined;
    const fuelType = searchParams.get("fueltype")?.trim() || undefined;
    const yearFrom = searchParams.get("yearfrom") ? parseInt(searchParams.get("yearfrom")!, 10) : undefined;
    const yearTo = searchParams.get("yearto") ? parseInt(searchParams.get("yearto")!, 10) : undefined;
    const priceFrom = searchParams.get("pricefrom") ? parseFloat(searchParams.get("pricefrom")!) : undefined;
    const priceTo = searchParams.get("priceto") ? parseFloat(searchParams.get("priceto")!) : undefined;
    const mileageTo = searchParams.get("mileageto") ? parseInt(searchParams.get("mileageto")!, 10) : undefined;
    const engineCapacityTo = searchParams.get("enginecapacityto") ? parseInt(searchParams.get("enginecapacityto")!, 10) : undefined;

    // Logika paginacji
    const rawPage = searchParams.get("page");
    let page = rawPage ? parseInt(rawPage, 10) : 1;
    if (isNaN(page)) {
      page = 1;
    }
    const limit = 10;
    const skip = (page - 1) * limit;

    // Budowanie obiektu 'where' (ta część jest już poprawna)
    const where: Record<string, any> = {};

    if (brand) {
      where.make = { contains: brand, mode: 'insensitive' };
    }
    if (model) {
      where.model = { contains: model, mode: 'insensitive' };
    }
    if (fuelType) {
      where.fuelType = { equals: fuelType, mode: 'insensitive' };
    }
    if (yearFrom || yearTo) {
      where.year = {};
      if (yearFrom && !isNaN(yearFrom)) where.year.gte = yearFrom;
      if (yearTo && !isNaN(yearTo)) where.year.lte = yearTo;
    }
    if (priceFrom || priceTo) {
      where.buyNowPrice = {};
      if (priceFrom && !isNaN(priceFrom)) where.buyNowPrice.gte = priceFrom;
      if (priceTo && !isNaN(priceTo)) where.buyNowPrice.lte = priceTo;
    }
    if (mileageTo && !isNaN(mileageTo)) {
      where.mileage = { lte: mileageTo };
    }
    if (engineCapacityTo && !isNaN(engineCapacityTo)) {
      where.engineCapacityL = { lte: engineCapacityTo };
    }

    console.log("Filtering with WHERE clause:", JSON.stringify(where, null, 2));

    const totalCars = await prisma.car.count({ where });

    const allCars = await prisma.car.findMany({
      where,
      take: limit,
      skip,
      orderBy: { createdAt: "desc" },
    });

    console.log(`Found ${allCars.length} cars out of ${totalCars} total.`);

    return NextResponse.json({ cars: allCars, totalCars }, { status: 200 });
  } catch (error) {
    console.error("GET /api/car error:", error);
    return NextResponse.json({ message: "Failed to fetch all cars" }, { status: 500 });
  }
};