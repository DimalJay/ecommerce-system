import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import {
  loginSchema,
  registerSchema,
  type LoginFormData,
  type RegisterFormData,
} from '../../lib/validations/authSchemas';
import { useLoginMutation, useRegisterMutation } from '../../hooks/useAuthMutations';

interface AuthFormCardProps {
  onLoginSuccess: (user: { email: string; name: string; id?: string; first_name?: string; last_name?: string }) => void;
  onRegisterSuccess: (message: string, userId?: string) => void;
  onError: (msg: string) => void;
}

export const AuthFormCard: React.FC<AuthFormCardProps> = ({
  onLoginSuccess,
  onRegisterSuccess,
  onError,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  // Login form handler
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Register form handler
  const {
    register: registerSignUp,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLogin = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        const u = res.data?.user;
        const fullName = u ? `${u.first_name} ${u.last_name}`.trim() : data.email.split('@')[0];
        onLoginSuccess({
          email: u?.email || data.email,
          name: fullName || 'User',
          id: u?.id,
          first_name: u?.first_name,
          last_name: u?.last_name,
        });
      },
      onError: (err) => {
        onError(err.message || 'Login failed. Please check your credentials.');
      },
    });
  };

  const onRegister = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: (res) => {
        onRegisterSuccess(res.message || 'Account created successfully!', res.data);
        // Switch to login tab after registration
        setMode('login');
      },
      onError: (err) => {
        onError(err.message || 'Registration failed. Please try again.');
      },
    });
  };

  const isLoading = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="w-full max-w-md bg-white border border-luxury-gold-light/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
      {/* Mode Switch Tabs */}
      <div className="flex border-b border-luxury-gold-light/20 pb-3">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`flex-1 text-center py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            mode === 'login'
              ? 'text-luxury-charcoal border-b-2 border-luxury-gold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`flex-1 text-center py-2 text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            mode === 'register'
              ? 'text-luxury-charcoal border-b-2 border-luxury-gold'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Create Account
        </button>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-luxury-charcoal uppercase tracking-wider">
          {mode === 'login' ? 'Welcome Back' : 'Join Aura Fashion'}
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          {mode === 'login'
            ? 'Sign in to access your atelier profile'
            : 'Register to unlock exclusive drop access'}
        </p>
      </div>

      {mode === 'login' ? (
        /* Sign In Form */
        <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 text-left">
          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                {...registerLogin('email')}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/30 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all text-xs font-semibold text-luxury-charcoal"
              />
            </div>
            {loginErrors.email && (
              <p className="text-[10px] text-rose-500 font-bold">{loginErrors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                {...registerLogin('password')}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/30 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all text-xs font-semibold text-luxury-charcoal"
              />
            </div>
            {loginErrors.password && (
              <p className="text-[10px] text-rose-500 font-bold">{loginErrors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Sign In'}
          </button>
        </form>
      ) : (
        /* Register Form */
        <form onSubmit={handleRegisterSubmit(onRegister)} className="space-y-4 text-left">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text"
                  {...registerSignUp('first_name')}
                  placeholder="John"
                  className="w-full pl-9 pr-3 py-3 bg-luxury-sand/30 border border-luxury-gold-light/30 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all text-xs font-semibold text-luxury-charcoal"
                />
              </div>
              {registerErrors.first_name && (
                <p className="text-[10px] text-rose-500 font-bold">{registerErrors.first_name.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                  type="text"
                  {...registerSignUp('last_name')}
                  placeholder="Doe"
                  className="w-full pl-9 pr-3 py-3 bg-luxury-sand/30 border border-luxury-gold-light/30 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all text-xs font-semibold text-luxury-charcoal"
                />
              </div>
              {registerErrors.last_name && (
                <p className="text-[10px] text-rose-500 font-bold">{registerErrors.last_name.message}</p>
              )}
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                {...registerSignUp('email')}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/30 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all text-xs font-semibold text-luxury-charcoal"
              />
            </div>
            {registerErrors.email && (
              <p className="text-[10px] text-rose-500 font-bold">{registerErrors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-extrabold text-slate-600 uppercase tracking-wider">
              Password (min. 6 characters)
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                {...registerSignUp('password')}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-luxury-sand/30 border border-luxury-gold-light/30 rounded-xl focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all text-xs font-semibold text-luxury-charcoal"
              />
            </div>
            {registerErrors.password && (
              <p className="text-[10px] text-rose-500 font-bold">{registerErrors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 shadow-md mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Create Account'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AuthFormCard;
