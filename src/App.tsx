import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemManagement from './pages/ItemManagement';
import { Checkout } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/items" element={<ItemManagement />} />
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
  );
}

export default App;