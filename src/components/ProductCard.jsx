import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineShoppingCart, AiFillHeart, AiOutlineHeart, AiFillStar } from 'react-icons/ai';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // --- 1. LOCALIZED PRICE CALCULATION ---
  
  const inrPrice = (product.price * 83).toLocaleString('en-IN');

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginBottom: '10px' }}>
        {[...Array(5)].map((_, i) => (
          <AiFillStar 
            key={i} 
            color={i < Math.floor(rating) ? "#fbbf24" : "#e2e8f0"} 
            size={16} 
          />
        ))}
        <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '6px', fontWeight: '600' }}>
          {product.rating.rate} ({product.rating.count})
        </span>
      </div>
    );
  };

  return (
    <motion.div 
      whileHover={{ 
        y: -8, 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
      }}
      style={{ 
        border: 'none', 
        padding: '20px', 
        borderRadius: '20px', 
        textAlign: 'left', 
        background: '#fff', 
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* Wishlist Button */}
      <div 
        onClick={() => toggleWishlist(product)}
        style={{ 
          position: 'absolute', top: '15px', right: '15px', 
          cursor: 'pointer', zIndex: 2, background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%', padding: '8px', display: 'flex',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          backdropFilter: 'blur(4px)'
        }}
      >
        {isInWishlist(product.id) ? (
          <AiFillHeart color="#ff4d4f" size={20} /> 
        ) : (
          <AiOutlineHeart size={20} color="#64748b" />
        )}
      </div>

      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        {/* Product Image Container */}
        <div style={{ 
          background: '#f1f5f9', 
          borderRadius: '16px', 
          padding: '24px', 
          marginBottom: '16px', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px'
        }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
          />
        </div>

        {/* Dynamic Star Rating */}
        {renderStars(product.rating.rate)}

        {/* Title */}
        <h3 style={{ 
          fontSize: '15px', 
          fontWeight: '700', 
          color: '#1e293b',
          height: '40px', 
          overflow: 'hidden', 
          marginBottom: '10px', 
          lineHeight: '1.4'
        }}>
          {product.title}
        </h3>
        
        {/* --- 2. UPDATED INR PRICE DISPLAY --- */}
        <p style={{ 
          color: '#2563eb', 
          fontWeight: '800', 
          fontSize: '1.4rem', 
          margin: '0 0 18px 0',
          display: 'flex',
          alignItems: 'center'
        }}>
          ₹{inrPrice}
        </p>
      </Link>
      
      {/* Action Button */}
      <button 
        onClick={() => addToCart(product)} 
        style={{ 
          width: '100%', 
          padding: '14px', 
          background: '#0f172a', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '12px', 
          fontWeight: '700', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          fontSize: '15px',
          transition: 'all 0.3s'
        }}
        onMouseOver={(e) => e.target.style.background = '#1e293b'}
        onMouseOut={(e) => e.target.style.background = '#0f172a'}
      >
        <AiOutlineShoppingCart size={20} /> Add to Cart
      </button>
    </motion.div>
  );
};

export default ProductCard;