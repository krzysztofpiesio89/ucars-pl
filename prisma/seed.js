// prisma/seed.js

// POPRAWKA 1: Standardowy i poprawny sposób importowania klienta Prisma
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Jeśli chcesz haszować hasła (zalecane), odkomentuj poniższą linię i zainstaluj bcrypt (npm install bcryptjs)
// const bcrypt = require('bcryptjs');

async function main() {
  console.log('Start seeding ...');
  
  // Usuwamy wszystkie stare dane, aby uniknąć konfliktów
  await prisma.car.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Deleted existing data.');

  // Tworzymy użytkownika
  // Wskazówka: W prawdziwej aplikacji hasło powinno być zahaszowane
  // const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123', // Pamiętaj, aby to zmienić na hashedPassword
    },
  });

  console.log(`Created user "${user.name}" with id: ${user.id}`);

  // Przykładowe samochody
  const carsData = [
    {
      lotNumber: '10001',
      vin: '1HGCM82633A004352',
      year: 2020,
      make: 'Toyota',
      model: 'Corolla',
      trim: 'LE',
      odometer: 15000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      drive: 'FWD',
      cylinders: 4,
      bodyStyle: 'Sedan',
      color: 'White',
      auctionDate: new Date('2025-09-15'),
      auctionLocation: 'Los Angeles',
      saleStatus: 'Available',
      currentBid: 15000,
      buyItNowPrice: 18000,
      currency: 'USD',
      imageFiles: ['https://via.placeholder.com/600x400/ffffff/000000?text=Corolla'],
      source: 'copart',
      creatorId: user.id,
    },
    {
      lotNumber: '10002',
      vin: '2HGCM82633A004353',
      year: 2019,
      make: 'Honda',
      model: 'Civic',
      trim: 'EX',
      odometer: 20000,
      fuelType: 'Gasoline',
      transmission: 'Automatic',
      drive: 'FWD',
      cylinders: 4,
      bodyStyle: 'Sedan',
      color: 'Black',
      auctionDate: new Date('2025-09-16'),
      auctionLocation: 'New York',
      saleStatus: 'Available',
      currentBid: 14000,
      buyItNowPrice: 16000,
      currency: 'USD',
      imageFiles: ['https://via.placeholder.com/600x400/000000/ffffff?text=Civic'],
      source: 'copart',
      creatorId: user.id,
    },
  ];

  // POPRAWKA 2: Używamy `createMany` do masowego dodawania danych.
  // Jest to o wiele szybsze, ponieważ wykonuje tylko jedno zapytanie do bazy danych.
  await prisma.car.createMany({
    data: carsData,
  });

  console.log(`Seeding finished. Created ${carsData.length} cars.`);
}

main()
  .catch((e) => {
    console.error('An error occurred while seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });