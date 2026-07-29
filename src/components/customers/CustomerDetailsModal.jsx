import React, { useEffect, useState } from 'react';
import { X, Mail, Phone, Calendar as CalendarIcon, ShoppingBag } from 'lucide-react';
import { getCustomerOrders } from '../../data/mockCustomers';

const CustomerDetailsModal = ({ isOpen, onClose, customer }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isOpen && customer) {
      setOrders(getCustomerOrders(customer.id));
    }
  }, [isOpen, customer]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !customer) return null;

  return (
    <div className="add-customer-modal-overlay" onClick={onClose}>
      <div className="customer-details-modal-content" onClick={e => e.stopPropagation()}>
        <div className="customer-details-header">
          <div className="customer-avatar" style={{ width: 64, height: 64, fontSize: 28 }}>
            {customer.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 4px', fontSize: 24, color: '#11281b' }}>
              {customer.name}
            </h2>
            <span className="customer-type" style={{ fontSize: 14 }}>{customer.type}</span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{ 
              background: 'transparent', border: 'none', color: '#9aa69d', 
              cursor: 'pointer', display: 'flex', padding: 8
            }}
          >
            <X size={24} />
          </button>
        </div>

        <div className="customer-details-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <Phone size={20} style={{ color: '#315e47', flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 4 }}>Phone</strong>
                <span style={{ fontSize: 14 }}>{customer.phone || 'N/A'}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <Mail size={20} style={{ color: '#315e47', flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 4 }}>Email</strong>
                <span style={{ fontSize: 14 }}>{customer.email || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <CalendarIcon size={20} style={{ color: '#315e47', flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 4 }}>Birthday</strong>
                <span style={{ fontSize: 14 }}>{customer.birthday || 'N/A'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <ShoppingBag size={20} style={{ color: '#315e47', flexShrink: 0 }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 4 }}>Total Spent</strong>
                <span style={{ fontSize: 14, fontWeight: 600 }}>${customer.totalSpent}</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f0efea', paddingTop: 24, marginTop: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: '0 0 16px' }}>
              Previous Orders
            </h3>
            
            {orders.length > 0 ? (
              <table className="orders-history-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>{order.id}</td>
                      <td>{order.date}</td>
                      <td style={{ fontWeight: 600 }}>${order.total}</td>
                      <td>
                        <span style={{ 
                          padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                          background: order.status === 'Completed' ? '#ebfdf2' : '#fdf5eb',
                          color: order.status === 'Completed' ? '#315e47' : '#d18a45'
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p style={{ color: '#9aa69d', fontSize: 14 }}>No previous orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;
