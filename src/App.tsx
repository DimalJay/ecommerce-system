import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemManagement from './pages/ItemManagement';
import { Checkout, ProductDetails, OrderHistory, CategoryPage, AuthPage, OrderManagement, AdminAuthPage } from './pages';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/items" element={<ItemManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/login" element={<AdminAuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
