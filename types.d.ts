import { MouseEventHandler, ReactNode } from 'react';

export interface FuelsProps {
    fuel: string;
    id: number;
}

export interface CarProps {
  id: number;
  lotNumber: string;
  vin: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  odometer?: number;
  primaryDamage?: string;
  secondaryDamage?: string;
  lossType?: string;
  fuelType?: string;
  transmission?: string;
  drive?: string;
  cylinders?: number;
  bodyStyle?: string;
  color?: string;
  auctionDate?: string;
  auctionLocation?: string;
  saleStatus?: string;
  currentBid?: number;
  buyItNowPrice?: number;
  currency?: string;
  imageFiles?: string[] | string;
  source?: string;
  createdAt: string;
  updatedAt: string;

  creatorId?: number;
  creator?: {            // <--- teraz całkowicie opcjonalny
    id: number;
    name?: string;
    email?: string;
  } | null;

  // pola pomocnicze do filtrów
  manufacturer?: string;
  carTitle?: string;
  typeOfclass?: string;
  rentPrice?: number;
}
export interface CarInfoProps extends CarProps {
    creator?: Creator;
    _id?: string;
}

export interface CreatorProps {
    _id: string;
    email: string;
    username: string;
    email: string;
}

export interface FetchCarProps {
    manufacturer?: string;
    year?: number;
    model?: string;
    limit?: number;
    fuelType?: string;
}

export interface CardCardProps {
    car: CarProps;
    isFavorite?: boolean;
    handleDelete?: (id: string) => void;
    handleEdit?: (id: string) => void;
}

export interface CatalogueProps {
    allCars: CarProps[];
    limit: number;
    isLoading: boolean;
}

export interface CustomButtonProps {
    title: string;
    type: 'button' | 'submit' | 'reset';
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    icon?: JSX.Element | undefined;
    containerStyle?: string;
    isLoading?: boolean;
}

export interface CustomSelectProps {
    options: { value: string; title: string }[];
    label: string;
    containerStyle?: string;
    parentContainerStyle?: string;
    onChange: (value: string, name: string) => void;
    name: string;

}

export interface FilterProps {
    brand: string[];
    cylinders: string[];
    type: string[];
    drive: string[];
    fuelType: string[];
    rentPriceRange: string;
}

export interface ProviderProps {
    children: ReactNode;
    session: any;
}

export interface FileProps {
    path: string;
    lastModified: number;
    lastModifiedDate: Date;
    name: string
    size: number
    type: string;
    webkitRelativePath: string;
    base64: string;
}

export interface ImageUploaderProps {
    handleOnDrop: (acceptedFiles: File[]) => void;
    files: File[];
    carInfo?: CarInfoProps;
}

export interface CustomInputProps {
    label: string;
    placeholder: string;
    name: string;
    type?: 'text' | 'number' | 'radio' | 'number';
    value?: string | number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormProps {
    carInfo: CarInfoProps;
    setCarInfo: React.Dispatch<React.SetStateAction<CarInfoProps>>;
    submitBtnTitle: string;
    title: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isLoading?: boolean;
}

export interface ShowAllCarsProps {
    allCars: CarProps[];
    limit: number;
    isLoading: boolean;
}
export interface FilterCardProps {
    title: string,
    category: keyof FilterProps,
    options: { value: string, label: string }[]
}

export interface QueryProps {
    model?: string | null | undefined;
    limit?: string | null | undefined;
    fuelType?: string | null | undefined;
    year?: string | null | undefined;
    manufacturer?: string | null | undefined;
}
