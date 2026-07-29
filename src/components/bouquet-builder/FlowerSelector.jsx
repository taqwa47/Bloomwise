import React from 'react';
import { mockProducts } from '../../data/mockProducts';
import { Plus, Minus, AlertCircle } from 'lucide-react';

export default function FlowerSelector({ selectedFlowers, setSelectedFlowers }) {
  const flowers = mockProducts.filter(p => p.mainCategory === 'Flowers');

  const getQty = (flowerId) => {
    const found = selectedFlowers.find(f => f.id === flowerId);
    return found ? found.qty : 0;
  };

  const handleUpdate = (flower, delta) => {
    setSelectedFlowers(prev => {
      const existing = prev.find(f => f.id === flower.id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(f => f.id !== flower.id);
        return prev.map(f => f.id === flower.id ? { ...f, qty: newQty } : f);
      }
      if (delta > 0) {
        return [...prev, { id: flower.id, name: flower.name, price: flower.price, qty: 1 }];
      }
      return prev;
    });
  };

  return (
    <div>
      <h3 className="step-title">1. Choose Your Flowers</h3>
      <p style={{ color: '#5c6661', marginBottom: 24 }}>
        Select the flowers you'd like in your bouquet. You can adjust quantities below.
      </p>

      <div className="flower-grid">
        {flowers.map(flower => {
          const isOutOfStock = flower.status === 'Out of Stock' || flower.quantity === 0;
          const isLowStock = flower.status === 'Low Stock' || flower.quantity < 5;
          const qty = getQty(flower.id);

          return (
            <div key={flower.id} className={`flower-card ${qty > 0 ? 'selected' : ''} ${isOutOfStock ? 'unavailable' : ''}`}>
              <img src={flower.image} alt={flower.name} className="flower-image" />
              <div className="flower-info">
                <div className={`flower-status ${isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : 'in-stock'}`}>
                  {isOutOfStock ? 'Unavailable' : isLowStock ? 'Low Availability' : 'Available'}
                </div>
                <h4 className="flower-name">{flower.name}</h4>
                <p style={{ fontSize: 13, color: '#88928d', margin: '0 0 8px' }}>Color: {flower.color}</p>
                <div className="flower-price">₪{flower.price.toFixed(2)} <span style={{ fontSize: 12, color: '#88928d', fontWeight: 'normal' }}>/ stem</span></div>
                
                {isOutOfStock ? (
                  <div style={{ fontSize: 12, color: '#dc2626', background: '#fee2e2', padding: 8, borderRadius: 8 }}>
                    Currently unavailable.
                  </div>
                ) : (
                  <div className="flower-actions">
                    <button className="qty-btn" onClick={() => handleUpdate(flower, -1)} disabled={qty === 0}>
                      <Minus size={16} />
                    </button>
                    <span className="qty-display">{qty}</span>
                    <button className="qty-btn" onClick={() => handleUpdate(flower, 1)}>
                      <Plus size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
