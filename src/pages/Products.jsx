import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import useDebounce from '../hooks/useDebounce';
import { AiOutlineReload } from 'react-icons/ai'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const debouncedSearch = useDebounce(searchTerm, 500);

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSortOrder("default");
    setPriceRange("all");
  };

  const isAnyFilterActive = 
    activeCategory !== "all" || 
    searchTerm !== "" || 
    sortOrder !== "default" || 
    priceRange !== "all";

  useEffect(() => {
    fetchCategories()
      .then(res => setCategories(["all", ...res.data]))
      .catch(err => console.error("Failed to fetch categories", err));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const res = activeCategory === "all" 
          ? await fetchProducts() 
          : await fetchProductsByCategory(activeCategory);
        setProducts(res.data);
        setError(null);
      } catch (err) {
        setError("Could not load products.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeCategory]);

  
  const getProcessedProducts = () => {
    let list = [...products];

    // 1. Search Filter
    if (debouncedSearch) {
      list = list.filter(p => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }

    // 2. Localized Price Filter (Multiplying by 83)
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      list = list.filter(p => {
        const priceInINR = p.price * 83;
        return priceInINR >= min && (max ? priceInINR <= max : true);
      });
    }

    // 3. Sorting 
    if (sortOrder === "asc") list.sort((a, b) => (a.price * 83) - (b.price * 83));
    else if (sortOrder === "desc") list.sort((a, b) => (b.price * 83) - (a.price * 83));

    return list;
  };

  const finalProducts = getProcessedProducts();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, fontWeight: '800', color: '#0f172a' }}>Explore Collection</h1>
        
        {isAnyFilterActive && (
          <button 
            onClick={clearFilters}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px',
              background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '10px',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <AiOutlineReload /> Clear Filters
          </button>
        )}
      </div>
      
      <input 
        type="text" 
        placeholder="Search for items..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ 
          width: '100%', padding: '16px', marginBottom: '25px', 
          borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '16px',
          outline: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
        }}
      />

      {/* ---  DROPDOWNS WITH INR RANGES --- */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <select 
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff' }}
        >
          <option value="default">Sort by Relevance</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select 
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', background: '#fff' }}
        >
          <option value="all">All Price Ranges</option>
          <option value="0-5000">Under ₹5,000</option>
          <option value="5000-20000">₹5,000 - ₹20,000</option>
          <option value="20000-50000">₹20,000 - ₹50,000</option>
          <option value="50000-1000000">Over ₹50,000</option>
        </select>
      </div>

      {/* Category Pills */}
      <div style={{ 
        display: 'flex', gap: '12px', overflowX: 'auto', 
        paddingBottom: '20px', marginBottom: '25px', scrollbarWidth: 'none'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '10px 22px', borderRadius: '30px',
              border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
              fontWeight: '600', whiteSpace: 'nowrap',
              background: activeCategory === cat ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : '#fff',
              color: activeCategory === cat ? '#fff' : '#64748b',
              boxShadow: activeCategory === cat ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Product Count Summary */}
      {!loading && (
        <div style={{ 
          marginBottom: '20px', display: 'flex', justifyContent: 'space-between', 
          alignItems: 'center', color: '#64748b', fontSize: '14px', fontWeight: '500'
        }}>
          <span>
            Showing <strong>{finalProducts.length}</strong> {finalProducts.length === 1 ? 'product' : 'products'}
            {activeCategory !== 'all' && ` in `}
            {activeCategory !== 'all' && <strong style={{ textTransform: 'capitalize' }}>{activeCategory.replace('-', ' ')}</strong>}
          </span>
          {searchTerm && <span>Results for "<strong>{searchTerm}</strong>"</span>}
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <h2 style={{ textAlign: 'center', marginTop: '50px', color: '#94a3b8' }}>Refreshing collection...</h2>
      ) : (
        <div style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' 
        }}>
          {finalProducts.length > 0 ? (
            finalProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <div style={{ 
              gridColumn: '1/-1', textAlign: 'center', padding: '80px 20px',
              background: '#fff', borderRadius: '20px', border: '2px dashed #e2e8f0'
            }}>
              <h3 style={{ color: '#1e293b', marginBottom: '10px' }}>No products found</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                style={{
                  padding: '12px 24px', background: '#0f172a', color: '#fff', 
                  border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;