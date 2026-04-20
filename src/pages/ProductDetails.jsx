import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductById(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}><h2>Loading product details...</h2></div>;
  if (!product) return <div style={{ textAlign: 'center', padding: '50px' }}><h2>Product not found.</h2></div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}
    >
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          marginBottom: '20px', 
          cursor: 'pointer', 
          background: 'none', 
          border: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px',
          fontSize: '16px',
          color: '#007bff'
        }}
      >
        <AiOutlineArrowLeft /> Back to Products
      </button>

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        {/* Product Image */}
        <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }} 
          />
        </div>

        {/* Product Info */}
        <div style={{ flex: '1.2', minWidth: '300px' }}>
          <p style={{ color: '#888', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px' }}>
            {product.category}
          </p>
          <h1 style={{ margin: '10px 0', fontSize: '28px', lineHeight: '1.2' }}>{product.title}</h1>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0' }}>
            <h2 style={{ color: '#B12704', margin: 0 }}>${product.price}</h2>
            <span style={{ color: '#555', fontSize: '14px' }}>
              ({product.rating?.rate} ⭐ | {product.rating?.count} reviews)
            </span>
          </div>

          <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
          
          <h4 style={{ marginBottom: '10px' }}>Description</h4>
          <p style={{ lineHeight: '1.6', color: '#444', fontSize: '15px' }}>
            {product.description}
          </p>
          
          <div style={{ marginTop: '30px' }}>
            <button 
              onClick={() => addToCart(product)}
              style={{ 
                padding: '15px 30px', 
                background: '#f0c14b', 
                border: '1px solid #a88734', 
                borderRadius: '8px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                width: '100%',
                fontSize: '16px',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.background = '#e2b43d'}
              onMouseOut={(e) => e.target.style.background = '#f0c14b'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;