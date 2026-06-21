import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loanInfoSchema } from '../schemas';
import { useApplicationStore } from '../store/useApplicationStore';
import { WizardLayout } from '../components/WizardLayout';
import { useNavigate } from '../hooks/useNavigate';
import { calculateEMI, getRateForLoanType, formatUSDInt } from '../utils/emiCalculator';
import type { LoanInfoFormData } from '../schemas';

const LOAN_TYPES = ['Personal', 'Home', 'Education', 'Vehicle'];

export function Step4LoanDetails() {
  const store = useApplicationStore();
  const { goBack } = useNavigate();
  const [selectedType, setSelectedType] = useState<string>(store.loanInfo.loan_type || 'Personal');
  const [loanAmount, setLoanAmount] = useState<number>(store.loanInfo.loan_amount || 25000);
  const [showEMI, setShowEMI] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<LoanInfoFormData>({
    resolver: zodResolver(loanInfoSchema),
    defaultValues: {
      ...store.loanInfo as LoanInfoFormData,
      loan_type: selectedType,
      loan_amount: loanAmount,
    },
    mode: 'onChange',
  });

  const tenure = watch('tenure');

  const handleLoanTypeSelect = useCallback((type: string) => {
    setSelectedType(type);
    setValue('loan_type', type);
    setShowEMI(true);
  }, [setValue]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setLoanAmount(val);
    setValue('loan_amount', val);
    setShowEMI(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseInt(e.target.value, 10) || 0;
    if (val > 100000) val = 100000;
    if (val < 1000) val = 1000;
    setLoanAmount(val);
    setValue('loan_amount', val);
    setShowEMI(true);
  };

  const rate = getRateForLoanType(selectedType);
  const months = tenure ? parseInt(tenure.split(' ')[0], 10) : 0;
  const emiCalc = (showEMI && loanAmount && months) ? calculateEMI(loanAmount, rate, months) : null;

  const onSubmit = (data: LoanInfoFormData) => {
    store.updateLoanInfo(data);
    store.nextStep();
  };

  return (
    <WizardLayout>
      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-lg">
        <h1 className="font-headline-lg text-headline-lg mb-sm text-on-surface">Loan Details</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
          Tell us more about the loan you're looking for to help us find the best rates.
        </p>

        <form className="space-y-xl" id="step4-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Loan Type Grid */}
          <section>
            <label className="font-label-md text-label-md text-on-surface block mb-md">Loan Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
              {LOAN_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`loan-type-card flex flex-col items-center p-md border rounded-lg hover:border-secondary transition-all group active:scale-95 bg-white ${
                    selectedType === type ? 'border-secondary bg-surface-container-low' : 'border-outline-variant'
                  }`}
                  onClick={() => handleLoanTypeSelect(type)}
                >
                  <span className={`material-symbols-outlined mb-xs ${
                    selectedType === type ? 'text-secondary' : 'text-on-surface-variant'
                  }`}>
                    {type === 'Personal' ? 'person' : type === 'Home' ? 'home' : type === 'Education' ? 'school' : 'directions_car'}
                  </span>
                  <span className={`font-label-md text-label-md ${selectedType === type ? 'text-secondary font-bold' : ''}`}>
                    {type}
                  </span>
                </button>
              ))}
            </div>
            {errors.loan_type && (
              <p className="font-label-sm text-label-sm text-error mt-1" role="alert">{errors.loan_type.message}</p>
            )}
          </section>

          {/* Loan Amount Slider */}
          <section>
            <div className="flex justify-between items-center mb-md">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="loan-amount-input">
                Loan Amount
              </label>
              <div className="flex items-center">
                <span className="font-headline-md text-headline-md text-secondary">$</span>
                <input
                  className="w-32 bg-transparent border-none text-headline-md text-secondary font-bold focus:ring-0 p-0 text-right"
                  id="loan-amount-input"
                  type="number"
                  value={loanAmount}
                  onChange={handleInputChange}
                  aria-label="Loan amount in dollars"
                />
              </div>
            </div>
            <input
              className="range-slider w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer"
              id="loan-amount-slider"
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={loanAmount}
              onChange={handleSliderChange}
              aria-label="Loan amount slider"
            />
            <div className="flex justify-between mt-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">$1k</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">$100k</span>
            </div>
          </section>

          {/* Loan Tenure + EMI Preview */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-xs" htmlFor="tenure">
                Loan Tenure (Months)
              </label>
              <select
                id="tenure"
                {...register('tenure')}
                className="w-full p-sm bg-white border border-outline-variant rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all font-body-md text-body-md"
                aria-invalid={!!errors.tenure}
                aria-describedby={errors.tenure ? 'tenure-error' : undefined}
              >
                <option value="">Select tenure</option>
                <option value="12 Months">12 Months</option>
                <option value="24 Months">24 Months</option>
                <option value="36 Months">36 Months</option>
                <option value="48 Months">48 Months</option>
                <option value="60 Months">60 Months</option>
                <option value="72 Months">72 Months</option>
              </select>
              {errors.tenure && (
                <p id="tenure-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.tenure.message}
                </p>
              )}
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-xs">Interest Rate (Estimate)</label>
              <div className="w-full p-sm bg-surface-container-low border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface-variant flex items-center justify-between">
                <span>Expected APR</span>
                <span className="font-bold text-on-surface">{rate.toFixed(1)}% - {(rate + 2).toFixed(1)}%</span>
              </div>
            </div>
          </section>

          {/* EMI Preview */}
          {emiCalc && (
            <section className="p-md bg-surface-container-low rounded-lg border border-secondary-container/30">
              <h3 className="font-label-md text-label-md text-on-surface font-bold mb-sm">Pre-approval Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-sm">
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Monthly EMI</p>
                  <p className="font-headline-md text-headline-md text-secondary">{formatUSDInt(emiCalc.emi)}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Processing Fee (1%)</p>
                  <p className="font-body-md text-body-md font-bold">{formatUSDInt(emiCalc.processingFee)}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Total Interest</p>
                  <p className="font-body-md text-body-md font-bold">{formatUSDInt(emiCalc.totalInterest)}</p>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Total Repayment</p>
                  <p className="font-body-md text-body-md font-bold">{formatUSDInt(emiCalc.totalRepayment)}</p>
                </div>
              </div>
            </section>
          )}

          {/* Purpose */}
          <section>
            <label className="font-label-md text-label-md text-on-surface block mb-xs" htmlFor="purpose">
              Purpose of Loan
            </label>
            <textarea
              id="purpose"
              {...register('purpose')}
              className="w-full p-sm bg-white border border-outline-variant rounded-lg focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all font-body-md text-body-md resize-none"
              placeholder="Please describe what you intend to use the funds for..."
              rows={3}
              aria-invalid={!!errors.purpose}
              aria-describedby={errors.purpose ? 'purpose-error' : undefined}
            />
            {errors.purpose && (
              <p id="purpose-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                {errors.purpose.message}
              </p>
            )}
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-md pt-md">
            <button
              type="button"
              className="flex-1 py-sm px-lg border border-outline-variant text-on-surface font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-xs"
              onClick={() => goBack(4)}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Previous
            </button>
            <button
              type="submit"
              className={`flex-[2] py-sm px-lg bg-secondary text-white font-bold rounded-lg shadow-sm transition-all active:scale-95 flex items-center justify-center gap-xs ${
                isValid ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isValid}
              id="next-btn-4"
            >
              Next Step
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </WizardLayout>
  );
}