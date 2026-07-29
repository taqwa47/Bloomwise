import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientPhone: '',
    address: '',
    city: '',
    deliveryDate: '',
    message: '',
    paymentMethod: 'Credit Card'
  });

  if (cart.length === 0) {
    navigate('/customer/shop');
    return null;
  }

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePlaceOrder = () => {
    // 1. Generate Order
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerId: user.id,
      customerName: user.fullName,
      items: cart,
      recipient: {
        name: formData.recipientName,
        phone: formData.recipientPhone,
        address: formData.address,
        city: formData.city
      },
      deliveryDate: formData.deliveryDate,
      message: formData.message,
      paymentMethod: formData.paymentMethod,
      total: cartTotal + 30,
      status: 'Order Received',
      createdAt: new Date().toISOString()
    };

    // 2. Save Order to shared owner localStorage (for frontend demo)
    const existingOrdersRaw = localStorage.getItem('bloomwise_orders');
    const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : [];
    
    const ownerOrderFormat = {
      id: newOrder.id,
      customer: newOrder.customerName,
      date: new Date().toISOString().split('T')[0],
      amount: newOrder.total,
      status: 'New', // Owner status maps to 'New' initially
      items: cart.length
    };
    
    existingOrders.push(ownerOrderFormat);
    localStorage.setItem('bloomwise_orders', JSON.stringify(existingOrders));

    // 3. Save to Customer specific orders
    const custOrdersRaw = localStorage.getItem(`bloomwise_orders_${user.id}`);
    const custOrders = custOrdersRaw ? JSON.parse(custOrdersRaw) : [];
    custOrders.push(newOrder);
    localStorage.setItem(`bloomwise_orders_${user.id}`, JSON.stringify(custOrders));

    // 4. Clear Cart & redirect
    clearCart();
    alert('Your order was placed successfully.');
    navigate('/customer/orders');
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, margin: 0, color: '#11281b' }}>Checkout</h1>
      
      {/* Stepper */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['Recipient', 'Delivery', 'Message', 'Payment', 'Review'].map((label, i) => (
          <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 4, borderRadius: 2, background: step >= i + 1 ? '#315e47' : '#e2e8e4' }}></div>
            <span style={{ fontSize: 12, fontWeight: 600, color: step >= i + 1 ? '#315e47' : '#88928d' }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: 24, padding: 32, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 8px', color: '#11281b' }}>Who is this for?</h2>
            
            <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} placeholder="Recipient Name" style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }} />
            <input type="text" name="recipientPhone" value={formData.recipientPhone} onChange={handleChange} placeholder="Recipient Phone" style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }} />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Delivery Address" style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }} />
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }} />

            <button onClick={handleNext} style={{ padding: 16, background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, marginTop: 16, cursor: 'pointer' }}>Next Step</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 8px', color: '#11281b' }}>When should we deliver?</h2>
            
            <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }} />

            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <button onClick={handlePrev} style={{ flex: 1, padding: 16, background: '#fafbfb', color: '#5c6661', border: '1px solid #e2e8e4', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Back</button>
              <button onClick={handleNext} style={{ flex: 2, padding: 16, background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Next Step</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 8px', color: '#11281b' }}>Add a Gift Message</h2>
            
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write something sweet..." style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none', minHeight: 120, fontFamily: 'inherit' }} />

            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <button onClick={handlePrev} style={{ flex: 1, padding: 16, background: '#fafbfb', color: '#5c6661', border: '1px solid #e2e8e4', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Back</button>
              <button onClick={handleNext} style={{ flex: 2, padding: 16, background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Next Step</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 8px', color: '#11281b' }}>Payment Method</h2>
            
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={{ padding: 16, borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }}>
              <option>Credit Card (Demo)</option>
              <option>Cash on Delivery</option>
              <option>Pay in Store</option>
            </select>

            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <button onClick={handlePrev} style={{ flex: 1, padding: 16, background: '#fafbfb', color: '#5c6661', border: '1px solid #e2e8e4', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Back</button>
              <button onClick={handleNext} style={{ flex: 2, padding: 16, background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Review Order</button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 8px', color: '#11281b' }}>Review Order</h2>
            
            <div style={{ background: '#f9f9f9', padding: 24, borderRadius: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#5c6661' }}>Recipient:</span>
                <span style={{ fontWeight: 600 }}>{formData.recipientName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#5c6661' }}>Delivery Date:</span>
                <span style={{ fontWeight: 600 }}>{formData.deliveryDate || 'Not specified'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ color: '#5c6661' }}>Items:</span>
                <span style={{ fontWeight: 600 }}>{cart.length} items</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e2e8e4', paddingTop: 12, marginTop: 12, fontSize: 18 }}>
                <span style={{ color: '#11281b', fontWeight: 600 }}>Total:</span>
                <span style={{ color: '#315e47', fontWeight: 700 }}>₪{cartTotal + 30}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
              <button onClick={handlePrev} style={{ flex: 1, padding: 16, background: '#fafbfb', color: '#5c6661', border: '1px solid #e2e8e4', borderRadius: 12, fontWeight: 600, cursor: 'pointer' }}>Back</button>
              <button onClick={handlePlaceOrder} style={{ flex: 2, padding: 16, background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <CheckCircle2 size={20} /> Place Order
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Checkout;
