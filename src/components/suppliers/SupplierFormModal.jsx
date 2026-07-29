import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = [
  'Roses', 'Lilies', 'Lisianthus', 'Gerbera', 'Chrysanthemums', 
  'Sunflowers', 'Orchids', 'Mixed Flowers', 'Greenery', 
  'Packaging', 'Accessories', 'Exotic Flowers'
];

const STATUSES = ['Active', 'Inactive', 'On Hold'];

const PAYMENT_TERMS = [
  'Payment on delivery', 'Net 7', 'Net 14', 'Net 30', 'Advance payment'
];

const SupplierFormModal = ({ isOpen, onClose, onSave, supplierToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: CATEGORIES[0],
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    productsSupplied: '',
    minOrderAmount: '',
    avgDeliveryTime: '',
    paymentTerms: PAYMENT_TERMS[0],
    status: STATUSES[0],
    rating: 3,
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (supplierToEdit) {
      setFormData(supplierToEdit);
    } else {
      setFormData({
        name: '',
        category: CATEGORIES[0],
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        productsSupplied: '',
        minOrderAmount: '',
        avgDeliveryTime: '',
        paymentTerms: PAYMENT_TERMS[0],
        status: STATUSES[0],
        rating: 3,
        notes: ''
      });
    }
    setErrors({});
  }, [supplierToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Supplier Name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.minOrderAmount && Number(formData.minOrderAmount) < 0) {
      newErrors.minOrderAmount = 'Amount cannot be negative';
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = 'Rating must be between 1 and 5';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  // Allow closing on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="modal-container" style={{
        background: '#fff', borderRadius: 24, width: '100%', maxWidth: 500,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)', overflow: 'hidden'
      }}>
        <div style={{
          background: '#315e47', padding: '24px', display: 'flex', 
          justifyContent: 'space-between', alignItems: 'center', color: '#fff'
        }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 24 }}>
            {supplierToEdit ? 'Edit Supplier' : 'New Supplier'}
          </h2>
          <button 
            onClick={onClose}
            style={{ 
              background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', 
              width: 32, height: 32, borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="supplier-modal-content">
          <div className="supplier-form-group">
            <label className="supplier-form-label">Supplier Name *</label>
            <input 
              type="text" name="name" 
              className="supplier-form-input" 
              value={formData.name} onChange={handleChange} 
              placeholder="e.g. Rose Valley Farm" 
            />
            {errors.name && <span className="supplier-error-msg">{errors.name}</span>}
          </div>

          <div className="supplier-form-group">
            <label className="supplier-form-label">Category *</label>
            <select 
              name="category" 
              className="supplier-form-select" 
              value={formData.category} onChange={handleChange}
            >
              <option value="">Select Category</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span className="supplier-error-msg">{errors.category}</span>}
          </div>

          <div className="supplier-form-group">
            <label className="supplier-form-label">Contact Person</label>
            <input 
              type="text" name="contactPerson" 
              className="supplier-form-input" 
              value={formData.contactPerson} onChange={handleChange} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="supplier-form-group">
              <label className="supplier-form-label">Phone *</label>
              <input 
                type="text" name="phone" 
                className="supplier-form-input" 
                value={formData.phone} onChange={handleChange} 
                placeholder="+1 555-0000" 
              />
              {errors.phone && <span className="supplier-error-msg">{errors.phone}</span>}
            </div>

            <div className="supplier-form-group">
              <label className="supplier-form-label">Email *</label>
              <input 
                type="email" name="email" 
                className="supplier-form-input" 
                value={formData.email} onChange={handleChange} 
                placeholder="contact@supplier.com" 
              />
              {errors.email && <span className="supplier-error-msg">{errors.email}</span>}
            </div>
          </div>

          <div className="supplier-form-group">
            <label className="supplier-form-label">Address</label>
            <input 
              type="text" name="address" 
              className="supplier-form-input" 
              value={formData.address} onChange={handleChange} 
            />
          </div>

          <div className="supplier-form-group">
            <label className="supplier-form-label">Products Supplied</label>
            <input 
              type="text" name="productsSupplied" 
              className="supplier-form-input" 
              value={formData.productsSupplied} onChange={handleChange} 
              placeholder="e.g. Red Roses, White Roses" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="supplier-form-group">
              <label className="supplier-form-label">Min Order Amount (₪)</label>
              <input 
                type="number" name="minOrderAmount" 
                className="supplier-form-input" 
                value={formData.minOrderAmount} onChange={handleChange} 
              />
              {errors.minOrderAmount && <span className="supplier-error-msg">{errors.minOrderAmount}</span>}
            </div>

            <div className="supplier-form-group">
              <label className="supplier-form-label">Avg Delivery Time</label>
              <input 
                type="text" name="avgDeliveryTime" 
                className="supplier-form-input" 
                value={formData.avgDeliveryTime} onChange={handleChange} 
                placeholder="e.g. 2 days" 
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div className="supplier-form-group">
              <label className="supplier-form-label">Payment Terms</label>
              <select 
                name="paymentTerms" 
                className="supplier-form-select" 
                value={formData.paymentTerms} onChange={handleChange}
              >
                {PAYMENT_TERMS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            
            <div className="supplier-form-group">
              <label className="supplier-form-label">Initial Rating</label>
              <input 
                type="number" name="rating" min="1" max="5"
                className="supplier-form-input" 
                value={formData.rating} onChange={handleChange} 
              />
              {errors.rating && <span className="supplier-error-msg">{errors.rating}</span>}
            </div>

            <div className="supplier-form-group">
              <label className="supplier-form-label">Status</label>
              <select 
                name="status" 
                className="supplier-form-select" 
                value={formData.status} onChange={handleChange}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="supplier-form-group">
            <label className="supplier-form-label">Notes</label>
            <textarea 
              name="notes" 
              className="supplier-form-textarea" 
              value={formData.notes} onChange={handleChange} 
            />
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button 
              type="button" 
              onClick={onClose}
              style={{
                flex: 1, padding: 16, borderRadius: 12, border: '1px solid #e2e8e4',
                background: '#fff', color: '#5c6661', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 16
              }}
            >
              Cancel
            </button>
            <button 
              type="submit"
              style={{
                flex: 1, padding: 16, borderRadius: 12, border: 'none',
                background: '#315e47', color: '#fff', fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: 16
              }}
            >
              {supplierToEdit ? 'Update Supplier' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupplierFormModal;
