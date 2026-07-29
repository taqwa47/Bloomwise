import React, { useState } from 'react';
import { Truck, Phone, Mail, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SupplierRating from './SupplierRating';

const SupplierCard = ({ supplier, onEdit, onDelete, onRatingUpdate }) => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Never';
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${d.getDate()}`;
  };

  const handleRatingChange = (newRating) => {
    setToastMessage('Supplier rating updated');
    if (onRatingUpdate) onRatingUpdate(supplier.id, newRating);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleOrder = (e) => {
    e.stopPropagation();
    navigate(`/owner/suppliers/${supplier.id}/order`);
  };

  const navigateDetails = () => {
    navigate(`/owner/suppliers/${supplier.id}`);
  };

  return (
    <div className="supplier-card">
      {/* Toast Notification (Scoped to card for rating) */}
      {toastMessage && (
        <div style={{
          position: 'absolute', top: 16, right: 16, 
          background: '#ebfdf2', color: '#315e47', 
          padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)', zIndex: 10
        }}>
          {toastMessage}
        </div>
      )}

      <div className="supplier-card-header">
        <div className="supplier-card-title-area">
          <div className="supplier-icon-wrapper">
            <Truck size={24} />
          </div>
          <div className="supplier-name-col">
            <h3 className="supplier-name" onClick={navigateDetails}>
              {supplier.name}
            </h3>
            <span className="supplier-category-badge">{supplier.category}</span>
          </div>
        </div>
        <div className="supplier-last-order">
          <span className="supplier-last-order-label">Last order</span>
          <span className="supplier-last-order-date">{formatDate(supplier.lastOrderDate)}</span>
        </div>
      </div>

      <div className="supplier-contact-info">
        <div className="supplier-contact-row">
          <Phone size={16} className="supplier-contact-icon" />
          <a href={`tel:${supplier.phone}`} onClick={e => e.stopPropagation()}>{supplier.phone}</a>
        </div>
        <div className="supplier-contact-row">
          <Mail size={16} className="supplier-contact-icon" />
          <a href={`mailto:${supplier.email}`} onClick={e => e.stopPropagation()}>{supplier.email}</a>
        </div>
      </div>

      <div className="supplier-card-footer">
        <SupplierRating 
          supplierId={supplier.id} 
          initialRating={supplier.rating} 
          onRatingChange={handleRatingChange}
        />
        
        <div className="supplier-actions">
          <button 
            className="supplier-icon-btn edit" 
            onClick={(e) => { e.stopPropagation(); onEdit(supplier); }}
            title="Edit Supplier"
            aria-label="Edit Supplier"
          >
            <Edit2 size={16} />
          </button>
          <button 
            className="supplier-icon-btn delete" 
            onClick={(e) => { e.stopPropagation(); onDelete(supplier); }}
            title="Delete Supplier"
            aria-label="Delete Supplier"
          >
            <Trash2 size={16} />
          </button>
          <button className="supplier-order-btn" onClick={handleOrder}>
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
