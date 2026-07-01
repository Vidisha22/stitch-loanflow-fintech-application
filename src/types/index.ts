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

/** Allowed MIME types for documents */
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
] as const;

export type AllowedMimeType = (typeof ALLOWED_DOCUMENT_TYPES)[number];

/** Maximum upload file size in bytes (10MB) */
export const MAX_UPLOAD_SIZE = 10 * 1024 * 1024;

/** Uploaded document metadata */
export interface UploadedDocument {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview: string | null;
  uploadedAt: number;
  uploadProgress: number;
}

/** Upload progress simulation config */
export interface UploadProgressConfig {
  minDuration: number;
  maxDuration: number;
  interval: number;
}