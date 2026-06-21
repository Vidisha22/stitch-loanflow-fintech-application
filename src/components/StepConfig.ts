export interface StepInfo {
  id: number;
  label: string;
  shortLabel: string;
}

export const STEPS: StepInfo[] = [
  { id: 1, label: 'Personal Information', shortLabel: 'Identity' },
  { id: 2, label: 'Address Details', shortLabel: 'Address' },
  { id: 3, label: 'Employment Information', shortLabel: 'Employment' },
  { id: 4, label: 'Loan Details', shortLabel: 'Loan' },
  { id: 5, label: 'Review & Submit', shortLabel: 'Review' },
];