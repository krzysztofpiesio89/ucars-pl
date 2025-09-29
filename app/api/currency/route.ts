import { NextResponse } from 'next/server';

// Dane będą cachowane przez Next.js, ale rewalidacja co 3 godziny zapewni świeżość kursu
export const revalidate = 3 * 60 * 60; // 3 hours in seconds

export async function GET() {
  try {
    const response = await fetch('http://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json');

    if (!response.ok) {
      // Jeśli NBP API zawiedzie, zwróć błąd z odpowiednim statusem
      throw new Error(`Failed to fetch from NBP API with status: ${response.status}`);
    }

    const data = await response.json();
    const rate = data?.rates?.[0]?.mid;

    if (!rate) {
      throw new Error('Could not find the rate in the NBP API response.');
    }

    return NextResponse.json({ rate });

  } catch (error) {
    console.error("Currency API Error:", error);
    // Zwróć generyczny błąd serwera
    return new NextResponse('Internal Server Error: Could not fetch currency rate.', { status: 500 });
  }
}
