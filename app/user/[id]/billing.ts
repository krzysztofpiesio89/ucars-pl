import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

/**
 * GET - Pobiera dane rozliczeniowe dla danego użytkownika.
 */
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
  }

  try {
    const billingDetails = await prisma.billingDetails.findUnique({
      where: { userId },
    });
    return NextResponse.json(billingDetails, { status: 200 });
  } catch (error) {
    console.error("GET /api/user/billing error:", error);
    return NextResponse.json({ message: "Failed to fetch billing details" }, { status: 500 });
  }
};

/**
 * POST - Tworzy lub aktualizuje dane rozliczeniowe użytkownika.
 */
export const POST = async (req: Request, { params }: { params: { id: string } }) => {
  const userId = parseInt(params.id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ message: "Invalid User ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    
    // Walidacja podstawowych pól
    const { addressLine1, city, postalCode, country, accountType } = body;
    if (!addressLine1 || !city || !postalCode || !country || !accountType) {
        return NextResponse.json({ message: "Podstawowe dane adresowe są wymagane." }, { status: 400 });
    }

    const upsertedDetails = await prisma.billingDetails.upsert({
      where: { userId },
      update: body,
      create: { ...body, userId },
    });

    return NextResponse.json(upsertedDetails, { status: 200 });
  } catch (error) {
    console.error("POST /api/user/billing error:", error);
    return NextResponse.json({ message: "Failed to save billing details" }, { status: 500 });
  }
};

