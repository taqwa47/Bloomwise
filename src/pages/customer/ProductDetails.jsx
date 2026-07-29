import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../../data/mockProducts';
import { useCart } from '../../hooks/useCart';
import { ArrowLeft, Plus, Minus, Heart, CheckCircle2 } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = mockProducts.find(f => f.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Medium');
  const [addons, setAddons] = useState([]);

  if (!product) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Product not found.</div>;
  }

  const sizes = [
    { id: 'Small', label: 'Small', priceModifier: 0.8 },
    { id: 'Medium', label: 'Medium', priceModifier: 1.0 },
    { id: 'Large', label: 'Large', priceModifier: 1.3 },
    { id: 'Luxury', label: 'Luxury', priceModifier: 1.6 }
  ];

  const availableAddons = [
    { id: 'choc1', name: 'Artisan Chocolate Box', price: 65 },
    { id: 'vase1', name: 'Glass Cylinder Vase', price: 45 },
    { id: 'bear1', name: 'Teddy Bear', price: 55 }
  ];

  const basePrice = product.price;
  const isFlower = product.mainCategory === 'Flowers';
  const isPlant = product.mainCategory === 'Indoor Plants';
  
  const sizeMod = isFlower ? sizes.find(s => s.id === size).priceModifier : 1.0;
  const addonsTotal = addons.reduce((sum, aId) => sum + availableAddons.find(a => a.id === aId).price, 0);
  
  const finalPrice = ((basePrice * sizeMod) + addonsTotal) * quantity;

  const handleAddAddon = (id) => {
    if (addons.includes(id)) {
      setAddons(addons.filter(a => a !== id));
    } else {
      setAddons([...addons, id]);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: Math.round((basePrice * sizeMod) + addonsTotal), // unit price
      image: product.image,
      quantity,
      size: isFlower ? size : undefined,
      addons: (isFlower || isPlant) ? addons : []
    });
    alert('Added to cart!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#5c6661', fontWeight: 600, cursor: 'pointer', padding: 0, width: 'fit-content' }}>
        <ArrowLeft size={18} /> Back to Shop
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
        
        {/* Images */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 24 }} />
        </div>

        {/* Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <div style={{ fontSize: 13, color: '#5c6661', fontWeight: 600, textTransform: 'uppercase', marginBottom: 8 }}>
              {product.subcategories ? product.subcategories[0] : product.category}
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, margin: '0 0 4px', color: '#11281b' }}>{product.nameEnglish || product.name}</h1>
            {(product.nameArabic || product.nameHebrew) && (
              <div style={{ fontSize: 16, color: '#5c6661', marginBottom: 16, display: 'flex', gap: 8, fontWeight: 500 }}>
                <span dir="rtl">{product.nameArabic}</span> 
                {product.nameArabic && product.nameHebrew && <span style={{ opacity: 0.3 }}>|</span>} 
                <span dir="rtl">{product.nameHebrew}</span>
              </div>
            )}
            <div style={{ fontSize: 24, fontWeight: 700, color: '#315e47' }}>₪{Math.round(finalPrice)}</div>
          </div>

          <p style={{ color: '#5c6661', lineHeight: 1.6, margin: 0 }}>
            {product.description || `A beautiful arrangement of ${product.name} perfect for any occasion.`}
          </p>

          {isPlant && (
            <div style={{ background: '#f4f9f6', padding: 24, borderRadius: 16, marginTop: 8 }}>
              <h4 style={{ margin: '0 0 16px', color: '#11281b', display: 'flex', alignItems: 'center', gap: 8 }}>
                Plant Care Guide
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', color: '#88928d', fontWeight: 600, marginBottom: 4 }}>Care Level</div>
                  <div style={{ color: '#11281b', fontWeight: 500 }}>{product.careLevel || 'Information not available.'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', color: '#88928d', fontWeight: 600, marginBottom: 4 }}>Light Requirements</div>
                  <div style={{ color: '#11281b', fontWeight: 500 }}>{product.lightLevel || 'Information not available.'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, textTransform: 'uppercase', color: '#88928d', fontWeight: 600, marginBottom: 4 }}>Watering</div>
                  <div style={{ color: '#11281b', fontWeight: 500 }}>{product.wateringLevel || 'Information not available.'}</div>
                </div>
              </div>
            </div>
          )}

          <div style={{ height: 1, background: '#e2e8e4' }}></div>

          {/* Size */}
          {isFlower && (
            <div>
              <h4 style={{ margin: '0 0 12px', color: '#11281b' }}>Bouquet Size</h4>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setSize(s.id)}
                    style={{ 
                      padding: '10px 16px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                      background: size === s.id ? '#eef3ef' : '#fff',
                      border: size === s.id ? '1px solid #315e47' : '1px solid #e2e8e4',
                      color: size === s.id ? '#315e47' : '#5c6661'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {(isFlower || isPlant) && (
            <div>
              <h4 style={{ margin: '0 0 12px', color: '#11281b' }}>Add something extra</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {availableAddons.map(addon => (
                  <div 
                    key={addon.id} 
                    onClick={() => handleAddAddon(addon.id)}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                      background: addons.includes(addon.id) ? '#f4f9f6' : '#fff',
                      border: addons.includes(addon.id) ? '1px solid #315e47' : '1px solid #e2e8e4'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid #315e47', display: 'flex', alignItems: 'center', justifyContent: 'center', background: addons.includes(addon.id) ? '#315e47' : '#fff' }}>
                        {addons.includes(addon.id) && <CheckCircle2 size={14} color="#fff" />}
                      </div>
                      <span style={{ fontWeight: 600, color: '#11281b' }}>{addon.name}</span>
                    </div>
                    <span style={{ color: '#5c6661', fontWeight: 600 }}>+₪{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #e2e8e4', borderRadius: 12, padding: '4px' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#11281b' }}><Minus size={16} /></button>
              <span style={{ width: 40, textAlign: 'center', fontWeight: 600 }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ padding: 8, background: 'none', border: 'none', cursor: 'pointer', color: '#11281b' }}><Plus size={16} /></button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              style={{ flex: 1, background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
            >
              Add to Cart
            </button>
            
            <button style={{ width: 50, background: '#fff', border: '1px solid #e2e8e4', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#5c6661' }}>
              <Heart size={20} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
