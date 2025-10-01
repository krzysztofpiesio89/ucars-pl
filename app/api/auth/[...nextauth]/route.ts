import NextAuth, { AuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  // Adapter do bazy danych Prisma
  adapter: PrismaAdapter(prisma),

  // Dostawcy uwierzytelniania
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // Pozwala na połączenie konta Google z istniejącym kontem o tym samym e-mailu
      allowDangerousEmailAccountLinking: true,
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
        
        // Blokuje logowanie, jeśli email nie został zweryfikowany
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

  // Używamy strategii bazodanowej, co jest wymagane przy adapterze
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 dni
    updateAge: 24 * 60 * 60, // 24 godziny
  },
  
  // Zdarzenia cyklu życia uwierzytelniania
  events: {
    // Automatycznie weryfikuje email użytkownika przy pierwszym logowaniu przez OAuth
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  // Modyfikacja obiektu sesji
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // Logika przypisywania roli, np. dla superadmina
        if (user.email === process.env.SUPERADMIN_EMAIL) {
          session.user.role = "ADMIN";
        } else {
          // Upewnij się, że Twój model User w Prisma ma pole 'role'
          session.user.role = (user as any).role || "USER"; 
        }
      }
      return session;
    },
  },

  // Własne strony logowania i błędów
  pages: {
    signIn: '/user/login',
    error: '/user/login', // Przekierowuje na stronę logowania w razie błędu
  },

  // Sekret wymagany w środowisku produkcyjnym
  secret: process.env.NEXTAUTH_SECRET,

  // Opcjonalne: włącza logi w konsoli na środowisku deweloperskim
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };