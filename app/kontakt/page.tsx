import ContactForm from '@/components/ContactForm';
import React from 'react';

const KontaktPage = () => {
  return (
    <main className="relative dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white">Kontakt</h1>
            <p className="mt-6 text-lg text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Masz pytania lub sugestie? Wypełnij poniższy formularz, aby się z nami skontaktować. Odpowiemy tak szybko, jak to możliwe.</p>
            <ContactForm />
        </div>
    </main>
  );
};

export default KontaktPage;