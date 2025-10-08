'use client';

import { ReactNode } from 'react';
import { useTopBar } from '@/context/TopBarContext';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const AppLayout = ({ children }: { children: ReactNode }) => {
    const { isTopBarVisible } = useTopBar();

    return (
        <>
            <header className="sticky top-0 z-50">
                <div className={`transition-all duration-300 ease-in-out ${isTopBarVisible ? 'max-h-12' : 'max-h-0 overflow-hidden'}`}>
                    <TopBar />
                </div>
                <Navbar />
            </header>
            {children}
            <Footer />
            <Toaster position="top-left" reverseOrder={false} />
        </>
    );
};

export default AppLayout;
