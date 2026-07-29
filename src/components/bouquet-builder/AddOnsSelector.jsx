import React from 'react';
import { Plus, Minus } from 'lucide-react';

const ADD_ONS = [
  { id: 'Chocolate', label: 'Premium Chocolate', price: 40, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop' },
  { id: 'TeddyBear', label: 'Teddy Bear', price: 60, image: 'https://images.unsplash.com/photo-1559418414-cca0b1076bbf?w=200&h=200&fit=crop' },
  { id: 'Candle', label: 'Scented Candle', price: 55, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=200&h=200&fit=crop' },
  { id: 'Balloon', label: 'Helium Balloon', price: 25, image: 'https://images.unsplash.com/photo-1530103862676-de8892bc952f?w=200&h=200&fit=crop' },
  { id: 'Perfume', label: 'Perfume Add-on', price: 120, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop' },
  { id: 'LuxuryRibbon', label: 'Luxury Ribbon', price: 15, image: 'https://images.unsplash.com/photo-1621252994019-354921f92e21?w=200&h=200&fit=crop' },
];

export default function AddOnsSelector({ addOns, setAddOns }) {
  
  const getQty = (id) => {
    const item = addOns.find(a => a.id === id);
    return item ? item.qty : 0;
  };

  const handleUpdate = (addon, delta) => {
    setAddOns(prev => {
      const existing = prev.find(a => a.id === addon.id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(a => a.id !== addon.id);
        return prev.map(a => a.id === addon.id ? { ...a, qty: newQty } : a);
      }
      if (delta > 0) {
        return [...prev, { ...addon, qty: 1 }];
      }
      return prev;
    });
  };

  return (
    <div>
      <h3 className="step-title">6. Optional Add-ons</h3>
      <p style={{ color: '#5c6661', marginBottom: 24 }}>
        Make your gift extra special by adding some treats.
      </p>

      <div className="flower-grid">
        {ADD_ONS.map(addon => {
          const qty = getQty(addon.id);
          return (
            <div key={addon.id} className={`flower-card ${qty > 0 ? 'selected' : ''}`}>
              <img src={addon.image} alt={addon.label} className="flower-image" />
              <div className="flower-info">
                <h4 className="flower-name">{addon.label}</h4>
                <div className="flower-price">₪{addon.price.toFixed(2)}</div>
                
                <div className="flower-actions">
                  <button className="qty-btn" onClick={() => handleUpdate(addon, -1)} disabled={qty === 0}>
                    <Minus size={16} />
                  </button>
                  <span className="qty-display">{qty}</span>
                  <button className="qty-btn" onClick={() => handleUpdate(addon, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
