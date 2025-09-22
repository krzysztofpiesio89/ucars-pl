// app/actions/uploadCars.ts
'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Typy pomocnicze odpowiadające strukturze JSON
interface VehicleInfo {
  'Stock #': string;
  'VIN (Status)': string;
  Model: string;
  Make?: string; // Zakładamy, że może istnieć
  Series?: string;
  Engine?: string;
  'Start Code'?: string;
  Odometer?: string;
  'Primary Damage'?: string;
  'Secondary Damage'?: string;
  'Loss'?: string;
  'Fuel Type'?: string;
  Transmission?: string;
  'Drive Line Type'?: string;
  Cylinders?: string;
  'Body Style'?: string;
  'Exterior/Interior'?: string;
  'Auction Date and Time'?: string;
  Branch?: string;
  'Buy Now Price'?: string;
  [key: string]: any; // Pozwala na inne, nieprzewidziane pola
}

interface CarImage {
  hdUrl: string;
  thumbUrl: string;
}

interface CarData {
  vehicleInfo: VehicleInfo;
  images: CarImage[];
}

// Funkcja pomocnicza do czyszczenia i parsowania wartości
const parseField = {
  toInt: (value?: string): number | null => {
    if (!value) return null;
    const parsed = parseInt(value.replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? null : parsed;
  },
  toFloat: (value?: string): number | null => {
    if (!value) return null;
    const parsed = parseFloat(value.replace(/[^0-9.]/g, ''));
    return isNaN(parsed) ? null : parsed;
  },
  toVin: (value?: string): string => {
    return value ? value.split('(')[0].trim() : 'UNKNOWN_VIN';
  },
  toDate: (value?: string): Date | null => {
    if (!value) return null;
    try {
      // Próba konwersji formatu 'Mon Sep 22, 8:30am (CDT)'
      // Ta prosta konwersja może wymagać bardziej zaawansowanej biblioteki jak date-fns lub moment.js
      // dla różnych stref czasowych i formatów.
      const date = new Date(value.split('(')[0].trim());
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      return null;
    }
  },
  toColor: (value?: string): string | null => {
    return value ? value.split('/')[0].trim() : null;
  },
};

/**
 * Przetwarza i zapisuje dane samochodów z pliku JSON do bazy danych.
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
    const cars: CarData[] = JSON.parse(fileContent);

    if (!Array.isArray(cars)) {
      throw new Error('Plik JSON musi zawierać tablicę obiektów.');
    }

    const transactions = cars.map((car) => {
      const info = car.vehicleInfo;
      const carToCreate = {
        lotNumber: info['Stock #'] || `UNKNOWN_${Date.now()}`,
        vin: parseField.toVin(info['VIN (Status)']),
        year: 2024, // Domyślna wartość, brak w JSON
        make: info.Make || 'Unknown', // Domyślna wartość, brak w JSON
        model: info.Model,
        trim: info.Series,
        engine: info.Engine,
        startCode: info['Start Code'],
        odometer: parseField.toInt(info.Odometer),
        primaryDamage: info['Primary Damage'],
        secondaryDamage: info['Secondary Damage'],
        lossType: info.Loss,
        fuelType: info['Fuel Type'],
        transmission: info.Transmission,
        drive: info['Drive Line Type'],
        cylinders: parseField.toInt(info.Cylinders),
        bodyStyle: info['Body Style'],
        color: parseField.toColor(info['Exterior/Interior']),
        auctionDate: parseField.toDate(info['Auction Date and Time']),
        auctionLocation: info.Branch,
        buyItNowPrice: parseField.toFloat(info['Buy Now Price']),
        imageFiles: car.images, // Zapisujemy całą strukturę JSON
        source: 'iaai', // Na podstawie przykładowych danych
      };

      // Używamy `upsert`, aby zaktualizować istniejący samochód (po lotNumber) lub stworzyć nowy.
      return prisma.car.upsert({
        where: { lotNumber: carToCreate.lotNumber },
        update: carToCreate,
        create: carToCreate,
      });
    });

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
