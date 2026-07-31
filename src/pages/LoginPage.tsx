import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { LoginFormCard } from '../components/auth';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

export const LoginPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const { toastMessage, triggerToast } = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerToast('Please enter both email and password.');
      return;
    }

    let accounts: { email: string; name: string }[] = [];
    try {
      const stored = localStorage.getItem('registered_accounts');
      if (stored) accounts = JSON.parse(stored);
    } catch (err) { console.error(err); }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

    if (!existing) {
      triggerToast('No account found with this email. Please create an account.');
      return;
    }

    login(existing.email, existing.name);
    triggerToast(`Welcome back, ${existing.name}!`);
    setTimeout(() => navigate('/order-history'), 1000);
  };

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        <div className="max-w-md mx-auto space-y-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>

          <LoginFormCard
            email={email} setEmail={setEmail}
            password={password} setPassword={setPassword}
            onSubmit={handleSubmit}
          />
        </div>
      </main>
    </AppLayout>
  );
};

export default LoginPage;
