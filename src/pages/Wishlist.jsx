import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineHeart, AiOutlineArrowLeft, AiOutlineDelete } from 'react-icons/ai';
import ProductCard from '../components/ProductCard';

const Wishlist = () => {
  // Destructuring clearWishlist from your context
  const { wishlist, clearWishlist } = useWishlist();

  // --- 1. EMPTY STATE UI ---
  if (wishlist.length === 0) {
    return (
      <div style={{ 
        height: '75vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ 
            background: '#fef2f2', 
            padding: '40px', 
            borderRadius: '50%', 
            marginBottom: '25px' 
          }}
        >
          <AiOutlineHeart size={80} color="#fca5a5" />
        </motion.div>
        
        <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '12px', fontWeight: '800' }}>
          Your wishlist is empty
        </h2>
        <p style={{ color: '#64748b', marginBottom: '35px', maxWidth: '400px', fontSize: '1.1rem' }}>
          Save your favorite items here to keep an eye on them! Start exploring our collection to fill it up.
        </p>
        
        <Link to="/products">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '1rem'
            }}
          >
            <AiOutlineArrowLeft size={20} /> Explore Products
          </motion.button>
        </Link>
      </div>
    );
  }

  // --- 2. ACTIVE WISHLIST DISPLAY ---
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}
    >
      {/* Header with Header Title and Clear Button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: '35px',
        borderBottom: '1px solid #f1f5f9',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ fontWeight: '800', color: '#0f172a', margin: '0 0 8px 0' }}>My Wishlist</h1>
          <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
            You have <strong>{wishlist.length}</strong> {wishlist.length === 1 ? 'item' : 'items'} saved.
          </p>
        </div>

        <button 
          onClick={clearWishlist}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: '#fee2e2',
            color: '#ef4444',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: '0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#fecaca'}
          onMouseOut={(e) => e.target.style.background = '#fee2e2'}
        >
          <AiOutlineDelete size={18} /> Empty Wishlist
        </button>
      </div>
      
      {/* Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '30px' 
      }}>
        <AnimatePresence mode="popLayout">
          {wishlist.map((product) => (
            <motion.div 
              key={product.id} 
              layout 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Wishlist;