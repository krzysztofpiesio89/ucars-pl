export interface ParsedEngineInfo {
  engineCapacityL?: number;
  cylinderArrangement?: string;
  injectionType?: string;
  camshaftType?: string;
  valveTiming?: string;
  isTurbo?: boolean;
  horsepower?: number;
}

export const parseEngineInfo = (engineInfo: string): ParsedEngineInfo => {
  if (!engineInfo) {
    return {};
  }

  const parsedInfo: ParsedEngineInfo = {};

  // 1. Engine Capacity (e.g., 1.5L)
  const capacityMatch = engineInfo.match(/(\d+\.\d+)L/);
  if (capacityMatch) {
    parsedInfo.engineCapacityL = parseFloat(capacityMatch[1]);
  }

  // 2. Cylinder Arrangement (e.g., I-4, V-6)
  const cylinderMatch = engineInfo.match(/(I-\d+|V-\d+)/);
  if (cylinderMatch) {
    parsedInfo.cylinderArrangement = cylinderMatch[1];
  }

  // 3. Injection Type (e.g., DI)
  if (engineInfo.includes('DI')) {
    parsedInfo.injectionType = 'DI';
  }

  // 4. Camshaft Type (e.g., DOHC, SOHC)
  if (engineInfo.includes('DOHC')) {
    parsedInfo.camshaftType = 'DOHC';
  } else if (engineInfo.includes('SOHC')) {
    parsedInfo.camshaftType = 'SOHC';
  }

  // 5. Valve Timing (e.g., VVT)
  if (engineInfo.includes('VVT')) {
    parsedInfo.valveTiming = 'VVT';
  }

  // 6. Turbo
  if (engineInfo.toLowerCase().includes('turbo')) {
    parsedInfo.isTurbo = true;
  }

  // 7. Horsepower (e.g., 179HP)
  const hpMatch = engineInfo.match(/(\d+)HP/);
  if (hpMatch) {
    parsedInfo.horsepower = parseInt(hpMatch[1], 10);
  }

  return parsedInfo;
};
