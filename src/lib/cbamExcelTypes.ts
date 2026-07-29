export type CbamExcelFactorKey = "electricity" | "naturalGas" | "water";

export type CbamExcelFactor = {
  key: CbamExcelFactorKey;
  label: string;
  activityUnit: string;
  factor: number;
  factorUnit: string;
  note: string;
};

export type CbamExcelBreakdown = {
  key: CbamExcelFactorKey;
  label: string;
  activity: number;
  activityUnit: string;
  emissionTco2e: number;
  share: number;
};

export type CbamExcelProductSummary = {
  product: string;
  cnCode: string;
  facility: string;
  period: string;
  rows: number;
  productionTon: number;
  electricityKwh: number;
  naturalGasM3: number;
  waterM3: number;
  electricityTco2e: number;
  naturalGasTco2e: number;
  waterTco2e: number;
  totalTco2e: number;
  intensityTco2ePerTon: number | null;
};

export type CbamExcelAnalysisResult = {
  fileName: string;
  sheetName: string;
  generatedAt: string;
  facilities: string[];
  periods: string[];
  rowsParsed: number;
  rowsSkipped: number;
  qualityScore: number;
  detectedColumns: Record<string, string>;
  missingColumns: string[];
  totals: {
    electricityKwh: number;
    naturalGasM3: number;
    waterM3: number;
    productionTon: number;
    totalTco2e: number;
    intensityTco2ePerTon: number | null;
  };
  breakdown: CbamExcelBreakdown[];
  products: CbamExcelProductSummary[];
  warnings: string[];
  factors: CbamExcelFactor[];
  assumptions: string[];
};
