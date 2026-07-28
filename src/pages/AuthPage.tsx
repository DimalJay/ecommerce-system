import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Mail, Lock, User } from 'lucide-react';
import { AppLayout } from '../components';
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

        {/* Simplified Auth Card */}
        <div className="w-full max-w-md bg-white border border-luxury-gold-light/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-black text-luxury-charcoal uppercase tracking-wider">
              Sign in
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Sign in or create an account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Full Name Option */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Full Name (Optional for sign in)
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/20 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all text-xs font-semibold text-luxury-charcoal"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/20 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all text-xs font-semibold text-luxury-charcoal"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/20 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all text-xs font-semibold text-luxury-charcoal"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md mt-2 cursor-pointer"
            >
              Continue
            </button>
          </form>

          {/* Social Separator */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[1px] bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or</span>
            <div className="flex-1 h-[1px] bg-slate-200" />
          </div>

          {/* Google Sign In Option */}
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 border border-slate-200 hover:border-luxury-gold rounded-xl text-xs font-bold text-slate-700 hover:text-luxury-charcoal bg-white transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=48&q=80"
              alt="Google logo"
              className="w-4 h-4 object-contain rounded-full"
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </main>
    </AppLayout>
  );
};

export default AuthPage;
