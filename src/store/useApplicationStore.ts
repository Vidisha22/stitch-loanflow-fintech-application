import { create } from 'zustand';
import type { PersonalInfo, AddressInfo, EmploymentInfo, LoanInfo, DraftMeta, UploadedDocument } from '../types';

interface ApplicationState {
  /** Current wizard step (1-5) */
  currentStep: number;
  
  /** Step data */
  personalInfo: Partial<PersonalInfo>;
  addressInfo: Partial<AddressInfo>;
  employmentInfo: Partial<EmploymentInfo>;
  loanInfo: Partial<LoanInfo>;
  termsAccepted: boolean;

  /** Verification states */
  panVerified: boolean;
  panEntityType: string | undefined;
  panVerificationStatus: 'idle' | 'verifying' | 'verified' | 'error';
  aadhaarVerified: boolean;
  aadhaarVerificationStatus: 'idle' | 'verifying' | 'verified' | 'error';

  /** Draft info */
  draftMeta: DraftMeta | null;

  /** Auto-save indicator */
  lastSavedAt: string | null;

  /** File upload state */
  incomeDocument: File | null;

  /** Signature data (PNG data URL) */
  signatureData: string | null;

  /** Whether the user has saved a signature */
  signatureSaved: boolean;

  /** Uploaded support documents */
  uploadedDocuments: UploadedDocument[];

  /** Actions */
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateAddressInfo: (data: Partial<AddressInfo>) => void;
  updateEmploymentInfo: (data: Partial<EmploymentInfo>) => void;
  updateLoanInfo: (data: Partial<LoanInfo>) => void;
  setTermsAccepted: (accepted: boolean) => void;

  setPanVerified: (verified: boolean, entityType?: string) => void;
  setPanVerificationStatus: (status: 'idle' | 'verifying' | 'verified' | 'error') => void;
  setAadhaarVerified: (verified: boolean) => void;
  setAadhaarVerificationStatus: (status: 'idle' | 'verifying' | 'verified' | 'error') => void;

  setDraftMeta: (meta: DraftMeta | null) => void;
  setLastSavedAt: (time: string | null) => void;
  setIncomeDocument: (file: File | null) => void;
  setSignatureData: (data: string | null) => void;
  setSignatureSaved: (saved: boolean) => void;

  /** Document upload actions */
  addDocument: (doc: UploadedDocument) => void;
  removeDocument: (docId: string) => void;
  clearDocuments: () => void;

  /** Get all form data for review */
  getAllData: () => {
    personalInfo: Partial<PersonalInfo>;
    addressInfo: Partial<AddressInfo>;
    employmentInfo: Partial<EmploymentInfo>;
    loanInfo: Partial<LoanInfo>;
    termsAccepted: boolean;
  };

  /** Reset entire application */
  resetApplication: () => void;
}

const initialState = {
  currentStep: 1,
  personalInfo: {},
  addressInfo: {},
  employmentInfo: {},
  loanInfo: {},
  termsAccepted: false,
  panVerified: false,
  panEntityType: undefined,
  panVerificationStatus: 'idle' as const,
  aadhaarVerified: false,
  aadhaarVerificationStatus: 'idle' as const,
  draftMeta: null,
  lastSavedAt: null,
  incomeDocument: null,
  signatureData: null,
  signatureSaved: false,
  uploadedDocuments: [] as UploadedDocument[],
};

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  ...initialState,

  /** Document upload actions */
  addDocument: (doc) => set((state) => ({
    uploadedDocuments: state.uploadedDocuments.some((d) => d.id === doc.id)
      ? state.uploadedDocuments.map((d) => (d.id === doc.id ? doc : d))
      : [...state.uploadedDocuments, doc],
  })),

  removeDocument: (docId) => set((state) => ({
    uploadedDocuments: state.uploadedDocuments.filter((d) => d.id !== docId),
  })),

  clearDocuments: () => set({ uploadedDocuments: [] }),

  setCurrentStep: (step) => set({ currentStep: step }),

  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, 5)
  })),

  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 1)
  })),

  updatePersonalInfo: (data) => set((state) => ({
    personalInfo: { ...state.personalInfo, ...data }
  })),

  updateAddressInfo: (data) => set((state) => ({
    addressInfo: { ...state.addressInfo, ...data }
  })),

  updateEmploymentInfo: (data) => set((state) => ({
    employmentInfo: { ...state.employmentInfo, ...data }
  })),

  updateLoanInfo: (data) => set((state) => ({
    loanInfo: { ...state.loanInfo, ...data }
  })),

  setTermsAccepted: (accepted) => set({ termsAccepted: accepted }),

  setPanVerified: (verified, entityType) => set({
    panVerified: verified,
    panEntityType: entityType,
  }),

  setPanVerificationStatus: (status) => set({ panVerificationStatus: status }),

  setAadhaarVerified: (verified) => set({ aadhaarVerified: verified }),

  setAadhaarVerificationStatus: (status) => set({ aadhaarVerificationStatus: status }),

  setDraftMeta: (meta) => set({ draftMeta: meta }),

  setLastSavedAt: (time) => set({ lastSavedAt: time }),

  setIncomeDocument: (file) => set({ incomeDocument: file }),

  setSignatureData: (data) => set({ signatureData: data }),
  setSignatureSaved: (saved) => set({ signatureSaved: saved }),

  getAllData: () => {
    const state = get();
    return {
      personalInfo: state.personalInfo,
      addressInfo: state.addressInfo,
      employmentInfo: state.employmentInfo,
      loanInfo: state.loanInfo,
      termsAccepted: state.termsAccepted,
    };
  },

  resetApplication: () => set(initialState),
}));