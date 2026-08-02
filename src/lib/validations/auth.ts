import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email address is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const PASSWORD_RULES = [
  { test: (v: string) => v.length >= 8, label: 'At least 8 characters' },
  { test: (v: string) => /[A-Z]/.test(v), label: 'One uppercase letter' },
  { test: (v: string) => /[a-z]/.test(v), label: 'One lowercase letter' },
  { test: (v: string) => /[0-9]/.test(v), label: 'One number' },
  { test: (v: string) => /[^A-Za-z0-9]/.test(v), label: 'One special character' },
] as const;

export const strongPassword = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must include an uppercase letter')
  .regex(/[a-z]/, 'Password must include a lowercase letter')
  .regex(/[0-9]/, 'Password must include a number')
  .regex(/[^A-Za-z0-9]/, 'Password must include a special character');

/**
 * Scores a password against the shared strength rules.
 * Returns a score (0-5) and a human-readable label.
 */
export const getPasswordStrength = (password: string): { score: number; label: string } => {
  const score = PASSWORD_RULES.reduce((acc, rule) => acc + (rule.test(password) ? 1 : 0), 0);
  if (score <= 1) return { score, label: 'Weak' };
  if (score <= 3) return { score, label: 'Fair' };
  return { score, label: 'Strong' };
};

export const registerSchema = z
  .object({
    first_name: z.string().trim().min(1, 'First name is required'),
    last_name: z.string().trim().min(1, 'Last name is required'),
    email: z.string().trim().min(1, 'Email address is required').email('Please enter a valid email address'),
    password: strongPassword,
    confirm_password: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export const adminLoginSchema = z.object({
  email: z.string().trim().min(1, 'Admin email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>;
