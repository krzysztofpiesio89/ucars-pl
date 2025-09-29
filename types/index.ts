import { Dispatch, SetStateAction, FormEvent, MouseEventHandler, ReactNode, ChangeEvent } from 'react';
import { Session } from 'next-auth';



export interface CustomButtonProps {
  title: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  containerStyle?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  icon?: ReactNode;
  
}

export interface CustomInputProps {
  label: string;
  placeholder: string;
  name: string;
  type?: string; // Znak '?' oznacza, że jest to pole opcjonalne
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
export interface SelectOption {
  value: string;
  title: string;
}

/**
 * Interfejs dla propsów komponentu CustomSelect.
 */
export interface CustomSelectProps {
  options: SelectOption[];
  onChange: (value: string, name: string) => void;
  label: string;
  name: string;
  containerStyle?: string;
  parentContainerStyle?: string;
}

/** Interfejst dla sesji  */

export interface ProviderProps {
  children: ReactNode;
  session: Session | null;
}

/**
 * Interfejs dla opcji w filtrach (np. w checkboxach).
 */
export interface FilterOption {
  value: string;
  label: string;
}

/**
 * Interfejs dla propsów wewnętrznego komponentu FilterCard.
 */
export interface FilterCardProps {
  title: string;
  category: keyof FilterProps; // Używamy kluczy z FilterProps dla bezpieczeństwa typów
  options: FilterOption[];
}

/**
 * Interfejs opisujący strukturę obiektu z aktywnymi filtrami.
 */
export interface FilterProps {
  brand: string[];
  cylinders: string[];
  fuelType: string[];
  buyNowPrice?: string[];

}
/**
 * Interfejs dla propsów głównego komponentu ShowAllCars.
 */
export interface ShowAllCarsProps {
  allCars: CarProps[]; // Zakładając, że CarProps już istnieje
  limit?: number;
  isLoading: boolean;
}


/**
 * Główny interfejs dla obiektu samochodu, zaktualizowany pod kątem danych z API aukcyjnego.
 */
export interface CarProps {
  id: number;
  stock: string;
  year: number;
  make: string;
  model: string;
  damageType: string;
  mileage: number | null;
  engineStatus: string;
  bidPrice: number;
  buyNowPrice?: number | null;
  auctionDate?: string;
  detailUrl: string;
  iaaiUrl: string;

  imageUrl: string;
  version?: string;
  origin?: string;
  vin?: string;
  engineInfo?: string;
  fuelType?: string;
  cylinders?: string;
  videoUrl?: string;
  is360?: boolean;
}

export interface FetchCarProps {
  manufacturer: string;
  year: number;
  fuelType: string;
  limit: number;
  model: string;
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


