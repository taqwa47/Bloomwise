import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit2, Trash2, Plus, Truck, MapPin, Phone, Mail, Box, Clock, CreditCard } from 'lucide-react';
import { getSupplierById, getOrdersForSupplier, saveSuppliers } from '../data/mockSuppliers';
import SupplierFormModal from '../components/suppliers/SupplierFormModal';
import ConfirmDialog from '../components/suppliers/ConfirmDialog';
import SupplierRating from '../components/suppliers/SupplierRating';
import '../styles/Suppliers.css';

const SupplierDetails = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  
  const [supplier, setSupplier] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const s = getSupplierById(supplierId);
    if (s) {
      setSupplier(s);
      setOrders(getOrdersForSupplier(supplierId));
    }
    setLoading(false);
  }, [supplierId]);

  if (loading) return <div>Loading...</div>;
  
  if (!supplier) {
    return (
      <main className="dashboard-main">
        <div style={{ textAlign: 'center', padding: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b' }}>Supplier not found</h2>
          <button className="supplier-order-btn" onClick={() => navigate('/owner/suppliers')} style={{ marginTop: 20 }}>
            Back to Suppliers
          </button>
        </div>
      </main>
    );
  }

  const handleUpdate = (data) => {
    const all = JSON.parse(localStorage.getItem('bloomwise_suppliers') || '[]');
    const updated = all.map(s => s.id === data.id ? data : s);
    saveSuppliers(updated);
    setSupplier(data);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    const all = JSON.parse(localStorage.getItem('bloomwise_suppliers') || '[]');
    const updated = all.filter(s => s.id !== supplier.id);
    saveSuppliers(updated);
    navigate('/owner/suppliers');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const totalAmountPurchased = orders.reduce((sum, o) => sum + (o.finalTotal || 0), 0);

  return (
    <main className="dashboard-main suppliers-main">
      <header className="suppliers-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <button 
            onClick={() => navigate('/owner/suppliers')}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', color: '#5c6661', gap: '4px',
              fontFamily: 'var(--font-sans)', fontWeight: 600
            }}
          >
            <ChevronLeft size={20} /> Back
          </button>
          <div style={{width: 4, height: 24, background: '#315e47', borderRadius: 4}}></div>
          <h1 className="dashboard-title">{supplier.name}</h1>
          <span className="supplier-category-badge" style={{ marginLeft: 8 }}>{supplier.category}</span>
        </div>
        
        <div className="suppliers-actions-top">
          <button className="supplier-icon-btn edit" onClick={() => setIsModalOpen(true)}>
            <Edit2 size={16} />
          </button>
          <button className="supplier-icon-btn delete" onClick={() => setIsConfirmOpen(true)}>
            <Trash2 size={16} />
          </button>
          <button className="new-supplier-btn" onClick={() => navigate(`/owner/suppliers/${supplier.id}/order`)}>
            <Plus size={18} /> New Order
          </button>
        </div>
      </header>

      <div className="details-grid">
        <aside className="details-sidebar-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <div className="supplier-icon-wrapper" style={{ width: 64, height: 64, borderRadius: 20 }}>
              <Truck size={28} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 4px', fontSize: 22, color: '#11281b' }}>
                Supplier Profile
              </h2>
              <SupplierRating supplierId={supplier.id} initialRating={supplier.rating} readOnly={true} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <Box size={20} style={{ flexShrink: 0, color: '#315e47' }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 2 }}>Products</strong>
                <span style={{ fontSize: 14 }}>{supplier.productsSupplied || 'N/A'}</span>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <Phone size={20} style={{ flexShrink: 0, color: '#315e47' }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 2 }}>Contact</strong>
                <span style={{ fontSize: 14, display: 'block' }}>{supplier.contactPerson || 'N/A'}</span>
                <a href={`tel:${supplier.phone}`} style={{ fontSize: 14, color: '#5c6661', textDecoration: 'none' }}>{supplier.phone}</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <Mail size={20} style={{ flexShrink: 0, color: '#315e47' }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 2 }}>Email</strong>
                <a href={`mailto:${supplier.email}`} style={{ fontSize: 14, color: '#5c6661', textDecoration: 'none' }}>{supplier.email}</a>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <MapPin size={20} style={{ flexShrink: 0, color: '#315e47' }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 2 }}>Address</strong>
                <span style={{ fontSize: 14 }}>{supplier.address || 'N/A'}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f0efea', margin: '8px 0' }}></div>

            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <CreditCard size={20} style={{ flexShrink: 0, color: '#315e47' }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 2 }}>Order Terms</strong>
                <span style={{ fontSize: 14, display: 'block' }}>Min Order: ₪{supplier.minOrderAmount || 0}</span>
                <span style={{ fontSize: 14, display: 'block' }}>Terms: {supplier.paymentTerms}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, color: '#5c6661' }}>
              <Clock size={20} style={{ flexShrink: 0, color: '#315e47' }} />
              <div>
                <strong style={{ display: 'block', color: '#11281b', fontSize: 13, marginBottom: 2 }}>Avg Delivery Time</strong>
                <span style={{ fontSize: 14 }}>{supplier.avgDeliveryTime || 'N/A'}</span>
              </div>
            </div>

            {supplier.notes && (
              <div style={{ background: '#fdf5eb', padding: 16, borderRadius: 12, fontSize: 13, color: '#5c6661' }}>
                <strong style={{ color: '#d18a45', display: 'block', marginBottom: 4 }}>Notes</strong>
                {supplier.notes}
              </div>
            )}
          </div>
        </aside>

        <section className="details-main-content">
          <div style={{ display: 'flex', gap: 24, marginBottom: 8 }}>
            <div className="analytics-stat-box" style={{ flex: 1, padding: 20 }}>
              <div className="analytics-stat-label">TOTAL PURCHASES</div>
              <div className="analytics-stat-value">₪{totalAmountPurchased.toLocaleString()}</div>
              <div className="analytics-stat-desc">{orders.length} total orders</div>
            </div>
            <div className="analytics-stat-box" style={{ flex: 1, padding: 20 }}>
              <div className="analytics-stat-label">LAST ORDER DATE</div>
              <div className="analytics-stat-value">{formatDate(supplier.lastOrderDate)}</div>
              <div className="analytics-stat-desc">Status: {supplier.status}</div>
            </div>
          </div>

          <div className="orders-card">
            <h3 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: '0 0 24px' }}>
              Purchase Order History
            </h3>
            
            {orders.length === 0 ? (
              <p style={{ color: '#9aa69d', fontSize: 14 }}>No purchase orders found for this supplier.</p>
            ) : (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>PO ID</th>
                    <th>Date</th>
                    <th>Expected</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.sort((a,b) => new Date(b.orderDate) - new Date(a.orderDate)).map(order => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>{order.id}</td>
                      <td>{formatDate(order.orderDate)}</td>
                      <td>{formatDate(order.expectedDelivery)}</td>
                      <td>{order.items?.length || 0}</td>
                      <td style={{ fontWeight: 600 }}>₪{(order.finalTotal || 0).toLocaleString()}</td>
                      <td>
                        <span style={{ 
                          padding: '4px 8px', borderRadius: 12, fontSize: 12, fontWeight: 600,
                          background: order.status === 'Delivered' ? '#ebfdf2' : order.status === 'Draft' ? '#f0f3f1' : '#fdf5eb',
                          color: order.status === 'Delivered' ? '#315e47' : order.status === 'Draft' ? '#5c6661' : '#d18a45'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => navigate(`/owner/supplier-orders/${order.id}`)}
                          style={{
                            background: 'transparent', color: '#315e47', border: '1px solid #315e47',
                            padding: '4px 12px', borderRadius: 12, cursor: 'pointer',
                            fontSize: 12, fontWeight: 600
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>

      <SupplierFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleUpdate}
        supplierToEdit={supplier}
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        title="Delete Supplier"
        message={`Are you sure you want to delete ${supplier.name}?`}
        confirmText="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </main>
  );
};

export default SupplierDetails;
