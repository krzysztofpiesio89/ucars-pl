import ContactForm from '@/components/ContactForm';
import React from 'react';

const WspolpracaPage = () => {
  return (
    <main className="relative dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">Współpraca</h1>
            <p className="mt-6 text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Jesteśmy otwarci na nowe możliwości i partnerstwa. Skontaktuj się z nami, aby omówić potencjalną współpracę.</p>
            <ContactForm />
        </div>
    </main>
  );
};

export default WspolpracaPage;