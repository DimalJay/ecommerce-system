import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { useCart, getItemKey } from '../context/CartContext';
import { CartEmptyState } from '../components/cart/CartEmptyState';
import { CartToolbar } from '../components/cart/CartToolbar';
import { CartSummary } from '../components/cart/CartSummary';
import { CartItemCard } from '../components/cart/CartItemCard';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';
import { PROMO_CODE, PROMO_DISCOUNT_RATE, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../lib/constants';

export const CartPage: React.FC = () => {
  const {
    cartItems,
    updateCartQty,
    removeCartItem,
    removeCheckedOutItems,
    promoCode,
    setPromoCode,
    promoApplied,
    promoError,
    handleApplyPromo
  } = useCart();

  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toastMessage, triggerToast } = useToast();

  useEffect(() => {
    const currentKeys = new Set(cartItems.map(getItemKey));
    setSelectedKeys((prev) => {
      const next = new Set<string>();
      prev.forEach((key) => { if (currentKeys.has(key)) next.add(key); });
      currentKeys.forEach((key) => { if (!prev.has(key) && prev.size === 0) next.add(key); });
      return next;
    });
  }, [cartItems]);

  const allSelected = cartItems.length > 0 && cartItems.every((item) => selectedKeys.has(getItemKey(item)));
  const someSelected = cartItems.some((item) => selectedKeys.has(getItemKey(item)));

  const handleToggleSelectAll = () => {
    setSelectedKeys(allSelected ? new Set() : new Set(cartItems.map(getItemKey)));
  };

  const handleToggleItem = (key: string) => {
    setSelectedKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const selectedCartItems = cartItems.filter((item) => selectedKeys.has(getItemKey(item)));
  const selectedSubtotal = selectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? selectedSubtotal * PROMO_DISCOUNT_RATE : 0;
  const shipping = selectedSubtotal >= FREE_SHIPPING_THRESHOLD || selectedSubtotal === 0 ? 0 : SHIPPING_COST;
  const total = selectedSubtotal - discount + shipping;

  const handleRemoveSelected = () => {
    removeCheckedOutItems(Array.from(selectedKeys));
    setSelectedKeys(new Set());
    triggerToast('Selected items removed from your bag');
  };

  const handleFormSubmitPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    if (handleApplyPromo(promoCode)) triggerToast(`Promo code ${PROMO_CODE} applied (-${PROMO_DISCOUNT_RATE * 100}%)`);
  };

  const handleCheckout = () => {
    if (selectedCartItems.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => { setIsCheckingOut(false); navigate('/checkout'); }, 1000);
  };

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} icon="sparkles" />}

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-luxury-gold transition-colors uppercase tracking-wider mb-4">
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-luxury-gold-light/30 pb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-luxury-gold block mb-1">Shopping Bag</span>
              <h1 className="text-2xl sm:text-4xl font-black text-luxury-charcoal tracking-tight font-sans">Your Atelier Cart</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag</p>
          </div>
        </div>

        {cartItems.length === 0 ? <CartEmptyState /> : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-luxury-gold-light/30 rounded-2xl p-4 sm:p-5 flex items-center gap-3 shadow-xs">
                <Sparkles className="text-luxury-gold shrink-0 animate-pulse" size={20} />
                <div className="text-xs text-slate-600 flex-1">
                  {selectedSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="font-bold text-emerald-800">You qualify for Complimentary Worldwide Express Shipping on your selected items!</span>
                  ) : (
                    <span>Add <strong className="text-luxury-charcoal">Rs. {(FREE_SHIPPING_THRESHOLD - selectedSubtotal).toFixed(2)}</strong> more of selected items for <strong className="text-luxury-gold">Complimentary Express Shipping</strong>.</span>
                  )}
                </div>
              </div>

              <CartToolbar allSelected={allSelected} someSelected={someSelected} selectedCount={selectedCartItems.length} totalCount={cartItems.length} onToggleSelectAll={handleToggleSelectAll} onRemoveSelected={handleRemoveSelected} />

              <div className="space-y-4">
                {cartItems.map((item) => {
                  const key = getItemKey(item);
                  return (
                    <CartItemCard key={key} item={item} isSelected={selectedKeys.has(key)} onToggleSelect={() => handleToggleItem(key)}
                      onUpdateQuantity={(newQty) => updateCartQty(item.product.id, item.selectedSize, item.selectedColor, newQty)}
                      onRemove={() => removeCartItem(item.product.id, item.selectedSize, item.selectedColor)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <CartSummary promoCode={promoCode} setPromoCode={setPromoCode} promoApplied={promoApplied} promoError={promoError}
                onApplyPromo={handleFormSubmitPromo} selectedCount={selectedCartItems.length} selectedSubtotal={selectedSubtotal}
                discount={discount} shipping={shipping} total={total} onCheckout={handleCheckout} isCheckingOut={isCheckingOut}
              />
            </div>
          </div>
        )}
      </main>
    </AppLayout>
  );
};

export default CartPage;
