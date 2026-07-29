import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const CustomerCart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        <ShoppingBag size={48} color="#88928d" style={{ marginBottom: 16 }} />
        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', margin: '0 0 16px' }}>Your cart is empty</h2>
        <p style={{ color: '#5c6661', marginBottom: 32 }}>Looks like you haven't added any beautiful blooms yet.</p>
        <Link to="/customer/shop" style={{ background: '#315e47', color: '#fff', padding: '14px 32px', borderRadius: 12, textDecoration: 'none', fontWeight: 600 }}>
          Shop Flowers
        </Link>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 32, margin: 0, color: '#11281b' }}>Shopping Cart</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
        
        {/* Cart Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {cart.map(item => (
            <div key={item.cartItemId} style={{ display: 'flex', gap: 16, background: '#fff', padding: 16, borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 12 }} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: 16, color: '#11281b' }}>{item.name}</h3>
                  <button onClick={() => removeFromCart(item.cartItemId)} style={{ background: 'none', border: 'none', color: '#c93434', cursor: 'pointer', padding: 0 }}><Trash2 size={16} /></button>
                </div>
                <div style={{ fontSize: 13, color: '#5c6661', marginBottom: 8 }}>Size: {item.size}</div>
                {item.addons?.length > 0 && <div style={{ fontSize: 13, color: '#5c6661', marginBottom: 8 }}>+ {item.addons.length} Add-ons</div>}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#315e47' }}>₪{item.price}</div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fafbfb', border: '1px solid #e2e8e4', borderRadius: 8, padding: 4 }}>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}>-</button>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div style={{ background: '#fff', padding: 24, borderRadius: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.04)', position: 'sticky', top: 100 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 18, color: '#11281b' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#5c6661', fontSize: 14 }}>
              <span>Subtotal</span>
              <span>₪{cartTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: '#5c6661', fontSize: 14 }}>
              <span>Delivery</span>
              <span>₪30</span>
            </div>
            
            <div style={{ height: 1, background: '#e2e8e4', margin: '16px 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, color: '#11281b', fontSize: 18, fontWeight: 700 }}>
              <span>Total</span>
              <span>₪{cartTotal + 30}</span>
            </div>

            <button 
              onClick={() => navigate('/customer/checkout')}
              style={{ width: '100%', padding: '16px', background: '#315e47', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}
            >
              Checkout <ArrowRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CustomerCart;
