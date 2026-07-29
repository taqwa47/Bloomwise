import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Trash2, Save, Send, X } from 'lucide-react';
import { getSupplierById, savePurchaseOrders, getPurchaseOrders, saveSuppliers, getSuppliers } from '../data/mockSuppliers';
import ConfirmDialog from '../components/suppliers/ConfirmDialog';
import '../styles/Suppliers.css';

const generateOrderId = () => `PO-${Math.floor(100000 + Math.random() * 900000)}`;

const SupplierOrderForm = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();
  
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  const [orderId] = useState(generateOrderId());
  const [orderDate, setOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedDelivery, setExpectedDelivery] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('BloomWise Main Shop, Tel Aviv');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [notes, setNotes] = useState('');

  const [items, setItems] = useState([
    { id: Date.now().toString(), name: '', category: '', quantity: 1, unitCost: 0, lineTotal: 0 }
  ]);

  const [deliveryCost, setDeliveryCost] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [includeVat, setIncludeVat] = useState(true);

  const [toastMsg, setToastMsg] = useState('');
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);

  useEffect(() => {
    const s = getSupplierById(supplierId);
    if (s) {
      setSupplier(s);
      setPaymentTerms(s.paymentTerms || '');
    }
    setLoading(false);
  }, [supplierId]);

  if (loading) return <div>Loading...</div>;
  if (!supplier) return <div>Supplier not found</div>;

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitCost') {
          const qty = Math.max(1, Number(updatedItem.quantity) || 1);
          const cost = Math.max(0, Number(updatedItem.unitCost) || 0);
          updatedItem.quantity = qty;
          updatedItem.unitCost = cost;
          updatedItem.lineTotal = qty * cost;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', category: '', quantity: 1, unitCost: 0, lineTotal: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const vatAmount = includeVat ? (subtotal - Number(discount) + Number(deliveryCost)) * 0.17 : 0;
  const finalTotal = subtotal + Number(deliveryCost) - Number(discount) + vatAmount;

  const validate = () => {
    if (!expectedDelivery) {
      showToast('Expected Delivery Date is required');
      return false;
    }
    for (let i of items) {
      if (!i.name.trim()) {
        showToast('All items must have a name');
        return false;
      }
    }
    return true;
  };

  const saveOrder = (status) => {
    if (status === 'Ordered' && !validate()) return;

    const newOrder = {
      id: orderId,
      supplierId: supplier.id,
      supplierName: supplier.name,
      orderDate,
      expectedDelivery,
      deliveryAddress,
      paymentTerms,
      notes,
      items,
      subtotal,
      deliveryCost: Number(deliveryCost),
      discount: Number(discount),
      vat: vatAmount,
      finalTotal,
      status, // 'Draft' or 'Ordered'
      paymentStatus: 'Unpaid'
    };

    const orders = getPurchaseOrders();
    savePurchaseOrders([...orders, newOrder]);

    if (status === 'Ordered') {
      const suppliers = getSuppliers();
      const updatedSuppliers = suppliers.map(s => 
        s.id === supplier.id ? { ...s, lastOrderDate: orderDate } : s
      );
      saveSuppliers(updatedSuppliers);
      showToast('Supplier order placed successfully');
    } else {
      showToast('Order saved as draft');
    }

    setTimeout(() => {
      navigate(`/owner/suppliers/${supplier.id}`);
    }, 1500);
  };

  const handleCancelClick = () => {
    // If user typed anything beyond default, warn them
    const hasChanges = expectedDelivery !== '' || notes !== '' || items[0].name !== '' || items.length > 1;
    if (hasChanges) {
      setIsCancelConfirmOpen(true);
    } else {
      navigate(`/owner/suppliers`);
    }
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
            onClick={handleCancelClick}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', color: '#5c6661', gap: '4px',
              fontFamily: 'var(--font-sans)', fontWeight: 600
            }}
          >
            <ChevronLeft size={20} /> Cancel
          </button>
          <div style={{width: 4, height: 24, background: '#315e47', borderRadius: 4}}></div>
          <h1 className="dashboard-title">New Purchase Order</h1>
        </div>
        
        <div className="suppliers-actions-top">
          <button 
            onClick={() => saveOrder('Draft')}
            style={{
              background: '#fff', border: '1px solid #e2e8e4', color: '#5c6661',
              padding: '10px 20px', borderRadius: '20px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)'
            }}
          >
            <Save size={16} /> Save as Draft
          </button>
          <button className="new-supplier-btn" onClick={() => saveOrder('Ordered')}>
            <Send size={16} /> Place Order
          </button>
        </div>
      </header>

      <div className="details-grid">
        <section className="details-main-content">
          {/* Order Details Header */}
          <div className="supplier-card" style={{ gap: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: 0 }}>
              Order Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Supplier</label>
                <input type="text" className="supplier-form-input" value={supplier.name} disabled />
              </div>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Order ID</label>
                <input type="text" className="supplier-form-input" value={orderId} disabled />
              </div>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Order Date</label>
                <input type="date" className="supplier-form-input" value={orderDate} onChange={e => setOrderDate(e.target.value)} />
              </div>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Expected Delivery *</label>
                <input type="date" className="supplier-form-input" value={expectedDelivery} onChange={e => setExpectedDelivery(e.target.value)} />
              </div>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Delivery Address</label>
                <input type="text" className="supplier-form-input" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} />
              </div>
              <div className="supplier-form-group">
                <label className="supplier-form-label">Payment Terms</label>
                <input type="text" className="supplier-form-input" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="supplier-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: 0 }}>
                Order Items
              </h2>
              <button 
                onClick={addItem}
                style={{
                  background: '#ebfdf2', border: 'none', color: '#315e47',
                  padding: '8px 16px', borderRadius: '16px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 8, fontSize: 13
                }}
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
            
            <div className="order-items-builder">
              {/* Header Row for desktop */}
              <div className="order-item-row" style={{ color: '#9aa69d', fontSize: 12, fontWeight: 600, paddingBottom: 8, borderBottom: '1px solid #f0efea' }}>
                <div>PRODUCT NAME</div>
                <div>CATEGORY</div>
                <div>QTY</div>
                <div>UNIT COST (₪)</div>
                <div>TOTAL (₪)</div>
                <div style={{ width: 36 }}></div>
              </div>

              {items.map((item, index) => (
                <div key={item.id} className="order-item-row">
                  <input 
                    type="text" className="supplier-form-input" placeholder="Product name"
                    value={item.name} onChange={e => handleItemChange(item.id, 'name', e.target.value)}
                  />
                  <input 
                    type="text" className="supplier-form-input" placeholder="Category"
                    value={item.category} onChange={e => handleItemChange(item.id, 'category', e.target.value)}
                  />
                  <input 
                    type="number" className="supplier-form-input" placeholder="Qty" min="1"
                    value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)}
                  />
                  <input 
                    type="number" className="supplier-form-input" placeholder="Cost" min="0" step="0.01"
                    value={item.unitCost || ''} onChange={e => handleItemChange(item.id, 'unitCost', e.target.value)}
                  />
                  <div style={{ fontWeight: 600, color: '#11281b' }}>₪{item.lineTotal.toLocaleString()}</div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="supplier-icon-btn delete"
                    disabled={items.length === 1}
                    style={{ opacity: items.length === 1 ? 0.3 : 1 }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="supplier-form-group" style={{ marginTop: 24 }}>
              <label className="supplier-form-label">Order Notes</label>
              <textarea 
                className="supplier-form-textarea" 
                placeholder="Any special instructions for the supplier..."
                value={notes} onChange={e => setNotes(e.target.value)}
              />
            </div>
          </div>
        </section>

        <aside className="details-sidebar-card" style={{ height: 'fit-content' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#11281b', fontSize: 20, margin: '0 0 24px' }}>
            Order Summary
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5c6661' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#11281b' }}>₪{subtotal.toLocaleString()}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#5c6661' }}>
              <span>Delivery Cost</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 4 }}>₪</span>
                <input 
                  type="number" className="supplier-form-input" style={{ width: 80, padding: '4px 8px', textAlign: 'right' }}
                  value={deliveryCost || ''} onChange={e => setDeliveryCost(e.target.value)} min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#5c6661' }}>
              <span>Discount</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: 4 }}>-₪</span>
                <input 
                  type="number" className="supplier-form-input" style={{ width: 80, padding: '4px 8px', textAlign: 'right' }}
                  value={discount || ''} onChange={e => setDiscount(e.target.value)} min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#5c6661' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={includeVat} onChange={e => setIncludeVat(e.target.checked)} />
                Add VAT (17%)
              </label>
              <span style={{ fontWeight: 600, color: '#11281b' }}>₪{vatAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
            </div>

            <div style={{ borderTop: '2px dashed #f0efea', margin: '8px 0' }}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#315e47', fontSize: 20, fontFamily: 'var(--font-heading)' }}>
              <span>Final Total</span>
              <span>₪{finalTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</span>
            </div>
          </div>
        </aside>
      </div>

      <ConfirmDialog 
        isOpen={isCancelConfirmOpen}
        title="Discard changes?"
        message="You have unsaved changes. Are you sure you want to cancel? All progress will be lost."
        confirmText="Discard"
        isDestructive={true}
        onConfirm={() => navigate('/owner/suppliers')}
        onCancel={() => setIsCancelConfirmOpen(false)}
      />
    </main>
  );
};

export default SupplierOrderForm;
