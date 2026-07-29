import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info } from 'lucide-react';
import { useInventory } from '../../hooks/useInventory';
import StockUpdateModal from '../inventory/StockUpdateModal';

export default function StockAlertsCard() {
  const navigate = useNavigate();
  const { inventory, updateQuantity } = useInventory();
  const [fixingItem, setFixingItem] = useState(null);

  const alerts = inventory.filter(item => item.quantity <= item.minStock);

  const handleImageError = (e) => {
    // Local fallback if image is missing/broken
    e.target.src = "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=150&h=150&fit=crop";
  };

  return (
    <>
      <section className="section-card">
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <h3 className="section-title">Stock Alerts</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {alerts.length > 0 && (
              <div style={{ background: '#ef4444', color: '#fff', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>
                {alerts.length}
              </div>
            )}
            <span 
              className="view-all" 
              onClick={() => navigate('/owner/inventory?filter=alerts')} 
              style={{ cursor: 'pointer' }}
            >
              View all →
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#88928d', background: '#f8faf9', borderRadius: '12px' }}>
              <CheckCircle2 size={32} color="#16a34a" style={{ margin: '0 auto 12px', display: 'block' }} />
              All stock levels are healthy!
            </div>
          ) : (
            alerts.slice(0, 4).map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', padding: '12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px' }}>
                <img 
                  src={item.image} 
                  alt={item.name} 
                  onError={handleImageError}
                  style={{ width: 48, height: 48, borderRadius: '8px', objectFit: 'cover', marginRight: '16px', background: '#fff' }} 
                />
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <AlertTriangle size={14} color="#ef4444" />
                    <span style={{ fontWeight: 600, color: '#7f1d1d' }}>{item.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: '#991b1b' }}>
                    {item.quantity === 0 ? 'Out of stock' : `${item.quantity} left`}
                  </p>
                </div>
                
                <button 
                  onClick={() => setFixingItem(item)}
                  style={{ background: 'none', border: 'none', color: '#b91c1c', fontWeight: 600, cursor: 'pointer', padding: '8px' }}
                >
                  Fix →
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      <StockUpdateModal 
        isOpen={!!fixingItem} 
        onClose={() => setFixingItem(null)} 
        item={fixingItem} 
        onUpdate={(delta) => {
          updateQuantity(fixingItem.id, delta);
          setFixingItem(null);
        }}
      />
    </>
  );
}

// Ensure CheckCircle2 is imported, doing it here to fix runtime error just in case
import { CheckCircle2 } from 'lucide-react';
