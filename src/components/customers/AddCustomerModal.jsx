import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CUSTOMER_TYPES = ['Regular Customer', 'VIP Customer', 'Corporate Customer'];

const AddCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    type: CUSTOMER_TYPES[0]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        birthday: '',
        type: CUSTOMER_TYPES[0]
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.birthday.trim()) newErrors.birthday = 'Birthday is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      
      const newCustomer = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        birthday: formData.birthday,
        type: formData.type,
        ordersCount: 0,
        totalSpent: 0,
        lastOrderDate: 'Never',
      };
      
      onAddCustomer(newCustomer);
    }
  };

  return (
    <div className="add-customer-modal-overlay" onClick={onClose}>
      <div className="add-customer-modal-content" onClick={e => e.stopPropagation()}>
        <div className="add-customer-header">
          <h2>New Customer</h2>
          <button type="button" className="ns-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="add-customer-body">
          <div className="ns-form-group">
            <label>Full Name</label>
            <input 
              type="text" name="name"
              value={formData.name} onChange={handleChange}
              placeholder="e.g. Sarah Johnson" 
              className={errors.name ? 'ns-error-input' : ''}
            />
            {errors.name && <span className="ns-error-text">{errors.name}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="ns-form-group">
              <label>Phone</label>
              <input 
                type="text" name="phone"
                value={formData.phone} onChange={handleChange}
                placeholder="+1 555-0000" 
                className={errors.phone ? 'ns-error-input' : ''}
              />
              {errors.phone && <span className="ns-error-text">{errors.phone}</span>}
            </div>

            <div className="ns-form-group">
              <label>Email</label>
              <input 
                type="text" name="email"
                value={formData.email} onChange={handleChange}
                placeholder="customer@example.com" 
                className={errors.email ? 'ns-error-input' : ''}
              />
              {errors.email && <span className="ns-error-text">{errors.email}</span>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="ns-form-group">
              <label>Birthday</label>
              <input 
                type="text" name="birthday"
                value={formData.birthday} onChange={handleChange}
                placeholder="e.g. Aug 15" 
                className={errors.birthday ? 'ns-error-input' : ''}
              />
              {errors.birthday && <span className="ns-error-text">{errors.birthday}</span>}
            </div>

            <div className="ns-form-group">
              <label>Customer Type</label>
              <select 
                name="type"
                value={formData.type} onChange={handleChange}
                style={{
                  padding: '14px 16px', borderRadius: 16, border: '1px solid #e2e8e4',
                  background: '#fafbfb', fontFamily: 'var(--font-sans)', fontSize: 14,
                  outline: 'none'
                }}
              >
                {CUSTOMER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="ns-submit-btn"
            disabled={isSubmitting}
            style={{ marginTop: 8 }}
          >
            {isSubmitting ? 'Adding...' : 'Add Customer'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
