import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Added Link to imports
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

// Import Toast components for global notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          {/* Global Navigation Header */}
          <Navbar />
          
          <main style={{ minHeight: '80vh' }}>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<Home />} /> 
              
              {/* Shop Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </main>
          
          {/* Professional Footer with Navigation */}
          <footer style={{ 
            textAlign: 'center', 
            padding: '40px', 
            background: '#1a1a1a', 
            color: '#888', 
            marginTop: '50px' 
          }}>
        
            
            <div style={{ 
              marginTop: '15px', 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px',
              fontSize: '14px'
            }}>
              <Link to="/products" style={{ color: '#888', textDecoration: 'none' }}>Shop</Link>
              <Link to="/wishlist" style={{ color: '#888', textDecoration: 'none' }}>Wishlist</Link>
              <Link to="/cart" style={{ color: '#888', textDecoration: 'none' }}>Cart</Link>
            </div>
          </footer>

          {/* Toast Notification Container */}
          <ToastContainer 
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;