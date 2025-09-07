// types/index.ts

/**
 * Główny interfejs dla obiektu samochodu, zgodny z modelem `Car` w Prisma.
 * Używany do wyświetlania szczegółów pojazdu.
 */
export interface CarProps {
  id: number;
  lotNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  odometer: number | null;
  primaryDamage: string | null;
  secondaryDamage: string | null;
  fuelType: string | null;
  transmission: string | null;
  drive: string | null;
  cylinders: number | null;
  bodyStyle: string | null;
  color: string | null;
  currentBid: number;
  buyItNowPrice: number | null;
  // Prisma `Json?` mapujemy na tablicę stringów lub null
  imageFiles: string[] | null; 
}

/**
 * Interfejs używany specjalnie dla formularza edycji samochodu.
 * Zawiera tylko te pola, które użytkownik może modyfikować.
 */
export interface CarFormProps {
  make: string;
  model: string;
  year: number;
  vin: string;
  lotNumber: string;
  odometer: number | null;
  primaryDamage: string | null;
  secondaryDamage: string | null;
  fuelType: string | null;
  transmission: string | null;
  drive: string | null;
  cylinders: number | null;
  bodyStyle: string | null;
  color: string | null;
  currentBid: number;
  buyItNowPrice: number | null;
  imageFiles: string[]; // W formularzu lepiej unikać `null` dla tablic
}

// Możesz tu również dodać inne typy, jeśli będą potrzebne w przyszłości