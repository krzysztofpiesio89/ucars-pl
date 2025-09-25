import { Dispatch, SetStateAction, FormEvent } from 'react';

/**
 * Główny interfejs dla obiektu samochodu, zaktualizowany pod kątem danych z API aukcyjnego.
 */
export interface CarProps {
  stock: string;
  year: string;
  make: string;
  model: string;
  damageType: string;
  mileage: string;
  engineStatus: string;
  bidPrice: string;
  buyNowPrice?: string;
  detailUrl: string;
  imageUrl: string;
  version?: string;
  origin?: string;
  vin?: string;
  engineInfo?: string;
  fuelType?: string;
  cylinders?: string;
  videoUrl?: string;
}

/**
 * Interfejs używany specjalnie dla formularza dodawania/edycji samochodu.
 * (Pozostawiony bez zmian na potrzeby istniejących formularzy).
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
  imageFiles: string[];
}

/**
 * Interfejs dla propsów komponentu Form.
 * Definiuje, jakie właściwości komponent Form przyjmuje.
 */
export interface FormProps {
    carInfo: CarFormProps;
    setCarInfo: Dispatch<SetStateAction<CarFormProps>>;
    submitBtnTitle: string;
    title: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

/**
 * Interfejs dla propsów komponentu do przesyłania obrazów.
 */
export interface ImageUploaderProps {
  handleOnDrop: (files: File[]) => void;
  acceptedFiles: File[];      // Nowo dodane pliki (typ File)
  existingImageFiles: string[]; // Istniejące już obrazki (jako URL lub base64)
}

