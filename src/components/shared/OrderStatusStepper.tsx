import React from 'react';
import { Clock, PackageCheck, Truck, CheckCircle2, XCircle } from 'lucide-react';
import type { Order } from '../../types/order';

interface OrderStatusStepperProps {
  status: Order['status'];
}

const STATUS_STEPS: { key: Order['status']; label: string; icon: React.ComponentType<{ size?: number | string }> }[] = [
  { key: 'Processing', label: 'Processing', icon: Clock },
  { key: 'Accepted', label: 'Accepted', icon: PackageCheck },
  { key: 'Shipped', label: 'Shipped', icon: Truck },
  { key: 'Delivered', label: 'Delivered', icon: CheckCircle2 },
];

export const OrderStatusStepper: React.FC<OrderStatusStepperProps> = ({ status }) => {
  if (status === 'Rejected') {
    return (
      <div className="flex items-center gap-2 justify-center py-3">
        <XCircle size={18} className="text-rose-600" />
        <span className="text-xs font-black text-rose-600 uppercase tracking-widest">Order Rejected</span>
      </div>
    );
  }

  const activeIndex = STATUS_STEPS.findIndex((step) => step.key === status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-2">
        {STATUS_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < activeIndex;
          const isActive = idx === activeIndex;

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center gap-1.5 relative z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isActive
                        ? 'bg-luxury-charcoal text-luxury-cream ring-4 ring-luxury-gold/30 shadow-lg scale-105'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-semibold tracking-tight ${
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

              {idx < STATUS_STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 sm:mx-2 mb-6 bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      idx < activeIndex ? 'bg-emerald-600 w-full' : 'w-0 bg-luxury-gold'
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

export default OrderStatusStepper;