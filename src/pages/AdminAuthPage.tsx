import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Mail, Lock, ShieldCheck } from 'lucide-react';
import { Toast } from '../components/ui';
import { PasswordInput } from '../components/auth/PasswordInput';
import { useToast } from '../hooks/useToast';
import { useCart } from '../context/CartContext';
import { useAdminLoginMutation } from '../hooks/useAdminAuth';
import { adminLoginSchema, type AdminLoginFormData } from '../lib/validations/auth';

const inputClass =
  'w-full pl-11 pr-4 py-3 bg-bg-secondary border border-border rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all';

export const AdminAuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const { toastMessage, triggerToast } = useToast();

  const adminLoginMutation = useAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((data) => {
    adminLoginMutation.mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (res) => {
          const adminData = res.data.admin;
          login(adminData.email, adminData.name, { id: adminData.id });
          triggerToast('Welcome back, Administrator!');
          setTimeout(() => navigate('/admin'), 1000);
        },
        onError: (err) => {
          triggerToast(err.message || 'Invalid administrative credentials.');
        },
      },
    );
  });

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

            <form onSubmit={onSubmit} className="space-y-5 text-left">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    {...register('email')}
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-danger font-medium">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <PasswordInput
                    placeholder="••••••••"
                    {...register('password')}
                    className={`${inputClass} pr-12`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-danger font-medium">{errors.password.message}</p>
                )}
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
