'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interfejs odpowiadający strukturze jednego obiektu samochodu w pliku JSON
interface AuctionCarData {
  stock: string;
  year: string;
  make: string;
  model: string;
  version?: string;
  damageType: string;
  mileage: string;
  engineStatus: string | null;
  origin?: string;
  vin?: string;
  engineInfo?: string;
  fuelType?: string;
  cylinders?: string;
  bidPrice: string;
  buyNowPrice?: string;
  videoUrl?: string;
  detailUrl: string;
  imageUrl: string;
}

// Funkcje pomocnicze do bezpiecznego parsowania i czyszczenia danych z JSON
const parseField = {
  toInt: (value?: string): number | null => {
    if (!value) return null;
    const parsed = parseInt(value.replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? null : parsed;
  },
  toFloat: (value?: string): number | null => {
    if (!value) return null;
    // Usuwa wszystkie znaki oprócz cyfr i kropki
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleanedValue);
    return isNaN(parsed) ? null : parsed;
  },
};

/**
 * Przetwarza i zapisuje dane samochodów z pliku JSON do bazy danych Prisma.
 * @param formData - Dane formularza zawierające plik JSON.
 * @returns Obiekt z informacją o sukcesie lub błędzie.
 */
export async function uploadCars(formData: FormData) {
  const file = formData.get('carDataFile') as File;

  if (!file || file.size === 0) {
    return { success: false, message: 'Nie wybrano pliku.' };
  }

  try {
    const fileContent = await file.text();
    const cars: AuctionCarData[] = JSON.parse(fileContent);

    if (!Array.isArray(cars)) {
      throw new Error('Plik JSON musi zawierać tablicę obiektów samochodów.');
    }

    // Przygotowanie operacji 'upsert' dla każdego samochodu
    const transactions = cars.map((car) => {
      // Mapowanie danych z JSON na pola w modelu Prisma `Car`
      const carDataForDb = {
        stock: car.stock,
        year: parseInt(car.year, 10), // Konwersja roku na liczbę
        make: car.make,
        model: car.model,
        damageType: car.damageType,
        mileage: parseField.toInt(car.mileage),
        engineStatus: car.engineStatus || 'Unknown', // Domyślna wartość, jeśli null
        bidPrice: parseField.toFloat(car.bidPrice) || 0, // Domyślna wartość, jeśli błąd parsowania
        buyNowPrice: parseField.toFloat(car.buyNowPrice),
        detailUrl: car.detailUrl,
        imageUrl: car.imageUrl,
        version: car.version,
        origin: car.origin,
        vin: car.vin,
        engineInfo: car.engineInfo,
        fuelType: car.fuelType,
        cylinders: car.cylinders,
        videoUrl: car.videoUrl,
      };

      // Używamy `upsert`, aby zaktualizować istniejący samochód (po numerze 'stock') lub stworzyć nowy.
      return prisma.car.upsert({
        where: { stock: carDataForDb.stock },
        update: carDataForDb,
        create: carDataForDb,
      });
    });

    // Wykonanie wszystkich operacji w jednej transakcji dla zapewnienia spójności danych
    const result = await prisma.$transaction(transactions);

    return {
      success: true,
      message: `Pomyślnie dodano lub zaktualizowano ${result.length} samochodów.`,
    };
  } catch (error: any) {
    console.error('Błąd podczas przetwarzania pliku:', error);
    let errorMessage = 'Wystąpił błąd podczas przetwarzania pliku.';
    if (error instanceof SyntaxError) {
      errorMessage = 'Plik nie jest poprawnym formatem JSON.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    return { success: false, message: errorMessage };
  }
}

