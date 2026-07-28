import React from 'react';
import { CheckoutField } from './CheckoutField';

interface ShippingFormProps {
  form: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  onChange: (field: any) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  inputClass: string;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
  form,
  onChange,
  inputClass,
}) => {
  return (
    <section className="bg-white border border-luxury-gold-light/20 rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-7 h-7 flex items-center justify-center rounded-full bg-luxury-charcoal text-white text-xs font-extrabold">
          1
        </span>
        <h2 className="font-extrabold text-lg text-luxury-charcoal">Shipping Information</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <CheckoutField label="Full Name" required>
          <input
            type="text"
            placeholder="John Doe"
            value={form.fullName}
            onChange={onChange('fullName')}
            className={inputClass}
            required
          />
        </CheckoutField>
        <CheckoutField label="Email Address" required>
          <input
            type="email"
            placeholder="john.doe@email.com"
            value={form.email}
            onChange={onChange('email')}
            className={inputClass}
            required
          />
        </CheckoutField>

        <CheckoutField label="Phone Number" required>
          <input
            type="tel"
            placeholder="+1 234 567 8900"
            value={form.phone}
            onChange={onChange('phone')}
            className={inputClass}
            required
          />
        </CheckoutField>
        <div className="hidden sm:block" />

        <CheckoutField label="Address" required className="sm:col-span-2">
          <input
            type="text"
            placeholder="123 Mountain View Road"
            value={form.address}
            onChange={onChange('address')}
            className={inputClass}
            required
          />
        </CheckoutField>

        <CheckoutField label="Apartment, suite, unit (optional)" className="sm:col-span-2">
          <input
            type="text"
            placeholder="Apartment, suite, unit, etc. (optional)"
            value={form.apartment}
            onChange={onChange('apartment')}
            className={inputClass}
          />
        </CheckoutField>

        <CheckoutField label="City" required>
          <input
            type="text"
            placeholder="New York"
            value={form.city}
            onChange={onChange('city')}
            className={inputClass}
            required
          />
        </CheckoutField>
        <CheckoutField label="State / Province" required>
          <select
            value={form.state}
            onChange={onChange('state')}
            className={inputClass}
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
        <CheckoutField label="Postal Code" required>
          <input
            type="text"
            placeholder="10001"
            value={form.postalCode}
            onChange={onChange('postalCode')}
            className={inputClass}
            required
          />
        </CheckoutField>

        <CheckoutField label="Country" required className="sm:col-span-2">
          <select
            value={form.country}
            onChange={onChange('country')}
            className={inputClass}
            required
          >
            <option value="United States">United States</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </CheckoutField>
      </div>
    </section>
  );
};
