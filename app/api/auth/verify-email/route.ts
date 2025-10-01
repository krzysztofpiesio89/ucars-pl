import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/user/login?error=MissingToken", req.url));
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(new URL("/user/login?error=InvalidToken", req.url));
    }

    if (new Date() > verificationToken.expires) {
        // Token wygasł, usuwamy go
        await prisma.verificationToken.delete({ where: { token } });
        return NextResponse.redirect(new URL("/user/login?error=ExpiredToken", req.url));
    }

    // Znajdź użytkownika i zaktualizuj jego status weryfikacji
    const user = await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Usuń token po pomyślnej weryfikacji
    await prisma.verificationToken.delete({ where: { token } });

    // Przekieruj na stronę logowania z komunikatem o sukcesie
    return NextResponse.redirect(new URL("/user/login?verified=true", req.url));

  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(new URL("/user/login?error=VerificationFailed", req.url));
  }
};
