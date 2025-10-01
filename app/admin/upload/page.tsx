"use client";

import { useState, useRef, useEffect } from 'react';
import { uploadCars } from '@/app/actions/uploadCars';
import type { UploadJob } from '@/utils/uploadProgress';

const UploadPage = () => {
  const [jobId, setJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState<UploadJob | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetState = () => {
    setJobId(null);
    setProgress(null);
    setMessage(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  async function handleUpload(formData: FormData) {
    const file = formData.get('carDataFile') as File;
    if (!file || file.size === 0) {
      setMessage({ type: 'error', text: 'Proszę wybrać plik przed wysłaniem.' });
      return;
    }

    resetState();

    const result = await uploadCars(formData);

    if (result.success && result.jobId) {
      setJobId(result.jobId);
    } else {
      setMessage({ type: 'error', text: result.message || 'Wystąpił nieoczekiwany błąd.' });
    }
  }

  useEffect(() => {
    if (!jobId) return;

    intervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/upload-progress/${jobId}`);
        if (!response.ok) {
          throw new Error('Nie udało się pobrać statusu zadania.');
        }
        const data: UploadJob = await response.json();
        setProgress(data);

        if (data.status === 'completed' || data.status === 'failed') {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setMessage({
            type: data.status === 'completed' ? 'success' : 'error',
            text: data.message || 'Zakończono przetwarzanie.',
          });
          if (data.status === 'completed' && fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      } catch (error) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setMessage({ type: 'error', text: 'Błąd podczas sprawdzania postępu.' });
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [jobId]);

  const isLoading = progress?.status === 'starting' || progress?.status === 'processing';
  const percentage = progress && progress.total > 0 ? Math.round((progress.processed / progress.total) * 100) : 0;

  return (
    <main className="max-w-4xl mx-auto py-16 md:py-24 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Wgraj Plik z Danymi Samochodów
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
          Wybierz plik w formacie JSON, aby dodać lub zaktualizować auta w bazie danych.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl p-8 shadow-lg">
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
              disabled={!!jobId && isLoading}
              onChange={() => resetState()}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-pink-900/50 dark:file:text-pink-300 dark:hover:file:bg-pink-900 disabled:opacity-50"
            />
          </div>

          <div className="space-y-4">
            {jobId && progress && (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-base font-medium text-blue-700 dark:text-pink-400">Postęp</span>
                  <span className="text-sm font-medium text-blue-700 dark:text-pink-400">{percentage}% ({progress.processed}/{progress.total})</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
                  <div
                    className="bg-blue-600 dark:bg-pink-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="text-right">
              <button
                type="submit"
                disabled={!!jobId && isLoading}
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-pink-600 dark:hover:bg-pink-700 transition duration-300 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Przetwarzanie...' : 'Wgraj i zaktualizuj dane'}
              </button>
            </div>
          </div>
        </form>

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