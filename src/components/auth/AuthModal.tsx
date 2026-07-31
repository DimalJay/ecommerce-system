import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../ui';
import { useLoginMutation, useRegisterMutation } from '../../hooks/useAuth';
import type { LoginFormData, RegisterFormData } from '../../lib/validations/auth';
import { AuthModalHeader } from './AuthModalHeader';
import { AuthModeTabs, type AuthMode } from './AuthModeTabs';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODE_COPY: Record<AuthMode, { title: string; subtitle: string; submitLabel: string; switchLabel: string }> = {
  login: {
    title: 'Sign in',
    subtitle: 'Welcome back to AuraFashion',
    submitLabel: 'Sign In',
    switchLabel: "New to AuraFashion? Create an account",
  },
  register: {
    title: 'Create Account',
    subtitle: 'Sign up to start shopping with AuraFashion',
    submitLabel: 'Create Account',
    switchLabel: 'Already have an account? Sign in',
  },
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useCart();
  const { toastMessage, triggerToast } = useToast();

  const [mode, setMode] = useState<AuthMode>('login');

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  const handleClose = () => {
    loginMutation.reset();
    registerMutation.reset();
    onClose();
  };

  const completeAuth = (message: string) => {
    triggerToast(message);
    handleClose();
  };

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const { user } = response.data;
        login(user.email, `${user.first_name} ${user.last_name}`, {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
        });
        completeAuth(`Welcome back, ${user.first_name}!`);
      },
      onError: (err) => triggerToast(err.message),
    });
  };

  const handleRegister = (data: RegisterFormData) => {
    const { confirm_password, ...payload } = data;
    void confirm_password;
    registerMutation.mutate(payload, {
      onSuccess: (response) => {
        const fullName = `${data.first_name} ${data.last_name}`.trim();
        login(data.email, fullName, {
          id: response.data,
          first_name: data.first_name,
          last_name: data.last_name,
        });
        completeAuth(`Account created successfully! Welcome ${data.first_name}!`);
      },
      onError: (err) => triggerToast(err.message),
    });
  };

  if (!isOpen) return null;

  const copy = MODE_COPY[mode];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      <div className="relative bg-white border border-luxury-gold-light/30 w-full max-w-md rounded-3xl shadow-2xl animate-scale-up overflow-hidden">
        {toastMessage && <Toast message={toastMessage} />}

        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-luxury-charcoal rounded-full transition-all border border-luxury-gold-light/20 cursor-pointer"
          title="Close"
          aria-label="Close sign in dialog"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <AuthModalHeader title={copy.title} subtitle={copy.subtitle} />

          <AuthModeTabs mode={mode} onModeChange={setMode} />

          {mode === 'login' ? (
            <LoginForm
              onSubmit={handleLogin}
              isSubmitting={isSubmitting}
              submitLabel={copy.submitLabel}
            />
          ) : (
            <RegisterForm
              onSubmit={handleRegister}
              isSubmitting={isSubmitting}
              submitLabel={copy.submitLabel}
            />
          )}

          <div className="text-center">
            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-xs text-slate-500 font-medium hover:text-luxury-gold transition-colors cursor-pointer"
            >
              {copy.switchLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
