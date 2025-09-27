import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";

/**
 * POST - Obsługuje tworzenie nowego użytkownika.
 */
export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    // 1. Walidacja danych
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Wszystkie pola są wymagane." }, { status: 400 });
    }

    // 2. Sprawdzenie, czy użytkownik już istnieje
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Użytkownik o tym adresie email już istnieje." }, { status: 409 });
    }

    // 3. Haszowanie hasła
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Stworzenie nowego użytkownika w bazie danych
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Użytkownik został pomyślnie zarejestrowany.", user: newUser }, { status: 201 });

  } catch (error) {
    console.error("Błąd podczas rejestracji:", error);
    return NextResponse.json({ message: "Wystąpił wewnętrzny błąd serwera." }, { status: 500 });
  }
};
