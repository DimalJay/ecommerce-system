import React, { useState } from 'react';
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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-white border border-luxury-gold-light/40 rounded-full px-3 py-1.5 w-44 sm:w-60 transition-all duration-300 animate-fade-in shadow-2xs">
                  <Search size={14} className="text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Atelier..."
                    className="w-full bg-transparent text-xs text-luxury-charcoal placeholder-slate-400 focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-[9px] text-slate-400 hover:text-luxury-charcoal uppercase tracking-widest font-black cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 bg-white hover:bg-luxury-sand/60 border border-luxury-gold-light/40 rounded-full text-slate-700 hover:text-luxury-gold transition-all duration-200 cursor-pointer shadow-2xs active:scale-95"
                  title="Search Shop"
                  aria-label="Search Shop"
                >
                  <Search size={18} />
                </button>
              )}
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

            {/* Profile Account Button with Dropdown */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="p-2.5 bg-luxury-sand/50 hover:bg-luxury-sand border border-luxury-gold-light/40 rounded-full text-luxury-gold hover:text-luxury-gold-dark transition-all duration-200 cursor-pointer font-bold flex items-center justify-center"
                  title={`Signed in as ${user.name}`}
                >
                  <User size={16} />
                </button>

                {isProfileDropdownOpen && (
                  <>
                    {/* Invisible Backdrop to close dropdown on click outside */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2.5 w-48 bg-white border border-luxury-gold-light/30 rounded-2xl shadow-2xl p-4 z-20 space-y-3 text-left animate-fade-in">
                      <div className="border-b border-luxury-sand pb-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                        <p className="text-xs font-bold text-luxury-charcoal truncate">{user.name}</p>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/order-history"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block w-full text-left px-3 py-2 hover:bg-luxury-sand/40 rounded-xl text-xs font-bold text-slate-600 hover:text-luxury-gold transition-colors"
                        >
                          Order History
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            logout();
                          }}
                          className="block w-full text-left px-3 py-2 hover:bg-rose-50 rounded-xl text-xs font-bold text-rose-600 transition-colors cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
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
