import { PrismaClient } from '../app/generated/prisma'; // ścieżka do wygenerowanego klienta Prisma

// Singleton, żeby nie tworzyć wielu instancji w dev
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export default prisma;