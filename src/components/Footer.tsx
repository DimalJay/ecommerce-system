import React, { useState } from 'react';
import {
  ShoppingBag,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Truck,
  RotateCcw,
  Globe,
  Lock
} from 'lucide-react';

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
    <footer className="bg-white border-t border-slate-200/90 pt-16 pb-12 px-6 sm:px-12 mt-20 shadow-xs text-slate-700">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Trust & Value Guarantee Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-100">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs border border-sky-100">
              <Truck size={20} />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Free Global Shipping</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Complimentary express dispatch on orders over $300.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs border border-sky-100">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">3-Year Guarantee</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Guaranteed 100% authentic premium craftsmanship.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs border border-sky-100">
              <RotateCcw size={20} />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">30-Day Easy Returns</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Hassle-free exchange and full refund policy.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0284c7] flex items-center justify-center shrink-0 shadow-xs border border-sky-100">
              <Lock size={20} />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Secure Checkout</h5>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">256-Bit SSL encrypted safe payment processing.</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand & Contact Touchpoints */}
          <div className="md:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-tr from-[#0284c7] to-sky-400 rounded-xl flex items-center justify-center text-white shadow-xs">
                <ShoppingBag size={18} />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 font-mono">
                Aura<span className="text-[#0284c7]">Fashion</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              AuraFashion is a globally recognized apparel design house delivering high-performance technical outerwear, elevated basics, and lifestyle accessories.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#0284c7]" />
                <span className="font-medium">support@aurafashion.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#0284c7]" />
                <span className="font-medium">+1 (800) 287-2327 (Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={14} className="text-[#0284c7]" />
                <span className="font-medium">Mon - Fri: 9:00 AM - 8:00 PM EST</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-600">
              <li><a href="#about" className="hover:text-[#0284c7] transition-colors flex items-center gap-1">About AuraFashion</a></li>
              <li><a href="#sustainability" className="hover:text-[#0284c7] transition-colors">Sustainability &amp; Ethics</a></li>
              <li><a href="#careers" className="hover:text-[#0284c7] transition-colors flex items-center gap-1.5">Careers <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">HIRING</span></a></li>
              <li><a href="#press" className="hover:text-[#0284c7] transition-colors">Press &amp; Media Kit</a></li>
              <li><a href="#investors" className="hover:text-[#0284c7] transition-colors">Investor Relations</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-5">Customer Care</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-600">
              <li><a href="#track" className="hover:text-[#0284c7] transition-colors">Track Your Order</a></li>
              <li><a href="#returns" className="hover:text-[#0284c7] transition-colors">Returns &amp; Exchanges</a></li>
              <li><a href="#shipping" className="hover:text-[#0284c7] transition-colors">Shipping Information</a></li>
              <li><a href="#size-guide" className="hover:text-[#0284c7] transition-colors">Interactive Size Guide</a></li>
              <li><a href="#help" className="hover:text-[#0284c7] transition-colors">Help Center &amp; FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Insider Newsletter Box */}
          <div className="md:col-span-4 bg-sky-50/60 border border-sky-100 p-6 rounded-2xl space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Aura VIP Privilege Access</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Subscribe to receive exclusive access to private capsule drops, seasonal privileges, and 15% off your first order.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 text-[#0284c7] font-bold text-xs bg-white border border-sky-200 px-4 py-3 rounded-xl w-full shadow-xs">
                <CheckCircle2 size={16} />
                <span>Subscribed! Check your inbox for your 15% code.</span>
              </div>
            ) : (
              <form className="flex items-center bg-white border border-sky-200 rounded-full p-1 shadow-xs focus-within:border-[#0284c7]" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter corporate or personal email"
                  className="w-full px-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold px-5 py-2 rounded-full text-xs transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal & Payment Row */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-slate-400" />
            <span>&copy; 2026 AuraFashion Inc. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
            <a href="#privacy" className="hover:text-[#0284c7] transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#terms" className="hover:text-[#0284c7] transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#cookies" className="hover:text-[#0284c7] transition-colors">Cookie Preferences</a>
            <span>&bull;</span>
            <a href="#accessibility" className="hover:text-[#0284c7] transition-colors">Accessibility</a>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-slate-400 tracking-wider">
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
