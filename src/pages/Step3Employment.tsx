import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employmentInfoSchema } from '../schemas';
import { useApplicationStore } from '../store/useApplicationStore';
import { WizardLayout } from '../components/WizardLayout';
import { useNavigate } from '../hooks/useNavigate';
import { compressImage, blobToFile } from '../utils/imageCompressor';
import type { EmploymentInfoFormData } from '../schemas';

export function Step3Employment() {
  const store = useApplicationStore();
  const { goBack } = useNavigate();
  const [fileName, setFileName] = useState('No file selected');
  const [fileInfo, setFileInfo] = useState<React.ReactNode>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmploymentInfoFormData>({
    resolver: zodResolver(employmentInfoSchema),
    defaultValues: {
      ...store.employmentInfo as EmploymentInfoFormData,
    },
    mode: 'onChange',
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName('No file selected');
      setFileInfo(null);
      return;
    }
    setFileName(file.name);
    setFileInfo(<span className="text-on-surface-variant">Processing: {formatFileSize(file.size)}...</span>);

    try {
      const result = await compressImage(file);
      if (result.skipped) {
        if (result.reason === 'Not an image file') {
          setFileInfo(
            <span className="text-on-surface-variant">{file.name} ({result.originalSizeFormatted}) — PDF kept as-is</span>
          );
        } else {
          setFileInfo(
            <span className="text-green-600 flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              {file.name} ({result.originalSizeFormatted}) — under 2MB, no compression needed
            </span>
          );
        }
      } else {
        setFileInfo(
          <span className="text-green-600 flex items-center gap-xs">
            <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>compress</span>
            Compressed: {result.originalSizeFormatted} → {result.compressedSizeFormatted} ({result.compressionRatio} reduction)
          </span>
        );
        const compressedFile = blobToFile(result.compressed, file.name);
        store.setIncomeDocument(compressedFile);
      }
    } catch (err) {
      setFileInfo(<span className="text-error">Compression failed: {(err as Error).message}</span>);
    }
  };

  const onSubmit = (data: EmploymentInfoFormData) => {
    store.updateEmploymentInfo(data);
    store.nextStep();
  };

  return (
    <WizardLayout>
      <div className="max-w-2xl mx-auto w-full">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div className="p-lg border-b border-outline-variant bg-surface-container-low/30">
            <h1 className="font-headline-md text-headline-md text-on-surface">Employment Information</h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Please provide your current work details to help us assess your application.
            </p>
          </div>
          <form className="p-lg space-y-sm" id="step3-form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-base">
              <label htmlFor="employment_status" className="block font-label-md text-label-md text-on-surface">
                Employment Status
              </label>
              <div className="relative">
                <select
                  id="employment_status"
                  {...register('employment_status')}
                  className="w-full h-12 px-sm appearance-none bg-white border border-outline-variant rounded-lg font-body-md text-body-md form-input-focus transition-all"
                  aria-invalid={!!errors.employment_status}
                  aria-describedby={errors.employment_status ? 'employment_status-error' : undefined}
                >
                  <option value="">Select status</option>
                  <option value="full_time">Full-time Employee</option>
                  <option value="part_time">Part-time Employee</option>
                  <option value="self_employed">Self-employed</option>
                  <option value="contract">Contractor</option>
                  <option value="unemployed">Unemployed</option>
                </select>
                <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
              </div>
              {errors.employment_status && (
                <p id="employment_status-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.employment_status.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
              <div className="space-y-base">
                <label htmlFor="company_name" className="block font-label-md text-label-md text-on-surface">
                  Company Name
                </label>
                <input
                  id="company_name"
                  {...register('company_name')}
                  className="w-full h-12 px-sm border border-outline-variant rounded-lg font-body-md text-body-md form-input-focus transition-all"
                  placeholder="e.g. Acme Corp"
                  aria-invalid={!!errors.company_name}
                  aria-describedby={errors.company_name ? 'company_name-error' : undefined}
                />
                {errors.company_name && (
                  <p id="company_name-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.company_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-base">
                <label htmlFor="job_title" className="block font-label-md text-label-md text-on-surface">
                  Job Title
                </label>
                <input
                  id="job_title"
                  {...register('job_title')}
                  className="w-full h-12 px-sm border border-outline-variant rounded-lg font-body-md text-body-md form-input-focus transition-all"
                  placeholder="e.g. Senior Manager"
                  aria-invalid={!!errors.job_title}
                  aria-describedby={errors.job_title ? 'job_title-error' : undefined}
                />
                {errors.job_title && (
                  <p id="job_title-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.job_title.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
              <div className="space-y-base">
                <label htmlFor="monthly_income" className="block font-label-md text-label-md text-on-surface">
                  Monthly Net Income
                </label>
                <div className="relative">
                  <span className="absolute left-sm top-1/2 -translate-y-1/2 font-body-md text-on-surface-variant">$</span>
                  <input
                    id="monthly_income"
                    type="number"
                    {...register('monthly_income', { valueAsNumber: true })}
                    className="w-full h-12 pl-8 pr-sm border border-outline-variant rounded-lg font-body-md text-body-md form-input-focus transition-all"
                    placeholder="0.00"
                    aria-invalid={!!errors.monthly_income}
                    aria-describedby={errors.monthly_income ? 'monthly_income-error' : undefined}
                  />
                </div>
                {errors.monthly_income && (
                  <p id="monthly_income-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.monthly_income.message}
                  </p>
                )}
              </div>
              <div className="space-y-base">
                <label htmlFor="employment_years" className="block font-label-md text-label-md text-on-surface">
                  Years at Current Employer
                </label>
                <input
                  id="employment_years"
                  type="number"
                  {...register('employment_years', { valueAsNumber: true })}
                  className="w-full h-12 px-sm border border-outline-variant rounded-lg font-body-md text-body-md form-input-focus transition-all"
                  placeholder="e.g. 3"
                  aria-invalid={!!errors.employment_years}
                  aria-describedby={errors.employment_years ? 'employment_years-error' : undefined}
                />
                {errors.employment_years && (
                  <p id="employment_years-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                    {errors.employment_years.message}
                  </p>
                )}
              </div>
            </div>

            <div className="py-sm">
              <div className="h-px bg-outline-variant w-full"></div>
            </div>

            <div className="space-y-base">
              <label className="block font-label-md text-label-md text-on-surface">Income Proof Document</label>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Upload your latest salary slip or income statement (PNG, JPG, PDF accepted). Images over 2MB will be compressed automatically.
              </p>
              <div className="flex items-center gap-sm">
                <label
                  className="flex-1 h-12 px-sm border border-outline-variant rounded-lg bg-white flex items-center gap-sm cursor-pointer hover:border-secondary transition-all"
                  htmlFor="income-doc"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">cloud_upload</span>
                  <span className="font-body-md text-body-md text-on-surface-variant truncate" id="income-doc-name">
                    {fileName}
                  </span>
                  <input
                    accept="image/png,image/jpeg,image/jpg,application/pdf"
                    className="hidden"
                    id="income-doc"
                    type="file"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="flex items-center gap-sm font-label-sm text-label-sm" id="income-doc-info">
                {fileInfo}
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-sm pt-sm">
              <button
                type="button"
                className="w-full md:w-auto px-xl h-12 rounded-lg border border-outline-variant text-on-surface font-bold hover:bg-surface-container-low transition-all active:scale-95 duration-150 order-2 md:order-1"
                onClick={() => goBack(3)}
              >
                Previous
              </button>
              <button
                type="submit"
                className={`w-full md:w-auto px-xl h-12 rounded-lg bg-secondary text-white font-bold shadow-md transition-all active:scale-95 duration-150 order-1 md:order-2 flex items-center justify-center gap-xs ${
                  isValid ? 'hover:opacity-90' : 'opacity-50 cursor-not-allowed'
                }`}
                disabled={!isValid}
                id="next-btn-3"
              >
                Next Step
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </WizardLayout>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}