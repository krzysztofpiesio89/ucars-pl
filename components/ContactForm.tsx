'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { CustomButton } from '.';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Symulacja wysyłania formularza
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Wysłano dane formularza:', formData);
        toast.success('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');

        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-12 mb-12">
            <form 
                onSubmit={handleSubmit}
                className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 border border-white/20"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">Napisz do nas</h2>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                        Imię i nazwisko
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-300/50 dark:border-slate-700/50 rounded-lg w-full py-3 px-4 bg-white/50 dark:bg-slate-900/50 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                        Adres email
                    </label>
                    <input
                        className="shadow-inner appearance-none border border-gray-300/50 dark:border-slate-700/50 rounded-lg w-full py-3 px-4 bg-white/50 dark:bg-slate-900/50 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                        Wiadomość
                    </label>
                    <textarea
                        className="shadow-inner appearance-none border border-gray-300/50 dark:border-slate-700/50 rounded-lg w-full py-3 px-4 bg-white/50 dark:bg-slate-900/50 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <CustomButton 
                        title={isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                        type='submit'
                        containerStyle='w-full bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400'
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
