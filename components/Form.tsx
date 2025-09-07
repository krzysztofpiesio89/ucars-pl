'use client'

import { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FormProps } from '@/types';   
import { CarFormProps } from '../types/index';
import CustomInput from './CustomInput';
import CustomSelect from './CustomSelect';
import ImageUploader from './ImageUploader';
import CustomButton from './CustomButton';

// Opcje dla selectów można wynieść dla czytelności
const transmissionOptions = [{ title: 'Automatic', value: 'Automatic' }, { title: 'Manual', value: 'Manual' }];
const fuelTypeOptions = [{ title: 'Gasoline', value: 'Gasoline' }, { title: 'Diesel', value: 'Diesel' }, { title: 'Electric', value: 'Electric' }];
const driveOptions = [{ title: 'FWD', value: 'FWD' }, { title: 'RWD', value: 'RWD' }, { title: 'AWD', value: 'AWD' }];

const Form = ({ carInfo, setCarInfo, submitBtnTitle, title, handleSubmit, isLoading }: FormProps) => {
    
    const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

    // POPRAWIONA, BEZPIECZNA LOGIKA KONWERSJI OBRAZÓW DO BASE64
    useEffect(() => {
        if (acceptedFiles.length === 0) {
            setCarInfo(prev => ({ ...prev, imageFiles: [] }));
            return;
        }

        const filePromises = acceptedFiles.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(filePromises)
            .then(base64Images => {
                // Używamy setCarInfo do bezpiecznej aktualizacji stanu
                setCarInfo(prev => ({ ...prev, imageFiles: base64Images }));
            })
            .catch(error => {
                console.error("Error converting files to base64:", error);
                toast.error("Could not process images.");
            });
    }, [acceptedFiles, setCarInfo]);

    // Generyczna funkcja do obsługi zmian w inputach
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setCarInfo(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || null : value,
        }));
    };

    // Generyczna funkcja do obsługi zmian w selectach
    const handleSelectChange = (value: string, name: string) => {
        setCarInfo(prev => ({
            ...prev,
            [name]: name === 'year' || name === 'cylinders' ? parseInt(value, 10) : value,
        }));
    };

    return (
        <form className='max-w-4xl mx-auto p-4 md:p-8 rounded-lg space-y-8' onSubmit={handleSubmit}>
            <div>
                <h1 className='text-3xl font-bold'>{title}</h1>
                <p className='text-gray-500 mt-1'>Please fill in the vehicle ℹ️ information below.</p>
            </div>

            {/* SEKCJA: IDENTYFIKACJA POJAZDU */}
            <div className='space-y-6 border-t pt-6'>
                <h2 className='text-xl font-semibold text-blue-600'>Vehicle Identity</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomInput label='Make' name='make' placeholder='e.g., Ford' value={carInfo.make} onChange={handleInputChange} />
                    <CustomInput label='Model' name='model' placeholder='e.g., Mustang' value={carInfo.model} onChange={handleInputChange} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <CustomInput label='Year' name='year' placeholder='e.g., 2023' type='number' value={carInfo.year} onChange={handleInputChange} />
                    <CustomInput label='VIN' name='vin' placeholder='Vehicle Identification Number' value={carInfo.vin} onChange={handleInputChange} />
                    <CustomInput label='Lot Number' name='lotNumber' placeholder='Auction Lot Number' value={carInfo.lotNumber} onChange={handleInputChange} />
                </div>
            </div>

            {/* SEKCJA: STAN I SPECYFIKACJA */}
            <div className='space-y-6 border-t pt-6'>
                <h2 className='text-xl font-semibold text-blue-600'>Condition & Specs</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                     <CustomInput label='Odometer (miles)' name='odometer' placeholder='e.g., 50000' type='number' value={carInfo.odometer ?? ''} onChange={handleInputChange} />
                     <CustomInput label='Color' name='color' placeholder='e.g., Red' value={carInfo.color ?? ''} onChange={handleInputChange} />
                     <CustomInput label='Body Style' name='bodyStyle' placeholder='e.g., Coupe' value={carInfo.bodyStyle ?? ''} onChange={handleInputChange} />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomInput label='Primary Damage' name='primaryDamage' placeholder='e.g., Front End' value={carInfo.primaryDamage ?? ''} onChange={handleInputChange} />
                    <CustomInput label='Secondary Damage' name='secondaryDamage' placeholder='e.g., Side' value={carInfo.secondaryDamage ?? ''} onChange={handleInputChange} />
                </div>
                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <CustomSelect label='Transmission' name='transmission' options={transmissionOptions} onChange={handleSelectChange} />
                    <CustomSelect label='Fuel Type' name='fuelType' options={fuelTypeOptions} onChange={handleSelectChange} />
                    <CustomSelect label='Drive' name='drive' options={driveOptions} onChange={handleSelectChange} />
                    <CustomInput label='Cylinders' name='cylinders' type='number' placeholder='e.g., 8' value={carInfo.cylinders ?? ''} onChange={handleInputChange} />
                </div>
            </div>

            {/* SEKCJA: CENA AUKCYJNA */}
            <div className='space-y-6 border-t pt-6'>
                 <h2 className='text-xl font-semibold text-blue-600'>Auction Pricing</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <CustomInput label='Current Bid ($)' name='currentBid' placeholder='e.g., 15000' type='number' value={carInfo.currentBid} onChange={handleInputChange} />
                    <CustomInput label='Buy It Now Price ($)' name='buyItNowPrice' placeholder='(Optional)' type='number' value={carInfo.buyItNowPrice ?? ''} onChange={handleInputChange} />
                </div>
            </div>

            {/* SEKCJA: ZDJĘCIA */}
            <div className='space-y-4 border-t pt-6'>
                <h2 className='text-xl font-semibold text-blue-600'>Vehicle Images</h2>
                <ImageUploader files={acceptedFiles} handleOnDrop={setAcceptedFiles} carInfo={carInfo as CarFormProps} />
            </div>

            <div className='flex justify-end pt-6'>
                <CustomButton title={submitBtnTitle} type='submit' containerStyle='bg-blue-600 text-white rounded-full px-8 py-3' isLoading={isLoading} />
            </div>
        </form>
    );
};

export default Form;