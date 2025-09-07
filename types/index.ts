// types/index.ts

import { Dispatch, SetStateAction, FormEvent } from 'react';

/**
 * Główny interfejs dla obiektu samochodu, zgodny z modelem `Car` w Prisma.
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
  imageFiles: string[] | null;
}

/**
 * Interfejs używany specjalnie dla formularza dodawania/edycji samochodu.
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
export interface ImageUploaderProps {
  handleOnDrop: (files: File[]) => void;
  acceptedFiles: File[];      // Nowo dodane pliki (typ File)
  existingImageFiles: string[]; // Istniejące już obrazki (jako URL lub base64)
}