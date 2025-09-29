// utils/fuel.ts
export function translateFuel(fuel?: string): string {
  const fuelTranslations: Record<string, string> = {
    Petrol: "Benzyna",
    Gasoline: "Benzyna",
    Diesel: "Diesel",
    Electric: "Elektryczny",
    Hybrid: "Hybryda",
  };

  if (!fuel) return "Nieznane"; // albo np. pusty string ""

  return fuelTranslations[fuel] ?? fuel;
}
