import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock } from 'lucide-react';
import { loginSchema, type LoginFormData } from '../../lib/validations/auth';
import { AuthInput } from './AuthInput';
import { AuthSubmitButton } from './AuthSubmitButton';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting, submitLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <AuthInput
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <AuthInput
        label="Password"
        icon={Lock}
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <AuthSubmitButton isSubmitting={isSubmitting} label={submitLabel} />
    </form>
  );
};
