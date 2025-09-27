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
  auctionDate?: string;
  is360?: boolean; // Nowe pole
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
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleanedValue);
    return isNaN(parsed) ? null : parsed;
  },
  toDate: (value?: string): Date | null => {
    if (!value) return null;

    try {
        // Mapowanie popularnych amerykańskich stref czasowych na offset UTC
        const tzOffsets: { [key: string]: string } = {
            'EDT': '-04:00', 'EST': '-05:00',
            'CDT': '-05:00', 'CST': '-06:00',
            'MDT': '-06:00', 'MST': '-07:00',
            'PDT': '-07:00', 'PST': '-08:00',
        };

        const monthMap: { [key: string]: string } = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
            'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12',
        };

        // Przykładowy format: "Fri Sep 26, 8:30am CDT"
        const regex = /(\w{3})\s(\w{3})\s(\d{1,2}),?\s(\d{1,2}):(\d{2})(am|pm)\s(\w{3,4})/;
        const match = value.match(regex);
        
        if (!match) {
            console.warn(`Nie udało się przetworzyć daty za pomocą regex: ${value}`);
            return null;
        }

        const [, dayName, monthStr, day, hourStr, minute, ampm, tz] = match;

        const month = monthMap[monthStr];
        const year = new Date().getFullYear();
        
        let hour = parseInt(hourStr, 10);
        if (ampm.toLowerCase() === 'pm' && hour < 12) {
            hour += 12;
        }
        if (ampm.toLowerCase() === 'am' && hour === 12) { // Obsługa północy (12am)
            hour = 0;
        }

        const offset = tzOffsets[tz];
        
        if (!month || !offset) {
            console.warn(`Nie udało się przetworzyć daty: ${value}. Nieznany miesiąc lub strefa czasowa.`);
            return null;
        }

        const dayPadded = day.padStart(2, '0');
        const hourPadded = String(hour).padStart(2, '0');
        
        // Tworzenie daty w formacie ISO 8601, który jest uniwersalnie rozumiany
        const isoString = `${year}-${month}-${dayPadded}T${hourPadded}:${minute}:00${offset}`;
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

    const transactions = cars.map((car) => {
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
        is360: car.is360 || false, // Obsługa nowego pola
      };

      return prisma.car.upsert({
        where: { stock: carDataForDb.stock },
        update: carDataForDb,
        create: carDataForDb,
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

