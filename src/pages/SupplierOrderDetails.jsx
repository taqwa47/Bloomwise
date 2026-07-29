import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Box, Truck, CheckCircle } from 'lucide-react';
import { getPurchaseOrders, savePurchaseOrders, saveSuppliers, getSuppliers } from '../data/mockSuppliers';
import ConfirmDialog from '../components/suppliers/ConfirmDialog';
import '../styles/Suppliers.css';

const SupplierOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isReceiving, setIsReceiving] = useState(false);
  const [receiveData, setReceiveData] = useState([]);
  const [receiveNotes, setReceiveNotes] = useState('');
  const [updateInventory, setUpdateInventory] = useState(true);

  const [toastMsg, setToastMsg] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const orders = getPurchaseOrders();
    const o = orders.find(x => x.id === orderId);
    if (o) {
      setOrder(o);
      setReceiveData(o.items.map(i => ({ 
        ...i, 
        receivedQuantity: i.quantity, 
        damagedQuantity: 0 
      })));
    }
    setLoading(false);
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleReceiveChange = (id, field, value) => {
    setReceiveData(receiveData.map(item => {
      if (item.id === id) {
        return { ...item, [field]: Math.max(0, Number(value) || 0) };
      }
      return item;
    }));
  };

  const handleConfirmReceive = () => {
    // 1. Update Order Status
    const orders = getPurchaseOrders();
    const updatedOrders = orders.map(o => {
      if (o.id === order.id) {
        return { ...o, status: 'Delivered', receivedItems: receiveData, receiveNotes };
      }
      return o;
    });
    savePurchaseOrders(updatedOrders);
    setOrder(updatedOrders.find(o => o.id === order.id));

    // 2. Update Supplier Last Order Date
    const suppliers = getSuppliers();
    const updatedSuppliers = suppliers.map(s => 
      s.id === order.supplierId ? { ...s, lastOrderDate: new Date().toISOString().split('T')[0] } : s
    );
    saveSuppliers(updatedSuppliers);

    // 3. Update Inventory (Mock behavior)
    if (updateInventory) {
      const inventory = JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]');
      let updatedInventory = [...inventory];

      receiveData.forEach(item => {
        const netReceived = item.receivedQuantity - item.damagedQuantity;
        if (netReceived > 0) {
          const existingItem = updatedInventory.find(inv => inv.name.toLowerCase() === item.name.toLowerCase());
          if (existingItem) {
            existingItem.quantity += netReceived;
          } else {
            updatedInventory.push({
              id: `inv_${Date.now()}_${Math.random()}`,
              name: item.name,
              category: item.category,
              quantity: netReceived,
              minQuantity: 10,
              price: item.unitCost * 1.5, // Mock markup
              status: 'In Stock',
              image: 'https://images.unsplash.com/photo-1563241598-bbdc7ea21976?auto=format&fit=crop&q=80&w=150'
            });
          }
        }
      });
      localStorage.setItem('bloomwise_inventory', JSON.stringify(updatedInventory));
    }

    setIsConfirmOpen(false);
    setIsReceiving(false);
    showToast('Order received and inventory updated');
  };

  return (
    <main className="dashboard-main suppliers-main">
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, 
          background: '#ebfdf2', color: '#315e47', 
          padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 9999
        }}>
          {toastMsg}
        </div>
      )}

      <header className="suppliers-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          <button 
            onClick={() => navigate(`/owner/suppliers/${order.supplierId}`)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', color: '#5c6661', gap: '4px',
              fontFamily: 'var(--font-sans)', fontWeight: 600
            }}
          >
            <ChevronLeft size={20} /> Back to Supplier
          </button>
          <div style={{width: 4, height: 24, background: '#315e47', borderRadius: 4}}></div>
          <h1 className="dashboard-title">Order {order.id}</h1>
          <span style={{ 
            padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600,
            background: order.status === 'Delivered' ? '#ebfdf2' : order.status === 'Draft' ? '#f0f3f1' : '#fdf5eb',
            color: order.status === 'Delivered' ? '#315e47' : order.status === 'Draft' ? '#5c6661' : '#d18a45',
            marginLeft: 8
          }}>
            {order.status}
          </span>
        </div>
        
        <div className="suppliers-actions-top">
          {order.status === 'Ordered' && !isReceiving && (
            <button className="new-supplier-btn" onClick={() => setIsReceiving(true)}>
              <Box size={16} /> Receive Order
            </button>
          )}
        </div>
      </header>

      <div className="details-grid">
        <section className="details-main-content">
          <div className="supplier-card" style={{ gap: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: 0 }}>
              {isReceiving ? 'Receive Items' : 'Order Items'}
            </h2>

            {isReceiving && (
              <div style={{ background: '#fdf5eb', padding: '16px', borderRadius: 12, fontSize: 14, color: '#d18a45', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Truck size={20} style={{ flexShrink: 0 }} />
                <p style={{ margin: 0 }}>
                  Enter the actual quantities received. Any damaged items will be deducted from the net quantity added to inventory.
                </p>
              </div>
            )}

            <div className="orders-table-wrapper" style={{ overflowX: 'auto' }}>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    {isReceiving ? (
                      <>
                        <th>Ordered</th>
                        <th>Received Qty</th>
                        <th>Damaged Qty</th>
                      </>
                    ) : (
                      <>
                        <th>Qty</th>
                        <th>Unit Cost</th>
                        <th>Total</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(isReceiving ? receiveData : order.items).map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.name}</td>
                      <td>{item.category}</td>
                      {isReceiving ? (
                        <>
                          <td>{item.quantity}</td>
                          <td>
                            <input 
                              type="number" className="supplier-form-input" style={{ width: 80, padding: '8px' }}
                              value={item.receivedQuantity} onChange={e => handleReceiveChange(item.id, 'receivedQuantity', e.target.value)} min="0"
                            />
                          </td>
                          <td>
                            <input 
                              type="number" className="supplier-form-input" style={{ width: 80, padding: '8px' }}
                              value={item.damagedQuantity} onChange={e => handleReceiveChange(item.id, 'damagedQuantity', e.target.value)} min="0"
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{item.quantity}</td>
                          <td>₪{(item.unitCost || 0).toLocaleString()}</td>
                          <td style={{ fontWeight: 600 }}>₪{(item.lineTotal || 0).toLocaleString()}</td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isReceiving && (
              <>
                <div className="supplier-form-group" style={{ marginTop: 16 }}>
                  <label className="supplier-form-label">Receiving Notes (Optional)</label>
                  <textarea 
                    className="supplier-form-textarea" 
                    placeholder="E.g., 2 roses were wilted upon delivery."
                    value={receiveNotes} onChange={e => setReceiveNotes(e.target.value)}
                  />
                </div>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#11281b', fontWeight: 500 }}>
                  <input type="checkbox" checked={updateInventory} onChange={e => setUpdateInventory(e.target.checked)} />
                  Automatically update inventory quantities
                </label>

                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
                  <button 
                    onClick={() => setIsReceiving(false)}
                    style={{
                      padding: '12px 24px', borderRadius: 20, border: '1px solid #e2e8e4',
                      background: '#fff', color: '#5c6661', fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'var(--font-sans)', fontSize: 14
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setIsConfirmOpen(true)}
                    style={{
                      padding: '12px 24px', borderRadius: 20, border: 'none',
                      background: '#315e47', color: '#fff', fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontFamily: 'var(--font-sans)', fontSize: 14
                    }}
                  >
                    <CheckCircle size={18} /> Confirm Receipt
                  </button>
                </div>
              </>
            )}

            {!isReceiving && order.status === 'Delivered' && order.receiveNotes && (
              <div style={{ background: '#fdf5eb', padding: 16, borderRadius: 12, fontSize: 14, color: '#5c6661' }}>
                <strong style={{ color: '#d18a45', display: 'block', marginBottom: 4 }}>Receiving Notes</strong>
                {order.receiveNotes}
              </div>
            )}
          </div>
        </section>

        <aside className="details-sidebar-card" style={{ height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: '0 0 24px' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>Supplier</span>
              <span style={{ fontWeight: 600, color: '#11281b' }}>{order.supplierName}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>Order Date</span>
              <span style={{ fontWeight: 600, color: '#11281b' }}>
                {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#11281b' }}>₪{(order.subtotal || 0).toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>Delivery Cost</span>
              <span style={{ fontWeight: 600, color: '#11281b' }}>₪{(order.deliveryCost || 0).toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>Discount</span>
              <span style={{ fontWeight: 600, color: '#c93434' }}>-₪{(order.discount || 0).toLocaleString()}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>VAT (17%)</span>
              <span style={{ fontWeight: 600, color: '#11281b' }}>₪{(order.vat || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
            </div>

            <div style={{ borderTop: '2px dashed #f0efea', margin: '8px 0' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#315e47', fontSize: 20, fontFamily: 'var(--font-heading)' }}>
              <span>Final Total</span>
              <span>₪{(order.finalTotal || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        title="Confirm Order Receipt"
        message="Are you sure you want to mark this order as Delivered? This action will optionally update your inventory levels based on the received quantities."
        confirmText="Confirm Receipt"
        isDestructive={false}
        onConfirm={handleConfirmReceive}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </main>
  );
};

export default SupplierOrderDetails;
