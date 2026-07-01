# Cleanup Analysis Report

Generated: Manual codebase audit
Project: loanflow-react

---

## 1. Unused Files

| # | File | Reason | Confidence |
|---|------|--------|------------|
| 1 | `src/App.css` | Not imported anywhere. All styling uses Tailwind utility classes directly in JSX. This is leftover Vite boilerplate CSS. | **HIGH** |
| 2 | `src/tests/` | Empty directory with no test files | **HIGH** |

## 2. Unused npm Dependencies

| # | Package | Reason | Confidence |
|---|---------|--------|------------|
| 1 | `react-signature-canvas` | Listed in package.json but never imported anywhere. The project implements a custom `SignaturePad` component using raw HTML Canvas API directly. This package weighs ~50KB and is completely unused. | **HIGH** |

## 3. Unused Exports in Utility Files

### `src/utils/autoSave.ts`
| Export | Used? | Confidence |
|--------|-------|------------|
| `generateDraftId()` | ❌ Never imported | **HIGH** |
| `saveDraftMeta()` | ❌ Never imported | **HIGH** |
| `getDraftMeta()` | ❌ Never imported | **HIGH** |
| `checkDraftStatus()` | ❌ Never imported | **HIGH** |
| `clearDraft()` | ❌ Never imported | **HIGH** |
| `generateApplicationId()` | ✅ Used in Step5Review | — |

### `src/utils/documentValidation.ts`
| Export | Used? | Confidence |
|--------|-------|------------|
| `validateFileType()` | ❌ Never imported | **HIGH** |
| `validateFileSize()` | ❌ Never imported | **HIGH** |
| `validateDocument()` | ✅ Used in DocumentUpload | — |
| `generateFilePreview()` | ✅ Used in DocumentUpload | — |
| `formatFileSize()` | ✅ Used in DocumentUpload & Step5Review | — |
| `generateDocumentId()` | ✅ Used in DocumentUpload | — |
| `getFileTypeLabel()` | ✅ Used in DocumentUpload | — |

### `src/utils/emiCalculator.ts`
| Export | Used? | Confidence |
|--------|-------|------------|
| `calculateEMI()` | ✅ Used in Step4LoanDetails & Step5Review | — |
| `getRateForLoanType()` | ✅ Used in Step4LoanDetails & Step5Review | — |
| `formatIndianCurrency()` | ❌ Never imported | **HIGH** |
| `formatUSD()` | ❌ Never imported | **HIGH** |
| `formatUSDInt()` | ✅ Used in Step4LoanDetails & Step5Review | — |

## 4. Unused/Dead Store Properties and Actions

### `src/store/useApplicationStore.ts`

| Property/Action | Used? | Confidence |
|-----------------|-------|------------|
| `draftMeta` state property | ❌ Never read by any component | **HIGH** |
| `setDraftMeta()` action | ❌ Never called by any component | **HIGH** |
| `lastSavedAt` state property | ❌ Never read by any component | **HIGH** |
| `setLastSavedAt()` action | ❌ Never called by any component | **HIGH** |

## 5. Unused TypeScript Types/Interfaces

### `src/types/index.ts`
| Type | Used? | Confidence |
|------|-------|------------|
| `StepConfig` | ✅ Used in StepConfig.ts | — |
| `PersonalInfo` | ✅ Used in store | — |
| `AddressInfo` | ✅ Used in store | — |
| `EmploymentInfo` | ✅ Used in store | — |
| `LoanInfo` | ✅ Used in store | — |
| `LoanApplication` | ❌ Never imported | **HIGH** |
| `DraftMeta` | ✅ Used in autoSave.ts | — |
| `EMIResult` | ✅ Used in emiCalculator.ts | — |
| `PANValidationResult` | ❌ Never imported (validatePAN returns inline object) | **MEDIUM** |
| `AadhaarValidationResult` | ❌ Never imported | **MEDIUM** |
| `VerificationStatus` | ❌ Never imported (inline union types used instead) | **HIGH** |
| `NavDirection` | ❌ Never imported | **HIGH** |
| `StepVisibility` | ❌ Never imported | **HIGH** |
| `FileUploadState` | ❌ Never imported | **HIGH** |
| `DocumentType` | ❌ Never imported | **HIGH** |
| `AllowedMimeType` | ✅ Used in documentValidation.ts | — |
| `MAX_UPLOAD_SIZE` | ✅ Used in documentValidation.ts | — |
| `UploadedDocument` | ✅ Used in store & DocumentUpload | — |
| `UploadProgressConfig` | ✅ Used as prop interface in DocumentUpload | — |

