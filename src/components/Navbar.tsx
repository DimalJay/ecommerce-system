import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  Sparkles,
  X
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
  { label: 'Home', path: '/' },
  { label: "Men's", path: '/category/men' },
  { label: "Women's", path: '/category/women' },
  { label: 'Contact', path: '#contact' },
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
  const location = useLocation();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, [location.pathname]);

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    if (path === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (path === '#contact') {
      e.preventDefault();
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => {
      if (prev) setSearchQuery('');
      return !prev;
    });
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* Top Announcement Ticker */}
      <div className="bg-text-primary text-bg-primary text-center py-2.5 sm:py-3 px-4 text-xs font-medium tracking-wider flex items-center justify-center gap-3 uppercase select-none overflow-hidden">
        <Sparkles size={12} className="text-accent shrink-0" />
        <span className="min-w-0 truncate">Complimentary Worldwide Express Shipping on orders over Rs. 300</span>
        <span className="hidden sm:inline-block text-text-muted/50 shrink-0">|</span>
        <span className="hidden sm:inline-flex bg-accent/15 text-accent-light border border-accent/25 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider shrink-0">
          Use AURA20
        </span>
      </div>

      {/* Main Header Navigation Bar */}
      <header className="sticky top-0 z-50">
        <div className="relative glass-nav px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Brand Logo & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-secondary rounded-xl text-text-secondary transition-colors cursor-pointer"
              title="Menu"
              aria-label="Toggle navigation menu"
            >
              <Menu size={18} className="sm:w-5 sm:h-5" />
            </button>

            <Link to="/" onClick={(e) => handleNavClick('/', e)} className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
              <img src={webLogo} alt="Aura Fashion Logo" className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0" />
              <span className="hidden sm:inline text-lg sm:text-xl font-bold tracking-tight text-text-primary">
                Aura<span className="text-accent">Fashion</span>
              </span>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {NAV_ITEMS.map((item, idx) => {
              let isActive = false;
              if (item.path === '#contact') {
                isActive = isFooterVisible;
              } else if (item.path === '/') {
                isActive = location.pathname === '/' && !isFooterVisible;
              } else {
                isActive = location.pathname === item.path && !isFooterVisible;
              }
              return (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className={`transition-colors py-2 ${
                    isActive
                      ? 'text-accent border-b-2 border-accent pb-1'
                      : 'hover:text-accent'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Search Bar & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Search: inline input on desktop, full-width bar below header on mobile */}
            <div className="flex items-center">
              {isSearchOpen && (
                <div className="hidden lg:flex items-center gap-2 bg-elevated border border-border rounded-full px-4 py-2 w-44 sm:w-56 transition-all duration-300 animate-fade-in shadow-sm">
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
                    onClick={closeSearch}
                    className="text-xs text-text-muted hover:text-text-primary font-semibold cursor-pointer"
                  >
                    &times;
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={toggleSearch}
                className={`p-2 sm:p-3 rounded-full border transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                  isSearchOpen
                    ? 'flex lg:hidden bg-accent text-elevated border-accent hover:bg-accent-hover'
                    : 'flex bg-elevated hover:bg-secondary border-border text-text-secondary hover:text-accent'
                }`}
                title={isSearchOpen ? 'Close search' : 'Search Shop'}
                aria-label={isSearchOpen ? 'Close search' : 'Search Shop'}
              >
                {isSearchOpen ? (
                  <X size={15} className="sm:w-4.5 sm:h-4.5" />
                ) : (
                  <Search size={15} className="sm:w-4.5 sm:h-4.5" />
                )}
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 sm:p-3 bg-elevated hover:bg-secondary border border-border rounded-full text-text-secondary hover:text-danger transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
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
              className="relative p-2 sm:p-3 bg-text-primary hover:bg-accent text-elevated hover:text-text-primary border border-text-primary hover:border-accent rounded-full transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center justify-center"
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
                className="p-2 sm:p-3 bg-elevated hover:bg-secondary border border-border rounded-full text-text-secondary hover:text-accent transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
                title="Sign In / Register"
                aria-label="Sign In"
              >
                <User size={15} className="sm:w-4.5 sm:h-4.5" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile: full-width search expands below the header row instead of crowding the icons */}
        {isSearchOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full z-30 border-b border-border bg-bg-primary/95 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center gap-2 shadow-lg animate-fade-in">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search the shop..."
                className="w-full pl-9 pr-4 py-2.5 bg-elevated border border-border rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <button
              type="button"
              onClick={closeSearch}
              className="shrink-0 px-4 py-2.5 bg-text-primary hover:bg-accent text-elevated text-xs font-semibold rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}
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
