import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AiOutlineShoppingCart, 
  AiOutlineArrowLeft, 
  AiOutlineDelete, 
  AiOutlinePlus, 
  AiOutlineMinus 
} from 'react-icons/ai';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  // --- 1. THE EMPTY STATE UI ---
  if (cart.length === 0) {
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
          style={{ background: '#f1f5f9', padding: '40px', borderRadius: '50%', marginBottom: '25px' }}
        >
          <AiOutlineShoppingCart size={80} color="#94a3b8" />
        </motion.div>
        
        <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '12px', fontWeight: '800' }}>
          Your cart is empty
        </h2>
        <p style={{ color: '#64748b', marginBottom: '35px', maxWidth: '400px', fontSize: '1.1rem' }}>
          Looks like you haven't added anything yet. Explore our collection and find something you love!
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
            <AiOutlineArrowLeft size={20} /> Start Shopping
          </motion.button>
        </Link>
      </div>
    );
  }

  // --- 2. THE ACTIVE CART DISPLAY ---
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}
    >
      {/* Header with Title and Clear Button */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '35px',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '20px'
      }}>
        <h1 style={{ fontWeight: '800', color: '#0f172a', margin: 0 }}>Shopping Bag ({cart.length})</h1>
        
        <button 
          onClick={clearCart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
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
          <AiOutlineDelete size={18} /> Empty Cart
        </button>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr minmax(320px, 380px)', 
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Left Side: List of Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ 
                  display: 'flex', 
                  gap: '24px', 
                  background: '#fff', 
                  padding: '24px', 
                  borderRadius: '18px', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  alignItems: 'center'
                }}
              >
                <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '12px' }}>
                  <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: '#1e293b' }}>{item.title}</h3>
                  
                 
                  <p style={{ fontWeight: '800', color: '#2563eb', fontSize: '1.2rem', margin: '0 0 16px 0' }}>
                    ₹{(item.price * 83).toLocaleString('en-IN')}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      background: '#f1f5f9', 
                      borderRadius: '10px',
                      padding: '4px'
                    }}>
                      <button onClick={() => updateQuantity(item.id, -1)} style={actionBtnStyle}><AiOutlineMinus /></button>
                      <span style={{ padding: '0 12px', fontWeight: '800', color: '#0f172a' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} style={actionBtnStyle}><AiOutlinePlus /></button>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <AiOutlineDelete size={22} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right Side: Sticky Summary Card */}
        <div style={{ 
          background: '#fff', 
          padding: '32px', 
          borderRadius: '20px', 
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)', 
          position: 'sticky', 
          top: '120px' 
        }}>
          <h2 style={{ marginTop: 0, marginBottom: '24px', fontSize: '1.5rem', fontWeight: '800' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#64748b' }}>
            <span>Subtotal</span>
            {/* Localized INR Subtotal */}
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#64748b' }}>
            <span>Shipping</span>
            <span style={{ color: '#10b981', fontWeight: '600' }}>Free</span>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '30px', 
            fontWeight: '800', 
            fontSize: '1.4rem', 
            borderTop: '2px dashed #f1f5f9', 
            paddingTop: '24px',
            color: '#0f172a'
          }}>
            <span>Total</span>
            {/* Localized INR Total */}
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>

          <button style={{ 
            width: '100%', 
            padding: '18px', 
            background: '#0f172a', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '14px', 
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#1e293b'}
          onMouseOut={(e) => e.target.style.background = '#0f172a'}
          >
            Checkout Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const actionBtnStyle = {
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  color: '#475569'
};

export default Cart;