import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';
import { Heart, Search, Filter, Droplets, Sun, ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const CustomerShop = () => {
  const [products] = useState(mockProducts.filter(p => p.status === 'In Stock' || p.status === 'Low Stock'));
  const [search, setSearch] = useState('');
  const [mainCategory, setMainCategory] = useState('All');
  const [subCategory, setSubCategory] = useState('All');
  const [sort, setSort] = useState('Recommended');
  const { addToCart } = useCart();

  const mainCategories = ['All', 'Flowers', 'Indoor Plants', 'Vases', 'Gift Add-ons'];
  
  const getSubcategories = (mainCat) => {
    if (mainCat === 'All') return [];
    const subs = new Set();
    products.forEach(p => {
      if (p.mainCategory === mainCat && p.subcategories) {
        p.subcategories.forEach(sc => subs.add(sc));
      } else if (p.mainCategory === mainCat && p.category) {
        subs.add(p.category);
      }
    });
    return ['All', ...Array.from(subs)];
  };

  const currentSubcategories = getSubcategories(mainCategory);

  // When changing main category, reset subcategory
  const handleMainCategoryChange = (cat) => {
    setMainCategory(cat);
    setSubCategory('All');
  };

  let filtered = products.filter(p => {
    if (mainCategory !== 'All' && p.mainCategory !== mainCategory) return false;
    
    if (subCategory !== 'All') {
      if (p.subcategories && !p.subcategories.includes(subCategory)) return false;
      if (!p.subcategories && p.category !== subCategory) return false;
    }


    
    if (search) {
      const s = search.toLowerCase();
      const matchEng = p.nameEnglish && p.nameEnglish.toLowerCase().includes(s);
      const matchAr = p.nameArabic && p.nameArabic.toLowerCase().includes(s);
      const matchHe = p.nameHebrew && p.nameHebrew.toLowerCase().includes(s);
      const matchTags = p.tags && p.tags.some(t => t.toLowerCase().includes(s));
      const matchOldName = p.name && p.name.toLowerCase().includes(s);
      const matchMat = p.material && p.material.toLowerCase().includes(s);
      const matchSub = p.subcategories && p.subcategories.some(sc => sc.toLowerCase().includes(s));
      
      if (!matchEng && !matchAr && !matchHe && !matchTags && !matchOldName && !matchMat && !matchSub) return false;
    }
    return true;
  });

  if (sort === 'Price: Low to High') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'Price: High to Low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: product.mainCategory === 'Flowers' ? 'Medium' : undefined
    });
    alert(`${product.name} added to cart!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      {/* SHOP HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #244735 0%, #11281b 100%)', borderRadius: 24, padding: '48px', color: '#fff', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -50, width: 300, height: 300, background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 40, margin: '0 0 16px', fontWeight: 600 }}>
            {mainCategory === 'All' ? 'Shop All Collections' : mainCategory}
          </h1>
          <p style={{ fontSize: 16, color: '#eef3ef', margin: 0, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Discover our premium selection of fresh blooms, curated indoor plants, and essential botanical accessories.
          </p>
        </div>
      </div>

      {/* SEARCH & SORT TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: 500 }}>
          <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#88928d' }} />
          <input 
            type="text" 
            placeholder="Search our shop..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: 16, border: '1px solid #e2e8e4', outline: 'none', background: '#fff', fontSize: 15 }}
          />
        </div>
        
        <select 
          value={sort} 
          onChange={e => setSort(e.target.value)}
          style={{ padding: '14px 20px', borderRadius: 16, border: '1px solid #e2e8e4', outline: 'none', background: '#fff', color: '#11281b', fontWeight: 600, cursor: 'pointer' }}
        >
          <option>Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Main Categories */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8 }}>
          {mainCategories.map(c => (
            <button 
              key={c}
              onClick={() => handleMainCategoryChange(c)}
              style={{
                padding: '10px 20px', borderRadius: 20, border: 'none', fontWeight: 600, fontSize: 15, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: mainCategory === c ? '#315e47' : '#fff',
                color: mainCategory === c ? '#fff' : '#5c6661',
                boxShadow: mainCategory === c ? '0 4px 12px rgba(49,94,71,0.2)' : '0 2px 8px rgba(0,0,0,0.02)'
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {currentSubcategories.length > 0 && (
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, borderTop: '1px solid #e2e8e4', paddingTop: 16 }}>
            {currentSubcategories.map(sc => (
              <button 
                key={sc}
                onClick={() => setSubCategory(sc)}
                style={{
                  padding: '6px 16px', borderRadius: 16, border: subCategory === sc ? '1px solid #315e47' : '1px solid #e2e8e4',
                  fontWeight: 500, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                  background: subCategory === sc ? '#eef3ef' : '#fff',
                  color: subCategory === sc ? '#315e47' : '#5c6661'
                }}
              >
                {sc}
              </button>
            ))}
          </div>
        )}
      </div>



      {/* PRODUCT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 24 }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 80, color: '#88928d', background: '#fff', borderRadius: 24 }}>
            <Search size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
            <div style={{ fontSize: 18, fontWeight: 600, color: '#5c6661', marginBottom: 8 }}>No products found</div>
            <div>Try adjusting your filters or search term.</div>
          </div>
        ) : (
          filtered.map(product => (
            <Link key={product.id} to={`/customer/products/${product.id}`} style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', transition: 'transform 0.2s, box-shadow 0.2s', ':hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' } }}>
                
                {/* Badges / Favorite Button */}
                <div style={{ position: 'absolute', top: 24, left: 24, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 2 }}>
                  {product.petFriendly && (
                    <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, color: '#0d9488', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      PET FRIENDLY
                    </div>
                  )}
                  {product.material && (
                    <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, color: '#5c6661', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      {product.material.toUpperCase()}
                    </div>
                  )}
                </div>

                <button 
                  onClick={e => { e.preventDefault(); /* handle fav */ }}
                  style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 2 }}
                >
                  <Heart size={16} color="#88928d" />
                </button>

                {/* Image */}
                <div style={{ width: '100%', height: 220, background: '#f8faf9', borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, overflow: 'hidden', padding: 16 }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x600/eef3ef/315e47?text=Image+Not+Found'; }}
                  />
                </div>
                
                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ fontSize: 12, color: '#88928d', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>
                    {product.subcategories ? product.subcategories[0] : product.category}
                  </div>
                  <h3 style={{ margin: '0 0 2px', fontSize: 17, color: '#11281b' }}>{product.nameEnglish || product.name}</h3>
                  {(product.nameArabic || product.nameHebrew) && (
                    <div style={{ fontSize: 13, color: '#5c6661', marginBottom: 8, display: 'flex', gap: 6, fontWeight: 500 }}>
                      <span dir="rtl">{product.nameArabic}</span> 
                      {product.nameArabic && product.nameHebrew && <span style={{ opacity: 0.5 }}>|</span>} 
                      <span dir="rtl">{product.nameHebrew}</span>
                    </div>
                  )}
                  
                  {/* Specialized info row based on product type */}
                  {(product.lightLevel || product.careLevel) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 12, color: '#5c6661', marginBottom: 12 }}>
                      {product.careLevel && <span style={{display:'flex', alignItems:'center', gap: 4}}><Heart size={14} color="#0d9488" /> {product.careLevel}</span>}
                      {product.lightLevel && <span style={{display:'flex', alignItems:'center', gap: 4}}><Sun size={14} color="#d97706" /> {product.lightLevel}</span>}
                      {product.wateringLevel && <span style={{display:'flex', alignItems:'center', gap: 4}}><Droplets size={14} color="#0284c7" /> {product.wateringLevel}</span>}
                    </div>
                  )}

                  <p style={{ margin: '0 0 16px', fontSize: 13, color: '#5c6661', lineHeight: 1.4, flex: 1 }}>{product.description}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#315e47' }}>₪{product.price.toFixed(2)}</div>
                    <button 
                      onClick={e => handleAddToCart(e, product)}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#eef3ef', color: '#315e47', padding: '8px 16px', borderRadius: 10, border: 'none', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
                    >
                      <ShoppingBag size={16} /> Add
                    </button>
                  </div>
                </div>

              </div>
            </Link>
          ))
        )}
      </div>

    </div>
  );
};

export default CustomerShop;
