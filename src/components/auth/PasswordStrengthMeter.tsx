import React from 'react';
import { PASSWORD_RULES, getPasswordStrength } from '../../lib/validations/auth';

interface PasswordStrengthMeterProps {
  password: string;
  active?: boolean;
}

const labelColor = (score: number): string => {
  if (score <= 1) return 'text-rose-500';
  if (score <= 3) return 'text-amber-500';
  return 'text-emerald-600';
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password, active = false }) => {
  const { score, label } = getPasswordStrength(password);
  const remainingRules = PASSWORD_RULES.filter((rule) => !rule.test(password));

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex gap-1 flex-1">
          {PASSWORD_RULES.map((rule, i) => (
            <span
              key={rule.label}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < score ? 'bg-emerald-500' : 'bg-luxury-gold-light/30'
              }`}
            />
          ))}
        </div>
        {password && (
          <span className={`text-[10px] font-bold uppercase tracking-wider ${labelColor(score)}`}>
            {label}
          </span>
        )}
      </div>

      {active && remainingRules.length > 0 && (
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
          {remainingRules.map((rule) => (
            <li
              key={rule.label}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-text-muted"
            >
              <span className="w-2.5 h-2.5 rounded-full border border-luxury-gold-light/50 shrink-0" />
              {rule.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
