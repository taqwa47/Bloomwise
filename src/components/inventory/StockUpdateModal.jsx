import React, { useState } from 'react';
import { X, Plus, Minus, CheckCircle2 } from 'lucide-react';

export default function StockUpdateModal({ isOpen, onClose, item, onUpdate }) {
  const [addQty, setAddQty] = useState(1);

  if (!isOpen || !item) return null;

  const handleSave = () => {
    onUpdate(addQty);
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: '#fff', width: '90%', maxWidth: '400px', borderRadius: '16px', overflow: 'hidden', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '18px', color: '#1a2f24' }}>Update Stock</h2>
            <p style={{ margin: 0, color: '#88928d', fontSize: '14px' }}>{item.name}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={20} color="#88928d" />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#88928d', fontWeight: 600, textTransform: 'uppercase' }}>Current</p>
            <div style={{ fontSize: '32px', fontWeight: 700, color: item.quantity === 0 ? '#ef4444' : '#1a2f24' }}>{item.quantity}</div>
          </div>

          <div style={{ color: '#cbd5e1', fontSize: '24px' }}>+</div>

          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#88928d', fontWeight: 600, textTransform: 'uppercase' }}>Add</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8faf9', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8e4' }}>
              <button onClick={() => setAddQty(Math.max(1, addQty - 1))} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Minus size={14} color="#1a2f24"/>
              </button>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#315e47', minWidth: '40px' }}>{addQty}</span>
              <button onClick={() => setAddQty(addQty + 1)} style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Plus size={14} color="#1a2f24"/>
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8e4', background: '#fff', color: '#5c6661', fontWeight: 600, cursor: 'pointer' }}>
            Cancel
          </button>
          <button onClick={handleSave} style={{ flex: 2, padding: '12px', borderRadius: '8px', border: 'none', background: '#315e47', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} /> Update Stock
          </button>
        </div>
      </div>
    </div>
  );
}
