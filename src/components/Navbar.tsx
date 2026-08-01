import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Sparkles
} from 'lucide-react';
import webLogo from '../assets/Web Logo.png';
import { useCart } from '../context/CartContext';
import { MobileMenuDrawer } from './navbar/MobileMenuDrawer';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
}

const NAV_ITEMS = [
  { label: 'Shop All', path: '/' },
  { label: 'Women', path: '/category/women' },
  { label: 'Men', path: '/category/men' },
  { label: 'New Arrivals', path: '/category/new-arrivals' },
];

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth
}) => {
  const { user, logout } = useCart();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Ticker */}
      <div className="bg-text-primary text-bg-primary text-center py-3 px-4 text-xs font-medium tracking-wider flex items-center justify-center gap-3 uppercase select-none">
        <Sparkles size={12} className="text-accent shrink-0" />
        <span>Complimentary Worldwide Express Shipping on orders over Rs. 300</span>
        <span className="hidden sm:inline-block text-text-muted/50">|</span>
        <span className="hidden sm:inline-flex bg-accent/15 text-accent-light border border-accent/25 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider">
          Use AURA20
        </span>
      </div>

      {/* Main Header Navigation Bar */}
      <header className="sticky top-0 z-50 glass-nav px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Brand Logo & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-secondary rounded-xl text-text-secondary transition-colors cursor-pointer"
              title="Menu"
              aria-label="Toggle navigation menu"
            >
              <Menu size={16} className="sm:w-5 sm:h-5" />
            </button>

            <Link to="/" className="flex items-center gap-3 cursor-pointer group">
              <img src={webLogo} alt="Aura Fashion Logo" className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <span className="text-lg sm:text-xl font-bold tracking-tight text-text-primary">
                Aura<span className="text-accent">Fashion</span>
              </span>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            <Link to="/" className="text-accent border-b-2 border-accent pb-1 py-2">
              New Arrivals
            </Link>
            <Link to="/" className="hover:text-accent transition-colors py-2">
              Collections
            </Link>
            <Link to="/" className="hover:text-accent transition-colors py-2">
              Shop
            </Link>
            <Link to="/" className="hover:text-accent transition-colors py-2">
              Deals
            </Link>
          </nav>

          {/* Right Search Bar & Actions */}
          <div className="flex items-center gap-2">
            {/* Search Input Bar */}
            <div className="relative flex items-center">
              {isSearchOpen ? (
                <div className="flex items-center gap-2 bg-elevated border border-border rounded-full px-4 py-2 w-44 sm:w-56 transition-all duration-300 animate-fade-in shadow-sm">
                  <Search size={18} className="text-text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none"
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
                    className="text-xs text-text-muted hover:text-text-primary font-semibold cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-3 bg-elevated hover:bg-secondary border border-border rounded-full text-text-secondary hover:text-accent transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                  title="Search Shop"
                  aria-label="Search Shop"
                >
                  <Search size={15} className="sm:w-4.5 sm:h-4.5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-3 bg-elevated hover:bg-secondary border border-border rounded-full text-text-secondary hover:text-danger transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart size={15} className="sm:w-4.5 sm:h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-elevated">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="relative p-3 bg-text-primary hover:bg-accent text-elevated hover:text-text-primary border border-text-primary hover:border-accent rounded-full transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center justify-center"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={15} className="sm:w-4.5 sm:h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-text-primary text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-text-primary">
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
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-luxury-gold text-luxury-charcoal hover:bg-luxury-gold-light font-black text-xs sm:text-sm rounded-full border border-luxury-gold-light/40 shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-center uppercase shrink-0"
                  title={`Signed in as ${user.name}`}
                  aria-label={`User menu for ${user.name}`}
                >
                  {(user.first_name || user.name || 'U').charAt(0).toUpperCase()}
                </button>

                {isProfileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />

                    <div className="absolute right-0 mt-3 w-52 bg-elevated border border-border rounded-2xl shadow-lg p-4 z-20 space-y-3 text-left animate-fade-in">
                      <div className="border-b border-border pb-3">
                        <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Signed in as</p>
                        <p className="text-sm font-semibold text-text-primary truncate mt-1">{user.name}</p>
                      </div>

                      <div className="space-y-1">
                        <Link
                          to="/order-history"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="block w-full text-left px-3 py-2 hover:bg-accent-ghost rounded-xl text-sm font-medium text-text-secondary hover:text-accent transition-colors"
                        >
                          Order History
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setIsProfileDropdownOpen(false);
                            logout();
                          }}
                          className="block w-full text-left px-3 py-2 hover:bg-danger-bg rounded-xl text-sm font-medium text-danger transition-colors cursor-pointer"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="p-3 bg-elevated hover:bg-secondary border border-border rounded-full text-text-secondary hover:text-accent transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                title="Sign In / Register"
                aria-label="Sign In"
              >
                <User size={15} className="sm:w-4.5 sm:h-4.5" />
              </button>
            )}
          </div>
        </div>
      </header>

      <MobileMenuDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenAuth={onOpenAuth}
        user={user}
        logout={logout}
        navItems={NAV_ITEMS}
      />
    </>
  );
};
