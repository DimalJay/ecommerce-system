import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface NewsletterProps {
  onSubscribeToast: (msg: string) => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSubscribeToast }) => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      onSubscribeToast('Subscribed to AuraFashion releases');
      setEmailInput('');
    }
  };

  return (
    <section className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto my-12 shadow-xs">
      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
        Join the <span className="text-[#16a34a]">AuraFashion</span> Inner Circle
      </h3>
      <p className="text-xs text-slate-500 mb-6 max-w-md mx-auto">
        Subscribe to receive private preview access to limited capsule releases, special discounts, and style updates.
      </p>

      {newsletterSubscribed ? (
        <div className="inline-flex items-center justify-center gap-2 text-[#16a34a] font-bold text-xs bg-emerald-50 border border-emerald-200 px-6 py-3 rounded-full">
          <CheckCircle2 size={16} />
          <span>Subscribed. Welcome to AuraFashion Inner Circle.</span>
        </div>
      ) : (
        <form className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto" onSubmit={handleSubscribe}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-800 text-xs focus:outline-none focus:border-[#16a34a] transition-all"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#16a34a] hover:bg-[#15803d] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            Subscribe <ArrowRight size={14} />
          </button>
        </form>
      )}
    </section>
  );
};
