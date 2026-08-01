import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Toast } from '../components/ui';
import { PasswordInput } from '../components/auth/PasswordInput';
import { useToast } from '../hooks/useToast';
import { useCart } from '../context/CartContext';
import { useAdminLoginMutation } from '../hooks/useAdminAuth';

export const AdminAuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const { toastMessage, triggerToast } = useToast();

  const adminLoginMutation = useAdminLoginMutation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Please enter both administrative email and password.');
      return;
    }

    adminLoginMutation.mutate(
      { email: email.trim(), password },
      {
        onSuccess: (res) => {
          const adminData = res.data.admin;
          login(adminData.email, adminData.name, { id: adminData.id });
          triggerToast('Welcome back, Administrator!');
          setTimeout(() => navigate('/admin'), 1000);
        },
        onError: (err) => {
          setErrorMessage(err.message || 'Invalid administrative credentials.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans">
      {toastMessage && <Toast message={toastMessage} />}

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-elevated border border-border rounded-2xl p-8 sm:p-10 shadow-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={22} />
              </div>
              <h1 className="text-2xl font-bold text-text-primary">Admin Portal</h1>
              <p className="text-sm text-text-muted">Sign in to access the administrative dashboard</p>
            </div>

            {errorMessage && (
              <div className="bg-danger-bg border border-danger/20 text-danger rounded-xl p-4 text-sm font-medium flex items-start gap-3 text-left">
                <ShieldAlert size={16} className="text-danger shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 text-left">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-12 py-3 bg-bg-secondary border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={adminLoginMutation.isPending}
                className="w-full py-3.5 bg-text-primary hover:bg-accent text-elevated hover:text-text-primary rounded-xl text-sm font-bold uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adminLoginMutation.isPending ? 'Signing In...' : 'Sign In to Portal'}
              </button>
            </form>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors mt-6"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </div>
      </main>
    </div>
  );
};

export default AdminAuthPage;
