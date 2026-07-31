import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock } from 'lucide-react';
import { registerSchema, type RegisterFormData } from '../../lib/validations/auth';
import { AuthInput } from './AuthInput';
import { AuthSubmitButton } from './AuthSubmitButton';

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isSubmitting: boolean;
  submitLabel: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isSubmitting, submitLabel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <div className="grid grid-cols-2 gap-4">
        <AuthInput
          label="First Name"
          icon={User}
          type="text"
          placeholder="John"
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <AuthInput
          label="Last Name"
          icon={User}
          type="text"
          placeholder="Doe"
          error={errors.last_name?.message}
          {...register('last_name')}
        />
      </div>

      <AuthInput
        label="Email Address"
        icon={Mail}
        type="email"
        placeholder="name@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid grid-cols-2 gap-4">
        <AuthInput
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password')}
        />
        <AuthInput
          label="Confirm Password"
          icon={Lock}
          type="password"
          placeholder="Repeat password"
          error={errors.confirm_password?.message}
          {...register('confirm_password')}
        />
      </div>

      <AuthSubmitButton isSubmitting={isSubmitting} label={submitLabel} />
    </form>
  );
};
