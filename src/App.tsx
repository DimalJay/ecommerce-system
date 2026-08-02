import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  AdminDashboard,
  CheckoutPage,
  ProductDetails,
  OrderHistoryPage,
  CategoryPage,
  AdminAuthPage,
  CartPage,
} from './pages';
import { CartProvider } from './context/CartContext';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { GlobalToast } from './components/ui/GlobalToast';
import { ProtectedRoute, ProtectedAdminRoute } from './components/auth';

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/items"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/admin/login" element={<AdminAuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </Router>
      <GlobalToast />
    </CartProvider>
  );
}

export default App;
