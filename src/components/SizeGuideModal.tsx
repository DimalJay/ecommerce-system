import React from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-luxury-cream border border-luxury-gold-light/40 w-full max-w-xl rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl z-10 animate-scale-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white hover:bg-luxury-sand text-slate-500 hover:text-luxury-charcoal rounded-full transition-all border border-luxury-gold-light/20 cursor-pointer"
          title="Close size guide"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-6">
          <Ruler className="text-luxury-gold" size={20} />
          <h3 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider">
            Atelier Size Guide
          </h3>
        </div>

        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          Measurements are shown in inches. For the best fit, we recommend measuring a similar style garment laid flat and comparing it to our sizing chart below.
        </p>

        {/* Size Table */}
        <div className="overflow-x-auto border border-luxury-gold-light/30 rounded-2xl bg-white mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-luxury-sand/50 text-luxury-charcoal border-b border-luxury-gold-light/30">
                <th className="p-3 font-bold uppercase tracking-wider">Size</th>
                <th className="p-3 font-bold uppercase tracking-wider">Chest (in)</th>
                <th className="p-3 font-bold uppercase tracking-wider">Waist (in)</th>
                <th className="p-3 font-bold uppercase tracking-wider">Sleeve (in)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-sand">
              {[
                { size: 'XS', chest: '32 - 34', waist: '26 - 28', sleeve: '31.5' },
                { size: 'S', chest: '35 - 37', waist: '29 - 31', sleeve: '32.5' },
                { size: 'M', chest: '38 - 40', waist: '32 - 34', sleeve: '33.5' },
                { size: 'L', chest: '41 - 43', waist: '35 - 37', sleeve: '34.5' },
                { size: 'XL', chest: '44 - 46', waist: '38 - 40', sleeve: '35.5' },
              ].map((row) => (
                <tr key={row.size} className="hover:bg-luxury-sand/20 transition-colors text-slate-600">
                  <td className="p-3 font-bold text-luxury-charcoal">{row.size}</td>
                  <td className="p-3">{row.chest}</td>
                  <td className="p-3">{row.waist}</td>
                  <td className="p-3">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Info */}
        <div className="bg-white border border-luxury-gold-light/20 p-4 rounded-2xl space-y-3">
          <h4 className="text-[11px] font-bold text-luxury-charcoal uppercase tracking-wider">
            How to measure:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] text-slate-500 leading-relaxed">
            <div>
              <strong className="text-luxury-charcoal block mb-0.5">1. Chest:</strong>
              Measure around the fullest part of your chest, keeping the tape horizontal.
            </div>
            <div>
              <strong className="text-luxury-charcoal block mb-0.5">2. Waist:</strong>
              Measure around the narrowest part of your waistline, typically where your body bends.
            </div>
            <div>
              <strong className="text-luxury-charcoal block mb-0.5">3. Sleeve:</strong>
              Measure from the center back of your neck, across the shoulder, and down to the wrist.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
