import prisma from '@/utils/prisma';
import { CarProps } from '@/types';

// Pobranie samochodów z bazy danych z możliwością filtrowania
export const fetchCars = async ({
  manufacturer,
  year,
  model,
  limit = 25,
  fuelType,
}: {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuelType?: string;
}) => {
  try {
    const cars = await prisma.car.findMany({
      where: {
        make: manufacturer || undefined,
        model: model || undefined,
        fuelType: fuelType || undefined,
        year: year || undefined,
      },
      take: limit,
    });
    return cars;
  } catch (error) {
    console.error('fetchCars error:', error);
    return [];
  }
};

// Pobranie ulubionych samochodów dla użytkownika
export const fetchFavoriteCars = async (userId: number) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: { creatorId: userId },
      include: { car: true },
    });
    return favorites;
  } catch (error) {
    console.error('fetchFavoriteCars error:', error);
    return [];
  }
};

// Dodanie samochodu do ulubionych
export const addToFavorites = async (userId: number, carId: number) => {
  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        creatorId: userId,
        carId: carId,
      },
    });

    if (existingFavorite) {
      return { success: false, message: 'Car is already in favorites' };
    }

    const favorite = await prisma.favorite.create({
      data: {
        creatorId: userId,
        carId: carId,
      },
    });

    return { success: true, favorite };
  } catch (error) {
    console.error('addToFavorites error:', error);
    return { success: false, message: 'Failed to add to favorites' };
  }
};

// Usunięcie samochodu z ulubionych
export const removeFromFavorites = async (userId: number, carId: number) => {
  try {
    const deleted = await prisma.favorite.deleteMany({
      where: {
        creatorId: userId,
        carId: carId,
      },
    });

    if (deleted.count === 0) {
      return { success: false, message: 'Favorite not found' };
    }

    return { success: true, message: 'Removed from favorites' };
  } catch (error) {
    console.error('removeFromFavorites error:', error);
    return { success: false, message: 'Failed to remove from favorites' };
  }
};

// Sprawdzenie czy samochód jest w ulubionych
export const isCarFavorite = async (userId: number, carId: number) => {
  try {
    const favorite = await prisma.favorite.findFirst({
      where: {
        creatorId: userId,
        carId: carId,
      },
    });

    return !!favorite;
  } catch (error) {
    console.error('isCarFavorite error:', error);
    return false;
  }
};

// Pobranie pojedynczego samochodu po ID
export const fetchCarById = async (carId: number) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id: carId },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return car;
  } catch (error) {
    console.error('fetchCarById error:', error);
    return null;
  }
};

// Generowanie URL obrazka samochodu (poprawione - używa make zamiast manufacturer)
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL('https://cdn.imagin.studio/getimage');
  const { year, make, model } = car; // zmienione z manufacturer na make

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make); // używamy make z bazy danych
  url.searchParams.append('modelFamily', model.split(' ')[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', year.toString());
  if (angle) url.searchParams.append('angle', angle);

  return url.toString();
};

// Aktualizacja parametrów wyszukiwania w URL (frontend)
export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);

  if (value) {
    searchParams.set(type, value);
  } else {
    searchParams.delete(type);
  }

  return `${window.location.pathname}?${searchParams.toString()}`;
};

// Pobranie wszystkich unikalnych producentów
export const fetchManufacturers = async () => {
  try {
    const manufacturers = await prisma.car.findMany({
      select: {
        make: true,
      },
      distinct: ['make'],
      orderBy: {
        make: 'asc',
      },
    });

    return manufacturers.map(car => car.make);
  } catch (error) {
    console.error('fetchManufacturers error:', error);
    return [];
  }
};

// Pobranie wszystkich unikalnych typów paliwa
export const fetchFuelTypes = async () => {
  try {
    const fuelTypes = await prisma.car.findMany({
      select: {
        fuelType: true,
      },
      distinct: ['fuelType'],
      where: {
        fuelType: {
          not: null,
        },
      },
      orderBy: {
        fuelType: 'asc',
      },
    });

    return fuelTypes.map(car => car.fuelType).filter(Boolean);
  } catch (error) {
    console.error('fetchFuelTypes error:', error);
    return [];
  }
};