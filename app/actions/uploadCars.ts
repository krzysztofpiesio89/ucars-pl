'use server';

import { PrismaClient } from '@prisma/client';
import { parseEngineInfo } from '@/utils/engineParser';
import {
  startJob,
  updateJobProgress,
  completeJob,
  failJob,
} from '@/utils/uploadProgress';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

// Interfejs odpowiadający strukturze jednego obiektu samochodu w pliku JSON
interface AuctionCarData {
  stock: string;
  year: string;
  make: string;
  model: string;
  version?: string;
  auctionDate?: string;
  is360?: boolean;
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
    const cleanedValue = value.replace(/,/g, '').replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleanedValue);
    return isNaN(parsed) ? null : parsed;
  },
  toDate: (value?: string): Date | null => {
    if (!value) return null;

    try {
        const monthMap: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
        };

        const tzOffsets: { [key: string]: string } = {
            'EDT': '-04:00', 'EST': '-05:00',
            'CDT': '-05:00', 'CST': '-06:00',
            'MDT': '-06:00', 'MST': '-07:00',
            'PDT': '-07:00', 'PST': '-08:00',
        };
        
        const dateParts = value.match(/(\w{3})\s(\d{1,2})/);
        const timeParts = value.match(/(\d{1,2})(?::(\d{2}))?(am|pm)\s([A-Z]{3})/);
        
        if (!dateParts || !timeParts) {
            console.warn(`Nie udało się przetworzyć daty (nowy regex): ${value}`);
            return null;
        }

        const [, monthStr, day] = dateParts;
        const [, hourStr, minute, ampm, tz] = timeParts;
        const finalMinute = minute || '00';
        const month = monthMap[monthStr];
        const year = new Date().getFullYear(); 

        let hour = parseInt(hourStr, 10);
        if (ampm.toLowerCase() === 'pm' && hour < 12) hour += 12;
        if (ampm.toLowerCase() === 'am' && hour === 12) hour = 0; 

        const offset = tzOffsets[tz];
        if (!month || !offset) {
            console.warn(`Nieznany miesiąc lub strefa czasowa w dacie: ${value}`);
            return null;
        }

        const isoString = `${year}-${month}-${day.padStart(2, '0')}T${String(hour).padStart(2, '0')}:${finalMinute}:00${offset}`;
        const finalDate = new Date(isoString);

        if (isNaN(finalDate.getTime())) {
            console.warn(`Nie udało się stworzyć poprawnej daty z ciągu ISO: ${isoString}`);
            return null;
        }

        return finalDate;
    } catch (error) {
        console.error(`Błąd podczas parsowania daty "${value}":`, error);
        return null;
    }
  }
};

async function processCarsFile(jobId: string, formData: FormData) {
  const file = formData.get('carDataFile') as File;

  try {
    const fileContent = await file.text();
    const cars: AuctionCarData[] = JSON.parse(fileContent);

    if (!Array.isArray(cars)) {
      throw new Error('Plik JSON musi zawierać tablicę obiektów samochodów.');
    }

    const totalCars = cars.length;
    const batchSize = 1000;
    let totalProcessed = 0;

    updateJobProgress(jobId, 0, totalCars);

    for (let i = 0; i < cars.length; i += batchSize) {
      const batch = cars.slice(i, i + batchSize);

      const transactions = batch.map((car) => {
        const parsedEngineData = car.engineInfo ? parseEngineInfo(car.engineInfo) : {};

        const carDataForDb = {
          stock: car.stock,
          year: parseInt(car.year, 10),
          make: car.make,
          model: car.model,
          damageType: car.damageType,
          mileage: parseField.toInt(car.mileage),
          engineStatus: car.engineStatus || 'Unknown',
          bidPrice: parseField.toFloat(car.bidPrice) || 0,
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
          auctionDate: parseField.toDate(car.auctionDate),
          is360: car.is360 || false,
          ...parsedEngineData,
        };

        return prisma.car.upsert({
          where: { stock: carDataForDb.stock },
          update: carDataForDb,
          create: carDataForDb,
        });
      });

      const result = await prisma.$transaction(transactions);
      totalProcessed += result.length;

      updateJobProgress(jobId, totalProcessed, totalCars);
    }

    completeJob(jobId, `Pomyślnie dodano lub zaktualizowano ${totalProcessed} samochodów.`);

  } catch (error: any) {
    console.error('Błąd podczas przetwarzania pliku:', error);
    let errorMessage = 'Wystąpił błąd podczas przetwarzania pliku.';
    if (error instanceof SyntaxError) {
      errorMessage = 'Plik nie jest poprawnym formatem JSON.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    failJob(jobId, errorMessage);
  }
}

/**
 * Starts the car upload process and returns a job ID for tracking.
 * @param formData - Dane formularza zawierające plik JSON.
 * @returns Obiekt z jobId lub informacją o błędzie.
 */
export async function uploadCars(formData: FormData) {
  const file = formData.get('carDataFile') as File;

  if (!file || file.size === 0) {
    return { success: false, message: 'Nie wybrano pliku.' };
  }

  const jobId = randomUUID();
  startJob(jobId);

  // Don't await this, let it run in the background on the server.
  // NOTE: This has implications in serverless environments where the
  // function might terminate before the background task is complete.
  // For Vercel, this should be okay for tasks under ~15 seconds.
  // For longer tasks, a different solution (like Vercel Functions, or a queue) is needed.
  processCarsFile(jobId, formData);

  return { success: true, jobId };
}