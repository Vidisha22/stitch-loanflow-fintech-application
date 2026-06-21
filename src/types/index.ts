/** Step names and configuration */
export interface StepConfig {
  id: number;
  label: string;
  shortLabel: string;
  path: string;
}

/** Personal Information step data */
export interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  pan: string;
  pan_verified: boolean;
  pan_entity_type?: string;
  aadhaar: string;
  aadhaar_verified: boolean;
}

/** Address Details step data */
export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

/** Employment Information step data */
export interface EmploymentInfo {
  employment_status: string;
  company_name: string;
  job_title: string;
  monthly_income: number | null;
  employment_years: number | null;
  income_document?: File | null;
}

/** Loan Details step data */
export interface LoanInfo {
  loan_type: string;
  loan_amount: number;
  tenure: string;
  purpose: string;
}

/** Complete loan application form data */
export interface LoanApplication {
  personalInfo: PersonalInfo;
  addressInfo: AddressInfo;
  employmentInfo: EmploymentInfo;
  loanInfo: LoanInfo;
  termsAccepted: boolean;
}

/** Draft metadata */
export interface DraftMeta {
  draftId: string;
  step: number;
  timestamp: number;
  expiresAt: number;
}

/** EMI Calculation result */
export interface EMIResult {
  emi: number;
  totalInterest: number;
  totalRepayment: number;
  processingFee: number;
}

/** PAN Validation result */
export interface PANValidationResult {
  valid: boolean;
  entityType?: string;
  error?: string;
}

/** Aadhaar Validation result */
export interface AadhaarValidationResult {
  valid: boolean;
  error?: string;
}

/** Verification simulation status */
export type VerificationStatus = 'idle' | 'verifying' | 'verified' | 'error';

/** Navigation direction */
export type NavDirection = 'next' | 'prev';

/** Step visibility condition */
export interface StepVisibility {
  show: boolean;
  reason?: string;
}

/** File upload state */
export interface FileUploadState {
  file: File | null;
  preview: string | null;
  compressed?: boolean;
  originalSize?: number;
  compressedSize?: number;
  compressionRatio?: string;
  error?: string;
}