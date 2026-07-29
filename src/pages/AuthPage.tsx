import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { AuthFormCard } from '../components/auth';
import { useCart } from '../context/CartContext';

export const AuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerToast('Please enter both email and password.');
      return;
    }

    // Read existing accounts to check if registered
    let accounts: { email: string; name: string }[] = [];
    try {
      const stored = localStorage.getItem('registered_accounts');
      if (stored) accounts = JSON.parse(stored);
    } catch (err) {
      console.error(err);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = accounts.find((acc) => acc.email.toLowerCase() === normalizedEmail);

    if (existing) {
      // Auto-detect: Log in
      login(existing.email, existing.name);
      triggerToast(`Welcome back, ${existing.name}!`);
    } else {
      // Create new account
      const finalName = name.trim() || email.split('@')[0];
      const newAccount = { email: normalizedEmail, name: finalName };
      accounts.push(newAccount);
      localStorage.setItem('registered_accounts', JSON.stringify(accounts));
      
      login(normalizedEmail, finalName);
      triggerToast(`Account created successfully! Welcome ${finalName}`);
    }

    setTimeout(() => navigate('/order-history'), 1000);
  };

  const handleGoogleLogin = () => {
    login('user.google@gmail.com', 'Google User');
    triggerToast('Logged in successfully via Google');
    setTimeout(() => navigate('/order-history'), 1000);
  };

  return (
    <AppLayout>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
          <CheckCircle2 size={16} className="text-luxury-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-16 w-full flex-1 flex flex-col items-center justify-center min-h-[650px]">
        {/* Back Link */}
        <div className="w-full max-w-md text-left mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
        </div>

        {/* Form Card component */}
        <AuthFormCard
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          onSubmit={handleSubmit}
          onGoogleLogin={handleGoogleLogin}
        />
      </main>
    </AppLayout>
  );
};

export default AuthPage;
