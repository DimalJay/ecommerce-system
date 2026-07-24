import React from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Sparkles,
  ShoppingBag,
  Menu
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartCount
}) => {
  return (
    <>
      {/* Top Announcement Ticker */}
      <div className="bg-gradient-to-r from-[#0c4a6e] via-[#0284c7] to-[#0369a1] text-white text-center py-2 px-4 text-xs font-semibold tracking-wider flex items-center justify-center gap-2 uppercase">
        <Sparkles size={14} className="text-sky-300 animate-pulse" />
        <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $300</span>
        <span className="hidden sm:inline-block text-sky-200/50">|</span>
        <span className="hidden sm:inline-block bg-white/20 px-2 py-0.5 rounded text-[11px] font-mono tracking-widest text-white">
          AURA2026
        </span>
      </div>

      {/* Main Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100/80 px-4 sm:px-10 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Left Brand Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-sky-50 rounded-xl text-slate-700 transition-colors cursor-pointer" title="Menu">
              <Menu size={20} />
            </button>

            <a href="/" className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-9 h-9 bg-gradient-to-tr from-[#0284c7] to-sky-400 rounded-xl flex items-center justify-center text-white shadow-sm shadow-sky-500/30 group-hover:scale-105 transition-transform">
                <ShoppingBag size={18} />
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-mono">
                Aura<span className="text-[#0284c7]">Fashion</span>
              </span>
            </a>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="/" className="text-[#0284c7] font-extrabold border-b-2 border-[#0284c7] pb-1">
              New Arrivals
            </a>
            <a href="#collections" className="hover:text-[#0284c7] transition-colors">
              Collections
            </a>
            <a href="#products" className="hover:text-[#0284c7] transition-colors">
              Shop
            </a>
            <a href="#deals" className="hover:text-[#0284c7] transition-colors">
              Deals
            </a>
          </nav>

          {/* Right Search Bar & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative hidden sm:flex items-center max-w-xs">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-4 py-2 bg-sky-50/70 border border-sky-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0284c7] focus:bg-white transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 text-slate-400 pointer-events-none" size={14} />
            </div>

            {/* Wishlist Button */}
            <button
              className="relative p-2.5 bg-sky-50/60 hover:bg-sky-100/70 border border-sky-200/80 rounded-full text-slate-700 hover:text-[#0284c7] transition-all cursor-pointer"
              title="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              className="relative p-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-full transition-all cursor-pointer shadow-md shadow-sky-600/20 transform hover:-translate-y-0.5 flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Account Button */}
            <button
              className="hidden sm:flex p-2.5 bg-sky-50/60 hover:bg-sky-100/70 border border-sky-200/80 rounded-full text-slate-700 hover:text-[#0284c7] transition-all cursor-pointer"
              title="Account"
            >
              <User size={18} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
