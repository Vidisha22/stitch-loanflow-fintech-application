const LOAN_RATES: Record<string, number> = {
  'Personal': 10.5,
  'Home': 8.5,
  'Business': 14.0,
  'Education': 11.5,
  'Vehicle': 9.5
};

const DEFAULT_RATE = 12.0;
const PROCESSING_FEE_RATE = 1.0;

export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalRepayment: number;
  processingFee: number;
}

/**
 * Calculate EMI using standard formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEMI(principal: number, annualRate: number, months: number): EMIResult | null {
  if (!principal || principal <= 0 || !months || months <= 0) return null;

  const monthlyRate = (annualRate || DEFAULT_RATE) / 12 / 100;

  let emi: number;
  if (monthlyRate === 0) {
    emi = principal / months;
  } else {
    const factor = Math.pow(1 + monthlyRate, months);
    emi = principal * monthlyRate * factor / (factor - 1);
  }

  const totalRepayment = emi * months;
  const totalInterest = totalRepayment - principal;
  const processingFee = principal * (PROCESSING_FEE_RATE / 100);

  return {
    emi: Math.round(emi * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    processingFee: Math.round(processingFee * 100) / 100,
  };
}

/** Get interest rate for a loan type */
export function getRateForLoanType(loanType: string): number {
  return LOAN_RATES[loanType] || DEFAULT_RATE;
}

/** Format as USD (integer) */
export function formatUSDInt(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '$0';
  return '$' + Math.round(amount).toLocaleString('en-US');
}
