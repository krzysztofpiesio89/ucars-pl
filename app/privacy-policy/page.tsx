import { companyData } from '@/constants';

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Polityka Prywatności</h1>
        <p className="text-gray-500">Ostatnia aktualizacja: 02.10.2025</p>

        <h2>1. Wprowadzenie</h2>
        <p>
          Niniejsza Polityka Prywatności opisuje, w jaki sposób {companyData.fullName} (&quot;Firma&quot;, &quot;my&quot;, &quot;nas&quot;, &quot;nasz&quot;) gromadzi, wykorzystuje i udostępnia Państwa dane osobowe podczas korzystania z naszej strony internetowej ucars.pl (&quot;Serwis&quot;).
        </p>

        <h2>2. Administrator Danych</h2>
        <p>
          Administratorem Państwa danych osobowych jest:
          <br />
          {companyData.fullName}
          <br />
          {companyData.address}
          <br />
          NIP: {companyData.nip}
          <br />
          REGON: {companyData.regon}
        </p>

        <h2>3. Jakie dane zbieramy</h2>
        <p>
          Możemy zbierać następujące rodzaje informacji:
          <ul>
            <li><b>Dane podawane dobrowolnie:</b> Imię i nazwisko, adres e-mail, numer telefonu, dane do faktury, które podają Państwo podczas rejestracji konta lub składania zapytań.</li>
            <li><b>Dane zbierane automatycznie:</b> Adres IP, typ przeglądarki, system operacyjny, informacje o urządzeniu, historia przeglądania w ramach Serwisu, dane z plików cookie.</li>
          </ul>
        </p>

        <h2>4. W jakim celu przetwarzamy dane</h2>
        <p>
          Państwa dane przetwarzane są w celu:
          <ul>
            <li>Świadczenia usług drogą elektroniczną, w tym prowadzenia konta użytkownika.</li>
            <li>Realizacji umów i zamówień.</li>
            <li>Kontaktu w sprawach związanych z naszymi usługami.</li>
            <li>Celów marketingowych, o ile wyrażono na to osobną zgodę.</li>
            <li>Analizy statystycznej i poprawy jakości naszych usług.</li>
          </ul>
        </p>

        <h2>5. Pliki Cookie</h2>
        <p>
          Nasz Serwis wykorzystuje pliki cookie w celu zapewnienia prawidłowego działania, analizy ruchu oraz personalizacji treści. Szczegółowe informacje na temat wykorzystywanych plików cookie oraz możliwości zarządzania nimi znajdą Państwo w naszej polityce dotyczącej plików cookie, dostępnej po kliknięciu w &quot;Ustawienia cookies&quot; w stopce strony.
        </p>

        <h2>6. Prawa użytkownika</h2>
        <p>
          Mają Państwo prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania oraz prawo do wniesienia sprzeciwu. W celu realizacji tych praw, prosimy o kontakt pod adresem e-mail: [wstaw-adres-email@example.com].
        </p>

        <h2>7. Zmiany w polityce prywatności</h2>
        <p>
          Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności. O wszelkich zmianach będziemy informować poprzez publikację nowej wersji na tej stronie.
        </p>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
