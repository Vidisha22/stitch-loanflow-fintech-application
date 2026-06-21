import { z } from 'zod';

/** PAN Card validation regex: 5 letters, 4 digits, 1 letter */
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

/** Aadhaar validation: exactly 12 digits */
const aadhaarRegex = /^\d{12}$/;

/** Phone: 10-15 digits, optionally starting with + */
const phoneRegex = /^\+?\d{10,15}$/;

/** ZIP code: 5 digits or 5+4 */
const zipRegex = /^\d{5}(-\d{4})?$/;

/** PAN entity type codes */
const PAN_ENTITY_TYPES: Record<string, string> = {
  'P': 'Individual',
  'C': 'Company',
  'H': 'Hindu Undivided Family',
  'F': 'Firm / Partnership',
  'A': 'Association of Persons',
  'T': 'Trust',
  'B': 'Body of Individuals',
  'L': 'Local Authority',
  'J': 'Artificial Juridical Person',
  'G': 'Government'
};

/** Verhoeff checksum tables */
const VERHOEFF_MULTIPLICATION = [
  [0,1,2,3,4,5,6,7,8,9],[1,2,3,4,0,6,7,8,9,5],[2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],[4,0,1,2,3,9,5,6,7,8],[5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],[7,6,5,9,8,2,1,0,4,3],[8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0]
];
const VERHOEFF_PERMUTATION = [
  [0,1,2,3,4,5,6,7,8,9],[1,5,7,6,2,8,3,0,9,4],[5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],[9,4,5,3,1,2,6,8,7,0],[4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],[7,0,4,6,9,1,3,2,5,8]
];
const VERHOEFF_INVERSE = [0,4,3,2,1,5,6,7,8,9];

function verhoeffChecksum(digits: string): number {
  let c = 0;
  const digitArray = digits.split('').reverse().map(Number);
  for (let i = 0; i < digitArray.length; i++) {
    const row = i % 8;
    c = VERHOEFF_MULTIPLICATION[c][VERHOEFF_PERMUTATION[row][digitArray[i]]];
  }
  return VERHOEFF_INVERSE[c];
}

/** Custom PAN validator */
export function validatePAN(pan: string): { valid: boolean; entityType?: string; error?: string } {
  if (!pan) return { valid: false, error: 'PAN is required' };
  const cleaned = pan.trim().toUpperCase();
  if (cleaned.length !== 10) return { valid: false, error: 'PAN must be exactly 10 characters' };
  if (!panRegex.test(cleaned)) return { valid: false, error: 'PAN format must be 5 letters, 4 digits, 1 letter (e.g., ABCDE1234F)' };
  const entityCode = cleaned.charAt(2);
  const entityType = PAN_ENTITY_TYPES[entityCode];
  if (!entityType) return { valid: false, error: 'Invalid PAN: unknown entity type code' };
  return { valid: true, entityType };
}

/** Custom Aadhaar validator with Verhoeff checksum */
export function validateAadhaar(aadhaar: string): { valid: boolean; error?: string } {
  if (!aadhaar) return { valid: false, error: 'Aadhaar number is required' };
  const cleaned = aadhaar.trim().replace(/\s+/g, '');
  if (cleaned.length !== 12) return { valid: false, error: 'Aadhaar must be exactly 12 digits' };
  if (!aadhaarRegex.test(cleaned)) return { valid: false, error: 'Aadhaar must contain only digits' };
  const first11 = cleaned.substring(0, 11);
  const lastDigit = parseInt(cleaned.charAt(11), 10);
  const expected = verhoeffChecksum(first11);
  if (expected !== lastDigit) return { valid: false, error: 'Aadhaar number failed checksum validation. Please verify the number.' };
  return { valid: true };
}

/** Helper: validate age >= 18 from DOB string */
function isAtLeast18(dob: string): boolean {
  if (!dob) return false;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= 18;
}

/** Custom refinement for PAN */
function panRefinement(val: string, ctx: z.RefinementCtx) {
  const result = validatePAN(val);
  if (!result.valid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: result.error || 'Invalid PAN'
    });
  }
}

/** Custom refinement for Aadhaar */
function aadhaarRefinement(val: string, ctx: z.RefinementCtx) {
  const result = validateAadhaar(val);
  if (!result.valid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: result.error || 'Invalid Aadhaar'
    });
  }
}

/** Step 1: Personal Information Schema */
export const personalInfoSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(50),
  last_name: z.string().min(1, 'Last name is required').max(50),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone is required').regex(phoneRegex, 'Please enter a valid phone number'),
  dob: z.string().min(1, 'Date of birth is required').refine(isAtLeast18, 'You must be at least 18 years old'),
  gender: z.string().min(1, 'Please select a gender'),
  pan: z.string().min(1, 'PAN is required').superRefine(panRefinement),
  pan_verified: z.boolean(),
  pan_entity_type: z.string().optional(),
  aadhaar: z.string().min(1, 'Aadhaar is required').superRefine(aadhaarRefinement),
  aadhaar_verified: z.boolean(),
});

/** Step 2: Address Details Schema */
export const addressInfoSchema = z.object({
  street: z.string().min(1, 'Street address is required').max(100),
  city: z.string().min(1, 'City is required').max(50),
  state: z.string().min(1, 'Please select a state'),
  zip: z.string().min(1, 'ZIP code is required').regex(zipRegex, 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)'),
  country: z.string().min(1, 'Please select a country'),
});

/** Step 3: Employment Information Schema */
export const employmentInfoSchema = z.object({
  employment_status: z.string().min(1, 'Please select employment status'),
  company_name: z.string().min(1, 'Company name is required').max(100),
  job_title: z.string().min(1, 'Job title is required').max(100),
  monthly_income: z.number().min(0, 'Income cannot be negative'),
  employment_years: z.number().min(0, 'Years cannot be negative').max(70, 'Maximum 70 years'),
});

/** Step 4: Loan Details Schema */
export const loanInfoSchema = z.object({
  loan_type: z.string().min(1, 'Please select a loan type'),
  loan_amount: z.number().min(1000, 'Minimum loan amount is $1,000').max(100000, 'Maximum loan amount is $100,000'),
  tenure: z.string().min(1, 'Please select a loan tenure'),
  purpose: z.string().min(10, 'Please provide at least 10 characters describing the purpose').max(500),
});

/** Signature validation — must be a non-empty data URL */
export const signatureSchema = z.string().min(1, 'Signature is required').refine(
  (val) => val.startsWith('data:image/'),
  'Invalid signature data'
);

/** Complete application schema */
export const applicationSchema = z.object({
  personalInfo: personalInfoSchema,
  addressInfo: addressInfoSchema,
  employmentInfo: employmentInfoSchema,
  loanInfo: loanInfoSchema,
  termsAccepted: z.literal(true, { message: 'You must accept the terms and conditions' }),
  signature: signatureSchema.optional(),
});

export type SignatureData = z.infer<typeof signatureSchema>;

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type AddressInfoFormData = z.infer<typeof addressInfoSchema>;
export type EmploymentInfoFormData = z.infer<typeof employmentInfoSchema>;
export type LoanInfoFormData = z.infer<typeof loanInfoSchema>;
export type ApplicationFormData = z.infer<typeof applicationSchema>;