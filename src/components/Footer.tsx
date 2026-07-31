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
    <footer className="bg-footer-bg border-t border-footer-border pt-14 pb-10 px-6 sm:px-8 lg:px-10 mt-16 text-footer-text">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand & Contact Touchpoints */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img src={webLogo} alt="Aura Fashion Logo" className="h-6 sm:h-7 w-auto object-contain" />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-elevated">
                Aura<span className="text-accent">Fashion</span>
              </span>
            </div>

            <p className="text-sm text-footer-text/60 leading-relaxed max-w-xs">
              Premium apparel and accessories crafted for those who value quality, comfort, and timeless style.
            </p>

            <div className="space-y-3 text-sm text-footer-text">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-accent shrink-0" />
                <span>support@aurafashion.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-accent shrink-0" />
                <span>+1 (800) 287-2327 (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={14} className="text-accent shrink-0" />
                <span>Mon - Fri: 9:00 AM - 8:00 PM EST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-elevated uppercase tracking-wider mb-5">Company</h4>
            <ul className="space-y-3 text-sm text-footer-text/60">
              <li><a href="#about" className="hover:text-accent transition-colors">About AuraFashion</a></li>
              <li><a href="#careers" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-elevated uppercase tracking-wider mb-5">Customer Care</h4>
            <ul className="space-y-3 text-sm text-footer-text/60">
              <li><a href="#track" className="hover:text-accent transition-colors">Track Your Order</a></li>
              <li><a href="#returns" className="hover:text-accent transition-colors">Returns &amp; Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-accent transition-colors">Shipping Information</a></li>
              <li><a href="#size-guide" className="hover:text-accent transition-colors">Interactive Size Guide</a></li>
              <li><a href="#help" className="hover:text-accent transition-colors">Help Center &amp; FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Insider Newsletter Box */}
          <div className="md:col-span-4 bg-footer-border/30 border border-footer-border p-6 rounded-2xl space-y-4">
            <h4 className="text-xs font-semibold text-elevated uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-footer-text/60 leading-relaxed">
              Subscribe for updates on new arrivals, exclusive offers, and 15% off your first order.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-accent font-semibold text-sm bg-footer-bg border border-footer-border px-4 py-3 rounded-xl w-full">
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox for your welcome offer.</span>
              </div>
            ) : (
              <form className="flex items-center bg-footer-bg border border-footer-border rounded-full p-1 focus-within:border-accent transition-colors" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm text-elevated placeholder-footer-text/40 bg-transparent focus:outline-none"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-hover text-elevated font-semibold px-5 py-2 rounded-full text-sm transition-all cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Payment Row */}
        <div className="pt-8 border-t border-footer-border flex flex-col sm:flex-row items-center justify-between text-sm text-footer-text/50 gap-4">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-footer-text/40" />
            <span>&copy; 2026 AuraFashion. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-footer-text/50">
            <a href="#privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <span className="text-footer-text/20">|</span>
            <a href="#terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <span className="text-footer-text/20">|</span>
            <a href="#cookies" className="hover:text-accent transition-colors">Cookie Preferences</a>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-footer-text/40 tracking-wider">
            <span>VISA</span>
            <span>|</span>
            <span>MASTERCARD</span>
            <span>|</span>
            <span>AMEX</span>
            <span>|</span>
            <span>APPLE PAY</span>
            <span>|</span>
            <span>PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
