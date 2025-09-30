'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { CarProps } from '@/types';
import { useCurrency } from '@/context/CurrencyProvider';
import OfferPDF from './OfferPDF';
import CustomButton from './CustomButton';

interface CostCalculatorProps {
  car: CarProps;
}

const CostCalculator = ({ car }: CostCalculatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { rate, isLoading: isCurrencyLoading } = useCurrency();

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // <-- starsza wersja używa contentRef
    documentTitle: `Oferta-${car.make}-${car.model}-${car.stock}`,
    onAfterPrint: () => alert('Plik PDF został wygenerowany'),
  });

  const USD_TO_PLN_RATE = rate || 4.0;

  // --- Stałe i założenia ---
  const AUCTION_FEE_PERCENTAGE = 0.12;
  const US_LAND_TRANSPORT_USD = 600;
  const SEA_TRANSPORT_USD = 1300;
  const TRANSPORT_INSURANCE_USD = 150;
  const IMPORTER_COMMISSION_PERCENTAGE = 0.08;
  const PL_TRANSPORT_PLN = 1000;
  const PORT_FEES_PLN = 2500;

  // --- Obliczenia ---
  const purchasePriceUSD = car.buyNowPrice || car.bidPrice;

  const getExciseRate = () => {
    const capacityCm3 = car.engineCapacityL ? car.engineCapacityL * 1000 : 0;
    const fuel = car.fuelType;

    if (fuel === 'Electric') {
      return { rate: 0, description: '0% (Elektryczny)' };
    }

    if (fuel === 'Hybrid' || fuel === 'PHEV') {
      if (capacityCm3 <= 2000) {
        return { rate: 0.0155, description: '1.55% (Hybryda do 2.0L)' };
      } else {
        return { rate: 0.093, description: '9.3% (Hybryda > 2.0L)' };
      }
    }

    if (capacityCm3 > 0 && capacityCm3 <= 2000) {
      return { rate: 0.031, description: '3.1% (do 2.0L)' };
    }

    if (capacityCm3 > 2000) {
      return { rate: 0.186, description: '18.6% (> 2.0L)' };
    }

    return { rate: 0.186, description: '18.6% (Założono > 2.0L)' };
  };

  const { rate: exciseRate, description: exciseDescription } = getExciseRate();

  const auctionFeeUSD = purchasePriceUSD * AUCTION_FEE_PERCENTAGE;
  const carValueAfterPurchaseUSD = purchasePriceUSD + auctionFeeUSD;
  const grossValueUSD =
    carValueAfterPurchaseUSD + US_LAND_TRANSPORT_USD + SEA_TRANSPORT_USD + TRANSPORT_INSURANCE_USD;
  const customsDutyUSD = 0.1 * grossValueUSD;
  const vatUSD = 0.23 * (grossValueUSD + customsDutyUSD);
  const exciseTaxUSD = exciseRate * (grossValueUSD + customsDutyUSD);
  const importerCommissionUSD = IMPORTER_COMMISSION_PERCENTAGE * carValueAfterPurchaseUSD;

  const totalCostInPLN =
    (grossValueUSD + customsDutyUSD + vatUSD + exciseTaxUSD + importerCommissionUSD) * USD_TO_PLN_RATE +
    PORT_FEES_PLN +
    PL_TRANSPORT_PLN;

  const formatCurrency = (value: number, currency = 'PLN') =>
    new Intl.NumberFormat('pl-PL', { style: 'currency', currency }).format(value);

  const CalculationRow = ({
    label,
    value,
    isLoading = false,
  }: {
    label: string;
    value: string;
    isLoading?: boolean;
  }) => (
    <div className="flex justify-between py-2 border-b border-slate-200 dark:border-slate-700 text-sm">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      {isLoading ? (
        <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
      ) : (
        <span className="text-slate-900 dark:text-white font-medium">{value}</span>
      )}
    </div>
  );

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-800/50 rounded-t-2xl hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors"
      >
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Szacunkowy koszt importu
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 text-slate-500 dark:text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Poniższe obliczenia są wartościami szacunkowymi i mogą się różnić. Oparte są na aktualnej
            cenie licytacji: {formatCurrency(purchasePriceUSD, 'USD')}.{' '}
            {isCurrencyLoading
              ? 'Pobieranie kursu waluty...'
              : `Kurs USD/PLN przyjęto na poziomie ${USD_TO_PLN_RATE.toFixed(4)}.`}
          </p>

          <div className="space-y-1">
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Cena zakupu w USD (szacunkowa)"
              value={formatCurrency(purchasePriceUSD)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Cena zakupu w zł (szacunkowa)"
              value={formatCurrency(purchasePriceUSD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Opłata aukcyjna"
              value={formatCurrency(auctionFeeUSD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Transport lądowy w USA"
              value={formatCurrency(US_LAND_TRANSPORT_USD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Transport morski"
              value={formatCurrency(SEA_TRANSPORT_USD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Ubezpieczenie transportu"
              value={formatCurrency(TRANSPORT_INSURANCE_USD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Cło (10%)"
              value={formatCurrency(customsDutyUSD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label={`Akcyza (${exciseDescription})`}
              value={formatCurrency(exciseTaxUSD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="VAT (23%)"
              value={formatCurrency(vatUSD * USD_TO_PLN_RATE)}
            />
            <CalculationRow
              isLoading={isCurrencyLoading}
              label="Prowizja importera"
              value={formatCurrency(importerCommissionUSD * USD_TO_PLN_RATE)}
            />
            <CalculationRow label="Opłaty portowe i celne w PL" value={formatCurrency(PORT_FEES_PLN)} />
            <CalculationRow label="Transport w Polsce" value={formatCurrency(PL_TRANSPORT_PLN)} />

            <div className="flex justify-between py-3 font-bold text-lg border-t border-slate-300 dark:border-slate-600 mt-2">
              <span className="text-slate-800 dark:text-white">Całkowity szacowany koszt</span>
              {isCurrencyLoading ? (
                <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded-md animate-pulse" />
              ) : (
                <span className="text-slate-900 dark:text-white">{formatCurrency(totalCostInPLN)}</span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
            <strong>Uwaga:</strong> Stawka akcyzy jest zależna od pojemności i typu silnika. W kalkulacji
            uwzględniono dane pojazdu.
          </p>

          <div className="mt-6 flex justify-end">
            <CustomButton
              title="Drukuj Ofertę"
              handleClick={handlePrint}
              containerStyle="w-full sm:w-auto py-[16px] rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[14px] leading-[17px] font-bold"
            />
          </div>

          <div style={{ display: 'none' }}>
            <OfferPDF
              ref={componentRef}
              car={car}
              totalCostInPLN={totalCostInPLN}
              purchasePriceUSD={purchasePriceUSD}
              auctionFeeUSD={auctionFeeUSD}
              usLandTransportUSD={US_LAND_TRANSPORT_USD}
              seaTransportUSD={SEA_TRANSPORT_USD}
              transportInsuranceUSD={TRANSPORT_INSURANCE_USD}
              customsDutyUSD={customsDutyUSD}
              vatUSD={vatUSD}
              exciseTaxUSD={exciseTaxUSD}
              importerCommissionUSD={importerCommissionUSD}
              portFeesPLN={PORT_FEES_PLN}
              plTransportPLN={PL_TRANSPORT_PLN}
              usdToPlnRate={USD_TO_PLN_RATE}
              exciseDescription={exciseDescription}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CostCalculator;
