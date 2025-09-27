import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { Car, Favorite } from "@prisma/client"; // Dodajemy import typów z Prisma

// Tworzymy typ pomocniczy, aby TypeScript wiedział, że obiekt Favorite zawiera też Car
type FavoriteWithCar = Favorite & { car: Car };

/**
 * GET - Pobiera listę ulubionych samochodów dla danego użytkownika.
 * Oczekuje parametru ?userId=... w URL.
 */
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "User ID is required" }, { status: 400 });
  }

  try {
    const favorites: FavoriteWithCar[] = await prisma.favorite.findMany({
      where: { userId: parseInt(userId, 10) },
      include: {
        car: true, // Dołączamy pełne dane samochodu
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Zwracamy tylko listę obiektów samochodów, a nie całe obiekty 'favorite'
    const favoriteCars = favorites.map((fav: FavoriteWithCar) => fav.car);

    return NextResponse.json(favoriteCars, { status: 200 });
  } catch (error) {
    console.error("GET /api/favorites error:", error);
    return NextResponse.json({ message: "Failed to fetch favorite cars" }, { status: 500 });
  }
};

/**
 * POST - Dodaje samochód do listy ulubionych użytkownika.
 * Oczekuje w ciele zapytania: { userId: number, carId: number }
 */
export const POST = async (req: Request) => {
  try {
    const { userId, carId } = await req.json();

    if (!userId || !carId) {
      return NextResponse.json({ message: "User ID and Car ID are required" }, { status: 400 });
    }

    // Sprawdzamy, czy ulubione już istnieje, aby uniknąć błędów
    const existingFavorite = await prisma.favorite.findUnique({
        where: {
            userId_carId: { userId, carId }
        }
    });

    if (existingFavorite) {
        return NextResponse.json({ message: "Car is already in favorites" }, { status: 409 }); // 409 Conflict
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        userId,
        carId,
      },
    });

    return NextResponse.json(newFavorite, { status: 201 });
  } catch (error) {
    console.error("POST /api/favorites error:", error);
    return NextResponse.json({ message: "Failed to add car to favorites" }, { status: 500 });
  }
};

/**
 * DELETE - Usuwa samochód z listy ulubionych użytkownika.
 * Oczekuje w ciele zapytania: { userId: number, carId: number }
 */
export const DELETE = async (req: Request) => {
  try {
    const { userId, carId } = await req.json();

    if (!userId || !carId) {
      return NextResponse.json({ message: "User ID and Car ID are required" }, { status: 400 });
    }

    await prisma.favorite.delete({
      where: {
        userId_carId: { // Używamy unikalnego indeksu do precyzyjnego usuwania
          userId,
          carId,
        },
      },
    });

    return NextResponse.json({ message: "Car removed from favorites successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/favorites error:", error);
    return NextResponse.json({ message: "Failed to remove car from favorites" }, { status: 500 });
  }
};Q

