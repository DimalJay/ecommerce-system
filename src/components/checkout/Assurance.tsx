import React from 'react';

interface AssuranceProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const Assurance: React.FC<AssuranceProps> = ({ icon, title, desc }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5">{icon}</div>
    <div>
      <p className="text-sm font-bold text-luxury-charcoal">{title}</p>
      <p className="text-xs text-slate-500">{desc}</p>
    </div>
  </div>
);
