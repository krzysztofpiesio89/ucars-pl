'use client';

import { useState, useEffect } from 'react';
import { Cookies } from 'react-cookie-consent';

// Define types for type safety
interface IConsentChoices {
  preferences: boolean;
  statistics: boolean;
  marketing: boolean;
  unclassified: boolean;
}

type ConsentCategory = keyof IConsentChoices;

interface ICookieCategory {
  id: ConsentCategory | 'necessary';
  title: string;
  description: string;
  isMutable: boolean;
}

const cookieCategories: ICookieCategory[] = [
  {
    id: 'necessary',
    title: 'Niezbędne',
    description: 'Niezbędne pliki cookie przyczyniają się do użyteczności strony poprzez umożliwianie podstawowych funkcji takich jak nawigacja na stronie i dostęp do bezpiecznych obszarów strony internetowej. Strona internetowa nie może funkcjonować poprawnie bez tych ciasteczek.',
    isMutable: false,
  },
  {
    id: 'preferences',
    title: 'Preferencje',
    description: 'Pliki cookie dotyczące preferencji umożliwiają stronie zapamiętanie informacji, które zmieniają wygląd lub funkcjonowanie strony, np. preferowany język lub region, w którym znajduje się użytkownik.',
    isMutable: true,
  },
  {
    id: 'statistics',
    title: 'Statystyczne',
    description: 'Statystyczne pliki cookie pomagają właścicielem stron internetowych zrozumieć, w jaki sposób różni użytkownicy zachowują się na stronie, gromadząc i zgłaszając anonimowe informacje.',
    isMutable: true,
  },
  {
    id: 'marketing',
    title: 'Marketingowe',
    description: 'Marketingowe pliki cookie stosowane są w celu śledzenia użytkowników na stronach internetowych. Celem jest wyświetlanie reklam, które są istotne i interesujące dla poszczególnych użytkowników i tym samym bardziej cenne dla wydawców i reklamodawców strony trzeciej.',
    isMutable: true,
  },
  {
    id: 'unclassified',
    title: 'Nieklasyfikowane',
    description: 'Nieklasyfikowane pliki cookie, to pliki, które są w procesie klasyfikowania, wraz z dostawcami poszczególnych ciasteczek.',
    isMutable: true,
  },
];

const COOKIE_NAME = 'ucars-consent-choices';

const AdvancedCookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [tab, setTab] = useState('consent'); // 'consent' or 'details');
  const [consentChoices, setConsentChoices] = useState<IConsentChoices>({
    preferences: true,
    statistics: true,
    marketing: true,
    unclassified: true,
  });

  useEffect(() => {
    if (!Cookies.get(COOKIE_NAME)) {
      setIsVisible(true);
    }
  }, []);

  const handleCheckboxChange = (category: ConsentCategory) => {
    setConsentChoices(prev => ({ ...prev, [category]: !prev[category] }));
  };

  const setCookieConsent = (choices: IConsentChoices) => {
    Cookies.set(COOKIE_NAME, JSON.stringify(choices), { expires: 150 });
    setIsVisible(false);
  };

  const handleDecline = () => {
    const allFalse: IConsentChoices = {
        preferences: false,
        statistics: false,
        marketing: false,
        unclassified: false,
    };
    setCookieConsent(allFalse);
  };

  const handleAllowAll = () => {
    const allTrue: IConsentChoices = {
        preferences: true,
        statistics: true,
        marketing: true,
        unclassified: true,
    };
    setCookieConsent(allTrue);
  };

  const handleAllowSelection = () => {
    setCookieConsent(consentChoices);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#0b1120] text-white p-6 z-[100]">
      <div className="max-w-7xl mx-auto">
        {
          tab === 'consent' && (
            <div>
              <h2 className="text-xl font-bold mb-2">O plikach cookies</h2>
              <p className="text-sm text-gray-300">
                Niniejsza strona korzysta z plików cookie. Wykorzystujemy pliki cookie do spersonalizowania treści i reklam, aby oferować funkcje społecznościowe i analizować ruch w naszej witrynie. Informacje o tym, jak korzystasz z naszej witryny, udostępniamy partnerom społecznościowym, reklamowym i analitycznym. Partnerzy mogą połączyć te informacje z innymi danymi otrzymanymi od Ciebie lub uzyskanymi podczas korzystania z ich usług.
              </p>
            </div>
          )
        }

        {
          tab === 'details' && (
            <div className="max-h-48 overflow-y-auto pr-4">
              {cookieCategories.map(cat => (
                <div key={cat.id} className="mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{cat.title}</h3>
                    <input 
                      type="checkbox" 
                      className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-500 rounded focus:ring-blue-500 disabled:opacity-50"
                      checked={cat.isMutable ? consentChoices[cat.id as ConsentCategory] : true}
                      disabled={!cat.isMutable}
                      onChange={() => cat.isMutable && handleCheckboxChange(cat.id as ConsentCategory)}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{cat.description}</p>
                </div>
              ))}
               <p className="text-xs text-gray-500 mt-6">
                Deklarację dot. plików cookie zaktualizowano ostatnio 02.10.2025
              </p>
            </div>
          )
        }

        <div className="flex items-center justify-between mt-4">
            <div className="flex gap-4">
                <button onClick={() => setTab('consent')} className={`text-sm ${tab === 'consent' ? 'font-bold border-b-2 border-blue-500' : 'text-gray-400'}`}>Zgoda</button>
                <button onClick={() => setTab('details')} className={`text-sm ${tab === 'details' ? 'font-bold border-b-2 border-blue-500' : 'text-gray-400'}`}>Szczegóły</button>
            </div>
            <div className="flex gap-4">
                <button onClick={handleDecline} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md text-sm">Odmowa</button>
                <button onClick={handleAllowSelection} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md text-sm">Zezwól na wybór</button>
                <button onClick={handleAllowAll} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md text-sm">Zezwól na wszystkie</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCookieBanner;
