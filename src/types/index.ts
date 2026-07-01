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

/** Supported document types */
export type DocumentType = 'pdf' | 'jpg' | 'png';

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