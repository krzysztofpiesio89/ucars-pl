'use client';

import { useState } from 'react';
import { CustomSelect, CustomButton } from '@/components';
import carData from '@/data/car-data.json';

// --- IKONY DLA NOWEGO INTERFEJSU ---
const CarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.94V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h1.34"/><path d="m18 18-4-4h-2"/><path d="M19 17h2v2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/><path d="M14 7.5c0-2.3-1.6-4-3.5-4S7 5.2 7 7.5c0 .4 0 .8.2 1.2l1.8 4.8h2.8l1.3-4c.4-.2.5-.5.5-.8z"/></svg>;
const ModelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l8.59-8.59a1 1 0 0 0 0-1.41L12 2z"/><path d="M7 7h.01"/></svg>;
const VersionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8.88a2 2 0 0 0 2-2v-8.88z"/><path d="M16 2v4h4"/><path d="M12 18a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/><path d="M8 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;


// Typy interfejsów (bez zmian)
interface Serie {
    BrandID: number;
    ModelID: number | string;
    "Brand Name": string;
    "Model Name": string | number;
    "Serie Name": string;
    Years: string;
}
interface CarDataItem {
    brand: string;
    models: Record<string, Serie[]>;
}

const CarFilterForm = () => {
    // --- CAŁA LOGIKA POZOSTAJE BEZ ZMIAN ---
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
        if (selectedBrand) params.append('brand', selectedBrand.toLowerCase());
        if (selectedModel) params.append('model', selectedModel.toLowerCase());
        if (selectedVersion) params.append('version', selectedVersion.toLowerCase());
        const queryString = params.toString();
        const finalUrl = `https://ucars-pl.vercel.app/view-all${queryString ? `?${queryString}` : ''}`;
        window.location.href = finalUrl;
    };

    const typedCarData = carData as unknown as CarDataItem[];
    const brands = typedCarData.map(item => ({ value: item.brand, title: item.brand }));
    const models = selectedBrand ? Object.keys(typedCarData.find(item => item.brand === selectedBrand)?.models || {}).map(model => ({ value: model, title: model })) : [];
    const series = selectedModel ? (typedCarData.find(item => item.brand === selectedBrand)?.models as Record<string, Serie[]>)[selectedModel]?.map((serie: Serie) => ({ value: serie["Serie Name"], title: serie["Serie Name"] })) || [] : [];

    // --- NOWY, PRZEBUDOWANY WYGLĄD ---
    return (
        <section className="w-full max-w-5xl mx-auto p-4 md:p-6 mb-8">
            <div className="text-center mb-8 z-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Wyszukaj Swoje Auto Marzeń
                </h2>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                    Zacznij swoją motoryzacyjną przygodę już teraz.
                </p>
            </div>
            
            <form 
                onSubmit={handleSubmit} 
                className="relative bg-white/10 dark:bg-slate-900/20 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-4 rounded-2xl shadow-2xl shadow-slate-900/10"
            >
                <div className="flex flex-col md:flex-row items-center gap-4">
                    
                    {/* Pole 1: Marka */}
                    <div className="w-full flex-1 flex items-center gap-3">
                        <span className="text-slate-500 dark:text-slate-400"><CarIcon /></span>
                        <CustomSelect
                            label="Marka"
                            name="brand"
                            options={brands}
                            value={selectedBrand}
                            onChange={(value) => handleBrandChange(value)}
                        />
                    </div>
                    
                    {/* Pole 2: Model */}
                    <div className={`w-full flex-1 flex items-center gap-3 transition-opacity duration-300 ${!selectedBrand ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
                         <span className="text-slate-500 dark:text-slate-400"><ModelIcon /></span>
                        <CustomSelect
                            label="Model"
                            name="model"
                            options={models}
                            value={selectedModel}
                            onChange={(value) => handleModelChange(value)}
                            disabled={!selectedBrand}
                        />
                    </div>

                    {/* Pole 3: Wersja */}
                    <div className={`w-full flex-1 flex items-center gap-3 transition-opacity duration-300 ${!selectedModel ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}>
                        <span className="text-slate-500 dark:text-slate-400"><VersionIcon /></span>
                        <CustomSelect
                            label="Wersja"
                            name="version"
                            options={series}
                            value={selectedVersion}
                            onChange={(value) => handleVersionChange(value)}
                            disabled={!selectedModel}
                        />
                    </div>

                    {/* Przycisk Szukaj */}
                    <div className="w-full md:w-auto">
                         <CustomButton
                            title="Szukaj"
                            rightIcon={<SearchIcon />}
                            type="submit"
                            containerStyle="w-full text-lg font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        />
                    </div>
                </div>
            </form>
        </section>
    );
};

export default CarFilterForm;