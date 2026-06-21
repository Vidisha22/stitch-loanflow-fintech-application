import { STEPS } from './StepConfig';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 5 }: ProgressBarProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl mb-lg">
      <div className="flex items-center justify-between mb-xs">
        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider" id="step-indicator">
          Step {currentStep} of {totalSteps}: {STEPS[currentStep - 1]?.label}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant" id="percent-text">
          {percent}% Complete
        </span>
      </div>
      <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
        <div
          className="h-full bg-secondary transition-all duration-500 ease-out"
          id="progress-bar-fill"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Application progress"
        />
      </div>
      <div className="flex justify-between mt-xs">
        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          let circleClass = 'w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md mb-1';
          let labelClass = 'text-[10px] font-bold mb-1';

          if (isCompleted) {
            circleClass += ' bg-secondary text-on-secondary';
            labelClass += ' text-secondary';
          } else if (isCurrent) {
            circleClass += ' bg-secondary text-on-secondary ring-4 ring-secondary-container ring-opacity-50 shadow-md';
            labelClass += ' text-secondary';
          } else {
            circleClass += ' bg-outline-variant text-on-surface-variant';
            labelClass += ' text-on-surface-variant';
          }

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className={circleClass} id={`step-circle-${step.id}`}>
                {isCompleted ? (
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                ) : (
                  step.id
                )}
              </div>
              <span className={labelClass} id={`step-label-${step.id}`}>
                {step.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
