import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; 
import { AiOutlineShoppingCart, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Navbar = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem', 
     
      background: 'linear-gradient(90deg, #0f172a 0%, #1e293b 100%)', 
      color: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
     
      <Link to="/" style={{ 
        color: '#fff', 
        textDecoration: 'none', 
        fontSize: '1.6rem', 
        fontWeight: '800',
        letterSpacing: '1.5px'
      }}>
        GoShop
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/products" style={{ 
          color: '#cbd5e1', 
          textDecoration: 'none', 
          fontSize: '16px',
          fontWeight: '500',
          transition: 'color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.color = '#fff'}
        onMouseOut={(e) => e.target.style.color = '#cbd5e1'}
        >
          Products
        </Link>

        {/* Wishlist */}
        <Link to="/wishlist" style={{ color: '#fff', position: 'relative', display: 'flex', alignItems: 'center', transition: 'transform 0.2s' }}>
          {wishlist.length > 0 ? <AiFillHeart size={26} color="#ff4d4f" /> : <AiOutlineHeart size={26} />}
          {wishlist.length > 0 && (
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px', 
              background: '#fff', 
              color: '#0f172a', 
              borderRadius: '50%', 
              padding: '2px 6px', 
              fontSize: '11px',
              fontWeight: 'bold',
              border: '1px solid #ff4d4f',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart Link*/}
        <Link to="/cart" style={{ color: '#fff', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <AiOutlineShoppingCart size={26} />
          {cart.length > 0 && (
            <span style={{ 
              position: 'absolute', 
              top: '-8px', 
              right: '-8px', 
              background: '#10b981', 
              color: '#fff', 
              borderRadius: '50%', 
              padding: '2px 6px', 
              fontSize: '11px',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              {cart.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;