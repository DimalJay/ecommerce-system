import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  CreditCard,
  CheckSquare,
  Square,
  Tag,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { Navbar, Footer, CartItemCard } from '../components';
import { useCart, getItemKey } from '../context/CartContext';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    setIsCartOpen,
    updateCartQty,
    removeCartItem,
    removeCheckedOutItems,
    promoCode,
    setPromoCode,
    promoApplied,
    promoError,
    handleApplyPromo
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize selection state when cart items change
  useEffect(() => {
    const currentKeys = new Set(cartItems.map(getItemKey));
    setSelectedKeys((prev) => {
      const next = new Set<string>();
      // Keep previous selections if still present in cart
      prev.forEach((key) => {
        if (currentKeys.has(key)) {
          next.add(key);
        }
      });
      // If a new item was added, select it by default
      currentKeys.forEach((key) => {
        if (!prev.has(key) && prev.size === 0) {
          next.add(key);
        }
      });
      return next;
    });
  }, [cartItems]);

  // Select All state calculations
  const allSelected = cartItems.length > 0 && cartItems.every((item) => selectedKeys.has(getItemKey(item)));
  const someSelected = cartItems.some((item) => selectedKeys.has(getItemKey(item)));

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedKeys(new Set());
    } else {
      setSelectedKeys(new Set(cartItems.map(getItemKey)));
    }
  };

  const handleToggleItem = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Selected items calculations
  const selectedCartItems = cartItems.filter((item) => selectedKeys.has(getItemKey(item)));
  const selectedSubtotal = selectedCartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discount = promoApplied ? selectedSubtotal * 0.2 : 0;
  const shipping = selectedSubtotal >= 300 || selectedSubtotal === 0 ? 0 : 25;
  const total = selectedSubtotal - discount + shipping;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRemoveSelected = () => {
    const keysToRemove = Array.from(selectedKeys);
    removeCheckedOutItems(keysToRemove);
    setSelectedKeys(new Set());
    triggerToast('Selected items removed from your bag');
  };

  const handleFormSubmitPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const success = handleApplyPromo(promoCode);
    if (success) {
      triggerToast('Promo code AURA20 applied (-20%)');
    }
  };

  // Original checkout logic: toast -> delay -> alert -> remove selected items
  const handleCheckout = () => {
    if (selectedCartItems.length === 0) return;
    setIsCheckingOut(true);
    triggerToast('Redirecting to checkout...');

    setTimeout(() => {
      alert('Secure Checkout Simulated!');
      setIsCheckingOut(false);
      const keysToRemove = selectedCartItems.map(getItemKey);
      removeCheckedOutItems(keysToRemove);
      setSelectedKeys(new Set());
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxury-cream text-luxury-charcoal font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-120 bg-luxury-charcoal text-white px-5 py-3 rounded-2xl shadow-2xl border border-luxury-gold/30 flex items-center gap-3 text-xs font-bold animate-slide-over">
          <Sparkles className="text-luxury-gold" size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={1}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-luxury-gold transition-colors uppercase tracking-wider mb-4"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-luxury-gold-light/30 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-luxury-gold block mb-1">
                Shopping Bag
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-luxury-charcoal tracking-tight font-sans">
                Your Atelier Cart
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="bg-white border border-luxury-gold-light/30 rounded-3xl p-8 sm:p-16 text-center shadow-xs my-8 max-w-2xl mx-auto space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-luxury-sand flex items-center justify-center text-luxury-gold shadow-inner">
              <ShoppingBag size={40} />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-luxury-charcoal">
                Your Atelier Bag is Empty
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Looks like you haven't added any luxury items to your cart yet. Explore our curated collections to find your signature pieces.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-luxury-gold hover:bg-luxury-gold-dark text-white font-bold rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-luxury-gold/20 hover:-translate-y-0.5 cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Content Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Banner */}
              <div className="bg-white border border-luxury-gold-light/30 rounded-2xl p-4 sm:p-5 flex items-center gap-3 shadow-xs">
                <Sparkles className="text-luxury-gold shrink-0 animate-pulse" size={20} />
                <div className="text-xs text-slate-600 flex-1">
                  {selectedSubtotal >= 300 ? (
                    <span className="font-bold text-emerald-800">
                      You qualify for Complimentary Worldwide Express Shipping on your selected items!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-luxury-charcoal">${(300 - selectedSubtotal).toFixed(2)}</strong> more of selected items for <strong className="text-luxury-gold">Complimentary Express Shipping</strong>.
                    </span>
                  )}
                </div>
              </div>

              {/* Toolbar: Select All & Bulk Actions */}
              <div className="flex items-center justify-between bg-white border border-luxury-gold-light/30 rounded-2xl px-5 py-3.5 shadow-xs">
                <button
                  type="button"
                  onClick={handleToggleSelectAll}
                  className="flex items-center gap-2.5 text-xs font-bold text-luxury-charcoal hover:text-luxury-gold transition-colors cursor-pointer select-none"
                >
                  {allSelected ? (
                    <CheckSquare size={18} className="text-luxury-gold" />
                  ) : (
                    <Square size={18} className="text-slate-400" />
                  )}
                  <span>
                    Select All ({selectedCartItems.length}/{cartItems.length})
                  </span>
                </button>

                {someSelected && (
                  <button
                    type="button"
                    onClick={handleRemoveSelected}
                    className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors cursor-pointer"
                  >
                    <Trash2 size={14} />
                    <span>Remove Selected</span>
                  </button>
                )}
              </div>

              {/* Cart Items Cards */}
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const key = getItemKey(item);
                  return (
                    <CartItemCard
                      key={key}
                      item={item}
                      isSelected={selectedKeys.has(key)}
                      onToggleSelect={() => handleToggleItem(key)}
                      onUpdateQuantity={(newQty) =>
                        updateCartQty(item.product.id, item.selectedSize, item.selectedColor, newQty)
                      }
                      onRemove={() =>
                        removeCartItem(item.product.id, item.selectedSize, item.selectedColor)
                      }
                    />
                  );
                })}
              </div>
            </div>

            {/* Right Summary Sidebar Column */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white border border-luxury-gold-light/40 rounded-3xl p-6 shadow-xl space-y-6">
                <h2 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider border-b border-luxury-gold-light/20 pb-4">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <form onSubmit={handleFormSubmitPromo} className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                    Promotional Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Try 'AURA20'"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={promoApplied}
                        className="w-full pl-9 pr-3 py-2.5 border border-luxury-gold-light/40 rounded-xl text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-luxury-gold disabled:bg-luxury-sand disabled:text-slate-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={promoApplied || !promoCode.trim()}
                      className="px-4 py-2.5 bg-luxury-charcoal hover:bg-luxury-gold text-white text-xs font-bold rounded-xl uppercase tracking-wider transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer shrink-0"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[10px] text-rose-500 font-bold">{promoError}</p>
                  )}
                  {promoApplied && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      20% Storewide Discount Active!
                    </p>
                  )}
                </form>

                {/* Billing Summary Breakdown */}
                <div className="space-y-3 text-xs text-slate-600 border-t border-b border-luxury-gold-light/20 py-4">
                  <div className="flex justify-between">
                    <span>Selected Items ({selectedCartItems.length})</span>
                    <span className="font-semibold text-luxury-charcoal">
                      ${selectedSubtotal.toFixed(2)}
                    </span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>AURA20 Promo Discount (-20%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-emerald-700 font-bold">Complimentary</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-black text-luxury-charcoal pt-2 border-t border-luxury-sand">
                    <span className="uppercase tracking-wider">Estimated Total</span>
                    <span className="text-lg text-luxury-gold">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={selectedCartItems.length === 0 || isCheckingOut}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                    selectedCartItems.length === 0 || isCheckingOut
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-300'
                      : 'bg-luxury-gold hover:bg-luxury-gold-dark text-white shadow-luxury-gold/20 hover:-translate-y-0.5'
                  }`}
                >
                  <CreditCard size={16} />
                  {isCheckingOut ? 'Redirecting to checkout...' : `Proceed to Secure Checkout (${selectedCartItems.length})`}
                </button>

                {/* Security Guarantees */}
                <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                  <ShieldCheck size={14} className="text-luxury-gold" />
                  <span>256-Bit Encrypted Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage;
