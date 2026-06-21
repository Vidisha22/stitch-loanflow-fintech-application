import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, validatePAN, validateAadhaar } from '../schemas';
import { useApplicationStore } from '../store/useApplicationStore';
import { WizardLayout } from '../components/WizardLayout';
import type { PersonalInfoFormData } from '../schemas';

export function Step1PersonalInfo() {
  const store = useApplicationStore();
  const [panStatus, setPanStatus] = useState<'idle' | 'verifying' | 'verified' | 'error'>('idle');
  const [panError, setPanError] = useState('');
  const [panEntityType, setPanEntityType] = useState('');
  const [aadhaarStatus, setAadhaarStatus] = useState<'idle' | 'verifying' | 'verified' | 'error'>('idle');
  const [aadhaarError, setAadhaarError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      ...store.personalInfo as PersonalInfoFormData,
      pan_verified: store.panVerified,
      aadhaar_verified: store.aadhaarVerified,
    },
    mode: 'onChange',
  });

  const panValue = watch('pan');
  const aadhaarValue = watch('aadhaar');

  const handlePanVerify = useCallback(async () => {
    const pan = panValue;
    const result = validatePAN(pan);
    if (!result.valid) {
      setPanError(result.error || 'Invalid PAN');
      setPanStatus('error');
      return;
    }
    setPanStatus('verifying');
    setPanError('');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPanStatus('verified');
    setPanEntityType(result.entityType || '');
    store.setPanVerified(true, result.entityType);
    store.setPanVerificationStatus('verified');
  }, [panValue, store]);

  const handleAadhaarVerify = useCallback(async () => {
    const aadhaar = aadhaarValue;
    const result = validateAadhaar(aadhaar);
    if (!result.valid) {
      setAadhaarError(result.error || 'Invalid Aadhaar');
      setAadhaarStatus('error');
      return;
    }
    setAadhaarStatus('verifying');
    setAadhaarError('');
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setAadhaarStatus('verified');
    store.setAadhaarVerified(true);
    store.setAadhaarVerificationStatus('verified');
  }, [aadhaarValue, store]);

  const resetPanVerification = () => {
    setPanStatus('idle');
    setPanError('');
    setPanEntityType('');
    store.setPanVerified(false);
    store.setPanVerificationStatus('idle');
  };

  const resetAadhaarVerification = () => {
    setAadhaarStatus('idle');
    setAadhaarError('');
    store.setAadhaarVerified(false);
    store.setAadhaarVerificationStatus('idle');
  };

  const onSubmit = (data: PersonalInfoFormData) => {
    if (panStatus !== 'verified' || aadhaarStatus !== 'verified') {
      return;
    }
    store.updatePersonalInfo(data);
    store.nextStep();
  };

  const allFieldsFilled = panStatus === 'verified' && aadhaarStatus === 'verified' && isValid;

  return (
    <WizardLayout showFeatures>
      <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-lg bg-white">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Personal Details</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-lg">
            Please provide your official identification details to begin your application process.
          </p>

          <form className="space-y-md" id="step1-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label htmlFor="first_name" className="font-label-md text-label-md text-on-surface">
                  First Name
                </label>
                <input
                  id="first_name"
                  {...register('first_name')}
                  className="h-12 px-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface"
                  placeholder="Enter first name"
                  aria-invalid={!!errors.first_name}
                  aria-describedby={errors.first_name ? 'first_name-error' : undefined}
                />
                {errors.first_name && (
                  <p id="first_name-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.first_name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-xs">
                <label htmlFor="last_name" className="font-label-md text-label-md text-on-surface">
                  Last Name
                </label>
                <input
                  id="last_name"
                  {...register('last_name')}
                  className="h-12 px-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface"
                  placeholder="Enter last name"
                  aria-invalid={!!errors.last_name}
                  aria-describedby={errors.last_name ? 'last_name-error' : undefined}
                />
                {errors.last_name && (
                  <p id="last_name-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label htmlFor="email" className="font-label-md text-label-md text-on-surface">
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full h-12 pl-lg pr-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface"
                  placeholder="name@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-xs">
              <label htmlFor="phone" className="font-label-md text-label-md text-on-surface">
                Phone Number
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                  call
                </span>
                <input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className="w-full h-12 pl-lg pr-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface"
                  placeholder="+1 (555) 000-0000"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
              </div>
              {errors.phone && (
                <p id="phone-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label htmlFor="dob" className="font-label-md text-label-md text-on-surface">
                  Date of Birth
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    calendar_today
                  </span>
                  <input
                    id="dob"
                    type="date"
                    {...register('dob')}
                    className="w-full h-12 pl-lg pr-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface"
                    aria-invalid={!!errors.dob}
                    aria-describedby={errors.dob ? 'dob-error' : undefined}
                  />
                </div>
                {errors.dob && (
                  <p id="dob-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.dob.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-xs">
                <label htmlFor="gender" className="font-label-md text-label-md text-on-surface">
                  Gender
                </label>
                <select
                  id="gender"
                  {...register('gender')}
                  className="h-12 px-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface appearance-none"
                  aria-invalid={!!errors.gender}
                  aria-describedby={errors.gender ? 'gender-error' : undefined}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p id="gender-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            {/* PAN Card */}
            <div className="flex flex-col gap-xs">
              <label htmlFor="pan" className="font-label-md text-label-md text-on-surface">
                PAN Card Number
              </label>
              <div className="flex gap-xs">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    badge
                  </span>
                  <input
                    id="pan"
                    {...register('pan')}
                    className="w-full h-12 pl-lg pr-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface uppercase"
                    placeholder="ABCDE1234F"
                    onChange={() => { if (panStatus !== 'idle') resetPanVerification(); }}
                    aria-invalid={!!errors.pan}
                    aria-describedby={errors.pan ? 'pan-error' : 'pan-status'}
                  />
                </div>
                <button
                  type="button"
                  className="h-12 px-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-bold hover:brightness-90 active:scale-95 transition-all shadow-sm whitespace-nowrap flex items-center gap-xs"
                  onClick={handlePanVerify}
                  disabled={panStatus === 'verifying'}
                  id="verify-pan-btn"
                >
                  {panStatus === 'verifying' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                      Verifying...
                    </>
                  ) : panStatus === 'verified' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      Verified
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
              {errors.pan && (
                <p id="pan-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.pan.message}
                </p>
              )}
              {panError && (
                <p className="font-label-sm text-label-sm text-error mt-1" role="alert">{panError}</p>
              )}
              {panStatus === 'verified' && (
                <div id="pan-status">
                  <p className="text-green-600 font-label-sm text-label-sm flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Verified - {panEntityType}
                  </p>
                </div>
              )}
            </div>

            {/* Aadhaar Card */}
            <div className="flex flex-col gap-xs">
              <label htmlFor="aadhaar" className="font-label-md text-label-md text-on-surface">
                Aadhaar Number
              </label>
              <div className="flex gap-xs">
                <div className="relative flex-1">
                  <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
                    fingerprint
                  </span>
                  <input
                    id="aadhaar"
                    type="text"
                    {...register('aadhaar')}
                    className="w-full h-12 pl-lg pr-sm border border-outline-variant rounded bg-white form-input-focus transition-all text-on-surface"
                    placeholder="12-digit Aadhaar number"
                    onChange={() => { if (aadhaarStatus !== 'idle') resetAadhaarVerification(); }}
                    aria-invalid={!!errors.aadhaar}
                    aria-describedby={errors.aadhaar ? 'aadhaar-error' : 'aadhaar-status'}
                  />
                </div>
                <button
                  type="button"
                  className="h-12 px-md bg-secondary text-on-secondary rounded-lg font-label-md text-label-md font-bold hover:brightness-90 active:scale-95 transition-all shadow-sm whitespace-nowrap flex items-center gap-xs"
                  onClick={handleAadhaarVerify}
                  disabled={aadhaarStatus === 'verifying'}
                  id="verify-aadhaar-btn"
                >
                  {aadhaarStatus === 'verifying' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[18px]">sync</span>
                      Verifying...
                    </>
                  ) : aadhaarStatus === 'verified' ? (
                    <>
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                      Verified
                    </>
                  ) : (
                    'Verify'
                  )}
                </button>
              </div>
              {errors.aadhaar && (
                <p id="aadhaar-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.aadhaar.message}
                </p>
              )}
              {aadhaarError && (
                <p className="font-label-sm text-label-sm text-error mt-1" role="alert">{aadhaarError}</p>
              )}
              {aadhaarStatus === 'verified' && (
                <div id="aadhaar-status">
                  <p className="text-green-600 font-label-sm text-label-sm flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Verified Successfully
                  </p>
                </div>
              )}
            </div>

            <div className="pt-sm border-t border-outline-variant mt-lg flex justify-between items-center">
              <button
                type="button"
                className="font-label-md text-label-md text-on-surface-variant transition-colors opacity-30 cursor-default"
                disabled
              >
                Previous
              </button>
              <button
                type="submit"
                className={`px-xl py-sm rounded-lg font-bold transition-all shadow-sm ${
                  allFieldsFilled
                    ? 'bg-secondary text-on-secondary hover:brightness-90 active:scale-95'
                    : 'bg-secondary text-on-secondary opacity-50 cursor-not-allowed'
                }`}
                disabled={!allFieldsFilled}
                id="next-btn-1"
              >
                Next
              </button>
            </div>
          </form>
        </div>
        <div className="bg-surface-container-low p-md flex items-start gap-sm">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <div>
            <h4 className="font-label-md text-label-md text-on-surface">Secure Application</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Your data is protected with 256-bit bank-level encryption. We never share your personal information with third parties without consent.
            </p>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}