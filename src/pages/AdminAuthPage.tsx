import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, ShieldAlert } from 'lucide-react';
import { Toast } from '../components/ui';
import { useToast } from '../hooks/useToast';
import { useCart } from '../context/CartContext';
import { useAdminLoginMutation } from '../hooks/useAdminAuth';

export const AdminAuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const { toastMessage, triggerToast } = useToast();

  const adminLoginMutation = useAdminLoginMutation();

  // States
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex-1">
        <div className="max-w-md mx-auto space-y-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>

          <div className="bg-elevated border border-border rounded-xl p-8 sm:p-10 shadow-lg space-y-6">
            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">
                Admin Portal
              </h1>
              <p className="text-sm text-text-muted">
                Access the administrative dashboard panel
              </p>
            </div>

            {errorMessage && (
              <div className="bg-danger-bg border border-danger/20 text-danger rounded-xl p-4 text-sm font-medium flex items-start gap-3 text-left">
                <ShieldAlert size={16} className="text-danger shrink-0 mt-1" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
                    className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-bg-secondary border border-border rounded-lg text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={adminLoginMutation.isPending}
                className="w-full py-3 bg-text-primary hover:bg-accent text-elevated hover:text-text-primary rounded-lg text-sm font-semibold transition-all shadow-md mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adminLoginMutation.isPending ? 'Signing In...' : 'Sign In to Portal'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAuthPage;
