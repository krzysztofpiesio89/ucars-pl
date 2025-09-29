'use client'
import { useCurrency } from '@/context/CurrencyProvider';
import { useState } from 'react';

const CurrencySwitcher = () => {
    const { currency, setCurrency } = useCurrency();
    const [isDropdownShown, setIsDropdownShown] = useState(false);

    return (
        <div className='relative'>
            <button onClick={() => setIsDropdownShown((prevState) => !prevState)} className='flex items-center gap-1 text-slate-700 dark:text-slate-400'>
                <span>{currency}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 transition-transform ${isDropdownShown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {
                isDropdownShown && (
                    <div className='bg-white/70 dark:bg-gradient-radial from-slate-700 to-slate-900 min-w-[100px] rounded-md backdrop-blur-lg absolute top-12 -right-6 md:-right-1/3 flex flex-col z-50 text-center border dark:border-slate-700/95'>
                        <button onClick={() => {
                            setIsDropdownShown(false);
                            setCurrency('USD');
                        }} className='flex gap-2 items-center p-2 hover:bg-white/30 dark:hover:bg-slate-700 rounded-t-md'>
                            <span className='text-slate-600 dark:text-slate-300'>USD</span>
                        </button>
                        <button onClick={() => {
                            setIsDropdownShown(false);
                            setCurrency('PLN');
                        }} className='flex gap-2 items-center p-2 hover:bg-white/30 dark:hover:bg-slate-700'>
                            <span className='text-slate-600 dark:text-slate-300'>PLN</span>
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default CurrencySwitcher;