import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Checkout } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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