import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Trash2, AlertTriangle } from 'lucide-react';

const EVENT_TYPES = [
  'Wedding', 'Birthday', 'Graduation', 'Engagement', 
  'Anniversary', 'Corporate Event', 'Custom Bouquet', 'Other'
];

const EventFormModal = ({ isOpen, onClose, onSave, eventToEdit }) => {
  const inventory = useMemo(() => JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]'), []);
  
  const defaultForm = {
    type: EVENT_TYPES[0],
    clientName: '',
    date: '',
    time: '',
    location: '',
    theme: '',
    budget: '',
    flowers: []
  };

  const [formData, setFormData] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        setFormData(eventToEdit);
      } else {
        setFormData(defaultForm);
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, eventToEdit]);

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
    if (!formData.clientName.trim()) newErrors.clientName = 'Client Name is required';
    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(formData.date);
      if (selected < today) {
        newErrors.date = 'Date cannot be in the past';
      }
    }
    
    if (!formData.time.trim()) newErrors.time = 'Time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    const budgetNum = Number(formData.budget);
    if (!formData.budget || isNaN(budgetNum) || budgetNum <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }

    if (formData.flowers.length === 0) {
      newErrors.flowers = 'At least one flower must be added';
    } else {
      formData.flowers.forEach((f, idx) => {
        if (!f.name) newErrors[`flower_name_${idx}`] = 'Select a flower';
        const qtyNum = Number(f.required);
        if (!f.required || isNaN(qtyNum) || qtyNum <= 0 || !Number.isInteger(qtyNum)) {
          newErrors[`flower_qty_${idx}`] = 'Quantity must be a positive whole number';
        }
      });
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

  const addFlowerRow = () => {
    setFormData(prev => ({
      ...prev,
      flowers: [...prev.flowers, { name: '', required: '' }]
    }));
  };

  const removeFlowerRow = (index) => {
    setFormData(prev => {
      const updated = [...prev.flowers];
      updated.splice(index, 1);
      return { ...prev, flowers: updated };
    });
  };

  const updateFlowerRow = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.flowers];
      updated[index][field] = value;
      return { ...prev, flowers: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      onSave({
        ...formData,
        budget: Number(formData.budget),
        flowers: formData.flowers.map(f => ({ ...f, required: Number(f.required) }))
      });
    }
  };

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content large" onClick={e => e.stopPropagation()}>
        <div className="event-modal-header">
          <h2>{eventToEdit ? 'Edit Event' : 'New Event'}</h2>
          <button type="button" className="event-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="event-modal-body">
          <div className="ef-group">
            <label>Event Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="ef-group">
            <label>Client Name</label>
            <input 
              type="text" name="clientName" value={formData.clientName} onChange={handleChange}
              placeholder="Sarah Johnson" className={errors.clientName ? 'ef-error' : ''}
            />
            {errors.clientName && <span className="ef-error-text">{errors.clientName}</span>}
          </div>

          <div className="ef-row">
            <div className="ef-group">
              <label>Date</label>
              <input 
                type="date" name="date" value={formData.date} onChange={handleChange}
                className={errors.date ? 'ef-error' : ''}
              />
              {errors.date && <span className="ef-error-text">{errors.date}</span>}
            </div>
            <div className="ef-group">
              <label>Time</label>
              <input 
                type="time" name="time" value={formData.time} onChange={handleChange}
                className={errors.time ? 'ef-error' : ''}
              />
              {errors.time && <span className="ef-error-text">{errors.time}</span>}
            </div>
          </div>

          <div className="ef-group">
            <label>Location</label>
            <input 
              type="text" name="location" value={formData.location} onChange={handleChange}
              placeholder="Haifa" className={errors.location ? 'ef-error' : ''}
            />
            {errors.location && <span className="ef-error-text">{errors.location}</span>}
          </div>

          <div className="ef-group">
            <label>Theme / Flowers</label>
            <input 
              type="text" name="theme" value={formData.theme} onChange={handleChange}
              placeholder="White Roses"
            />
          </div>

          <div className="ef-group">
            <label>Budget ($)</label>
            <input 
              type="number" name="budget" value={formData.budget} onChange={handleChange}
              placeholder="800" className={errors.budget ? 'ef-error' : ''}
            />
            {errors.budget && <span className="ef-error-text">{errors.budget}</span>}
          </div>

          <div className="ef-group" style={{ marginTop: 8 }}>
            <label>Flowers Needed</label>
            {errors.flowers && <span className="ef-error-text">{errors.flowers}</span>}
            
            {formData.flowers.map((flower, idx) => {
              const invItem = inventory.find(i => i.name === flower.name);
              const available = invItem ? invItem.quantity : 0;
              const isInsufficient = flower.name && flower.required > available;

              return (
                <div key={idx} style={{ background: '#fafbfb', padding: 12, borderRadius: 12, border: '1px solid #f0efea', marginBottom: 8 }}>
                  <div className="ef-flower-row">
                    <div>
                      <select 
                        value={flower.name} 
                        onChange={(e) => updateFlowerRow(idx, 'name', e.target.value)}
                        className={errors[`flower_name_${idx}`] ? 'ef-error' : ''}
                        style={{ width: '100%' }}
                      >
                        <option value="">Select a flower...</option>
                        {inventory.map(inv => (
                          <option key={inv.id} value={inv.name}>{inv.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input 
                        type="number" placeholder="Qty" 
                        value={flower.required}
                        onChange={(e) => updateFlowerRow(idx, 'required', e.target.value)}
                        className={errors[`flower_qty_${idx}`] ? 'ef-error' : ''}
                        style={{ width: '100%' }}
                      />
                    </div>
                    <button type="button" onClick={() => removeFlowerRow(idx)} style={{ background: 'transparent', border: 'none', color: '#c93434', cursor: 'pointer', display: 'flex', padding: 8 }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  {(errors[`flower_name_${idx}`] || errors[`flower_qty_${idx}`]) && (
                    <div style={{ marginTop: 4, display: 'flex', gap: 16 }}>
                      {errors[`flower_name_${idx}`] && <span className="ef-error-text">{errors[`flower_name_${idx}`]}</span>}
                      {errors[`flower_qty_${idx}`] && <span className="ef-error-text">{errors[`flower_qty_${idx}`]}</span>}
                    </div>
                  )}

                  {flower.name && (
                    <div style={{ marginTop: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: isInsufficient ? '#c93434' : '#315e47' }}>
                      {isInsufficient && <AlertTriangle size={14} />}
                      {isInsufficient 
                        ? `Insufficient stock (${available} available, ${flower.required - available} more needed)` 
                        : `Stock available (${available} in stock)`
                      }
                    </div>
                  )}
                </div>
              )
            })}
            
            <button type="button" className="ef-add-btn" onClick={addFlowerRow}>
              + Add Another Flower
            </button>
          </div>

          <button type="submit" className="event-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
