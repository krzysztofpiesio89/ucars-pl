import React from 'react';
import Image from 'next/image';
import { CarProps } from '@/types';

interface OfferPDFProps {
  car: CarProps;
  totalCostInPLN: number;
  purchasePriceUSD: number;
  auctionFeeUSD: number;
  usLandTransportUSD: number;
  seaTransportUSD: number;
  transportInsuranceUSD: number;
  customsDutyUSD: number;
  vatUSD: number;
  exciseTaxUSD: number;
  importerCommissionUSD: number;
  portFeesPLN: number;
  plTransportPLN: number;
  usdToPlnRate: number;
  exciseDescription: string;
}

const OfferPDF = React.forwardRef<HTMLDivElement, OfferPDFProps>((props, ref) => {
  const { 
    car, 
    totalCostInPLN,
    purchasePriceUSD,
    auctionFeeUSD,
    usLandTransportUSD,
    seaTransportUSD,
    transportInsuranceUSD,
    customsDutyUSD,
    vatUSD,
    exciseTaxUSD,
    importerCommissionUSD,
    portFeesPLN,
    plTransportPLN,
    usdToPlnRate,
    exciseDescription
  } = props;

  const formatCurrency = (value: number, currency = 'PLN') => {
    return new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(value);
  };

  return (
    <div ref={ref} className="p-8 bg-white text-black">
      <div className="flex justify-between items-center border-b-2 pb-4">
        <h1 className="text-3xl font-bold">uCars.pl - Oferta</h1>
        <div>
          <p>Data: {new Date().toLocaleDateString('pl-PL')}</p>
          <p>Kurs USD/PLN: {usdToPlnRate.toFixed(4)}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">{car.year} {car.make} {car.model}</h2>
        <p className="text-gray-600">Numer LOT: {car.stock} | Wersja: {car.version}</p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
                    <Image 
            src={car.imageUrl} 
            alt={`${car.make} ${car.model}`} 
            width={500} 
            height={300} 
            className="w-full h-auto object-cover rounded-lg shadow-md" 
          />
        </div>
        <div>
          <h3 className="text-xl font-semibold border-b pb-2">Specyfikacja</h3>
          <div className="mt-4 space-y-2">
            <p><strong>VIN:</strong> {car.vin}</p>
            <p><strong>Przebieg:</strong> {car.mileage ? `${car.mileage.toLocaleString('pl-PL')} mi` : 'N/A'}</p>
            <p><strong>Uszkodzenie:</strong> {car.damageType}</p>
            <p><strong>Paliwo:</strong> {car.fuelType}</p>
            <p><strong>Pojemność:</strong> {car.engineCapacityL}L</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold border-b pb-2">Szacunkowe Koszty Importu</h3>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between"><p>Cena zakupu:</p><p>{formatCurrency(purchasePriceUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Opłata aukcyjna:</p><p>{formatCurrency(auctionFeeUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Transport lądowy w USA:</p><p>{formatCurrency(usLandTransportUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Transport morski:</p><p>{formatCurrency(seaTransportUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Ubezpieczenie:</p><p>{formatCurrency(transportInsuranceUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Cło (10%):</p><p>{formatCurrency(customsDutyUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Akcyza ({exciseDescription}):</p><p>{formatCurrency(exciseTaxUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>VAT (23%):</p><p>{formatCurrency(vatUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Prowizja importera:</p><p>{formatCurrency(importerCommissionUSD * usdToPlnRate)}</p></div>
          <div className="flex justify-between"><p>Opłaty portowe w PL:</p><p>{formatCurrency(portFeesPLN)}</p></div>
          <div className="flex justify-between"><p>Transport w Polsce:</p><p>{formatCurrency(plTransportPLN)}</p></div>
          <div className="flex justify-between font-bold text-lg mt-4 border-t pt-2"><p>Całkowity koszt:</p><p>{formatCurrency(totalCostInPLN)}</p></div>
        </div>
      </div>

      <div className="mt-8 text-xs text-gray-500">
        <p>Powyższa oferta jest symulacją i nie stanowi oferty handlowej w rozumieniu art. 66 §1 Kodeksu Cywilnego. Ostateczne koszty mogą się różnić w zależności od kursu walut, ostatecznej ceny pojazdu oraz innych nieprzewidzianych opłat.</p>
      </div>
    </div>
  );
});

OfferPDF.displayName = 'OfferPDF';

export default OfferPDF;
