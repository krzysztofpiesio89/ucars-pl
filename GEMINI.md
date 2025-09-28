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

## Dziennik Zmian (Changelog)

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