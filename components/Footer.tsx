'use client';

import { footerLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Cookies } from 'react-cookie-consent';

const Footer = () => {

    const handleResetConsent = () => {
        Cookies.remove('ucars-consent-choices');
        window.location.reload();
    };

    return (
        <footer>
            <div className='flex flex-col items-center justify-between md:flex-row mt-16 border-t dark:border-slate-800 group group-hover:shadow-lg gap-2'>
                <div className='flex flex-col items-start  md:flex-row md:justify-between py-12 px-4 md:p-12 w-full  md:items-start gap-4'>
                    <div>
                        <Link href={'/'}>
                            <span className='text-xl md:text-3xl text-indigo-700 font-bold dark:text-white'>Nowoczesny system licytacji IAAI, CoPart </span>
                        </Link>
                        <p className='mt-4'>uCars.pl 2025 <br /> Wszelkie prawa zastrzeżone  &copy;</p>
                    </div>
                    <div className='flex  items-center justify-between flex-wrap md:justify-evenly w-full flex-1 gap-3'>
                        {footerLinks.map(({ title, links }, i) => (<div key={i} className='space-y-2 flex flex-col items-start gap-4 '>
                            <p className='font-bold text-lg'>{title}</p>

                            {
                                links.map(({ title, url }, i) => <Link key={i} href={url} className='text-gray-400'>{title}</Link>)
                            }
                        </div>))}
                    </div>
                </div>
            </div>
            <div className='border-t dark:border-slate-800 p-4 md:p-12 flex items-center md:justify-between flex-col md:flex-row gap-2'>
                <p className='text-sm text-gray-400'>&copy;2025 uCars.pl. Wszelkie prawa zastrzeżone</p>
                <div className='flex items-center gap-4'>
                    <Link href={'/'} className='text-gray-400 text-sm'>Polityka prywatności</Link>
                    <Link href={'/'} className='text-gray-400 text-sm'>Regulamin</Link>
                    <button onClick={handleResetConsent} className='text-gray-400 text-sm hover:text-white'>Ustawienia cookies</button>
                </div>
            </div>
        </footer>
    )
}

export default Footer;