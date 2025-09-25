// w pliku: app/admin/upload/page.tsx

"use client";

import { useState, useRef } from 'react';
import { uploadCars } from '@/app/actions/uploadCars'; // Importujemy naszą Server Action

const UploadPage = () => {
  // Stan do zarządzania procesem ładowania
  const [isLoading, setIsLoading] = useState(false);
  // Stan do wyświetlania wiadomości o sukcesie lub błędzie
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  // Referencja do inputu, aby móc go wyczyścić po udanym uploadzie
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Funkcja, która opakowuje naszą Server Action, aby zarządzać stanem UI
  async function handleUpload(formData: FormData) {
    setIsLoading(true);
    setMessage(null);

    // Wywołujemy Server Action
    const result = await uploadCars(formData);

    setIsLoading(false);

    // Aktualizujemy UI na podstawie odpowiedzi z serwera
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      // Czyścimy pole wyboru pliku po sukcesie
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } else {
      setMessage({ type: 'error', text: result.message });
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Wgraj Plik z Danymi Samochodów
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Wybierz plik w formacie JSON zawierający listę aut, aby dodać je lub zaktualizować w bazie danych.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-8 shadow-lg">
        {/* Formularz wywołuje naszą funkcję `handleUpload` */}
        <form action={handleUpload} className="space-y-6">
          <div>
            <label htmlFor="carDataFile" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Plik JSON z ofertami
            </label>
            <input
              ref={fileInputRef}
              type="file"
              name="carDataFile"
              id="carDataFile"
              required
              accept=".json"
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-pink-900/50 dark:file:text-pink-300 dark:hover:file:bg-pink-900"
            />
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-pink-600 dark:hover:bg-pink-700 transition duration-300 ease-in-out shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Przetwarzanie...' : 'Wgraj i zaktualizuj dane'}
            </button>
          </div>
        </form>

        {/* Sekcja do wyświetlania wyniku operacji */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'}`}>
            <p className="font-medium">{message.text}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default UploadPage;