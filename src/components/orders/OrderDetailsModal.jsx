import React from 'react';
import { X, MapPin, CreditCard, Clock, Phone, User, Package } from 'lucide-react';

export default function OrderDetailsModal({ isOpen, onClose, order, onUpdateStatus }) {
  if (!isOpen || !order) return null;

  const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Completed', 'Cancelled', 'Rejected'];

  const getInitialColor = (name) => {
    const char = (name || '').charAt(0).toUpperCase();
    const colors = { 'S': '#2d5440', 'L': '#305d45', 'O': '#244535', 'E': '#3a7254', 'J': '#1c3a27', 'M': '#478966' };
    return colors[char] || '#315e47';
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: '#fff', width: '90%', maxWidth: '600px', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e2e8e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '20px', color: '#1a2f24' }}>Order {order.id}</h2>
            <p style={{ margin: 0, color: '#88928d', fontSize: '14px' }}>Placed on {order.date}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={24} color="#88928d" />
          </button>
        </div>

        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Status Control */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8faf9', padding: '16px', borderRadius: '12px' }}>
            <span style={{ fontWeight: 600, color: '#1a2f24' }}>Current Status</span>
            <select 
              value={order.status}
              onChange={(e) => onUpdateStatus && onUpdateStatus(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontWeight: 600, color: '#315e47', cursor: 'pointer' }}
            >
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Customer Info */}
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: '#5c6661', display: 'flex', alignItems: 'center', gap: '8px' }}><User size={16}/> Customer</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: getInitialColor(order.customerName), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 600 }}>
                  {(order.customerName || 'G').charAt(0)}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, color: '#1a2f24' }}>{order.customerName}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#88928d', display: 'flex', alignItems: 'center', gap: '4px' }}><Phone size={12}/> +972 50-123-4567</p>
                </div>
              </div>
            </div>

            {/* Delivery/Payment Info */}
            <div>
              <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: '#5c6661', display: 'flex', alignItems: 'center', gap: '8px' }}><Package size={16}/> Delivery Info</h3>
              <p style={{ margin: '0 0 8px', fontSize: '14px', color: '#1a2f24', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={16} color="#88928d" style={{ marginTop: '2px' }}/> 
                {order.fulfillment === 'pickup' ? 'Store Pickup' : '123 Flower Street, TLV'}
              </p>
              <p style={{ margin: 0, fontSize: '14px', color: '#1a2f24', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CreditCard size={16} color="#88928d"/> 
                {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit Card ending in ••42'}
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 style={{ margin: '0 0 12px', fontSize: '15px', color: '#5c6661' }}>Items</h3>
            <div style={{ border: '1px solid #e2e8e4', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #e2e8e4', background: '#f8faf9' }}>
                <span style={{ fontWeight: 500, color: '#1a2f24' }}>{order.item || 'Custom Bouquet'}</span>
                <span style={{ fontWeight: 600, color: '#1a2f24' }}>₪{order.amount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: '#fff', borderTop: '1px dashed #e2e8e4' }}>
                <span style={{ fontWeight: 600, color: '#1a2f24' }}>Total</span>
                <span style={{ fontWeight: 700, color: '#315e47', fontSize: '18px' }}>₪{order.amount}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: '15px', color: '#5c6661' }}>Customer Notes</h3>
              <div style={{ background: '#fefce8', padding: '12px', borderRadius: '8px', border: '1px solid #fef08a', color: '#854d0e', fontSize: '14px' }}>
                "{order.notes}"
              </div>
            </div>
          )}

        </div>
        
        <div style={{ padding: '24px', borderTop: '1px solid #e2e8e4', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ background: '#315e47', color: '#fff', padding: '10px 24px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
