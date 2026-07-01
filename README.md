# 🏦 LoanFlow — Multi-Step Loan Application Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zustand](https://img.shields.io/badge/Zustand-5-433E38?logo=react&logoColor=white)](https://github.com/pmndrs/zustand)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7-EC5990?logo=reacthookform&logoColor=white)](https://react-hook-form.com)
[![Zod](https://img.shields.io/badge/Zod-4-3E67B1?logo=zod&logoColor=white)](https://zod.dev)

**LoanFlow** is a production-grade, multi-step loan application form built with React 19 and TypeScript. It provides a seamless, wizard-driven experience for collecting personal, address, employment, and financial information — complete with real-time validation, document upload with client-side compression, e-signature capture, EMI calculation, and draft persistence.

> 🎯 **Target Audience**: Fintech platforms, digital lending startups, and developers building complex multi-step form workflows.

---

## ✨ Features

- **📋 5-Step Wizard Flow** — Guided step-by-step application process with progress tracking
- **👤 Personal Information Collection** — Name, email, phone, DOB, gender, PAN, and Aadhaar with verification simulation
- **📍 Address Details** — Street, city, state, ZIP/postal code, and country selection
- **💼 Employment & Income Details** — Employment status, company name, job title, monthly income, years of experience, and income document upload
- **💰 Loan Details** — Loan type selection (Personal, Home, Education, Vehicle), amount slider, tenure selection, purpose description, and real-time EMI preview
- **📄 Document Upload** — Drag-and-drop file upload with type/size validation, image preview, and simulated upload progress
- **🖼️ Client-Side Image Compression** — Automatic compression of images over 2MB using Canvas API with recursive quality reduction
- **✍️ E-Signature Capture** — Canvas-based signature pad with mouse and touch support, clear/save functionality
- **✅ PAN & Aadhaar Verification** — Format validation with Verhoeff checksum for Aadhaar, entity type detection for PAN, and simulated verification delay
- **📊 EMI Calculator** — Real-time EMI computation using standard reducing-balance formula with interest rate per loan type
- **🔍 Review & Submit** — Comprehensive review page with all collected data, loan summary, document list, signature display, and terms acceptance
- **💾 Draft Auto-Save** — Automatic draft persistence to localStorage with metadata tracking and 72-hour expiry
- **♿ Accessibility** — ARIA labels, roles, live regions for error announcements, keyboard-navigable, focus management
- **📱 Responsive Design** — Mobile-first layout using Tailwind CSS, works from 320px to 1920px viewports
- **🎨 Modern UI** — Clean, professional design with consistent color system, icons, and micro-interactions

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | [React 19](https://react.dev) | UI component library |
| **Language** | [TypeScript 6](https://www.typescriptlang.org) | Type-safe development |
| **Build Tool** | [Vite 8](https://vitejs.dev) | Fast development server and bundler |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) | Utility-first CSS framework |
| **State Management** | [Zustand 5](https://github.com/pmndrs/zustand) | Lightweight global state management |
| **Form Handling** | [React Hook Form 7](https://react-hook-form.com) | Performant form state management with uncontrolled components |
| **Validation** | [Zod 4](https://zod.dev) | Schema-based validation with TypeScript inference |
| **Form Resolver** | [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Zod integration with React Hook Form |
| **File Upload** | [react-dropzone 15](https://react-dropzone.js.org) | Drag-and-drop file upload |
| **E-Signature** | [react-signature-canvas](https://github.com/agilgur5/react-signature-canvas) | Canvas-based signature capture |
| **Linting** | [ESLint 10](https://eslint.org) | Code quality and consistency |

---

## 📁 Folder Structure

```
loanflow-react/
├── public/                          # Static assets
├── src/
│   ├── components/                  # Reusable UI components
│   │   ├── DocumentUpload.tsx       # Drag-and-drop file upload with validation
│   │   ├── Footer.tsx               # Application footer
│   │   ├── Navbar.tsx               # Top navigation bar
│   │   ├── ProgressBar.tsx          # Step progress indicator
│   │   ├── SignaturePad.tsx         # Canvas-based e-signature capture
│   │   ├── StepConfig.ts            # Step definitions and labels
│   │   └── WizardLayout.tsx         # Layout wrapper for wizard steps
│   ├── hooks/
│   │   └── useNavigate.ts           # Custom navigation hook
│   ├── pages/
│   │   ├── Step1PersonalInfo.tsx    # Step 1: Personal details + PAN/Aadhaar
│   │   ├── Step2Address.tsx         # Step 2: Address information
│   │   ├── Step3Employment.tsx      # Step 3: Employment & income
│   │   ├── Step4LoanDetails.tsx     # Step 4: Loan type, amount, tenure
│   │   ├── Step5Review.tsx          # Step 5: Review, documents, signature, submit
│   │   ├── Dashboard.tsx            # Dashboard page
│   │   ├── Notifications.tsx        # Notifications page
│   │   ├── Profile.tsx              # User profile page
│   │   ├── SuccessConfirmation.tsx  # Post-submission success page
│   │   └── Support.tsx              # Support/help page
│   ├── schemas/
│   │   └── index.ts                 # Zod validation schemas for all steps
│   ├── store/
│   │   └── useApplicationStore.ts   # Zustand global state store
│   ├── types/
│   │   └── index.ts                 # TypeScript interfaces and types
│   ├── utils/
│   │   ├── autoSave.ts              # Draft persistence utilities
│   │   ├── documentValidation.ts    # File validation and preview generation
│   │   ├── emiCalculator.ts         # EMI computation and currency formatting
│   │   └── imageCompressor.ts       # Client-side image compression
│   ├── App.tsx                      # Root component with step routing
│   ├── App.css                      # Global styles
│   ├── index.css                    # Tailwind CSS imports
│   └── main.tsx                     # Application entry point
├── index.html                       # HTML entry point
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # TypeScript app config
├── tsconfig.node.json               # TypeScript Node config
├── eslint.config.js                 # ESLint configuration
├── package.json                     # Dependencies and scripts
└── README.md                        # Project documentation
```

### 📂 Key Directories Explained

| Directory | Purpose |
|---|---|
| `src/components/` | Reusable UI components used across multiple steps (upload, signature, progress, layout) |
| `src/pages/` | Step-specific form pages and auxiliary pages (dashboard, profile, support) |
| `src/schemas/` | Zod validation schemas defining field constraints and custom validators |
| `src/store/` | Zustand store managing all application state, verification status, and documents |
| `src/types/` | TypeScript interfaces for form data, documents, validation results, and configuration |
| `src/utils/` | Pure utility functions for EMI calculation, image compression, file validation, and auto-save |

---

## 🔄 Application Flow

```
Step 1 ──► Step 2 ──► Step 3 ──► Step 4 ──► Step 5
Personal    Address    Employment   Loan      Review &
Info        Details    & Income     Details   Submit
```

### User Journey

1. **Step 1 — Personal Information** 👤
   - Enter full name, email, phone number, date of birth, and gender
   - Provide PAN card number with **Verify** button (simulated 1.5s verification)
   - Provide Aadhaar number with **Verify** button (simulated 1.5s verification)
   - Both PAN and Aadhaar must be verified before proceeding

2. **Step 2 — Address Details** 📍
   - Enter street address, city, state/province, ZIP/postal code, and country
   - All fields validated in real-time with clear error messages

3. **Step 3 — Employment & Income** 💼
   - Select employment status (Full-time, Part-time, Self-employed, Contractor, Unemployed)
   - Enter company name, job title, monthly net income, and years at current employer
   - Upload income proof document (PNG, JPG, PDF) with automatic image compression

4. **Step 4 — Loan Details** 💰
   - Select loan type (Personal, Home, Education, Vehicle)
   - Adjust loan amount via slider or direct input ($1,000–$100,000)
   - Select loan tenure (12–72 months)
   - View real-time EMI preview with interest rate, processing fee, total interest, and total repayment
   - Describe the purpose of the loan

5. **Step 5 — Review & Submit** ✅
   - Review all entered information in a comprehensive summary
   - Upload supporting documents via drag-and-drop
   - Capture e-signature using the canvas-based signature pad
   - View loan summary with EMI breakdown
   - Accept terms and conditions
   - Submit application (generates application reference number)

---

## 📸 Screenshots

> 📌 *Screenshots should be added to `docs/images/` directory. Below are placeholder references.*

| Step | Screenshot |
|---|---|
| Step 1 — Personal Info | ![Step 1](docs/images/step1-personal.png) |
| Step 2 — Address | ![Step 2](docs/images/step2-address.png) |
| Step 3 — Employment | ![Step 3](docs/images/step3-employment.png) |
| Step 4 — Loan Details | ![Step 4](docs/images/step4-loan.png) |
| Step 5 — Review & Submit | ![Step 5](docs/images/step5-review.png) |
| Document Upload | ![Upload](docs/images/document-upload.png) |
| E-Signature | ![Signature](docs/images/signature.png) |

---

## 🚀 Installation

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher)
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd loanflow-react

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

---

## 🏗️ Build

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 🧹 Linting

```bash
# Run ESLint
npm run lint
```

---

## 🔧 Environment Variables

No environment variables are required for local development. The application runs entirely client-side with simulated backend operations (verification, upload progress, etc.).

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_APP_TITLE` | No | `LoanFlow` | Application title |

---

## 🏛️ Project Architecture

### Component Structure

The application follows a **Wizard pattern** where each step is a separate page component rendered conditionally based on the current step index in the Zustand store. The `WizardLayout` component wraps each step with consistent navigation, progress bar, and footer.

```
App.tsx
  └── WizardLayout
       ├── Navbar
       ├── ProgressBar
       ├── Step Component (conditional)
       │    ├── Step1PersonalInfo
       │    ├── Step2Address
       │    ├── Step3Employment
       │    ├── Step4LoanDetails
       │    └── Step5Review
       │         ├── DocumentUpload
       │         └── SignaturePad
       └── Footer
```

### State Management

**Zustand** is used as the global state store (`useApplicationStore`) managing:

- **Current step** — Wizard navigation state
- **Form data** — Partial data objects for each step (personalInfo, addressInfo, employmentInfo, loanInfo)
- **Verification status** — PAN and Aadhaar verification states (idle/verifying/verified/error)
- **Document state** — Uploaded documents array with progress tracking
- **Signature data** — Captured e-signature as base64 PNG data URL
- **Draft metadata** — Auto-save tracking with timestamps and expiry
- **Actions** — Update functions, navigation helpers, and reset capability

### Validation Strategy

**Zod schemas** define all validation rules with:

- **Per-step schemas** — Each step has its own schema (personalInfoSchema, addressInfoSchema, etc.)
- **Custom refinements** — PAN format validation with entity type detection, Aadhaar Verhoeff checksum, age calculation
- **Schema-based error messages** — User-friendly, specific error messages for each validation failure
- **React Hook Form integration** — Schemas are connected via `@hookform/resolvers/zod` for real-time validation

### Data Flow

```
User Input → React Hook Form (uncontrolled via refs)
                ↓
         Zod Schema Validation
                ↓
         Zustand Store Update (on submit)
                ↓
         Step Navigation (next/prev)
                ↓
         Review Page (aggregates all store data)
                ↓
         Submission (generates application ID, clears store)
```

### Routing

The application uses **simple state-based routing** rather than a router library:

- **Wizard steps** — Controlled by `currentStep` (1–5) in the Zustand store
- **Auxiliary pages** — Dashboard, Profile, Notifications, Support, SuccessConfirmation — navigated via `useNavigate` hook which uses `window.location.href`
- **No React Router** — Navigation is handled through state changes and direct URL manipulation

---

## ✅ Validation

### Form Validation

| Step | Fields | Validation Rules |
|---|---|---|
| **Step 1** | First/Last Name | Required, max 50 chars |
| | Email | Required, valid email format |
| | Phone | Required, 10–15 digits, optional `+` prefix |
| | DOB | Required, must be 18+ years old |
| | Gender | Required selection |
| | PAN | Required, 10-char format `AAAAA9999A`, entity type validation |
| | Aadhaar | Required, 12 digits, Verhoeff checksum |
| **Step 2** | Street | Required, max 100 chars |
| | City | Required, max 50 chars |
| | State | Required selection |
| | ZIP | Required, 5-digit or 5+4 format |
| | Country | Required selection |
| **Step 3** | Employment Status | Required |
| | Company Name | Required, max 100 chars |
| | Job Title | Required, max 100 chars |
| | Monthly Income | Required, non-negative number |
| | Employment Years | Required, 0–70 years |
| **Step 4** | Loan Type | Required |
| | Loan Amount | Required, $1,000–$100,000 |
| | Tenure | Required selection |
| | Purpose | Required, 10–500 characters |
| **Step 5** | Terms Accepted | Must be checked |
| | Signature | Must be captured |

### Document Validation

- **File types**: PDF, JPG, PNG only
- **Max file size**: 10 MB per file
- **Max documents**: 5 per application
- **Image compression**: Automatic for images over 2MB (resize to 1200px width, JPEG quality 0.7, recursive reduction to 0.1 minimum)

### PAN Validation Algorithm

- Format: 5 uppercase letters + 4 digits + 1 uppercase letter
- 4th character (index 3) indicates entity type (P=Individual, C=Company, H=HUF, F=Firm, etc.)
- Simulated verification with 1.5-second delay

### Aadhaar Validation Algorithm

- Exactly 12 digits
- Verhoeff checksum validation using multiplication, permutation, and inverse tables
- Simulated verification with 1.5-second delay

---

## 🔮 Future Improvements

- **🔐 Authentication** — User login/signup with session management
- **🌐 Backend Integration** — Connect to a real API for loan application submission
- **☁️ Cloud Document Storage** — Upload documents to S3 or similar cloud storage
- **📧 Email Notifications** — Send confirmation emails on application submission
- **🤖 AI-Powered Document Verification** — Automated document validation using OCR
- **📊 Admin Dashboard** — Review and manage submitted applications
- **📈 Loan Eligibility Prediction** — ML-based eligibility scoring
- **🔍 Credit Bureau Integration** — Real-time CIBIL/Equifax credit score checks
- **🌍 Indian Localization** — PIN code auto-fill, ₹ currency formatting, Indian address formats
- **🧪 E2E Testing** — Cypress test suite for complete user journey coverage
- **🌙 Dark Mode** — Theme toggle with persistent preference
- **📱 PWA Support** — Offline capability and installable app
- **🌐 i18n** — Multi-language support (Hindi, English, etc.)

---

## 📚 Learning Outcomes

This project demonstrates proficiency in:

- **React 19** — Functional components, hooks, controlled/uncontrolled inputs
- **TypeScript** — Type-safe development with interfaces, generics, and type inference
- **Multi-Step Form Architecture** — Wizard pattern with state-based navigation
- **Schema-Based Validation** — Zod for declarative, composable validation with custom refinements
- **Form State Management** — React Hook Form for performant form handling
- **Global State Management** — Zustand for lightweight, scalable state management
- **File Upload Engineering** — Drag-and-drop, validation, preview, and progress simulation
- **Client-Side Image Processing** — Canvas API for compression and resizing
- **E-Signature Capture** — Canvas-based drawing with mouse and touch support
- **EMI Calculation** — Financial formula implementation with Indian/US currency formatting
- **Data Persistence** — localStorage-based draft saving with metadata and expiry
- **Accessibility** — WCAG 2.1 AA practices (ARIA labels, roles, live regions, keyboard navigation)
- **Responsive Design** — Mobile-first Tailwind CSS with cross-viewport compatibility
- **Fintech UX Patterns** — Progressive disclosure, inline validation, error recovery

---

## 👤 Author

**Your Name**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)  
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/your-username)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ using React, TypeScript, and Tailwind CSS
</p>