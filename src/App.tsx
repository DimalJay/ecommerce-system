import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemManagement from './pages/ItemManagement';
import { Checkout } from './pages';
import { CartPage } from './pages/CartPage';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/items" element={<ItemManagement />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItems={[]}
                onPlaceOrder={(order) => console.log('Order placed:', order)}
              />
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;