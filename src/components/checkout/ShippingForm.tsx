import React from 'react';
import { Lock } from 'lucide-react';
import { CheckoutField } from './CheckoutField';
import { getInputClass } from './checkoutStyles';
import type { ShippingFields, FieldChangeHandler } from '../../types/checkout';
import type { UserSession } from '../../context/AuthContext';

interface ShippingFormProps {
  form: ShippingFields;
  onChange: (field: keyof ShippingFields) => FieldChangeHandler;
  errors?: Record<string, string>;
  user?: UserSession | null;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({ form, onChange, errors, user }) => {
  const emailReadonly = !!user?.email;
  return (
    <section className="bg-white border border-luxury-gold-light/30 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-luxury-gold-light/20 pb-4">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-luxury-charcoal text-luxury-cream text-xs font-black shadow-xs">
          1
        </span>
        <h2 className="font-extrabold text-lg sm:text-xl text-luxury-charcoal tracking-tight">Shipping Information</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <CheckoutField label="Full Name" required error={errors?.fullName}>
          <input
            type="text"
            placeholder="John Doe"
            value={form.fullName || user?.name || ''}
            onChange={onChange('fullName')}
            className={getInputClass(!!errors?.fullName)}
            required
          />
        </CheckoutField>

        <CheckoutField label="Email Address" required error={errors?.email}>
          <input
            type="email"
            placeholder="john.doe@email.com"
            value={emailReadonly ? user.email : form.email}
            onChange={onChange('email')}
            disabled={emailReadonly}
            title={emailReadonly ? 'Email is tied to your account and cannot be changed' : undefined}
            className={`${getInputClass(!!errors?.email)} ${emailReadonly ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''
              }`}
            required
          />
          {emailReadonly && (
            <p className="flex items-center gap-1.5 text-[11px] font-semibold text-text-muted mt-1.5">
              <Lock size={11} />
              Tied to your account
            </p>
          )}
        </CheckoutField>

        <CheckoutField label="Phone Number" required error={errors?.phone}>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-text-muted select-none pointer-events-none">
              +94
            </span>
            <input
              type="tel"
              placeholder="771234567"
              value={form.phone}
              maxLength={9}
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
                onChange('phone')(e);
              }}
              className={`${getInputClass(!!errors?.phone)} pl-12`}
              required
            />
          </div>
        </CheckoutField>

        <CheckoutField label="Country" required error={errors?.country}>
          <select
            value={form.country}
            onChange={onChange('country')}
            className={getInputClass(!!errors?.country)}
            required
          >
            <option value="Sri Lanka">Sri Lanka</option>
          </select>
        </CheckoutField>

        <CheckoutField label="Street Address" required error={errors?.address} className="sm:col-span-2">
          <input
            type="text"
            placeholder="123 Main Street or Temple Road"
            value={form.address}
            onChange={onChange('address')}
            className={getInputClass(!!errors?.address)}
            required
          />
        </CheckoutField>

        <CheckoutField label="Apartment, suite, unit (optional)" error={errors?.apartment} className="sm:col-span-2">
          <input
            type="text"
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={form.apartment}
            onChange={onChange('apartment')}
            className={getInputClass(!!errors?.apartment)}
          />
        </CheckoutField>

        <CheckoutField label="City" required error={errors?.city}>
          <input
            type="text"
            placeholder="Colombo / New York"
            value={form.city}
            onChange={onChange('city')}
            className={getInputClass(!!errors?.city)}
            required
          />
        </CheckoutField>

        <CheckoutField label="State / Province" required error={errors?.state}>
          <select
            value={form.state}
            onChange={onChange('state')}
            className={getInputClass(!!errors?.state)}
            required
          >
            <option value="">Select Province</option>
            <option value="Western">Western Province</option>
            <option value="Central">Central Province</option>
            <option value="Southern">Southern Province</option>
            <option value="North Western">North Western Province</option>
            <option value="Sabaragamuwa">Sabaragamuwa Province</option>
            <option value="Eastern">Eastern Province</option>
            <option value="Uva">Uva Province</option>
            <option value="North Central">North Central Province</option>
            <option value="Northern">Northern Province</option>
          </select>
        </CheckoutField>

        <CheckoutField label="Postal Code" required error={errors?.postalCode} className="sm:col-span-2">
          <input
            type="text"
            placeholder="e.g. 10000"
            value={form.postalCode}
            maxLength={5}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, '');
              onChange('postalCode')(e);
            }}
            className={getInputClass(!!errors?.postalCode)}
            required
          />
        </CheckoutField>
      </div>
    </section>
  );
};
