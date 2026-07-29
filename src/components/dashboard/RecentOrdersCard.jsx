import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../../hooks/useOrders';
import OrderDetailsModal from '../orders/OrderDetailsModal';

export default function RecentOrdersCard() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sort orders by timestamp descending (newest first)
  const recentOrders = [...orders]
    .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
    .slice(0, 3); // Top 3

  const getInitialColor = (name) => {
    const char = (name || '').charAt(0).toUpperCase();
    const colors = { 'S': '#2d5440', 'L': '#305d45', 'O': '#244535', 'E': '#3a7254', 'J': '#1c3a27', 'M': '#478966' };
    return colors[char] || '#315e47';
  };

  return (
    <>
      <section className="section-card">
        <div className="section-header">
          <h3 className="section-title">Recent Orders</h3>
          <span className="view-all" onClick={() => navigate('/owner/orders')} style={{ cursor: 'pointer' }}>View all →</span>
        </div>
        
        <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#88928d', fontSize: '13px' }}>Order</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#88928d', fontSize: '13px' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#88928d', fontSize: '13px' }}>Item</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#88928d', fontSize: '13px' }}>Amount</th>
              <th style={{ textAlign: 'left', padding: '12px 8px', color: '#88928d', fontSize: '13px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: '#88928d' }}>No recent orders.</td>
              </tr>
            ) : (
              recentOrders.map(order => (
                <tr 
                  key={order.id} 
                  style={{ cursor: 'pointer', borderTop: '1px solid #f0fdf4', transition: 'background 0.2s' }}
                  onClick={() => setSelectedOrder(order)}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8faf9'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 8px', fontWeight: '500' }}>{order.id}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: getInitialColor(order.customerName), color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600 }}>
                        {(order.customerName || 'G').charAt(0)}
                      </div>
                      {order.customerName}
                    </div>
                  </td>
                  <td style={{ padding: '12px 8px' }}>{order.item}</td>
                  <td style={{ padding: '12px 8px', fontWeight: '600' }}>₪{order.amount}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`status-pill ${order.status?.toLowerCase().replace(' ', '-') || 'pending'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {selectedOrder && (
        <OrderDetailsModal 
          isOpen={true} 
          onClose={() => setSelectedOrder(null)} 
          order={selectedOrder}
          onUpdateStatus={(status) => {
            updateOrderStatus(selectedOrder.id, status);
            setSelectedOrder({...selectedOrder, status});
          }}
        />
      )}
    </>
  );
}
