// components/BrandStrip.tsx
import Image from 'next/image';
import Link from 'next/link';

// Nowa, rozszerzona lista marek
const brands = [
  { name: 'Alfa Romeo', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8819d5e6e9d_logo-ALFA%20ROMEO.svg' },
  { name: 'Audi', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8c0f35e6ea3_logo-AUDI.svg' },
  { name: 'BMW', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c876315e6e9e_logo-BMW.svg' },
  { name: 'Chevrolet', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8f0815e6ece_logo-CHEVROLET.svg' },
  { name: 'Chrysler', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c878d55e6e9c_logo-CHRYSLER.svg' },
  { name: 'Dodge', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8a2425e6e96_logo-DODGE.svg' },
  { name: 'Ford', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c839ba5e6ef6_logo-FORD.svg' },
  { name: 'Honda', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c87c385e6ea4_logo-HONDA.svg' },
  { name: 'Hyundai', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8c5f65e6e98_logo-HYUNDAI.svg' },
  { name: 'Infiniti', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c865d45e6e97_logo-INFINITI.svg' },
  { name: 'Jaguar', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c85a3e5e6eb7_logo-JAGUAR.svg' },
  { name: 'Jeep', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8fdec5e6ef7_logo-JEEP.svg' },
  { name: 'Kia', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c80ab45e6ed8_logo-KIA.svg' },
  { name: 'Land Rover', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c86f0c5e6ed5_logo-LAND%20ROVER.svg' },
  { name: 'Lexus', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c87af05e6ef8_logo-LEXUS.svg' },
  { name: 'Maserati', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c885285e6f34_logo-MASERATI.svg' },
  { name: 'Mazda', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c852ca5e6ecd_logo-MAZDA.svg' },
  { name: 'Mercedes', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8932f5e6efe_logo-MERCEDES.svg' },
  { name: 'Mini', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c877225e6ec0_logo-MINI.svg' },
  { name: 'Mitsubishi', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8c8665e6ed9_logo-MITSUBISHI.svg' },
  { name: 'Nissan', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c893145e6ecc_logo-NISSAN.svg' },
  { name: 'Porsche', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8fee65e6eb8_logo-PORSCHE.svg' },
  { name: 'Ram', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c870135e6ecf_logo-RAM.svg' },
  { name: 'Range Rover', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c81e4e5e6ed6_logo-RANGE%20ROVER.svg' },
  { name: 'Subaru', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8f94b5e6ed7_logo-SUBARU.svg' },
  { name: 'Tesla', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c89be75e6ed2_logo-TESLA.svg' },
  { name: 'Toyota', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8ed7c5e6ec3_logo-TOYOTA.svg' },
  { name: 'Volkswagen', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c8759b5e6ed3_logo-VW.svg' },
  { name: 'Volvo', url: 'https://cdn.prod.website-files.com/645ba5c617e2c8a3585e6e61/645ba5c617e2c83f2e5e6ec1_logo-VOLVO.svg' },
];

const BrandStrip = () => {
  return (
    <div className="w-full bg-blue-900 dark:bg-gray-900 py-6 lg:py-8 border-t border-b border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-12">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/view-all?brand=${encodeURIComponent(brand.name)}`}
              className="flex-shrink-0"
            >
              <Image
                src={brand.url}
                alt={`${brand.name} logo`}
                width={120}
                height={40}
                className="
                  h-9 md:h-12 w-auto object-contain 
                  opacity-60 hover:opacity-100 
                  filter grayscale hover:grayscale-0
                  transition-all duration-300 ease-in-out
                "
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandStrip;