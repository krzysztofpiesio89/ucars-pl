import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
        }
    });

    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${verificationToken.token}`;

    // W środowisku deweloperskim po prostu logujemy link w konsoli.
    // W produkcji, tutaj należy zintegrować usługę do wysyłania e-maili.
    console.log(`Verification URL for ${email}: ${verificationUrl}`);

    return NextResponse.json(
      {
        message: "User created successfully. Please check your email to verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
  }
};
