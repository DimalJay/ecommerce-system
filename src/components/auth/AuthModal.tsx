import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../ui';
import { useLoginMutation, useRegisterMutation } from '../../hooks/useAuth';
import { getUserApi } from '../../api/userApi';
import type { LoginFormData, RegisterFormData } from '../../lib/validations/auth';
import type { UserSession } from '../../context/AuthContext';
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

  const resolveUserSession = async (fallback: {
    id?: string;
    email: string;
    first_name?: string;
    last_name?: string;
  }): Promise<UserSession> => {
    try {
      const res = await getUserApi();
      if (res.success && res.data) {
        const u = res.data;
        const fullName = `${u.first_name} ${u.last_name}`.trim();
        return {
          email: u.email,
          name: fullName || u.email,
          id: u.id,
          first_name: u.first_name,
          last_name: u.last_name,
        };
      }
    } catch {
      // Fall back to the mutation response below
    }
    const fullName = [fallback.first_name, fallback.last_name].filter(Boolean).join(' ');
    return {
      email: fallback.email,
      name: fullName || fallback.email,
      id: fallback.id,
      first_name: fallback.first_name,
      last_name: fallback.last_name,
    };
  };

  const handleLogin = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        const session = await resolveUserSession(response.data.user);
        login(session.email, session.name, {
          id: session.id,
          first_name: session.first_name,
          last_name: session.last_name,
        });
        completeAuth(`Welcome back, ${session.first_name}!`);
      },
      onError: (err) => triggerToast(err.message),
    });
  };

  const handleRegister = (data: RegisterFormData) => {
    const { confirm_password, ...payload } = data;
    void confirm_password;
    registerMutation.mutate(payload, {
      onSuccess: async (response) => {
        const session = await resolveUserSession({
          id: response.data,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        });
        login(session.email, session.name, {
          id: session.id,
          first_name: session.first_name,
          last_name: session.last_name,
        });
        completeAuth(`Account created successfully! Welcome ${session.first_name}!`);
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

      <div className="relative bg-white border border-luxury-gold-light/30 w-full max-w-md rounded-3xl shadow-2xl animate-scale-up overflow-hidden max-h-[90vh] flex flex-col">
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

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
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
