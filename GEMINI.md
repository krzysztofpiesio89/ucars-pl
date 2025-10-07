# Instrukcje dla Gemini dla projektu uCars.pl

## Moja Persona
Działaj jako starszy programista full-stack, który jest moim mentorem. Bądź precyzyjny, zwięzły i zawsze odpowiadaj w języku polskim.

## Kontekst Projektu
Pracujemy nad aplikacją `ucars.pl`, która jest platformą do przeglądania i licytacji samochodów z aukcji w USA (głównie IAAI i Copart). Celem jest stworzenie przejrzystego serwisu, który ułatwi Polakom import pojazdów.

## Kluczowe Technologie
- **Framework:** Next.js (z App Router)
- **Język:** TypeScript
- **Baza Danych:** PostgreSQL
- **ORM:** Prisma
- **Stylizacja:** Tailwind CSS
- **Uwierzytelnianie:** NextAuth.js

## Ważne Zasady
1.  Wszystkie komponenty frontendowe muszą być zgodne z "use client".
2.  Styl komponentów musi być spójny z resztą projektu (tryb jasny i ciemny).
3.  Zawsze pisz czysty, dobrze skomentowany i bezpieczny kod.
4.  Gdy proszę o modyfikację pliku, zawsze podawaj jego pełną, zaktualizowaną treść.

---

### 07.10.2025
- **Naprawa Wyglądu `TopBar` na Urządzeniach Mobilnych:**
  - W komponencie `TopBar.tsx` zmieniono właściwość `flex-nowrap` na `flex-wrap`, aby zapobiec wychodzeniu elementów poza ekran na węższych widokach.
- **Implementacja Funkcji Ukrywania `TopBar`:**
  - Dodano w `Navbar.tsx` przycisk z ikoną (strzałka w górę/dół) do przełączania widoczności górnego paska.
  - Zaktualizowano `TopBarContext.tsx`, dodając logikę do zarządzania stanem widoczności (`isTopBarVisible`, `toggleTopBar`).
  - W `app/layout.tsx` zaimplementowano płynną animację chowania i pokazywania `TopBar` poprzez dynamiczne zmiany klas CSS.
- **Integracja Komponentu `BrandStrip`:**
  - Umieszczono nowy komponent `BrandStrip.tsx` na stronie głównej, bezpośrednio pod sekcją `Hero`.
  - Naprawiono błąd importu poprzez dodanie `BrandStrip` do pliku `components/index.ts`.
  - Zaktualizowano komponent `BrandStrip`, powiększając logotypy marek i dodając do nich linki, które przekierowują do strony `/view-all` z automatycznie ustawionym filtrem marki.
- **Naprawa Wyświetlania Samochodów na Stronie Głównej:**
  - Zdiagnozowano problem, który polegał na używaniu przestarzałej logiki do pobierania danych o pojazdach.
  - Przeprowadzono refaktoryzację `app/page.tsx`, zastępując stary komponent `<Catalogue />` nowym `<ShowAllCars />`.
  - Zaktualizowano mechanizm pobierania danych, aby był zgodny z nowym, zaawansowanym systemem filtrowania, co rozwiązało problem braku wyświetlania aut.
- **Dodanie Licznika Ofert w Sekcji `Hero`:**
  - Utworzono nowy punkt API `/api/car/count/route.ts`, który zlicza wszystkie pojazdy w bazie danych.
  - Stworzono komponent `OfferCount.tsx`, który pobiera i wyświetla liczbę dostępnych ofert.
  - Zintegrowano `OfferCount.tsx` w sekcji `Hero`, umieszczając go nad głównym przyciskiem wezwania do działania, aby zwiększyć jego widoczność.

### 06.10.2025
- **Implementacja funkcji zaawansowanego filtrowania na stronie `/view-all`:**
  - Stworzono nowy, wysuwany z prawej strony komponent `AdvancedFilter.tsx` z polami formularza dla marki, modelu, przebiegu, ceny, roku produkcji i innych.
  - Zintegrowano nowy filtr z komponentem `ShowAllCars.tsx`, zastępując poprzednie, proste filtrowanie.
  - Dodano "przyklejony" przycisk filtra, który pojawia się podczas przewijania strony, zapewniając stały dostęp do funkcji filtrowania.
  - Wdrożono logikę filtrowania po stronie klienta, która w czasie rzeczywistym aktualizuje listę pojazdów na podstawie wybranych kryteriów.
  - Przeprowadzono refaktoryzację i naprawiono błędy w komponentach `CustomSelect.tsx` i `CustomInput.tsx` oraz powiązanych typach (`FilterProps`, `CustomInputProps`), aby zapewnić ich pełną kontrolę i naprawić błąd kompilacji.

