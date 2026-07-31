import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Boxes, ShoppingBag, Store } from 'lucide-react';
import webLogo from '../../assets/Web Logo.png';

export const AdminNavbar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 bg-text-primary border-b border-accent/30 px-4 sm:px-6 lg:px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 cursor-pointer group">
          <img src={webLogo} alt="Aura Fashion Logo" className="h-7 sm:h-8 w-auto object-contain" />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-elevated">
            AuraFashion<span className="text-accent">Admin</span>
          </span>
        </Link>

        <nav className="flex items-center gap-6 md:gap-8 text-xs font-semibold uppercase tracking-wider">
          <Link
            to="/admin/items"
            className={`flex items-center gap-2 transition-colors pb-1 border-b-2 ${
              isActive('/admin') || isActive('/admin/items') || currentPath.startsWith('/admin') && !isActive('/admin/orders')
                ? 'text-accent border-accent'
                : 'text-footer-text hover:text-elevated border-transparent'
            }`}
          >
            <Boxes size={14} />
            <span>Inventory</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center gap-2 transition-colors pb-1 border-b-2 ${
              isActive('/admin/orders')
                ? 'text-accent border-accent'
                : 'text-footer-text hover:text-elevated border-transparent'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Orders</span>
          </Link>
        </nav>

        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-accent hover:text-elevated border border-accent/50 hover:border-elevated px-3 py-2 rounded-lg transition-all"
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
