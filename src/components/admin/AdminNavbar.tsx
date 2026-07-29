import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Boxes, ShoppingBag, Store } from 'lucide-react';
import webLogo from '../../assets/Web Logo.png';

export const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 bg-luxury-charcoal border-b border-luxury-gold/30 px-4 sm:px-10 py-4 shadow-md">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        {/* Left Side: Logo */}
        <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
          <img src={webLogo} alt="Aura Fashion Logo" className="h-7 sm:h-9 w-auto object-contain" />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-sans">
            Aura<span className="text-luxury-gold">Admin</span>
          </span>
        </Link>

        {/* Center: Admin Links */}
        <nav className="flex items-center gap-6 md:gap-10 text-[11px] font-black uppercase tracking-widest">
          <Link
            to="/admin/items"
            className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
              isActive('/admin/items')
                ? 'text-luxury-gold border-luxury-gold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <Boxes size={14} />
            <span>Inventory</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center gap-1.5 transition-colors pb-1 border-b-2 ${
              isActive('/admin/orders')
                ? 'text-luxury-gold border-luxury-gold'
                : 'text-slate-400 hover:text-white border-transparent'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Orders</span>
          </Link>
        </nav>

        {/* Right Side: Back to Store Link */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-[10px] font-bold text-luxury-gold hover:text-white border border-luxury-gold/50 hover:border-white px-3 py-1.5 rounded-xl transition-all uppercase tracking-widest"
          >
            <Store size={12} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
