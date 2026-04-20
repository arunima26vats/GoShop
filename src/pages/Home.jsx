import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AiOutlineArrowRight, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineShop } from 'react-icons/ai';

const Home = () => {
  // Shared card style for the "Hub" section
  const cardStyle = {
    padding: '40px 24px',
    textAlign: 'center',
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #f1f5f9',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    color: '#1e293b',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* Hero Section with Modern Mesh Gradient */}
      <section style={{
        height: '80vh',
        background: 'radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)',
        backgroundColor: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        textAlign: 'center',
        padding: '0 20px',
        position: 'relative'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: '4rem', marginBottom: '20px', fontWeight: '800', letterSpacing: '-1px' }}
        >
          Bijou Bijou
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ fontSize: '1.25rem', marginBottom: '40px', maxWidth: '600px', color: '#cbd5e1', lineHeight: '1.6' }}
        >
          Get ready to bejewelled!
        </motion.p>

        <Link to="/products">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '16px 48px',
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
            }}
          >
            Start Shopping <AiOutlineArrowRight />
          </motion.button>
        </Link>
      </section>

      {/* Quick Access Categories Hub */}
      <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
            Your Shopping Hub
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Everything you need, organized in one place.</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {/* Card 1: Shop */}
          <motion.div whileHover={{ y: -10 }}>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <div style={cardStyle}>
                <div style={{ padding: '20px', background: '#f1f5f9', borderRadius: '50%' }}>
                  <AiOutlineShop size={40} color="#2563eb" />
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>Browse Store</h3>
                <p style={{ color: '#64748b', lineHeight: '1.5' }}>Explore thousands of products across multiple categories with smart filters.</p>
              </div>
            </Link>
          </motion.div>

          {/* Card 2: Wishlist */}
          <motion.div whileHover={{ y: -10 }}>
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
              <div style={cardStyle}>
                <div style={{ padding: '20px', background: '#fef2f2', borderRadius: '50%' }}>
                  <AiOutlineHeart size={40} color="#ef4444" />
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>My Favorites</h3>
                <p style={{ color: '#64748b', lineHeight: '1.5' }}>Never lose track of the items you love. Save them for later in one click.</p>
              </div>
            </Link>
          </motion.div>

          {/* Card 3: Cart */}
          <motion.div whileHover={{ y: -10 }}>
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <div style={cardStyle}>
                <div style={{ padding: '20px', background: '#f0fdf4', borderRadius: '50%' }}>
                  <AiOutlineShoppingCart size={40} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '10px 0' }}>Secure Cart</h3>
                <p style={{ color: '#64748b', lineHeight: '1.5' }}>Ready to checkout? Your items are safe and waiting for you here.</p>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;