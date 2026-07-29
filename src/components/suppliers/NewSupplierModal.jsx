import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../../styles/NewSupplierModal.css';

const NewSupplierModal = ({ isOpen, onClose, onAddSupplier }) => {
  const [formData, setFormData] = useState({
    supplierName: '',
    category: '',
    phone: '',
    email: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({ supplierName: '', category: '', phone: '', email: '' });
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
    if (!formData.supplierName.trim()) newErrors.supplierName = 'Supplier Name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate network request or processing time if needed, though local is fast
      // Map to the existing supplier structure
      const newSupplier = {
        name: formData.supplierName,
        category: formData.category,
        phone: formData.phone,
        email: formData.email,
        rating: 0,
        status: 'Active',
      };
      
      await onAddSupplier(newSupplier);
      
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="ns-modal-overlay" onClick={onClose}>
      <div className="ns-modal-content" onClick={e => e.stopPropagation()}>
        <div className="ns-modal-header">
          <h2>New Supplier</h2>
          <button type="button" className="ns-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="ns-modal-body">
          <div className="ns-form-group">
            <label>Supplier Name</label>
            <input 
              type="text" 
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              placeholder="Rose Valley Farm" 
              className={errors.supplierName ? 'ns-error-input' : ''}
            />
            {errors.supplierName && <span className="ns-error-text">{errors.supplierName}</span>}
          </div>

          <div className="ns-form-group">
            <label>Category</label>
            <input 
              type="text" 
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Roses" 
              className={errors.category ? 'ns-error-input' : ''}
            />
            {errors.category && <span className="ns-error-text">{errors.category}</span>}
          </div>

          <div className="ns-form-group">
            <label>Phone</label>
            <input 
              type="text" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 555-0000" 
              className={errors.phone ? 'ns-error-input' : ''}
            />
            {errors.phone && <span className="ns-error-text">{errors.phone}</span>}
          </div>

          <div className="ns-form-group">
            <label>Email</label>
            <input 
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contact@supplier.com" 
              className={errors.email ? 'ns-error-input' : ''}
            />
            {errors.email && <span className="ns-error-text">{errors.email}</span>}
          </div>

          <button 
            type="submit" 
            className="ns-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Supplier'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewSupplierModal;
