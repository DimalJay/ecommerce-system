import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface MobileMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAuth: () => void;
  user: { name: string; email: string } | null;
  logout: () => void;
  navItems: Array<{ label: string; path: string }>;
}

export const MobileMenuDrawer: React.FC<MobileMenuDrawerProps> = ({
  isOpen,
  onClose,
  onOpenAuth,
  user,
  logout,
  navItems
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-110 bg-slate-950/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 z-120 w-60 max-w-[70vw] bg-white shadow-2xl p-4 flex flex-col justify-between transition-all duration-300 transform translate-x-0 animate-slide-in text-left overflow-hidden h-full">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-luxury-sand pb-3">
            <span className="text-base font-extrabold tracking-tight text-luxury-charcoal font-sans">
              Aura<span className="text-luxury-gold">Fashion</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-luxury-charcoal p-1 cursor-pointer text-sm font-bold"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600">
            {navItems.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={onClose}
                className="hover:text-luxury-gold transition-colors py-1.5 border-b border-slate-100/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* User Account Controls Section */}
        <div className="border-t border-luxury-sand pt-3 space-y-2 mt-auto">
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User size={14} className="text-luxury-gold" />
                <span className="text-[11px] font-bold text-luxury-charcoal truncate">{user.name}</span>
              </div>
              <Link
                to="/order-history"
                onClick={onClose}
                className="block w-full text-center py-2.5 bg-luxury-sand/40 hover:bg-luxury-sand text-slate-700 rounded-lg text-[9px] font-bold uppercase tracking-wider"
              >
                Order History
              </Link>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="block w-full text-center py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-bold uppercase tracking-wider cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="block w-full text-center py-2.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer"
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
};
