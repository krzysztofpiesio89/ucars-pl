import prisma from '@/utils/prisma';
import { CarProps } from '@/types'; // Używamy 'CarProps' zgodnie z prośbą

export const updateMultipleSearchParams = (filters: Record<string, any>) => {
  const searchParams = new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(filters)) {
    if (value) {
      searchParams.set(key.toLowerCase(), String(value).toLowerCase());
    } else {
      searchParams.delete(key.toLowerCase());
    }
  }

  return `${window.location.pathname}?${searchParams.toString()}`;
};


// --- FUNKCJE DO WSPÓŁPRACY Z BAZĄ DANYCH (POPRAWIONE) ---

/**
 * Pobranie ulubionych samochodów dla danego użytkownika.
 * @param userId - ID użytkownika (jako string).
 */
export const fetchFavoriteCars = async (userId: string) => { // POPRAWKA: userId jest teraz stringiem
  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: userId },
      include: { car: true }, // Dołączamy pełne dane polubionego samochodu
    });
    // Zwracamy tylko obiekty samochodów
    return favorites.map(fav => fav.car);
  } catch (error) {
    console.error('fetchFavoriteCars error:', error);
    return [];
  }
};

/**
 * Dodanie samochodu do ulubionych.
 * @param userId - ID użytkownika (jako string).
 * @param carId - ID samochodu z naszej bazy danych.
 */
export const addToFavorites = async (userId: string, carId: number) => { // POPRAWKA: userId jest teraz stringiem
  try {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_carId: { // Używamy unikalnego indeksu @@unique([userId, carId])
          userId,
          carId,
        },
      },
    });

    if (existingFavorite) {
      return { success: false, message: 'Samochód jest już w ulubionych.' };
    }

    const favorite = await prisma.favorite.create({
      data: { userId, carId },
    });

    return { success: true, favorite };
  } catch (error) {
    console.error('addToFavorites error:', error);
    return { success: false, message: 'Nie udało się dodać do ulubionych.' };
  }
};

/**
 * Usunięcie samochodu z ulubionych.
 * @param userId - ID użytkownika (jako string).
 * @param carId - ID samochodu.
 */
export const removeFromFavorites = async (userId: string, carId: number) => { // POPRAWKA: userId jest teraz stringiem
  try {
    await prisma.favorite.delete({
      where: {
        userId_carId: { // Używamy unikalnego indeksu do precyzyjnego usuwania
          userId,
          carId,
        },
      },
    });

    return { success: true, message: 'Usunięto z ulubionych.' };
  } catch (error) {
    console.error('removeFromFavorites error:', error);
    return { success: false, message: 'Nie udało się usunąć z ulubionych.' };
  }
};

/**
 * Sprawdzenie, czy samochód jest w ulubionych danego użytkownika.
 * @param userId - ID użytkownika (jako string).
 * @param carId - ID samochodu.
 */
export const isCarFavorite = async (userId: string, carId: number) => { // POPRAWKA: userId jest teraz stringiem
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_carId: { userId, carId },
      },
    });
    return !!favorite; // Zwraca true jeśli obiekt istnieje, w przeciwnym razie false
  } catch (error) {
    console.error('isCarFavorite error:', error);
    return false;
  }
};