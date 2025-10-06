
'use client';

import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { fuels, yearsOfProduction } from '@/constants';
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';
import CustomButton from './CustomButton';
import { FilterProps } from '@/types';

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterProps;
  setFilters: Dispatch<SetStateAction<FilterProps>>;
}

const AdvancedFilter = ({ isOpen, onClose, filters, setFilters }: AdvancedFilterProps) => {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = e.target.type === 'number' ? (value === '' ? undefined : Number(value)) : value;
    setFilters(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      brand: '',
      model: '',
      cylinders: [],
      fuelType: '',
      buyNowPrice: [],
      mileageTo: undefined,
      engineCapacityTo: undefined,
      priceFrom: undefined,
      priceTo: undefined,
      yearFrom: undefined,
      yearTo: undefined,
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Filter Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Filtry Zaawansowane</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300">
              <Image src="/icons/close.svg" alt="close" width={24} height={24} className="dark:invert" />
            </button>
          </div>

          {/* Filter Form */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6">
            <CustomInput label="Marka" name="brand" placeholder="np. BMW, Audi" containerStyles="w-full" value={filters.brand} onChange={handleInputChange} />
            <CustomInput label="Model" name="model" placeholder="np. A4, Seria 3" containerStyles="w-full" value={filters.model} onChange={handleInputChange} />
            <CustomInput label="Przebieg do (km)" name="mileageTo" type="number" placeholder="np. 150000" containerStyles="w-full" value={String(filters.mileageTo || '')} onChange={handleInputChange} />
            <CustomSelect label="Rodzaj paliwa" name="fuelType" options={fuels} containerStyle="w-full z-40" onChange={(value, name) => handleSelectChange(name, value)} value={filters.fuelType} />
            <CustomInput label="Pojemność do (cm³)" name="engineCapacityTo" type="number" placeholder="np. 1998" containerStyles="w-full" value={String(filters.engineCapacityTo || '')} onChange={handleInputChange} />
            <div className="flex gap-4">
              <CustomInput label="Cena od (PLN)" name="priceFrom" type="number" placeholder="0" containerStyles="w-full" value={String(filters.priceFrom || '')} onChange={handleInputChange} />
              <CustomInput label="Cena do (PLN)" name="priceTo" type="number" placeholder="100000" containerStyles="w-full" value={String(filters.priceTo || '')} onChange={handleInputChange} />
            </div>
            <div className="flex gap-4">
                <CustomSelect label="Rok od" name="yearFrom" options={yearsOfProduction} containerStyle="w-full z-30" onChange={(value, name) => handleSelectChange(name, value)} value={String(filters.yearFrom || '')} />
                <CustomSelect label="Rok do" name="yearTo" options={yearsOfProduction} containerStyle="w-full z-20" onChange={(value, name) => handleSelectChange(name, value)} value={String(filters.yearTo || '')} />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex gap-4">
              <CustomButton title="Wyczyść filtry" containerStyle="w-full bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200" handleClick={handleClearFilters} />
              <CustomButton title="Zastosuj" containerStyle="w-full bg-blue-600 text-white" handleClick={onClose} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilter;
