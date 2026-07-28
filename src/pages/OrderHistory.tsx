import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp, Package, ShieldCheck } from 'lucide-react';
import { Navbar, Footer, CartDrawer, WishlistDrawer } from '../components';
import { useCart } from '../context/CartContext';
import type { Product } from '../components/ProductCard';

interface OrderItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  shippingInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    city: string;
    state: string;
    postalCode: string;
  };
  paymentMethod: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export const OrderHistory: React.FC = () => {
  const { addToCart, cartItems, isCartOpen, setIsCartOpen, updateCartQty, removeCartItem } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Wishlist state for Navbar
  const [wishlist, setWishlist] = useState<number[]>([2]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (err) {
      console.error('Failed to load orders from localStorage:', err);
    }
  }, []);

  const toggleExpandOrder = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleRemoveFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const handleMoveToCart = (product: Product, size: string, color: string) => {
    addToCart(product, size, color);
    setIsCartOpen(true);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Processing':
        return 'bg-amber-50 text-amber-800 border-amber-200/50';
      case 'Shipped':
        return 'bg-blue-50 text-blue-800 border-blue-200/50';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200/50';
    }
  };

  return (
    <div className="min-h-screen bg-luxury-cream text-luxury-charcoal font-sans selection:bg-luxury-gold selection:text-white flex flex-col justify-between">
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 w-full flex-1 space-y-10">
        {/* Header Breadcrumbs & Title */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-luxury-charcoal">
            Order History
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Manage, review, and track all your previous purchases.
          </p>
        </div>

        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-luxury-gold-light/25 rounded-3xl p-12 text-center space-y-6 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 mx-auto rounded-full bg-luxury-sand flex items-center justify-center text-luxury-gold">
              <Package size={28} />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-black text-luxury-charcoal uppercase tracking-wider">
                No orders placed yet
              </h2>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                You haven't placed any purchases through Aura Fashion. Start exploring our premium collections to place your first order.
              </p>
            </div>
            <Link
              to="/"
              className="inline-block px-8 py-3.5 bg-luxury-gold hover:bg-luxury-gold-dark text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Orders list */
          <div className="space-y-4">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <div
                  key={order.id}
                  className="bg-white border border-luxury-gold-light/20 rounded-3xl overflow-hidden shadow-xs hover:border-luxury-gold-light/50 transition-all"
                >
                  {/* Order Card Header Summary row */}
                  <div
                    onClick={() => toggleExpandOrder(order.id)}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-luxury-sand/20 transition-colors"
                  >
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-y-2 sm:gap-8 text-left">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Order Number
                        </span>
                        <span className="text-xs font-black text-luxury-charcoal uppercase">
                          {order.id}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Date Placed
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {order.date}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Total Paid
                        </span>
                        <span className="text-xs font-black text-luxury-gold">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Items Count
                        </span>
                        <span className="text-xs font-bold text-slate-600">
                          {itemsCount} {itemsCount === 1 ? 'item' : 'items'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-luxury-sand">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      {isExpanded ? (
                        <ChevronUp size={16} className="text-slate-400" />
                      ) : (
                        <ChevronDown size={16} className="text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Expandable Order Detail Accordion panel */}
                  {isExpanded && (
                    <div className="p-6 border-t border-luxury-sand bg-luxury-sand/10 space-y-8 animate-fade-in">
                      {/* Products Summary list */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-black text-luxury-charcoal uppercase tracking-widest border-b border-luxury-gold-light/10 pb-2">
                          Ordered Items
                        </h3>
                        <div className="divide-y divide-luxury-sand">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="py-4 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.product.image}
                                  alt={item.product.title}
                                  className="w-12 h-16 object-cover bg-luxury-sand rounded-lg border border-luxury-gold-light/10"
                                />
                                <div className="text-left space-y-1">
                                  <h4 className="text-xs font-bold text-luxury-charcoal line-clamp-1">
                                    {item.product.title}
                                  </h4>
                                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                    <span>Size: {item.selectedSize}</span>
                                    <span>&bull;</span>
                                    <span>Color: {item.selectedColor}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right space-y-0.5">
                                <span className="text-xs font-bold text-luxury-gold block">
                                  ${item.product.price.toFixed(2)}
                                </span>
                                <span className="text-[10px] text-slate-400 block font-medium">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Details Split column grid (Shipping Address vs Summary details) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-luxury-gold-light/10">
                        {/* Shipping Destination */}
                        <div className="space-y-3 text-left">
                          <h4 className="text-xs font-black text-luxury-charcoal uppercase tracking-widest">
                            Shipping Details
                          </h4>
                          <div className="text-xs text-slate-500 space-y-1 bg-white p-4 border border-luxury-gold-light/15 rounded-2xl">
                            <p className="font-bold text-luxury-charcoal">
                              {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                            </p>
                            <p>{order.shippingInfo.address}</p>
                            {order.shippingInfo.apartment && <p>{order.shippingInfo.apartment}</p>}
                            <p>
                              {order.shippingInfo.city}, {order.shippingInfo.state}{' '}
                              {order.shippingInfo.postalCode}
                            </p>
                            <p className="pt-2">Phone: {order.shippingInfo.phone}</p>
                            <p>Email: {order.shippingInfo.email}</p>
                          </div>
                        </div>

                        {/* Order billing summary receipt */}
                        <div className="space-y-3 text-left">
                          <h4 className="text-xs font-black text-luxury-charcoal uppercase tracking-widest">
                            Billing Receipt
                          </h4>
                          <div className="bg-white p-4 border border-luxury-gold-light/15 rounded-2xl text-xs space-y-2">
                            <div className="flex justify-between text-slate-400">
                              <span>Payment Method</span>
                              <span className="font-bold text-luxury-charcoal uppercase">
                                {order.paymentMethod === 'card'
                                  ? 'Credit / Debit Card'
                                  : order.paymentMethod}
                              </span>
                            </div>
                            <div className="flex justify-between text-slate-400 pt-2 border-t border-luxury-sand">
                              <span>Estimated Total</span>
                              <span className="font-black text-luxury-gold">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md font-bold w-fit mt-3">
                              <ShieldCheck size={12} />
                              <span>Paid &amp; Secured Transaction</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      {/* Slide drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQty}
        onRemoveItem={removeCartItem}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onMoveToCart={handleMoveToCart}
      />
    </div>
  );
};

export default OrderHistory;
