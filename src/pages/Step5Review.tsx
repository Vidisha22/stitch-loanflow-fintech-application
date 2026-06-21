import { useState } from 'react';
import { useApplicationStore } from '../store/useApplicationStore';
import { WizardLayout } from '../components/WizardLayout';
import { useNavigate } from '../hooks/useNavigate';
import { SignaturePad } from '../components/SignaturePad';
import { calculateEMI, getRateForLoanType, formatUSDInt } from '../utils/emiCalculator';
import { generateApplicationId } from '../utils/autoSave';

export function Step5Review() {
  const store = useApplicationStore();
  const { goBack } = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signatureError, setSignatureError] = useState('');

  const data = store.getAllData();
  const { personalInfo, addressInfo, employmentInfo, loanInfo } = data;

  const rate = getRateForLoanType(loanInfo.loan_type || 'Personal');
  const months = loanInfo.tenure ? parseInt(loanInfo.tenure.split(' ')[0], 10) : 0;
  const amount = loanInfo.loan_amount || 0;
  const emiCalc = (amount && months) ? calculateEMI(amount, rate, months) : null;

  const handleSignatureSave = (dataUrl: string) => {
    store.setSignatureData(dataUrl);
    store.setSignatureSaved(true);
    setSignatureError('');
  };

  const handleSignatureClear = () => {
    store.setSignatureData(null);
    store.setSignatureSaved(false);
    setSignatureError('');
  };

  const handleSubmit = () => {
    if (!termsAccepted) return;
    if (!store.signatureSaved) {
      setSignatureError('Please provide your signature before submitting');
      return;
    }
    setSubmitting(true);
    const appId = generateApplicationId();
    localStorage.setItem('loanflow_application_id', appId);

    setTimeout(() => {
      store.resetApplication();
      window.location.href = '/success';
    }, 1500);
  };

  return (
    <WizardLayout>
      <header className="w-full max-w-[1280px] mb-lg">
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Review Your Application</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Please confirm all details below are accurate before final submission.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg w-full max-w-[1280px]">
        {/* Left Column - Details */}
        <div className="lg:col-span-8 space-y-lg">
          {/* Personal Info Section */}
          <section className="glass-card rounded-xl p-md shadow-sm">
            <div className="flex justify-between items-start mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">person</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Personal Information</h2>
              </div>
              <button className="flex items-center gap-xs text-secondary hover:underline transition-all" onClick={() => store.setCurrentStep(1)}>
                <span className="material-symbols-outlined text-[20px]">edit</span>
                <span className="font-label-md text-label-md">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md border-t border-outline-variant pt-md">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Full Legal Name</p>
                <p className="font-body-md text-body-md font-medium">{personalInfo.first_name} {personalInfo.last_name}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Date of Birth</p>
                <p className="font-body-md text-body-md font-medium">{personalInfo.dob}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Email Address</p>
                <p className="font-body-md text-body-md font-medium">{personalInfo.email}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Phone Number</p>
                <p className="font-body-md text-body-md font-medium">{personalInfo.phone}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Gender</p>
                <p className="font-body-md text-body-md font-medium">{personalInfo.gender}</p>
              </div>
            </div>
          </section>

          {/* Address Section */}
          <section className="glass-card rounded-xl p-md shadow-sm">
            <div className="flex justify-between items-start mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">home</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Residential Address</h2>
              </div>
              <button className="flex items-center gap-xs text-secondary hover:underline transition-all" onClick={() => store.setCurrentStep(2)}>
                <span className="material-symbols-outlined text-[20px]">edit</span>
                <span className="font-label-md text-label-md">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md border-t border-outline-variant pt-md">
              <div className="md:col-span-2">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Street Address</p>
                <p className="font-body-md text-body-md font-medium">{addressInfo.street}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">City & State</p>
                <p className="font-body-md text-body-md font-medium">{addressInfo.city}, {addressInfo.state}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">ZIP Code / Country</p>
                <p className="font-body-md text-body-md font-medium">{addressInfo.zip}, {addressInfo.country}</p>
              </div>
            </div>
          </section>

          {/* Employment Section */}
          <section className="glass-card rounded-xl p-md shadow-sm">
            <div className="flex justify-between items-start mb-md">
              <div className="flex items-center gap-sm">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">work</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-on-surface">Employment & Income</h2>
              </div>
              <button className="flex items-center gap-xs text-secondary hover:underline transition-all" onClick={() => store.setCurrentStep(3)}>
                <span className="material-symbols-outlined text-[20px]">edit</span>
                <span className="font-label-md text-label-md">Edit</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md border-t border-outline-variant pt-md">
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Employment Status</p>
                <p className="font-body-md text-body-md font-medium">{employmentInfo.employment_status}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Current Employer</p>
                <p className="font-body-md text-body-md font-medium">{employmentInfo.company_name}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Job Title</p>
                <p className="font-body-md text-body-md font-medium">{employmentInfo.job_title}</p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Annual Gross Income</p>
                <p className="font-body-md text-body-md font-medium text-secondary font-bold">
                  {employmentInfo.monthly_income ? formatUSDInt((employmentInfo.monthly_income as number) * 12) : '—'}
                </p>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-base">Years at Company</p>
                <p className="font-body-md text-body-md font-medium">{employmentInfo.employment_years}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Loan Summary */}
        <div className="lg:col-span-4 space-y-lg">
          <section className="bg-secondary rounded-xl p-md text-on-secondary shadow-lg">
            <div className="flex justify-between items-center mb-md">
              <h2 className="font-headline-md text-headline-md">Loan Summary</h2>
              <button className="p-xs rounded-full hover:bg-on-secondary/10 transition-all" onClick={() => store.setCurrentStep(4)}>
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <div className="space-y-sm">
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Loan Type</span>
                <span className="font-body-lg text-body-lg font-medium">{loanInfo.loan_type || '—'}</span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Requested Amount</span>
                <span className="font-headline-md text-headline-md">{amount ? formatUSDInt(amount) : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Loan Term</span>
                <span className="font-body-lg text-body-lg font-medium">{loanInfo.tenure || '—'}</span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Interest Rate</span>
                <span className="font-body-lg text-body-lg font-medium">{rate.toFixed(1)}% p.a.</span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Monthly EMI</span>
                <span className="font-headline-md text-headline-md">{emiCalc ? formatUSDInt(emiCalc.emi) : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Total Interest</span>
                <span className="font-body-lg text-body-lg font-medium">{emiCalc ? formatUSDInt(emiCalc.totalInterest) : '—'}</span>
              </div>
              <div className="flex justify-between items-center py-sm border-b border-on-secondary/20">
                <span className="font-label-md text-label-md opacity-80">Total Repayment</span>
                <span className="font-body-lg text-body-lg font-medium">{emiCalc ? formatUSDInt(emiCalc.totalRepayment) : '—'}</span>
              </div>
              <div className="flex justify-between items-center pt-sm">
                <span className="font-label-md text-label-md opacity-80">Processing Fee (1%)</span>
                <span className="font-body-lg text-body-lg font-medium">{emiCalc ? formatUSDInt(emiCalc.processingFee) : '—'}</span>
              </div>
            </div>
          </section>

          <div className="glass-card rounded-xl p-md shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-md">Loan Purpose</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">{loanInfo.purpose || '—'}</p>
          </div>

          {/* Signature Section */}
          <div className="glass-card rounded-xl p-md shadow-sm">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-md">E-Signature</h2>
            {store.signatureSaved && store.signatureData ? (
              <div className="flex flex-col gap-sm">
                <p className="font-label-sm text-label-sm text-green-600 flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Signature captured successfully
                </p>
                <div className="border border-outline-variant rounded-lg p-sm bg-surface-container-low inline-block max-w-[300px]">
                  <img
                    src={store.signatureData}
                    alt="Your signature"
                    className="w-full h-auto"
                  />
                </div>
                <button
                  type="button"
                  className="text-secondary font-label-md text-label-md hover:underline transition-all self-start flex items-center gap-xs"
                  onClick={handleSignatureClear}
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Re-sign
                </button>
              </div>
            ) : (
              <SignaturePad
                initialData={null}
                onSave={handleSignatureSave}
                onClear={handleSignatureClear}
              />
            )}
            {signatureError && (
              <p className="font-label-sm text-label-sm text-error mt-sm" role="alert">
                {signatureError}
              </p>
            )}
          </div>

          <div className="glass-card rounded-xl p-md border-secondary/20 bg-secondary-container/10">
            <div className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <div>
                <p className="font-label-md text-label-md text-secondary font-bold mb-base">Security Guarantee</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Your data is encrypted with 256-bit AES protection. We never share your personal information without explicit consent.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Section */}
      <div className="mt-xl flex flex-col items-center gap-md">
        <div className="flex items-center gap-sm">
          <input
            className="w-5 h-5 rounded border-outline text-secondary focus:ring-secondary"
            id="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label className="font-label-md text-label-md text-on-surface" htmlFor="terms">
            I agree to the <a className="text-secondary underline" href="#">Terms of Service</a> and confirm all information is correct.
          </label>
        </div>
        <div className="flex gap-md items-center">
          <button
            className="px-xl py-sm rounded-full border border-outline text-on-surface font-bold hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-xs"
            type="button"
            onClick={() => goBack(5)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Previous
          </button>
          <button
            className={`px-xl py-md bg-secondary text-on-secondary rounded-full font-bold text-body-lg shadow-lg transition-all flex items-center justify-center gap-sm ${
              termsAccepted && store.signatureSaved && !submitting ? 'hover:shadow-xl hover:scale-[1.02] active:scale-95' : 'opacity-50 cursor-not-allowed'
            }`}
            id="submit-btn"
            disabled={!termsAccepted || !store.signatureSaved || submitting}
            onClick={handleSubmit}
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined animate-spin">sync</span>
                Processing...
              </>
            ) : (
              <>
                <span>Submit Application</span>
                <span className="material-symbols-outlined">send</span>
              </>
            )}
          </button>
        </div>
        <button className="text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-colors" type="button">
          Save & Exit for Later
        </button>
      </div>
    </WizardLayout>
  );
}