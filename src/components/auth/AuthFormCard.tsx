import React from 'react';
import { Mail, Lock, User } from 'lucide-react';

interface AuthFormCardProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  name: string;
  setName: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGoogleLogin: () => void;
}

export const AuthFormCard: React.FC<AuthFormCardProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  onSubmit,
  onGoogleLogin
}) => {
  return (
    <div className="w-full max-w-md bg-white border border-luxury-gold-light/20 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-3xl font-black text-luxury-charcoal uppercase tracking-wider">
          Sign in
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          Sign in or create an account
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4 text-left">
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
        onClick={onGoogleLogin}
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
  );
};
export default AuthFormCard;
