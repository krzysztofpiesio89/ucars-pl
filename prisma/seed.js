const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Funkcje pomocnicze do bezpiecznego parsowania i czyszczenia danych z JSON
const parseField = {
  toInt: (value) => {
    if (!value) return null;
    const parsed = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? null : parsed;
  },
  toFloat: (value) => {
    if (!value) return null;
    const cleanedValue = String(value).replace(/[^0-9.]/g, '');
    const parsed = parseFloat(cleanedValue);
    return isNaN(parsed) ? null : parsed;
  },
};

async function main() {
  console.log('Start seeding ...');

  // Czyszczenie bazy danych w odpowiedniej kolejności, aby uniknąć błędów klucza obcego
  await prisma.favorite.deleteMany({});
  await prisma.car.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Deleted existing data.');

  // Tworzenie przykładowego użytkownika (opcjonalne, ale przydatne do testowania ulubionych)
  // UWAGA: Wymaga `bcryptjs` - `npm install bcryptjs`
  // Jeśli nie chcesz tworzyć użytkownika, możesz usunąć tę sekcję.
  // const bcrypt = require('bcryptjs');
  // const hashedPassword = await bcrypt.hash('password123', 10);
  // const user = await prisma.user.create({
  //   data: {
  //     name: 'Test User',
  //     email: 'test@example.com',
  //     password: hashedPassword,
  //   },
  // });
  // console.log(`Created user "${user.name}" with id: ${user.id}`);


  // Przykładowe dane w nowym, płaskim formacie JSON
  const rawCarData = [
    {
      "stock": "43263704",
      "year": "2024",
      "make": "NISSAN",
      "model": "ALTIMA",
      "version": "SV FWD",
      "damageType": "Left Front / Collision",
      "mileage": "45,934 mi",
      "engineStatus": "Run & Drive",
      "origin": "Tidewater (Virginia)",
      "vin": "1N4BL4DV1RN******",
      "engineInfo": "2.5L I-4 DI, DOHC, VVT, 188HP",
      "fuelType": "Gasoline",
      "cylinders": "4 Cyl",
      "bidPrice": "$19,700 USD",
      "buyNowPrice": "$16,000 USD",
      "videoUrl": "https://mediastorageaccountprod.blob.core.windows.net/media/43263704_VES-100_1",
      "detailUrl": "https://www.iaai.com/VehicleDetail/43758271~US",
      "imageUrl": "https://vis.iaai.com/resizer?imageKeys=43758271~SID~I1&width=800&height=600"
    },
    {
      "stock": "43263677",
      "year": "2024",
      "make": "HYUNDAI",
      "model": "TUCSON",
      "version": "SEL",
      "damageType": "Front End / Collision",
      "mileage": "48,619 mi",
      "engineStatus": "Run & Drive",
      "origin": "Tidewater (Virginia)",
      "vin": "5NMJB3DE3RH******",
      "engineInfo": "2.5L I-4 DI, DOHC, VVT, 187HP",
      "fuelType": "Gasoline",
      "cylinders": "4 Cyl",
      "bidPrice": "$21,250 USD",
      "buyNowPrice": "$16,000 USD",
      "videoUrl": "https://mediastorageaccountprod.blob.core.windows.net/media/43263677_VES-100_1",
      "detailUrl": "https://www.iaai.com/VehicleDetail/43758245~US",
      "imageUrl": "https://vis.iaai.com/resizer?imageKeys=43758245~SID~I1&width=800&height=600"
    },
    {
      "stock": "43256850",
      "year": "2007",
      "make": "HONDA",
      "model": "RIDGELINE",
      "version": "RTX",
      "damageType": "Mechanical / Other",
      "mileage": "203,861 mi",
      "engineStatus": null,
      "origin": "Hartford (Connecticut)",
      "vin": "2HJYK16347H******",
      "engineInfo": "3.5L V-6 VVT, 247HP",
      "fuelType": "Gasoline",
      "cylinders": "6 Cyl",
      "bidPrice": "$3,175 USD",
      "buyNowPrice": "$775 USD",
      "videoUrl": "https://mediastorageaccountprod.blob.core.windows.net/media/43256850_VES-100_1",
      "detailUrl": "https://www.iaai.com/VehicleDetail/43751418~US",
      "imageUrl": "https://vis.iaai.com/resizer?imageKeys=43751418~SID~I1&width=800&height=600"
    }
  ];

  // Mapowanie danych z JSON na strukturę zgodną z modelem `Car` w Prisma
  const carsToCreate = rawCarData.map(car => ({
    stock: car.stock,
    year: parseInt(car.year, 10),
    make: car.make,
    model: car.model,
    damageType: car.damageType,
    mileage: parseField.toInt(car.mileage),
    engineStatus: car.engineStatus || 'Unknown',
    bidPrice: parseField.toFloat(car.bidPrice) || 0,
    buyNowPrice: parseField.toFloat(car.buyNowPrice),
    detailUrl: car.detailUrl,
    imageUrl: car.imageUrl,
    version: car.version,
    origin: car.origin,
    vin: car.vin,
    engineInfo: car.engineInfo,
    fuelType: car.fuelType,
    cylinders: car.cylinders,
    videoUrl: car.videoUrl,
  }));

  await prisma.car.createMany({
    data: carsToCreate,
  });

  console.log(`Seeding finished. Created ${carsToCreate.length} cars.`);
}

main()
  .catch((e) => {
    console.error('An error occurred while seeding the database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
