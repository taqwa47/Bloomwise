import React from 'react';
import { CreditCard, Banknote, Store } from 'lucide-react';

export default function PaymentReview({ paymentMethod, setPaymentMethod, fulfillmentType, confirmed, setConfirmed }) {
  
  const handlePaymentSelect = (method) => {
    if (method === 'Cash on Delivery' && fulfillmentType !== 'Delivery') return;
    if (method === 'Pay at Store' && fulfillmentType !== 'Pickup') return;
    setPaymentMethod(method);
  };

  return (
    <div>
      <h3 className="step-title">9. Payment & Review</h3>
      
      <p style={{ color: '#1a2f24', fontWeight: 600, marginBottom: 16 }}>Select Payment Method</p>
      
      <div className="options-grid" style={{ marginBottom: 32 }}>
        <div 
          className={`option-card ${paymentMethod === 'Credit Card' ? 'selected' : ''}`}
          onClick={() => handlePaymentSelect('Credit Card')}
        >
          <CreditCard size={24} style={{ margin: '0 auto 8px', color: '#315e47' }} />
          <h4>Credit Card</h4>
          <p>Pay securely online</p>
        </div>
        
        <div 
          className={`option-card ${paymentMethod === 'Cash on Delivery' ? 'selected' : ''} ${fulfillmentType !== 'Delivery' ? 'unavailable' : ''}`}
          style={fulfillmentType !== 'Delivery' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          onClick={() => handlePaymentSelect('Cash on Delivery')}
        >
          <Banknote size={24} style={{ margin: '0 auto 8px', color: '#315e47' }} />
          <h4>Cash on Delivery</h4>
          <p>Available for delivery only</p>
        </div>

        <div 
          className={`option-card ${paymentMethod === 'Pay at Store' ? 'selected' : ''} ${fulfillmentType !== 'Pickup' ? 'unavailable' : ''}`}
          style={fulfillmentType !== 'Pickup' ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
          onClick={() => handlePaymentSelect('Pay at Store')}
        >
          <Store size={24} style={{ margin: '0 auto 8px', color: '#315e47' }} />
          <h4>Pay at Store</h4>
          <p>Available for pickup only</p>
        </div>
      </div>

      {paymentMethod === 'Credit Card' && (
        <div style={{ background: '#f8faf9', padding: 24, borderRadius: 16, marginBottom: 32, border: '1px solid #e2e8e4' }}>
          <h4 style={{ margin: '0 0 16px', color: '#1a2f24' }}>Credit Card Details (Simulation)</h4>
          <div className="warning-message">
            This is a frontend demonstration. Do not enter real credit card information. Payments are not actually processed.
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <input type="text" placeholder="1234 5678 9101 1121" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="form-group">
              <label>Expiry Date</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid #e2e8e4', padding: 24, borderRadius: 16, marginTop: 32 }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            style={{ width: 'auto', marginTop: 4 }}
          />
          <div>
            <span style={{ fontWeight: 600, color: '#1a2f24', display: 'block', marginBottom: 4 }}>
              I confirm that the order details in the summary are correct.
            </span>
            <span style={{ fontSize: 13, color: '#5c6661' }}>
              By submitting, you agree to our terms of service. Custom bouquets may vary slightly depending on seasonal availability.
            </span>
          </div>
        </label>
      </div>

    </div>
  );
}
