import React from 'react';

const TIME_SLOTS = [
  '09:00–11:00', '11:00–13:00', '13:00–15:00', '15:00–17:00', '17:00–19:00', '19:00–21:00'
];

const PICKUP_TIMES = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export default function DeliveryPickupForm({ fulfillment, setFulfillment, customerInfo, setCustomerInfo }) {
  
  const updateFulfillment = (field, value) => {
    setFulfillment(prev => ({ ...prev, [field]: value }));
  };
  
  const updateCustomer = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h3 className="step-title">8. Delivery or Pickup</h3>
      
      <div className="options-grid" style={{ marginBottom: 32 }}>
        <div 
          className={`option-card ${fulfillment.type === 'Delivery' ? 'selected' : ''}`}
          onClick={() => updateFulfillment('type', 'Delivery')}
        >
          <h4>Delivery</h4>
          <span className="price">+₪35 (Standard)</span>
        </div>
        <div 
          className={`option-card ${fulfillment.type === 'Pickup' ? 'selected' : ''}`}
          onClick={() => updateFulfillment('type', 'Pickup')}
        >
          <h4>Store Pickup</h4>
          <span className="price">Free</span>
        </div>
      </div>

      <div style={{ background: '#f8faf9', padding: 24, borderRadius: 16, marginBottom: 32 }}>
        <h4 style={{ margin: '0 0 16px', color: '#1a2f24' }}>Customer Information</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={customerInfo.name || ''} onChange={e => updateCustomer('name', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" value={customerInfo.phone || ''} onChange={e => updateCustomer('phone', e.target.value)} />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Email Address</label>
            <input type="email" value={customerInfo.email || ''} onChange={e => updateCustomer('email', e.target.value)} />
          </div>
        </div>
      </div>

      {fulfillment.type === 'Delivery' && (
        <div style={{ background: '#fff', border: '1px solid #e2e8e4', padding: 24, borderRadius: 16 }}>
          <h4 style={{ margin: '0 0 16px', color: '#1a2f24' }}>Delivery Details</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Recipient Name</label>
              <input type="text" value={fulfillment.recipientName || ''} onChange={e => updateFulfillment('recipientName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Recipient Phone</label>
              <input type="tel" value={fulfillment.recipientPhone || ''} onChange={e => updateFulfillment('recipientPhone', e.target.value)} />
            </div>
            <div className="form-group">
              <label>City</label>
              <input type="text" value={fulfillment.city || ''} onChange={e => updateFulfillment('city', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Full Address</label>
              <input type="text" value={fulfillment.address || ''} onChange={e => updateFulfillment('address', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Delivery Date</label>
              <input type="date" min={today} value={fulfillment.date || ''} onChange={e => updateFulfillment('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Preferred Time</label>
              <select value={fulfillment.time || ''} onChange={e => updateFulfillment('time', e.target.value)}>
                <option value="">Select time slot...</option>
                {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Delivery Instructions (Optional)</label>
              <input type="text" placeholder="e.g. Leave at the front door" value={fulfillment.instructions || ''} onChange={e => updateFulfillment('instructions', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {fulfillment.type === 'Pickup' && (
        <div style={{ background: '#fff', border: '1px solid #e2e8e4', padding: 24, borderRadius: 16 }}>
          <h4 style={{ margin: '0 0 16px', color: '#1a2f24' }}>Store Pickup Details</h4>
          <p style={{ fontSize: 14, color: '#5c6661', marginBottom: 16 }}>
            Pickup Address: BloomWise Shop, 123 Floral Street, City Center.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" min={today} value={fulfillment.date || ''} onChange={e => updateFulfillment('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <select value={fulfillment.time || ''} onChange={e => updateFulfillment('time', e.target.value)}>
                <option value="">Select time...</option>
                {PICKUP_TIMES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="warning-message" style={{ marginTop: 16 }}>
            Please wait for order confirmation before arriving at the shop. Custom bouquets require preparation time.
          </div>
        </div>
      )}
    </div>
  );
}
