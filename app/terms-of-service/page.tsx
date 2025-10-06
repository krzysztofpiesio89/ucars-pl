import { companyData } from '@/constants';

const TermsOfServicePage = () => {
  const publicationDate = new Date().toLocaleDateString('pl-PL');

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-center">REGULAMIN KORZYSTANIA Z USŁUG ŚWIADCZONYCH DROGĄ ELEKTRONICZNĄ<br />ZA POŚREDNICTWEM SERWISU UCARS.PL</h1>
        <p className="text-center text-gray-500">z dnia {publicationDate}</p>

        <hr className="my-8" />

        <h2>§1 Definicje</h2>
        <ol>
          <li><strong>UCARS.PL</strong> – platforma internetowa prowadzona przez {companyData.fullName}, {companyData.address}, NIP {companyData.nip}.</li>
          <li><strong>Dom Aukcyjny</strong> – zagraniczny podmiot organizujący aukcje pojazdów, którego dane mogą być prezentowane w Serwisie UCARS.PL.</li>
          <li><strong>Licytacja testowa</strong> – funkcjonalność Serwisu UCARS.PL pozwalająca Użytkownikowi na próbne licytowanie pojazdów w warunkach symulowanych, w celu weryfikacji zdolności zakupowej.</li>
          <li><strong>Licytacja właściwa</strong> – udział w aukcji w Domu Aukcyjnym, w której Użytkownik reprezentowany jest przez UCARS.PL na podstawie zawartego zlecenia.</li>
          <li><strong>Konto</strong> – indywidualne konto Użytkownika w Serwisie UCARS.PL, chronione loginem i hasłem.</li>
          <li><strong>OWZ</strong> – Ogólne Warunki Zlecenia, regulujące usługi związane z zakupem i transportem pojazdów.</li>
          <li><strong>Pojazd</strong> – pojazd mechaniczny prezentowany w aukcjach Domów Aukcyjnych.</li>
          <li><strong>Serwis UCARS.PL</strong> – strona internetowa <a href="http://www.ucars.pl">www.ucars.pl</a> służąca do świadczenia usług elektronicznych.</li>
          <li><strong>Usługi elektroniczne</strong> – usługi świadczone drogą elektroniczną przez UCARS.PL.</li>
          <li><strong>Użytkownik</strong> – osoba fizyczna, prawna lub jednostka organizacyjna korzystająca z Serwisu UCARS.PL.</li>
          <li><strong>Zlecenie</strong> – usługa świadczona przez UCARS.PL na rzecz Użytkownika, obejmująca udział w aukcji pojazdu, nabycie go na rachunek Użytkownika oraz pomoc w organizacji transportu.</li>
        </ol>

        <hr className="my-8" />

        <h2>§2 Postanowienia ogólne</h2>
        <ol>
          <li>Regulamin określa zasady świadczenia usług drogą elektroniczną przez UCARS.PL.</li>
          <li>Regulamin został sporządzony zgodnie z art. 8 ustawy z dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną.</li>
          <li>Korzystanie z Serwisu UCARS.PL jest równoznaczne z akceptacją Regulaminu.</li>
          <li>Serwis kierowany jest do podmiotów zainteresowanych zakupem i importem pojazdów z USA.</li>
        </ol>

        <hr className="my-8" />

        <h2>§3 Konto</h2>
        <ol>
          <li>Użytkownikiem może być osoba pełnoletnia z pełną zdolnością do czynności prawnych lub podmiot posiadający osobowość prawną.</li>
          <li>W Serwisie UCARS.PL dostępne są konta podstawowe (bezpłatne) oraz konta premium (płatne).</li>
          <li>Konto premium może być odpłatne na zasadach ustalanych indywidualnie.</li>
          <li>Rezygnacja z Konta możliwa jest w każdym czasie poprzez zgłoszenie do UCARS.PL.</li>
          <li>Opłaty za Konto premium nie podlegają zwrotowi w przypadku wcześniejszej rezygnacji.</li>
        </ol>

        <hr className="my-8" />

        <h2>§4 Usługi elektroniczne</h2>
        <p>Za pośrednictwem Serwisu UCARS.PL Użytkownik może m.in.:</p>
        <ol>
          <li>przeglądać dane aukcji pojazdów,</li>
          <li>korzystać z kalkulatora kosztów zakupu i importu,</li>
          <li>wpłacać kaucję,</li>
          <li>brać udział w symulacjach licytacji,</li>
          <li>składać zlecenia udziału w aukcjach,</li>
          <li>monitorować status transportu zakupionych pojazdów.</li>
        </ol>

        <hr className="my-8" />

        <h2>§5 Pojazdy</h2>
        <p>UCARS.PL nie odpowiada za:</p>
        <ul>
          <li>poprawność danych udostępnianych przez Domy Aukcyjne,</li>
          <li>stan techniczny pojazdu,</li>
          <li>przebieg, wygląd lub kolorystykę,</li>
          <li>różnice w wymogach technicznych i homologacyjnych,</li>
          <li>możliwość rejestracji i użytkowania pojazdu w kraju docelowym.</li>
        </ul>

        <hr className="my-8" />

        <h2>§6 Kalkulator</h2>
        <ol>
          <li>Kalkulator dostępny w Serwisie UCARS.PL ma charakter orientacyjny i nie stanowi oferty w rozumieniu Kodeksu cywilnego.</li>
          <li>Wyniki kalkulacji mogą różnić się od rzeczywistych kosztów w zależności od warunków rynkowych i opłat zewnętrznych.</li>
        </ol>

        <hr className="my-8" />

        <h2>§7 Kaucja</h2>
        <ol>
          <li>Użytkownik może wpłacić kaucję w PLN, EUR lub USD wyłącznie przelewem na rachunek UCARS.PL.</li>
          <li>Kaucja stanowi podstawę do określenia limitu licytacji i zabezpieczenie wykonania umowy.</li>
          <li>Użytkownik może w każdej chwili zażądać zwrotu kaucji w części nieobjętej blokadą.</li>
          <li>Zwrot środków następuje na rachunek bankowy, z którego dokonano wpłaty.</li>
        </ol>

        <hr className="my-8" />

        <h2>§8 Licytacje i zlecenia</h2>
        <ol>
          <li>Wpłata kaucji jest warunkiem udziału w licytacji testowej i właściwej.</li>
          <li>Złożenie dyspozycji „Zleć licytację” lub „Zleć zakup” w Serwisie UCARS.PL oznacza zawarcie wiążącego zlecenia.</li>
          <li>Wynik licytacji testowej nie przesądza o wyniku licytacji w Domu Aukcyjnym.</li>
        </ol>

        <hr className="my-8" />

        <h2>§9 Status transportu</h2>
        <p>Serwis UCARS.PL umożliwia śledzenie statusu transportu pojazdów zakupionych na rzecz Użytkowników.</p>

        <hr className="my-8" />

        <h2>§10 Wymagania techniczne</h2>
        <ol>
          <li>Korzystanie z Serwisu UCARS.PL wymaga urządzenia z dostępem do Internetu, przeglądarki internetowej oraz aktywnej poczty e-mail.</li>
          <li>UCARS.PL rekomenduje aktualne wersje przeglądarek (Chrome, Firefox, Safari, Edge).</li>
        </ol>

        <hr className="my-8" />

        <h2>§11 Rozwiązanie umowy</h2>
        <ol>
          <li>Umowa o świadczenie usług elektronicznych zawierana jest w chwili rozpoczęcia korzystania z Serwisu UCARS.PL.</li>
          <li>Umowa rozwiązuje się z chwilą zaprzestania korzystania z Serwisu.</li>
        </ol>

        <hr className="my-8" />

        <h2>§12 Obowiązki Użytkownika</h2>
        <ol>
          <li>Użytkownik zobowiązuje się do podawania prawdziwych danych oraz niepodejmowania działań sprzecznych z prawem.</li>
          <li>Użytkownik odpowiada za działania podejmowane na swoim Koncie.</li>
        </ol>

        <hr className="my-8" />

        <h2>§13 Reklamacje</h2>
        <ol>
          <li>Reklamacje dotyczące funkcjonowania Serwisu UCARS.PL można składać pisemnie na adres siedziby lub na adres e-mail: <a href="mailto:ucars@gmail.com">ucars@gmail.com</a>.</li>
          <li>Reklamacja powinna zawierać dane identyfikujące Użytkownika oraz opis zdarzenia.</li>
          <li>UCARS.PL rozpatruje reklamacje w terminie 14 dni roboczych.</li>
        </ol>

        <hr className="my-8" />

        <h2>§14 Ograniczenie odpowiedzialności</h2>
        <p>UCARS.PL nie ponosi odpowiedzialności za:</p>
        <ul>
          <li>błędy wynikające z ustawień sprzętu Użytkownika,</li>
          <li>działania Domów Aukcyjnych i innych podmiotów zewnętrznych,</li>
          <li>przerwy techniczne i awarie,</li>
          <li>szkody powstałe wskutek korzystania z Serwisu w sposób sprzeczny z Regulaminem.</li>
        </ul>

        <hr className="my-8" />

        <h2>§15 Prawa autorskie</h2>
        <ol>
          <li>Wszystkie materiały dostępne w Serwisie UCARS.PL są chronione prawem autorskim.</li>
          <li>Użytkownik nie nabywa żadnych praw do tych materiałów poza możliwością ich wykorzystania w ramach korzystania z Serwisu.</li>
        </ol>

        <hr className="my-8" />

        <h2>§16 Postanowienia końcowe</h2>
        <ol>
            <li>UCARS.PL zastrzega sobie prawo do zmiany Regulaminu.</li>
            <li>Aktualna treść Regulaminu dostępna jest na stronie <a href="/terms-of-service">www.ucars.pl/regulamin</a>.</li>
            <li>Regulamin podlega prawu polskiemu.</li>
            <li>W sprawach nieuregulowanych stosuje się przepisy powszechnie obowiązujące.</li>
        </ol>

      </div>
    </main>
  );
};

export default TermsOfServicePage;
