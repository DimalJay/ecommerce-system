import React from 'react';
import { ShoppingBag, CreditCard, CheckCircle2 } from 'lucide-react';

interface CheckoutStepperProps {
  currentStep: number; // 1: Cart (completed), 2: Shipping & Payment (active), 3: Confirmation
}

export const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Shopping Bag', icon: ShoppingBag },
    { id: 2, label: 'Shipping & Payment', icon: CreditCard },
    { id: 3, label: 'Order Confirmed', icon: CheckCircle2 },
  ];

  return (
    <div className="w-full py-4 mb-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto px-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step Circle & Label */}
              <div className="flex flex-col items-center gap-2 relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isActive
                      ? 'bg-luxury-charcoal text-luxury-cream ring-4 ring-luxury-gold/30 shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={18} /> : <Icon size={18} />}
                </div>
                <span
                  className={`text-[11px] font-semibold tracking-tight transition-colors ${
                    isActive
                      ? 'text-luxury-charcoal font-bold'
                      : isCompleted
                      ? 'text-emerald-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connecting Line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 sm:mx-4 -mt-5 bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      step.id < currentStep ? 'bg-emerald-600 w-full' : 'w-0 bg-luxury-gold'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
