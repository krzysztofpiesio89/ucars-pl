const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  // Tworzymy użytkownika
  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123', // w prawdziwej aplikacji hashować!
    },
  });

  console.log('Created user with id:', user.id);

  // Przykładowe samochody
  const cars = [
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
      auctionDate: new Date('2024-09-15'),
      auctionLocation: 'Los Angeles',
      saleStatus: 'Available',
      currentBid: 15000,
      buyItNowPrice: 18000,
      currency: 'USD',
      imageFiles: JSON.stringify(['https://via.placeholder.com/400']),
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
      auctionDate: new Date('2024-09-16'),
      auctionLocation: 'New York',
      saleStatus: 'Available',
      currentBid: 14000,
      buyItNowPrice: 16000,
      currency: 'USD',
      imageFiles: JSON.stringify(['https://via.placeholder.com/400']),
      source: 'copart',
      creatorId: user.id,
    },
  ];

  for (const car of cars) {
    await prisma.car.create({ data: car });
  }

  console.log('Seeded cars successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
