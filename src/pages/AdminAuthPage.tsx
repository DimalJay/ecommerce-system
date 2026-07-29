import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Mail, Lock, ShieldAlert } from 'lucide-react';
import { AdminNavbar } from '../components/admin/AdminNavbar';
import { useCart } from '../context/CartContext';

export const AdminAuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both administrative email and password.');
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Standard Mock Credentials Check
    if (normalizedEmail === 'admin@aurafashion.com' && password === 'admin123') {
      login(normalizedEmail, 'Atelier Admin');
      triggerToast('Welcome back, Administrator!');
      setTimeout(() => navigate('/admin/items'), 1000);
    } else {
      setErrorMessage('Invalid administrative credentials. Use admin@aurafashion.com / admin123');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-cream text-slate-900 flex flex-col font-sans">
      <AdminNavbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
          <CheckCircle2 size={16} className="text-luxury-gold" />
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-16 w-full flex-1 flex flex-col items-center justify-center min-h-[600px]">
        {/* Back Link */}
        <div className="w-full max-w-md text-left mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
        </div>

        {/* Admin Login Form Card */}
        <div className="w-full max-w-md bg-white border border-luxury-gold-light/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-black text-luxury-charcoal uppercase tracking-wider">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Access the administrative dashboard panel
            </p>
          </div>

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 text-xs font-bold flex items-start gap-2.5 text-left">
              <ShieldAlert size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aurafashion.com"
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
              className="w-full py-3.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md mt-4 cursor-pointer"
            >
              Sign In to Atelier
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-[10px] text-slate-400 font-medium">
              Demo Credentials: <span className="font-bold text-slate-600">admin@aurafashion.com</span> / <span className="font-bold text-slate-600">admin123</span>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAuthPage;
