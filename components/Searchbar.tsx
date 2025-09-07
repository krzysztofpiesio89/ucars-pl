'use client'
import { manufacturers } from '@/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { RiSearchLine } from 'react-icons/ri';

const Searchbar = () => {
    const router = useRouter();
    const [manufacturer, setManufacturer] = useState('');
    const [carName, setCarName] = useState('');
    const [isManufacturerListShown, setIsManufacturerListShown] = useState(false);
    const [filteredManufacturers, setFilteredManufacturers] = useState<string[]>([]);

    const manufacturerHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setManufacturer(e.target.value);
        setIsManufacturerListShown(true);
        const filteredResults = manufacturers.filter((item) => item.replaceAll(' ', '').toLowerCase().includes(e.target.value.replaceAll(' ', '').toLowerCase()));
        setFilteredManufacturers(filteredResults);
    }
    const handleManfacturerItemClick = (item: string) => {
        setManufacturer(item);
        setIsManufacturerListShown(false);
    }

    const handleCarNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCarName(e.target.value);
    }
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (manufacturer === '' && carName === '') {
            return toast.error('Wprowadź markę lub model samochodu');
        }
        updateSearchParams(carName.toLowerCase(), manufacturer.toLowerCase());
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search);
        if (model) {
            searchParams.set('model', model);
        } else {
            searchParams.delete('model');
        }
        if (manufacturer) {
            searchParams.set('manufacturer', 'make'); // Zgodnie z API powinno być 'make'
        } else {
            searchParams.delete('manufacturer');
        }

        const newPathname = `/view-all?${searchParams.toString()}`;
        router.push(newPathname);
    }

    // ✅ Stworzono spójny, nowoczesny wygląd dla paska wyszukiwania
    return (
        <form className='flex items-center w-full max-w-3xl rounded-full shadow-md bg-white dark:bg-slate-800 border dark:border-slate-700' onSubmit={handleSearch}>
            <div className='flex items-center flex-1 relative'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Image src={'/icons/car-logo.svg'} alt='logo marki' width={22} height={22} />
                </div>
                <input
                    type="text"
                    placeholder='Volkswagen...'
                    className='w-full py-3 pl-12 pr-4 text-sm text-gray-800 dark:text-gray-200 bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400'
                    value={manufacturer}
                    onChange={manufacturerHandleChange}
                    onFocus={() => setIsManufacturerListShown(true)}
                />
                {(manufacturer && isManufacturerListShown) && (
                    <div className='absolute top-full left-0 w-full max-h-60 overflow-y-auto z-20 rounded-xl shadow-lg mt-2 bg-white dark:bg-slate-800 border dark:border-slate-700'>
                        {filteredManufacturers.length > 0 ? (
                             filteredManufacturers.map((item, i) => (
                                <button
                                    key={i}
                                    type='button'
                                    className='px-4 py-2.5 cursor-pointer w-full text-left text-sm text-gray-800 dark:text-gray-200 hover:bg-blue-600 hover:text-white first:rounded-t-xl last:rounded-b-xl'
                                    onClick={() => handleManfacturerItemClick(item)}
                                >
                                    {item}
                                </button>
                            ))
                        ) : (
                            <p className='px-4 py-2.5 text-sm text-gray-500'>Nie znaleziono producenta</p>
                        )}
                    </div>
                )}
            </div>

            <div className='border-l h-6 border-gray-200 dark:border-slate-700'></div>

            <div className='flex items-center flex-1 relative'>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Image src={'/images/model-icon.png'} alt='ikona modelu' width={22} height={22} />
                </div>
                <input
                    type="text"
                    placeholder='Tiguan...'
                    className='w-full py-3 pl-12 pr-4 text-sm text-gray-800 dark:text-gray-200 bg-transparent outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400'
                    value={carName}
                    onChange={handleCarNameChange}
                />
            </div>
            
            <button type='submit' className='bg-blue-600 p-2.5 rounded-full m-1 hover:bg-blue-700 transition-colors' aria-label="Wyszukaj">
                <RiSearchLine size={20} className="text-white" />
            </button>
        </form>
    )
}

export default Searchbar;