The following types are **not referenced anywhere** and can be safely removed:
- `LoanApplication`
- `PANValidationResult`
- `AadhaarValidationResult`
- `VerificationStatus`
- `NavDirection`
- `StepVisibility`
- `FileUploadState`
- `DocumentType`

## 6. Dead CSS

### `src/App.css`
The entire file (184 lines) is **completely dead**. It contains Vite template boilerplate (`.counter`, `.hero`, `.framework`, `#center`, `#next-steps`, `#docs`, `#spacer`, `.ticks`) that is never referenced in any JSX file. The project uses Tailwind utility classes exclusively for styling.

### `src/index.css`
- `.step-pulse` class (lines 117-126) — Defined but never used in any component JSX
- `.glass-card` class (lines 128-132) — **IS used** in Step5Review.tsx ✅

## 7. Dead/Unused Constants in Schemas

### `src/schemas/index.ts`
| Export | Used? | Confidence |
|--------|-------|------------|
| `signatureSchema` | ❌ Never imported | **HIGH** |
| `applicationSchema` | ❌ Never imported | **MEDIUM** |
| `SignatureData` type | ❌ Never imported | **HIGH** |
| `ApplicationFormData` type | ❌ Never imported | **HIGH** |

The PAN_ENTITY_TYPES record (lines 16-27) contains entity types validated in `validatePAN()` but the entity type `'B'` (Body of Individuals) is only present in the lookup table, not in the required spec. This is functional but the complete list is partially dead weight depending on requirements.

## 8. Redundant/Unnecessary Code

### `src/utils/autoSave.ts`
Functions `generateDraftId`, `saveDraftMeta`, `getDraftMeta`, `checkDraftStatus`, and `clearDraft` are all exported but never called. This represents **50 lines of dead utility code** that was likely scaffolded for a future auto-save feature that was never integrated.

### Store properties `draftMeta` / `lastSavedAt`
These state properties and their setters exist in the Zustand store but are never read from or written to by any component. They add unnecessary state management overhead and complexity.

## 9. Summary

| Category | Count | Notes |
|----------|-------|-------|
| **Unused files** | 2 | App.css (184 lines), empty tests/ dir |
| **Unused dependencies** | 1 | react-signature-canvas |
| **Unused exported functions** | 9 | autoSave.ts (5), documentValidation.ts (2), emiCalculator.ts (2) |
| **Unused store properties** | 4 | draftMeta, lastSavedAt + their setters |
| **Unused types/interfaces** | 8 | LoanApplication, PANValidationResult, AadhaarValidationResult, VerificationStatus, NavDirection, StepVisibility, FileUploadState, DocumentType |
| **Unused schema exports** | 4 | signatureSchema, applicationSchema, SignatureData, ApplicationFormData |
| **Dead CSS** | 184 lines | Entire App.css file + .step-pulse in index.css |
| **Total estimated dead code** | ~450+ lines | ~15% of the codebase |

## 10. Files With Refactoring Opportunities

### `src/pages/Step4LoanDetails.tsx`
- Hardcoded max loan amount of $100,000 instead of using loan type-specific limits
- The `handleInputChange` caps at 100000 unconditionally, ignoring the loan type
- Interest rates for "Education" and "Vehicle" types exist in emiCalculator but are never validated here

### `src/hooks/useNavigate.ts`
- `goToStep` exists but is never used by any component (they use `store.setCurrentStep()` directly or `store.nextStep()`/`store.prevStep()`)
- The `goBack` function is used ✅
- The `goToPage` is used ✅

### `src/utils/documentValidation.ts`
- `validateFileType` and `validateFileSize` are only called by `validateDocument()` — they could be inlined without losing clarity

## Action Required

1. Review this report and confirm which items to remove
2. High confidence items are safe to remove without breaking the application
3. Medium confidence items require small import checks before removal
4. After cleanup: run build, verify no TypeScript/lint errors