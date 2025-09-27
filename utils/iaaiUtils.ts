// lib/iaaiUtils.ts

interface ImageUrlParts {
  prefix: string;
  suffix: string;
}

/**
 * Analizuje URL obrazu z IAAI, aby wyodrębnić prefix i sufiks względem numeru zdjęcia.
 * @param imageUrl - Pełny URL obrazu.
 * @returns Obiekt z prefixem i sufiksem lub null, jeśli URL jest nieprawidłowy.
 */
function parseImageUrl(imageUrl: string): ImageUrlParts | null {
  try {
    // Używamy wyrażenia regularnego do znalezienia klucza obrazu
    const urlParams = new URLSearchParams(new URL(imageUrl).search);
    const imageKeys = urlParams.get('imageKeys');

    if (!imageKeys) {
      console.warn("[iaaiUtils] Nie znaleziono 'imageKeys' w URL-u.");
      return null;
    }

    // Wyrażenie regularne do podziału klucza na trzy części:
    // 1. (.*~I) - Wszystko do i włącznie z '~I' (prefix)
    // 2. (\d+) - Numer zdjęcia (jedna lub więcej cyfr)
    // 3. (.*) - Cała reszta (sufiks)
    const match = imageKeys.match(/(.*~I)(\d+)(.*)/);

    if (!match || match.length < 4) {
      console.warn("[iaaiUtils] Klucz obrazu nie pasuje do wzorca 'prefix~I<numer>sufiks'.", imageKeys);
      return null;
    }

    const prefix = match[1]; // np. "43717055~SID~B607~S0~I"
    const suffix = match[3]; // np. "~RW2576~H1932~TH0"

    return { prefix, suffix };
  } catch (error) {
    console.error("[iaaiUtils] Błąd podczas parsowania URL:", error);
    return null;
  }
}


/**
 * Generuje listę linków do zdjęć w wysokiej rozdzielczości i miniaturek na podstawie jednego przykładowego linku.
 * @param sampleImageUrl - Przykładowy, pełny URL do jednego ze zdjęć pojazdu.
 * @param count - Liczba zdjęć do wygenerowania.
 * @returns Tablica obiektów ze zdjęciami lub pusta tablica w przypadku błędu.
 */
export const generateIAAIImages = (sampleImageUrl: string, count: number = 12) => {
  console.log("[iaaiUtils] Otrzymano do przetworzenia:", sampleImageUrl);

  const parts = parseImageUrl(sampleImageUrl);

  if (!parts) {
    return []; // Zwróć pustą tablicę, jeśli parsowanie się nie powiodło
  }

  const { prefix, suffix } = parts;
  console.log(`[iaaiUtils] Sparsowano: Prefix='${prefix}', Sufiks='${suffix}'`);
  
  const images = [];
  for (let i = 1; i <= count; i++) {
    const newImageKey = `${prefix}${i}${suffix}`;
    const hdUrl = `https://vis.iaai.com/retriever?imageKeys=${newImageKey}&width=2576&height=1932`;
    const thumbUrl = `https://vis.iaai.com/resizer?imageKeys=${newImageKey}&width=161&height=120`;
    images.push({ hdUrl, thumbUrl });
  }

  console.log("[iaaiUtils] Sukces! Wygenerowano obrazy:", images);
  return images;
};