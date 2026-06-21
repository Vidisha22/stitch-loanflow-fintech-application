/** Interest rates by loan type */
const LOAN_RATES: Record<string, number> = {
  'Personal': 10.5,
  'Home': 8.5,
  'Business': 14.0,
  'Education': 11.5,
  'Vehicle': 9.5
};

const DEFAULT_RATE = 12.0;
const PROCESSING_FEE_RATE = 1.0; // 1% of loan amount

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

/**
 * Format as Indian currency (₹).
 * Indian numbering: thousands, lakhs, crores
 */
export function formatIndianCurrency(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const negative = amount < 0;
  const absAmount = Math.abs(amount);
  const parts = absAmount.toFixed(2).split('.');
  let integerPart = parts[0];
  const decimalPart = parts[1];

  const lastThree = integerPart.slice(-3);
  const otherDigits = integerPart.slice(0, -3);

  let formattedInt = lastThree;
  if (otherDigits) {
    const groups: string[] = [];
    let remaining = otherDigits;
    while (remaining.length > 0) {
      if (remaining.length <= 2) {
        groups.unshift(remaining);
        break;
      }
      groups.unshift(remaining.slice(-2));
      remaining = remaining.slice(0, -2);
    }
    formattedInt = groups.join(',') + ',' + lastThree;
  }

  return (negative ? '-₹' : '₹') + formattedInt + '.' + decimalPart;
}

/** Format as USD */
export function formatUSD(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '$0.00';
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/** Format as USD (integer) */
export function formatUSDInt(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '$0';
  return '$' + Math.round(amount).toLocaleString('en-US');
}