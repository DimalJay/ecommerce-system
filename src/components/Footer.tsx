import React, { useState } from 'react';
import {
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  Globe
} from 'lucide-react';
import webLogo from '../assets/Web Logo.png';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 px-6 sm:px-12 mt-20 text-slate-400">
      <div className="max-w-7xl mx-auto space-y-16">



        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand & Contact Touchpoints */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              {/* OLD LOGO PRESERVED BELOW
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-slate-900 text-luxury-gold rounded-xl flex items-center justify-center border border-slate-800">
                  <ShoppingBag size={18} />
                </div>
                <span className="text-2xl font-black tracking-tight text-white font-serif italic">
                  Aura<span className="text-luxury-gold font-sans not-italic">Atelier</span>
                </span>
              </div>
              */}
              <img src={webLogo} alt="Aura Fashion Logo" className="h-6 sm:h-8 w-auto object-contain" />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
                Aura<span className="text-luxury-gold">Fashion</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              AuraAtelier is a globally recognized apparel design house delivering high-performance technical outerwear, elevated basics, and lifestyle accessories.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-luxury-gold" />
                <span className="font-semibold">support@auraatelier.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-luxury-gold" />
                <span className="font-semibold">+1 (800) 287-2327 (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-luxury-gold" />
                <span className="font-semibold font-sans">Mon - Fri: 9:00 AM - 8:00 PM EST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-550">
              <li><a href="#about" className="hover:text-luxury-gold transition-colors">About AuraAtelier</a></li>
              <li><a href="#sustainability" className="hover:text-luxury-gold transition-colors">Sustainability &amp; Ethics</a></li>
              <li><a href="#careers" className="hover:text-luxury-gold transition-colors flex items-center gap-1.5">Careers <span className="text-[9px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded">HIRING</span></a></li>
              <li><a href="#press" className="hover:text-luxury-gold transition-colors">Press &amp; Media Kit</a></li>
              <li><a href="#investors" className="hover:text-luxury-gold transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-2">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-5">Customer Care</h4>
            <ul className="space-y-3 text-xs font-semibold text-slate-555">
              <li><a href="#track" className="hover:text-luxury-gold transition-colors">Track Your Order</a></li>
              <li><a href="#returns" className="hover:text-luxury-gold transition-colors">Returns &amp; Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-luxury-gold transition-colors">Shipping Information</a></li>
              <li><a href="#size-guide" className="hover:text-luxury-gold transition-colors">Interactive Size Guide</a></li>
              <li><a href="#help" className="hover:text-luxury-gold transition-colors">Help Center &amp; FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Insider Newsletter Box */}
          <div className="md:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Aura VIP Privilege Access</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subscribe to receive exclusive access to private capsule drops, seasonal privileges, and 15% off your first order.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-luxury-gold font-bold text-xs bg-slate-950 border border-slate-800 px-4 py-3 rounded-xl w-full shadow-3xs">
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox for your 15% code.</span>
              </div>
            ) : (
              <form className="flex items-center bg-slate-950 border border-slate-800 rounded-full p-1 focus-within:border-luxury-gold" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-1.5 text-xs text-slate-350 placeholder-slate-650 bg-transparent focus:outline-none"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-luxury-gold hover:bg-luxury-gold-dark text-slate-950 font-bold px-5 py-2 rounded-full text-xs transition-all cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Payment Row */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-slate-600" />
            <span>&copy; 2026 AuraAtelier Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
            <a href="#privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-luxury-gold transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#cookies" className="hover:text-luxury-gold transition-colors">Cookie Preferences</a>
          </div>

          <div className="flex items-center gap-2 font-mono text-[9px] font-bold text-slate-600 tracking-wider">
            <span>VISA</span>
            <span>&bull;</span>
            <span>MASTERCARD</span>
            <span>&bull;</span>
            <span>AMEX</span>
            <span>&bull;</span>
            <span>APPLE PAY</span>
            <span>&bull;</span>
            <span>PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
