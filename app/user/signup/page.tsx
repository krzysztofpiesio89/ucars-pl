'use client'
import { getProviders, signIn, useSession } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const Signup = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [providers, setProviders] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }
        setupProviders();
    }, []);

    useEffect(() => {
        if (session?.user?.id) {
            router.push('/');
        }
    }, [router, session?.user?.id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });
            
            const data = await response.json();

            if (response.ok) {
                toast.success("Rejestracja pomyślna! Zaloguj się.");
                router.push('/login'); // Przekierowanie do strony logowania
            } else {
                toast.error(data.message || "Wystąpił błąd podczas rejestracji.");
            }

        } catch (error) {
            toast.error("Błąd sieci. Spróbuj ponownie.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='w-full min-h-screen p-2 flex items-center justify-center bg-gray-50 dark:bg-slate-900'>
            <div className='absolute bg-gradient-to-tl from-purple-700 to-green-400 w-44 h-44 md:w-72 md:h-72 rounded-full -z-10 top-1/2 left-1/4 blur-3xl opacity-30' />
            <div className='absolute bg-gradient-to-br from-blue-700 to-pink-400 w-44 h-44 md:w-72 md:h-72 rounded-full -z-10 top-1/4 right-1/4 blur-3xl opacity-30' />
            
            <div className='bg-white/80 dark:bg-slate-800/60 dark:border-slate-700 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-lg backdrop-blur-xl border'>
                <h1 className='text-3xl font-bold text-center text-slate-900 dark:text-white'>Stwórz konto</h1>
                <p className='text-center text-slate-500 dark:text-slate-400 mt-2'>Dołącz do nas i zacznij licytować!</p>
                
                <form onSubmit={onSignup} className='mt-8 space-y-4'>
                    <div>
                        <label htmlFor='name' className='text-sm font-medium text-slate-700 dark:text-slate-300'>Nazwa użytkownika</label>
                        <input
                            className='w-full mt-1 pl-4 py-2.5 border bg-transparent rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-pink-500 transition-all'
                            id='name'
                            name='name'
                            type='text'
                            value={user.name}
                            onChange={handleInputChange}
                            placeholder='np. Jan Kowalski'
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor='email' className='text-sm font-medium text-slate-700 dark:text-slate-300'>Email</label>
                        <input
                            className='w-full mt-1 pl-4 py-2.5 border bg-transparent rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-pink-500 transition-all'
                            id='email'
                            name='email'
                            type='email'
                            value={user.email}
                            onChange={handleInputChange}
                            placeholder='email@example.com'
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor='password' className='text-sm font-medium text-slate-700 dark:text-slate-300'>Hasło</label>
                        <input
                            className='w-full mt-1 pl-4 py-2.5 border bg-transparent rounded-lg outline-none dark:border-slate-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-pink-500 transition-all'
                            id='password'
                            name='password'
                            type='password'
                            value={user.password}
                            onChange={handleInputChange}
                            placeholder='min. 6 znaków'
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className='w-full py-3 bg-blue-600 text-white font-semibold rounded-lg mt-8 border dark:bg-pink-600 dark:hover:bg-pink-700 hover:bg-blue-700 transition-colors disabled:opacity-50'> 
                        {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
                    </button>
                    <p className='text-center text-sm text-slate-500 dark:text-slate-400'>
                        Masz już konto?
                        <Link href='/login' className='font-semibold text-blue-600 dark:text-pink-400 hover:underline ml-1'> Zaloguj się </Link>
                    </p>
                </form>

                <div className='flex items-center gap-4 my-6'>
                    <div className='border-b-[1px] w-full dark:border-slate-700' />
                    <span className='text-xs text-slate-500'>LUB</span>
                    <div className='border-b-[1px] w-full dark:border-slate-700' />
                </div>
                
                <div className='flex flex-col items-center gap-3'>
                    {
                        providers && Object.values(providers).map((provider: any) => (
                            // Pomijamy 'credentials' na liście dostawców OAuth
                            provider.id !== 'credentials' && (
                                <button
                                    key={provider.id}
                                    onClick={() => signIn(provider.id)}
                                    className='w-full py-3 bg-white dark:bg-slate-900/80 text-slate-800 dark:text-slate-300 border dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors'> 
                                    Kontynuuj z {provider.name}
                                </button>
                            )
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Signup
