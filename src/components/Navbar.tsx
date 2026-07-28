import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Sparkles,
  Menu
} from 'lucide-react';
import webLogo from '../assets/Web Logo.png';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlist
}) => {
  return (
    <>
      {/* Top Announcement Ticker */}
      <div className="bg-luxury-charcoal text-luxury-cream text-center py-2.5 px-4 text-[10px] font-black tracking-widest flex items-center justify-center gap-2 uppercase border-b border-luxury-gold/20">
        <Sparkles size={12} className="text-luxury-gold animate-pulse" />
        <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $300</span>
        <span className="hidden sm:inline-block text-luxury-gold-light/40">|</span>
        <span className="hidden sm:inline-block bg-luxury-gold/25 text-luxury-gold-light border border-luxury-gold/30 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest">
          AURA20
        </span>
      </div>

      {/* Main Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-luxury-cream/90 backdrop-blur-md border-b border-luxury-gold-light/20 px-4 sm:px-10 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Left Brand Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-luxury-sand rounded-xl text-slate-700 transition-colors cursor-pointer" title="Menu">
              <Menu size={20} />
            </button>

            <a href="/" className="flex items-center gap-2.5 cursor-pointer group">
              {/* OLD LOGO PRESERVED BELOW
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-luxury-charcoal text-luxury-gold rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <ShoppingBag size={18} />
                </div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-luxury-charcoal font-sans">
                  Aura<span className="text-luxury-gold">Atelier</span>
                </span>
              </div>
              */}
              <img src={webLogo} alt="Aura Fashion Logo" className="h-7 sm:h-9 w-auto object-contain" />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-luxury-charcoal font-sans">
                Aura<span className="text-luxury-gold">Fashion</span>
              </span>
            </a>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-600">
            <a href="/" className="text-luxury-gold border-b-2 border-luxury-gold pb-1 font-black">
              New Arrivals
            </a>
            <a href="#collections" className="hover:text-luxury-gold transition-colors">
              Collections
            </a>
            <a href="#products" className="hover:text-luxury-gold transition-colors">
              Shop
            </a>
            <a href="#deals" className="hover:text-luxury-gold transition-colors">
              Deals
            </a>
          </nav>

          {/* Right Search Bar & Actions */}
          <div className="flex items-center gap-3">
            {/* Search Input Bar */}
            <div className="relative hidden sm:flex items-center max-w-xs">
              <input
                type="text"
                placeholder="Search Atelier..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-luxury-gold-light/30 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold/25 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 text-slate-400 pointer-events-none" size={14} />
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 bg-white hover:bg-luxury-sand border border-luxury-gold-light/30 rounded-full text-slate-700 hover:text-rose-500 hover:border-rose-300 transition-all cursor-pointer"
              title="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs border border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal border border-luxury-charcoal hover:border-luxury-gold rounded-full transition-all cursor-pointer shadow-md transform hover:-translate-y-0.5 flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-luxury-gold text-luxury-charcoal text-[9px] font-black rounded-full flex items-center justify-center shadow-xs border border-luxury-charcoal">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Account Button */}
            <Link
              to="/order-history"
              className="hidden sm:flex p-2.5 bg-white hover:bg-luxury-sand border border-luxury-gold-light/30 rounded-full text-slate-700 hover:text-luxury-gold transition-all cursor-pointer"
              title="Order History"
            >
              <User size={18} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
