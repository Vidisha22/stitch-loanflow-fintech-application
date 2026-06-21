import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressInfoSchema } from '../schemas';
import { useApplicationStore } from '../store/useApplicationStore';
import { WizardLayout } from '../components/WizardLayout';
import { useNavigate } from '../hooks/useNavigate';
import type { AddressInfoFormData } from '../schemas';

export function Step2Address() {
  const store = useApplicationStore();
  const { goBack } = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AddressInfoFormData>({
    resolver: zodResolver(addressInfoSchema),
    defaultValues: store.addressInfo as AddressInfoFormData,
    mode: 'onChange',
  });

  const onSubmit = (data: AddressInfoFormData) => {
    store.updateAddressInfo(data);
    store.nextStep();
  };

  return (
    <WizardLayout>
      <div className="w-full max-w-2xl bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-lg">
        <form className="space-y-md" id="step2-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-base">
            <label htmlFor="street" className="font-label-md text-label-md text-on-surface">
              Street Address
            </label>
            <input
              id="street"
              {...register('street')}
              className="w-full px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface form-input-focus transition-all placeholder:text-on-surface-variant/50"
              placeholder="e.g., 123 Financial Way"
              aria-invalid={!!errors.street}
              aria-describedby={errors.street ? 'street-error' : undefined}
            />
            {errors.street && (
              <p id="street-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                {errors.street.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-base">
              <label htmlFor="city" className="font-label-md text-label-md text-on-surface">
                City
              </label>
              <input
                id="city"
                {...register('city')}
                className="w-full px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface form-input-focus transition-all placeholder:text-on-surface-variant/50"
                placeholder="e.g., New York"
                aria-invalid={!!errors.city}
                aria-describedby={errors.city ? 'city-error' : undefined}
              />
              {errors.city && (
                <p id="city-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div className="space-y-base">
              <label htmlFor="state" className="font-label-md text-label-md text-on-surface">
                State / Province
              </label>
              <select
                id="state"
                {...register('state')}
                className="w-full px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface form-input-focus transition-all"
                aria-invalid={!!errors.state}
                aria-describedby={errors.state ? 'state-error' : undefined}
              >
                <option value="">Select state</option>
                <option value="NY">New York</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
              </select>
              {errors.state && (
                <p id="state-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="space-y-base">
              <label htmlFor="zip" className="font-label-md text-label-md text-on-surface">
                ZIP / Postal Code
              </label>
              <input
                id="zip"
                {...register('zip')}
                className="w-full px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface form-input-focus transition-all placeholder:text-on-surface-variant/50"
                placeholder="e.g., 10001"
                aria-invalid={!!errors.zip}
                aria-describedby={errors.zip ? 'zip-error' : undefined}
              />
              {errors.zip && (
                <p id="zip-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.zip.message}
                </p>
              )}
            </div>
            <div className="space-y-base">
              <label htmlFor="country" className="font-label-md text-label-md text-on-surface">
                Country
              </label>
              <select
                id="country"
                {...register('country')}
                className="w-full px-sm py-xs bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface form-input-focus transition-all"
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? 'country-error' : undefined}
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
              {errors.country && (
                <p id="country-error" className="font-label-sm text-label-sm text-error mt-1" role="alert">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-sm p-sm bg-surface-container-low rounded-lg border border-secondary-container/30 mt-lg">
            <span className="material-symbols-outlined text-secondary">info</span>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              This information is used to verify your identity and comply with financial regulations. We will never share your address without your explicit consent.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-sm mt-xl">
            <button
              type="button"
              className="w-full md:w-auto px-xl py-xs rounded-full border border-outline text-on-surface font-bold hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-xs"
              onClick={() => goBack(2)}
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              Previous
            </button>
            <button
              type="submit"
              className={`w-full md:w-auto px-xl py-xs rounded-full bg-primary text-on-primary font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-xs ${
                isValid ? 'hover:bg-primary/90' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isValid}
              id="next-btn-2"
            >
              Next Step
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </form>
      </div>
    </WizardLayout>
  );
}