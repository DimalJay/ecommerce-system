import { z } from 'zod';

const CARD_NUMBER = /^\d{16}$/;
const EXPIRY = /^(0[1-9]|1[0-2])\s*\/\s*([0-9]{2})$/;
const CVV = /^\d{3,4}$/;

const baseFields = {
  fullName: z.string().trim().min(1, 'Full Name is required'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  address: z.string().trim().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().trim().min(1, 'City is required'),
  state: z.string().min(1, 'Please select a state or province'),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  notes: z.string().optional(),
};

const cardFields = {
  cardNumber: z
    .string()
    .trim()
    .min(1, 'Card number is required')
    .regex(CARD_NUMBER, 'Card number must be 16 digits'),
  cardholderName: z.string().trim().min(1, 'Cardholder name is required'),
  expiry: z
    .string()
    .trim()
    .min(1, 'Expiry date required')
    .regex(EXPIRY, 'Use MM/YY format')
    .superRefine((value, ctx) => {
      const match = value.match(EXPIRY);
      if (!match) return;
      const month = parseInt(match[1], 10);
      const year = parseInt(`20${match[2]}`, 10);
      const now = new Date();
      if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1)) {
        ctx.addIssue({ code: 'custom', message: 'Card is expired' });
      }
    }),
  cvv: z.string().trim().min(1, 'CVV required').regex(CVV, 'Must be 3 or 4 digits'),
};

/**
 * Returns a checkout schema. Card fields are only enforced when
 * the customer pays with a card.
 */
export const getCheckoutSchema = (withCard: boolean) =>
  z.object({ ...baseFields, ...(withCard ? cardFields : {}) });

export type CheckoutSchemaValues = z.infer<ReturnType<typeof getCheckoutSchema>>;
