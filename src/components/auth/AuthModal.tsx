import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Mail, Lock, User, ShoppingBag } from 'lucide-react';
import { AuthFormField } from './AuthFormField';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../ui';
import { useLoginMutation, useRegisterMutation } from '../../hooks/useAuth';
import { loginSchema, registerSchema } from '../../lib/validations/auth';
import type { LoginFormData, RegisterFormData } from '../../lib/validations/auth';

type AuthMode = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LoginFieldKey = 'email' | 'password';
type RegisterFieldKey = 'first_name' | 'last_name' | 'email' | 'password';

interface FieldConfig<K extends string> {
  key: K;
  label: string;
  placeholder: string;
  type: string;
  icon: React.ComponentType<{ size?: number }>;
}

const INPUT_CLASS =
  'w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/20 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all text-xs font-semibold text-luxury-charcoal';

const SUBMIT_CLASS =
  'w-full py-3 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

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

const LOGIN_FIELDS: FieldConfig<LoginFieldKey>[] = [
  { key: 'email', label: 'Email Address', placeholder: 'name@example.com', type: 'email', icon: Mail },
  { key: 'password', label: 'Password', placeholder: '••••••••', type: 'password', icon: Lock },
];

const REGISTER_FIELDS: FieldConfig<RegisterFieldKey>[] = [
  { key: 'first_name', label: 'First Name', placeholder: 'John', type: 'text', icon: User },
  { key: 'last_name', label: 'Last Name', placeholder: 'Doe', type: 'text', icon: User },
  { key: 'email', label: 'Email Address', placeholder: 'name@example.com', type: 'email', icon: Mail },
  { key: 'password', label: 'Password', placeholder: 'Create a password', type: 'password', icon: Lock },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login } = useCart();
  const { toastMessage, triggerToast } = useToast();

  const [mode, setMode] = useState<AuthMode>('login');

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const isSubmitting = loginMutation.isPending || registerMutation.isPending;

  const handleClose = () => {
    loginForm.reset();
    registerForm.reset();
    loginMutation.reset();
    registerMutation.reset();
    onClose();
  };

  const completeAuth = (message: string) => {
    triggerToast(message);
    handleClose();
    setTimeout(() => navigate('/order-history'), 1000);
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
    registerMutation.mutate(data, {
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
          <div className="text-center space-y-1">
            <div className="w-12 h-12 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mx-auto mb-3">
              <ShoppingBag size={22} />
            </div>
            <h2 className="text-2xl font-black text-luxury-charcoal uppercase tracking-wider">{copy.title}</h2>
            <p className="text-xs text-slate-400 font-medium">{copy.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 bg-luxury-sand/40 border border-luxury-gold-light/20 rounded-xl">
            {(Object.keys(MODE_COPY) as AuthMode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  mode === m
                    ? 'bg-luxury-charcoal text-white shadow-md'
                    : 'text-slate-500 hover:text-luxury-charcoal'
                }`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 text-left">
              {LOGIN_FIELDS.map((field) => (
                <AuthFormField
                  key={field.key}
                  label={field.label}
                  icon={<field.icon size={16} />}
                  error={loginForm.formState.errors[field.key]?.message}
                >
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className={INPUT_CLASS}
                    {...loginForm.register(field.key)}
                  />
                </AuthFormField>
              ))}

              <button type="submit" disabled={isSubmitting} className={SUBMIT_CLASS}>
                {isSubmitting ? 'Please wait...' : copy.submitLabel}
              </button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4 text-left">
              {REGISTER_FIELDS.map((field) => (
                <AuthFormField
                  key={field.key}
                  label={field.label}
                  icon={<field.icon size={16} />}
                  error={registerForm.formState.errors[field.key]?.message}
                >
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className={INPUT_CLASS}
                    {...registerForm.register(field.key)}
                  />
                </AuthFormField>
              ))}

              <button type="submit" disabled={isSubmitting} className={SUBMIT_CLASS}>
                {isSubmitting ? 'Please wait...' : copy.submitLabel}
              </button>
            </form>
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
