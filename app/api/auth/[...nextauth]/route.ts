import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/utils/prisma";

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session?.user && session.user.email) {
        // pobieramy użytkownika z PostgreSQL przez Prisma
        const sessionUser = await prisma.user.findUnique({
          where: { email: session.user.email },
        });
        if (sessionUser) {
          session.user.id = sessionUser.id.toString();
        }
      }
      return session;
    },
    async signIn({ profile }): Promise<boolean> {
      try {
        if (!profile?.email) return false;

        // sprawdzamy czy użytkownik już istnieje
        const isUserExists = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!isUserExists) {
          // tworzymy nowego użytkownika w PostgreSQL
          const image = `https://api.multiavatar.com/${profile.name}.svg`;

          await prisma.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              password: "", // GitHub login, hasło nie jest potrzebne
              // dodatkowe pola opcjonalne
            },
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
