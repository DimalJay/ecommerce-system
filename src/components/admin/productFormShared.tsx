import React from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Save,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import type { ProductFormStep } from './formConstants';

interface StepperProps {
  steps: ProductFormStep[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
}

export const ProductFormStepper: React.FC<StepperProps> = ({ steps, currentStep, onStepClick }) => (
  <div className="flex items-center justify-between max-w-md mx-auto pb-6 mb-6 border-b border-border/70">
    {steps.map((step, idx) => {
      const Icon = step.icon;
      const isCompleted = step.id < currentStep;
      const isActive = step.id === currentStep;

      return (
        <React.Fragment key={step.id}>
          <button
            type="button"
            onClick={onStepClick ? () => onStepClick(step.id) : undefined}
            disabled={!onStepClick}
            title={onStepClick ? `Go to ${step.label}` : undefined}
            className="flex flex-col items-center gap-1.5 relative z-10 group transition-transform duration-200"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md'
                  : isActive
                  ? 'bg-text-primary text-elevated ring-4 ring-accent/20 scale-105 shadow-md'
                  : 'bg-bg-secondary text-text-muted border border-border'
              } ${onStepClick ? 'group-hover:scale-110 group-hover:ring-4 group-hover:ring-accent/20 cursor-pointer' : 'cursor-default'}`}
            >
              {isCompleted ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <span
              className={`text-[11px] font-semibold transition-colors ${
                isActive ? 'text-text-primary' : isCompleted ? 'text-emerald-700' : 'text-text-muted'
              } ${onStepClick ? 'group-hover:text-text-primary' : ''}`}
            >
              {step.label}
            </span>
          </button>

          {idx < steps.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 -mt-5 bg-border overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  step.id < currentStep ? 'bg-emerald-600 w-full' : 'w-0'
                }`}
              />
            </div>
          )}
        </React.Fragment>
      );
    })}
  </div>
);

interface FooterProps {
  currentStep: number;
  totalSteps: number;
  onCancel: () => void;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
  submitLabel: string;
  submitIcon?: React.ReactNode;
}

export const ProductFormFooter: React.FC<FooterProps> = ({
  currentStep,
  totalSteps,
  onCancel,
  onBack,
  onNext,
  onSubmit,
  onDelete,
  isSubmitting = false,
  submitLabel,
  submitIcon,
}) => (
  <>
    {onDelete && (
      <button
        type="button"
        onClick={onDelete}
        className="inline-flex items-center gap-1.5 mr-auto px-4 py-3 text-danger hover:bg-danger-bg rounded-lg font-medium transition-colors cursor-pointer"
        title="Delete product"
      >
        <Trash2 size={16} />
        <span>Delete</span>
      </button>
    )}

    {currentStep === 1 ? (
      <button
        type="button"
        onClick={onCancel}
        className="px-5 py-3 text-text-secondary hover:bg-bg-secondary rounded-lg font-medium transition-colors cursor-pointer"
      >
        Cancel
      </button>
    ) : (
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-5 py-3 text-text-secondary hover:bg-bg-secondary rounded-lg font-medium transition-colors cursor-pointer"
      >
        <ChevronLeft size={16} />
        <span>Back</span>
      </button>
    )}

    {currentStep < totalSteps ? (
      <button
        type="button"
        onClick={onNext}
        className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-elevated px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    ) : (
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-elevated px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitIcon ?? <Save size={18} />}
        <span>{isSubmitting ? 'Saving...' : submitLabel}</span>
      </button>
    )}
  </>
);

export const ProductFormAlert: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="p-3 bg-danger-bg border border-danger/30 text-danger rounded-xl text-xs font-medium flex items-center gap-2">
      <AlertCircle size={16} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
};
