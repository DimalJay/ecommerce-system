import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Store, LogOut } from 'lucide-react';
import webLogo from '../../assets/Web Logo.png';
import { ADMIN_NAV_ITEMS } from './adminNavItems';
import type { AdminTab } from './adminNavItems';
import { useAdminLogoutMutation } from '../../hooks/useAdminAuth';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const logoutMutation = useAdminLogoutMutation();

  const handleAdminLogout = () => {
    logoutMutation.mutate(undefined, {
      onSettled: () => {
        navigate('/admin/login');
      },
    });
  };

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-text-primary border-r border-accent/20 sticky top-0 h-screen p-5">
      <Link to="/" className="flex items-center gap-3 mb-8 cursor-pointer group">
        <img src={webLogo} alt="Aura Fashion Logo" className="h-8 w-auto object-contain" />
        <span className="text-lg font-bold tracking-tight text-elevated">
          AuraFashion<span className="text-accent">Admin</span>
        </span>
      </Link>

      <nav className="flex flex-col gap-1.5">
        {ADMIN_NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => onTabChange(key)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === key
                ? 'bg-accent/15 text-accent border border-accent/30'
                : 'text-footer-text hover:text-elevated hover:bg-secondary/40 border border-transparent'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2">
        <button
          type="button"
          onClick={handleAdminLogout}
          className="flex items-center gap-2 text-xs font-medium text-rose-400 hover:text-rose-300 border border-rose-500/30 hover:border-rose-400 px-4 py-2.5 rounded-lg transition-all w-full cursor-pointer"
        >
          <LogOut size={14} />
          <span>Sign Out Admin</span>
        </button>

        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-medium text-accent hover:text-elevated border border-accent/50 hover:border-elevated px-4 py-2.5 rounded-lg transition-all"
        >
          <Store size={12} />
          <span>Storefront</span>
        </Link>
      </div>
    </aside>
  );
};
