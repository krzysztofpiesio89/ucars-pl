'use client';

const HowWeWorkPage = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-slate-800 dark:text-slate-200">
      <div className="relative">
        <div className="absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-br from-blue-500 to-pink-500 rounded-full opacity-20 blur-2xl" />
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-8 relative">Jak pracujemy</h1>
      </div>

      <div className="space-y-8 text-lg leading-relaxed">
        <p>
          W UCARS traktujemy sprowadzanie samochodów z USA jak prawdziwą sztukę — z najwyższą precyzją, transparentnością i dbałością o każdy detal. Naszym celem jest, aby każdy klient, indywidualny czy biznesowy, poczuł się, jakby przechodził po czerwonym dywanie w świecie importu aut.
        </p>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4 border-l-4 border-pink-500 pl-4">Transparentność na każdym etapie</h2>
          <p>
            Od pierwszego kontaktu po finalne dostarczenie samochodu, każda decyzja i każdy koszt są klarownie przedstawione. U nas nie ma ukrytych opłat ani niespodzianek — tylko pełna kontrola i pewność, że Twój zakup przebiega bezpiecznie.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-4">Bezpieczeństwo i profesjonalizm</h2>
          <p>
            Działamy zgodnie z najlepszymi praktykami rynkowymi, a każdy samochód przechodzi dokładną weryfikację stanu technicznego i historii. Niezależnie od tego, czy bierzesz udział w licytacji, czy sprowadzamy auto na zamówienie, możesz być pewien, że dbamy o Twój interes tak, jakby był naszym własnym.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4 border-l-4 border-pink-500 pl-4">Licytacje i sprowadzanie aut</h2>
          <p>
            Umożliwiamy udział w amerykańskich licytacjach w pełni zdalnie, dając Ci dostęp do wyjątkowych modeli i okazji. Dzięki naszej wiedzy i doświadczeniu proces jest prosty, bezpieczny i w pełni transparentny, a Ty zyskujesz pewność, że każda transakcja jest przeprowadzona profesjonalnie.
          </p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white mb-4 border-l-4 border-blue-500 pl-4">Ekskluzywne podejście dla wymagających klientów</h2>
          <p>
            Rozumiemy, że nasi klienci oczekują najwyższej jakości obsługi. Dlatego każdy projekt traktujemy indywidualnie, oferując wsparcie na każdym etapie — od wyboru auta po transport i rejestrację w kraju. W UCARS każdy klient jest VIP-em.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkPage;
