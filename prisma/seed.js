const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

// Funkcje pomocnicze do czyszczenia i parsowania wartości z JSON
const parseField = {
  toInt: (value) => {
    if (!value) return null;
    const parsed = parseInt(String(value).replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? null : parsed;
  },
  toFloat: (value) => {
    if (!value) return null;
    const parsed = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    return isNaN(parsed) ? null : parsed;
  },
  toVin: (value) => {
    return value ? String(value).split('(')[0].trim() : `UNKNOWN_VIN_${Date.now()}`;
  },
  toDate: (value) => {
    // Ta data jest w przeszłości, więc używamy jej, ale zmieniamy rok na bieżący dla logiki
    if (!value) return null;
    try {
      const dateStr = String(value).split('(')[0].trim().replace('MON', 'Mon');
      const date = new Date(dateStr);
      date.setFullYear(new Date().getFullYear() + 1); // Ustawiamy na przyszły rok
      return isNaN(date.getTime()) ? null : date;
    } catch {
      return null;
    }
  },
  toColor: (value) => {
    return value ? String(value).split('/')[0].trim() : null;
  },
  // Prosta funkcja do odgadywania marki na podstawie modelu
  inferMake: (model) => {
    const modelLower = model.toLowerCase();
    if (modelLower.includes('highlander') || modelLower.includes('4runner')) return 'Toyota';
    if (modelLower.includes('q50')) return 'Infiniti';
    return 'Unknown';
  }
};

async function main() {
  console.log('Start seeding ...');

  await prisma.car.deleteMany({});
  await prisma.user.deleteMany({});
  console.log('Deleted existing data.');

  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });
  console.log(`Created user "${user.name}" with id: ${user.id}`);

  // Przykładowe dane z Twojego pliku JSON
  const rawData = [
    {
      "vehicleInfo": {
        "Stock #": "43222529", "Branch": "AvenelNewJersey(NJ)", "VIN (Status)": "JTEGD21A350******(OK)",
        "Primary Damage": "NormalWear&Tear", "Start Code": "Run&Drive", "Odometer": "58,729mi(NotRequired/Exempt)",
        "Body Style": "UTILITY", "Engine": "2.4LI-4DOHC,VVT,160HP", "Transmission": "AutomaticTransmission",
        "Drive Line Type": "FrontWheelDrive", "Fuel Type": "Gasoline", "Cylinders": "4Cylinders",
        "Exterior/Interior": "Gold/Unknown", "Model": "HIGHLANDER", "Auction Date and Time": "Mon Sep 22, 8:30am (CDT)",
        "Buy Now Price": "$4,500"
      },
      "images": [{"hdUrl": "https://vis.iaai.com/retriever?imageKeys=43717055~SID~B607~S0~I1~RW2576~H1932~TH0"}, {"hdUrl": "https://vis.iaai.com/retriever?imageKeys=43717055~SID~B607~S0~I2~RW2576~H1932~TH0"}]
    },
    {
      "vehicleInfo": {
        "Stock #": "43222137", "Branch": "AvenelNewJersey(NJ)", "VIN (Status)": "JT3HN86R5Y0******(OK)",
        "Primary Damage": "NormalWear&Tear", "Start Code": "Run&Drive", "Odometer": "137,667mi(Actual)",
        "Body Style": "UTILITY", "Engine": "3.4LV-6DOHC,183HP", "Transmission": "AutomaticTransmission",
        "Drive Line Type": "4X4Drive", "Fuel Type": "Gasoline", "Cylinders": "6Cylinders", "Exterior/Interior": "Silver/Unknown",
        "Model": "4RUNNER", "Series": "SR5V6", "Auction Date and Time": "Mon Sep 22, 8:30am (CDT)",
        "Buy Now Price": "$3,500"
      },
      "images": [{"hdUrl": "https://vis.iaai.com/retriever?imageKeys=43716663~SID~B607~S0~I1~RW2576~H1932~TH0"}, {"hdUrl": "https://vis.iaai.com/retriever?imageKeys=43716663~SID~B607~S0~I2~RW2576~H1932~TH0"}]
    },
    {
      "vehicleInfo": {
        "Stock #": "43221756", "Branch": "Concord(NC)", "VIN (Status)": "JN1EV7AP3H******(OK)", "Loss": "Other",
        "Primary Damage": "Theft", "Start Code": "Stationary", "Odometer": "1mi(InoperableDigitalDash)",
        "Model": "Q50", "Auction Date and Time": "Mon Sep 22, 8:30am (CDT)", "Buy Now Price": "$2,500"
      },
      "images": [{"hdUrl": "https://vis.iaai.com/retriever?imageKeys=43716282~SID~B746~S0~I1~RW4032~H3024~TH0"}, {"hdUrl": "https://vis.iaai.com/retriever?imageKeys=43716282~SID~B746~S0~I2~RW4032~H3024~TH0"}]
    }
  ];

  // Mapujemy "brudne" dane z JSON na czystą strukturę zgodną z Prisma
  const carsData = rawData.map(car => {
    const info = car.vehicleInfo;
    return {
      lotNumber: info["Stock #"],
      vin: parseField.toVin(info["VIN (Status)"]),
      // UWAGA: Rok i Marka nie istnieją w Twoim JSON, więc je uzupełniamy
      year: parseField.toInt(info.Year) || 2024, // Domyślny rok, jeśli nie ma w JSON
      make: info.Make || parseField.inferMake(info.Model),
      model: info.Model,
      trim: info.Series,
      odometer: parseField.toInt(info.Odometer),
      engine: info.Engine,
      startCode: info["Start Code"],
      primaryDamage: info["Primary Damage"],
      secondaryDamage: info["Secondary Damage"],
      lossType: info.Loss,
      fuelType: info["Fuel Type"],
      transmission: info.Transmission,
      drive: info["Drive Line Type"],
      cylinders: parseField.toInt(info.Cylinders),
      bodyStyle: info["Body Style"],
      color: parseField.toColor(info["Exterior/Interior"]),
      auctionDate: parseField.toDate(info["Auction Date and Time"]),
      auctionLocation: info.Branch,
      currentBid: 0, // Domyślna wartość
      buyItNowPrice: parseField.toFloat(info["Buy Now Price"]),
      imageFiles: car.images ? car.images.map(img => img.hdUrl) : [],
      source: 'iaai',
      creatorId: user.id,
    };
  });

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