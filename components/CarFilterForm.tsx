'use client';

import { useState } from 'react';
// useRouter został usunięty, ponieważ przekierowujemy na zewnętrzny URL
import { CustomSelect, CustomButton } from '@/components';
import carData from '@/data/car-data.json';
import { CarProps } from '@/types';

// 1. Zdefiniowano ostateczny, poprawny typ dla pojedynczej serii pojazdu
interface Serie {
    BrandID: number;
    ModelID: number | string;
    "Brand Name": string;
    "Model Name": string | number;
    "Serie Name": string;
    Years: string;
}

// Główny typ jest teraz poprawny
interface CarDataItem {
    brand: string;
    models: Record<string, Serie[]>;
}

const CarFilterForm = () => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedVersion, setSelectedVersion] = useState('');

    const handleBrandChange = (value: string) => {
        setSelectedBrand(value);
        setSelectedModel('');
        setSelectedVersion('');
    };

    const handleModelChange = (value: string) => {
        setSelectedModel(value);
        setSelectedVersion('');
    };

    const handleVersionChange = (value: string) => {
        setSelectedVersion(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (selectedBrand) {
            params.append('brand', selectedBrand.toLowerCase());
        }
        if (selectedModel) {
            params.append('model', selectedModel.toLowerCase());
        }
        if (selectedVersion) {
            params.append('version', selectedVersion.toLowerCase());
        }
        
        const queryString = params.toString();
        // Używamy window.location.href do przekierowania na pełny, zewnętrzny adres URL
        const finalUrl = `https://ucars-pl.vercel.app/view-all${queryString ? `?${queryString}` : ''}`;
        
        window.location.href = finalUrl;
    };

    // 2. Zastosowano podwójną asercję typu, aby spełnić wymagania TypeScript
    const typedCarData = carData as unknown as CarDataItem[];

    const brands = typedCarData.map(item => ({ value: item.brand, title: item.brand }));
    
    const models = selectedBrand 
        ? Object.keys(typedCarData.find(item => item.brand === selectedBrand)?.models || {})
            .map(model => ({ value: model, title: model })) 
        : [];
    
    const series = selectedModel 
        ? (typedCarData.find(item => item.brand === selectedBrand)?.models as Record<string, Serie[]>)[selectedModel]
            ?.map((serie: Serie) => ({ value: serie["Serie Name"], title: serie["Serie Name"] })) || [] 
        : [];

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <CustomSelect
                    label="Marka"
                    name="brand"
                    options={brands}
                    value={selectedBrand}
                    onChange={(value) => handleBrandChange(value)}
                />
                <CustomSelect
                    label="Model"
                    name="model"
                    options={models}
                    value={selectedModel}
                    onChange={(value) => handleModelChange(value)}
                    disabled={!selectedBrand}
                    containerStyle={!selectedBrand ? 'opacity-50 cursor-not-allowed' : ''}
                />
                <CustomSelect
                    label="Wersja"
                    name="version"
                    options={series}
                    value={selectedVersion}
                    onChange={(value) => handleVersionChange(value)}
                    disabled={!selectedModel}
                    containerStyle={!selectedModel ? 'opacity-50 cursor-not-allowed' : ''}
                />
                <CustomButton
                    title="Szukaj"
                    type="submit"
                    containerStyle='relative z-10 text-white rounded-full bg-primary-blue min-w-[130px]'
                />
            </div>
        </form>
    );
};

export default CarFilterForm;

