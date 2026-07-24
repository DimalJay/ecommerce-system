import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ItemManagement from './pages/ItemManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/items" element={<ItemManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
