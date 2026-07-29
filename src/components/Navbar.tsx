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
import { useCart } from '../context/CartContext';

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
  const { user, logout } = useCart();
  return (
    <>
      {/* Top Announcement Ticker */}
      <div className="bg-luxury-charcoal text-luxury-cream text-center py-2 px-4 text-[10px] font-extrabold tracking-[0.15em] flex items-center justify-center gap-2 uppercase border-b border-luxury-gold/20 select-none">
        <Sparkles size={13} className="text-luxury-gold animate-pulse shrink-0" />
        <span>COMPLIMENTARY WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER Rs. 300</span>
        <span className="hidden sm:inline-block text-luxury-gold-light/40">|</span>
        <span className="hidden sm:inline-block bg-luxury-gold/25 text-luxury-gold-light border border-luxury-gold/30 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest">
          AURA20
        </span>
      </div>

      {/* Main Header Navigation Bar */}
      <header className="sticky top-0 z-50 glass-nav px-4 sm:px-8 lg:px-10 py-3.5 shadow-xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4 sm:gap-6">
          {/* Left Brand Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button 
              type="button"
              className="lg:hidden p-2 hover:bg-luxury-sand/60 rounded-xl text-slate-700 transition-colors cursor-pointer" 
              title="Menu"
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>

            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
              <img src={webLogo} alt="Aura Fashion Logo" className="h-7 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-luxury-charcoal font-sans">
                Aura<span className="text-luxury-gold">Fashion</span>
              </span>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-600">
            <Link to="/" className="text-luxury-gold border-b-2 border-luxury-gold pb-0.5 font-extrabold">
              New Arrivals
            </Link>
            <Link to="/" className="hover:text-luxury-gold transition-colors duration-200">
              Collections
            </Link>
            <Link to="/" className="hover:text-luxury-gold transition-colors duration-200">
              Shop
            </Link>
            <Link to="/" className="hover:text-luxury-gold transition-colors duration-200">
              Deals
            </Link>
          </nav>

          {/* Right Search Bar & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input Bar */}
            <div className="relative hidden sm:flex items-center max-w-xs">
              <input
                type="text"
                placeholder="Search Atelier..."
                className="w-full pl-9 pr-4 py-2 bg-white/90 border border-luxury-gold-light/40 rounded-full text-xs text-luxury-charcoal placeholder-slate-400 focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/30 transition-all duration-200 shadow-2xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 text-slate-400 pointer-events-none" size={14} />
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2.5 bg-white hover:bg-luxury-sand/60 border border-luxury-gold-light/40 rounded-full text-slate-700 hover:text-rose-500 hover:border-rose-300 transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 bg-luxury-charcoal hover:bg-luxury-gold text-white hover:text-luxury-charcoal border border-luxury-charcoal hover:border-luxury-gold rounded-full transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center justify-center"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-luxury-gold text-luxury-charcoal text-[9px] font-black rounded-full flex items-center justify-center shadow-xs border-2 border-luxury-charcoal">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Account Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/order-history"
                  className="p-2.5 bg-luxury-sand/50 hover:bg-luxury-sand border border-luxury-gold-light/40 rounded-full text-luxury-gold hover:text-luxury-gold-dark transition-all duration-200 cursor-pointer font-bold flex items-center gap-1.5 text-xs"
                  title={`Signed in as ${user.name}`}
                >
                  <User size={16} />
                  <span className="hidden md:inline font-extrabold uppercase text-[9px] tracking-widest">{user.name}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 bg-white hover:bg-luxury-gold text-slate-700 hover:text-white border border-luxury-gold-light/40 rounded-xl transition-all duration-200 cursor-pointer text-[9px] font-extrabold uppercase tracking-widest shadow-2xs"
                  title="Sign Out"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="p-2.5 bg-white hover:bg-luxury-sand/60 border border-luxury-gold-light/40 rounded-full text-slate-700 hover:text-luxury-gold transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
                title="Sign In / Register"
                aria-label="Sign In"
              >
                <User size={18} />
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