### 03.10.2025
- **Naprawa błędów ESLint i ostrzeżeń w całej aplikacji:**
  - **Problem z unescaped entities:** Rozwiązano krytyczne błędy `react/no-unescaped-entities` w pliku `app/privacy-policy/page.tsx` poprzez zastąpienie cudzysłowów (`"`) encjami HTML (`&quot;`).
  - **Tłumienie błędu w `AdvancedCookieBanner.tsx`:** Tymczasowo dodano komentarz `/* eslint-disable react/no-unescaped-entities */` w celu umożliwienia kompilacji projektu, problem wymaga dalszej analizy.
  - **Poprawki w hakach `useEffect`:**
    - W `components/CarCard.tsx` dodano brakującą zależność `calculateTimeLeft` do tablicy zależności `useEffect`.
    - W `components/TopBar.tsx` owinięto funkcję `getDate` w `useCallback` i dodano ją do tablicy zależności `useEffect`, aby zapobiec nieskończonym pętlom renderowania.

### 02.10.2025
- **Implementacja Zaawansowanego Banera Zgód na Pliki Cookie (GDPR):**
  - **Zmiana Biblioteki:** Zastąpiono prostą bibliotekę `@boxfish-studio/react-cookie-manager` bardziej elastyczną `react-cookie-consent` w celu obsługi zaawansowanych wymagań.
  - **Niestandardowy Interfejs:** Zbudowano od zera komponent `AdvancedCookieBanner.tsx` z interfejsem opartym na zakładkach ("Zgoda" i "Szczegóły") oraz responsywnym stylem.
  - **Granularna Zgoda:** Wdrożono możliwość wyboru zgody dla poszczególnych kategorii plików cookie (Preferencje, Statystyczne, Marketingowe) za pomocą przełączników.
  - **Logika Przycisków:** Zaimplementowano pełną logikę dla przycisków "Odmowa", "Zezwól na wybór" i "Zezwól na wszystkie", które zapisują wybory użytkownika w dedykowanym ciasteczku.
  - **Zarządzanie Zgodą:** Dodano w stopce (`Footer.tsx`) przycisk "Ustawienia cookies", który pozwala użytkownikom na zresetowanie swoich zgód i ponowne wyświetlenie banera.
  - **Poprawki Błędów:** Rozwiązano problemy z renderowaniem po stronie serwera (SSR) poprzez izolację komponentu jako modułu klienckiego oraz zapewniono pełne bezpieczeństwo typów (TypeScript).

### 28.09.2025
- Ustanowiono plik `GEMINI.MD` jako miejsce do prowadzenia dziennika zmian w projekcie.
- **Seria poprawek w `app/auction/[stock]/page.tsx`:**
  - Poprawiono typ parametru trasy z `id` na `stock`.
  - Zaktualizowano odwołanie do `stock` na `params.stock`.
  - Dodano brakujący prop `iaaiUrl` do komponentu `VideoPlayer`.
  - Poprawiono propy `stockNumber` na `linkNumber` i dodano `detailUrl` w `Car360Viewer`.
- Zaktualizowano bazę danych `caniuse-lite` do najnowszej wersji.
- **Seria poprawek w `app/cars/[id]/page.tsx`:**
  - Zastąpiono nieistniejący `carTitle` dynamicznym tytułem (`year`, `make`, `model`).
  - Poprawiono `currentBid` na `bidPrice` i `buyItNowPrice` na `buyNowPrice`.
  - Ujednolicono właściwości `lotNumber` do `stock` i `odometer` do `mileage`.
  - Zastąpiono `primaryDamage` na `damageType`.
  - Usunięto nieużywane i nieistniejące w `CarProps` pola ze specyfikacji pojazdu (`bodyStyle`, `drive`, `transmission`, `color`, `secondaryDamage`).
- **Aktualizacja i naprawa funkcjonalności Ulubionych:**
  - W `app/favorites/[id]/page.tsx`:
    - Naprawiono błędny endpoint API (z `/api/favorite/{id}` na `/api/favorites?userId={id}`).
    - Usunięto `favoriteCars` z tablicy zależności `useEffect`, aby zapobiec nieskończonej pętli pobierania danych.
    - Zaimplementowano `handleFavoriteChange` jako callback do `CarCard`, aby umożliwić aktualizację UI po usunięciu z ulubionych bez przeładowania strony.
  - W `components/CarCard.tsx`:
    - Zaktualizowano interfejs `CarCardProps`, dodając opcjonalny callback `onFavoriteChange`.
    - Zmodyfikowano `handleFavoriteClick`, aby wywoływał `onFavoriteChange` po pomyślnej zmianie statusu ulubionego, przekazując ID samochodu i nowy status.