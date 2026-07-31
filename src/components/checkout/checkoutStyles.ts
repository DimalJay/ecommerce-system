/**
 * Shared Tailwind class string for checkout & general form inputs.
 * Polished for high visual contrast, consistent touch target height (44px/h-11),
 * crisp focus ring, soft border transitions, and error states.
 */
export const inputClass =
  'w-full h-11 px-4 py-2.5 bg-white border border-luxury-gold-light/40 rounded-xl text-xs font-semibold text-luxury-charcoal placeholder-slate-400 focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/40 transition-all duration-200 shadow-xs';

export const getInputClass = (hasError?: boolean) =>
  hasError
    ? 'w-full h-11 px-4 py-2.5 bg-rose-50/30 border border-rose-400 rounded-xl text-xs font-semibold text-luxury-charcoal placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/30 transition-all duration-200 shadow-xs'
    : inputClass;
