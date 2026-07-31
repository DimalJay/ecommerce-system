import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User, ShoppingBag } from 'lucide-react';
import { AuthFormField } from './AuthFormField';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../hooks/useToast';
import { Toast } from '../ui';
import { loadAccounts, saveAccount } from '../../lib/accounts';

type AuthMode = 'login' | 'register';
type FieldKey = 'name' | 'email' | 'password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FieldConfig {
  key: FieldKey;
  label: string;
  placeholder: string;
  type: string;
  icon: React.ComponentType<{ size?: number }>;
}

const INPUT_CLASS =
  'w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/20 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all text-xs font-semibold text-luxury-charcoal';

const SUBMIT_CLASS =
  'w-full py-3 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-lg text-sm font-bold uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer';

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

const FIELD_CONFIG: Record<AuthMode, FieldConfig[]> = {
  login: [
    { key: 'email', label: 'Email Address', placeholder: 'name@example.com', type: 'email', icon: Mail },
    { key: 'password', label: 'Password', placeholder: '••••••••', type: 'password', icon: Lock },
  ],
  register: [
    { key: 'name', label: 'Full Name', placeholder: 'John Doe', type: 'text', icon: User },
    { key: 'email', label: 'Email Address', placeholder: 'name@example.com', type: 'email', icon: Mail },
    { key: 'password', label: 'Password', placeholder: 'Create a password', type: 'password', icon: Lock },
  ],
};

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { login } = useCart();
  const { toastMessage, triggerToast } = useToast();

  const [mode, setMode] = useState<AuthMode>('login');
  const [values, setValues] = useState<Record<FieldKey, string>>({ name: '', email: '', password: '' });

  const setValue = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const handleClose = () => {
    setValues((prev) => ({ ...prev, password: '' }));
    onClose();
  };

  const completeAuth = (message: string) => {
    triggerToast(message);
    handleClose();
    setTimeout(() => navigate('/order-history'), 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const email = values.email.toLowerCase().trim();
    const account = loadAccounts().find((acc) => acc.email.toLowerCase() === email);

    if (!account) {
      triggerToast('No account found with this email. Please create an account.');
      return;
    }

    login(account.email, account.name);
    completeAuth(`Welcome back, ${account.name}!`);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const email = values.email.toLowerCase().trim();
    const name = values.name.trim();

    if (!name || !email || !values.password) {
      triggerToast('Please fill in all fields.');
      return;
    }

    const exists = loadAccounts().some((acc) => acc.email.toLowerCase() === email);
    if (exists) {
      triggerToast('An account with this email already exists. Please sign in.');
      return;
    }

    saveAccount({ email, name });
    login(email, name);
    completeAuth(`Account created successfully! Welcome ${name}`);
  };

  if (!isOpen) return null;

  const copy = MODE_COPY[mode];
  const handleSubmit = mode === 'login' ? handleLogin : handleRegister;

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

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {FIELD_CONFIG[mode].map((field) => (
              <AuthFormField key={field.key} label={field.label} icon={<field.icon size={16} />}>
                <input
                  type={field.type}
                  value={values[field.key]}
                  onChange={setValue(field.key)}
                  placeholder={field.placeholder}
                  required
                  className={INPUT_CLASS}
                />
              </AuthFormField>
            ))}

            <button type="submit" className={SUBMIT_CLASS}>
              {copy.submitLabel}
            </button>
          </form>

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
