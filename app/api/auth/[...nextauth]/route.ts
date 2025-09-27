import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Przykładowy dostawca OAuth
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    // Dostawca dla logowania za pomocą emaila i hasła
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
          throw new Error("Nie znaleziono użytkownika o podanym adresie email.");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Nieprawidłowe hasło.");
        }

        // Zwracamy obiekt użytkownika bez hasła
        return {
            id: String(user.id),
            name: user.name,
            email: user.email,
        };
      },
    }),
    // Możesz dodać innych dostawców, np. Google
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Dodajemy ID użytkownika do tokenu JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Dodajemy ID użytkownika do obiektu sesji
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
      signIn: '/login', // Strona logowania
      error: '/login', // Przekieruj na stronę logowania w razie błędu
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
