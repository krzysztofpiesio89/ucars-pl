import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Proszę podać email i hasło.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Nie znaleziono użytkownika o podanym adresie email lub użytkownik jest zarejestrowany przez OAuth.");
        }

        if (!user.emailVerified) {
            throw new Error("Proszę zweryfikować swój adres email przed zalogowaniem.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Nieprawidłowe hasło.");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Logika superadmina
        if (user.email === process.env.SUPERADMIN_EMAIL) {
          session.user.role = "ADMIN";
        } else {
          session.user.role = user.role;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Logika superadmina
        if (user.email === process.env.SUPERADMIN_EMAIL) {
          token.role = "ADMIN";
        } else {
          token.role = user.role;
        }
      }
      return token;
    },
  },
  pages: {
    signIn: '/user/login',
    error: '/user/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
