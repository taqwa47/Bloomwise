import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const OCCASION_TYPES = [
  'Birthday', 'Wedding Anniversary', 'Engagement Anniversary', 'Mother\'s Day', 
  'Father\'s Day', 'Valentine\'s Day', 'Graduation', 'Wedding', 'Engagement', 
  'New Baby', 'First Date Anniversary', 'Friendship Anniversary', 'Holiday', 'Custom Occasion'
];

const RELATIONSHIPS = [
  'Mother', 'Father', 'Wife', 'Husband', 'Partner', 'Sister', 'Brother', 
  'Daughter', 'Son', 'Friend', 'Colleague', 'Other'
];

const REMINDER_OPTIONS = [
  'On the same day', 'One day before', 'Three days before', 'One week before', 'Two weeks before', 'One month before'
];

export default function AddOccasionModal({ isOpen, onClose, onSave, initialDate, editingOccasion }) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Birthday',
    recipientName: '',
    relationship: 'Other',
    date: '',
    repeatsYearly: true,
    reminders: [{ id: Date.now(), option: 'One week before', time: '10:00' }],
    preferredBudget: '',
    favoriteColors: '',
    favoriteFlowers: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingOccasion) {
      setFormData(editingOccasion);
    } else if (initialDate) {
      // Create local YYYY-MM-DD
      const localDate = new Date(initialDate.getTime() - (initialDate.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, date: localDate }));
    } else {
      setFormData({
        title: '',
        type: 'Birthday',
        recipientName: '',
        relationship: 'Other',
        date: '',
        repeatsYearly: true,
        reminders: [{ id: Date.now(), option: 'One week before', time: '10:00' }],
        preferredBudget: '',
        favoriteColors: '',
        favoriteFlowers: '',
        notes: ''
      });
    }
  }, [isOpen, initialDate, editingOccasion]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddReminder = () => {
    setFormData(prev => ({
      ...prev,
      reminders: [...prev.reminders, { id: Date.now(), option: 'One day before', time: '10:00' }]
    }));
  };

  const handleUpdateReminder = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.map(r => r.id === id ? { ...r, [field]: value } : r)
    }));
  };

  const handleRemoveReminder = (id) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders.filter(r => r.id !== id)
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.recipientName.trim()) newErrors.recipientName = 'Recipient Name is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (formData.reminders.length === 0) newErrors.reminders = 'At least one reminder is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{editingOccasion ? 'Edit Occasion' : 'Add Occasion'}</h2>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          <div className="form-grid">
            
            <div className="form-group full-width">
              <label>Occasion Title *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Mom's Birthday" />
              {errors.title && <div className="error-text">{errors.title}</div>}
            </div>

            <div className="form-group">
              <label>Occasion Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                {OCCASION_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Occasion Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
              {errors.date && <div className="error-text">{errors.date}</div>}
            </div>

            <div className="form-group">
              <label>Recipient Name *</label>
              <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} />
              {errors.recipientName && <div className="error-text">{errors.recipientName}</div>}
            </div>

            <div className="form-group">
              <label>Relationship</label>
              <select name="relationship" value={formData.relationship} onChange={handleChange}>
                {RELATIONSHIPS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="form-group full-width">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontWeight: 400 }}>
                <input type="checkbox" name="repeatsYearly" checked={formData.repeatsYearly} onChange={handleChange} style={{ width: 'auto' }} />
                Repeat this occasion every year
              </label>
            </div>

            <div className="form-group full-width">
              <label style={{ marginBottom: 12, borderBottom: '1px solid #e2e8e4', paddingBottom: 8 }}>Remind Me</label>
              
              <div className="reminders-list">
                {formData.reminders.map((reminder, idx) => (
                  <div key={reminder.id} className="reminder-item">
                    <select 
                      style={{ flex: 1 }} 
                      value={reminder.option} 
                      onChange={(e) => handleUpdateReminder(reminder.id, 'option', e.target.value)}
                    >
                      {REMINDER_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    
                    <span style={{ fontSize: 14, color: '#5c6661' }}>at</span>
                    
                    <input 
                      type="time" 
                      value={reminder.time} 
                      onChange={(e) => handleUpdateReminder(reminder.id, 'time', e.target.value)} 
                      style={{ width: '120px' }}
                    />
                    
                    <button type="button" onClick={() => handleRemoveReminder(reminder.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: 4 }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              {errors.reminders && <div className="error-text" style={{ marginBottom: 12 }}>{errors.reminders}</div>}
              
              <button type="button" onClick={handleAddReminder} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: '#315e47', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
                <Plus size={16} /> Add Another Reminder
              </button>
            </div>

            <div className="form-group">
              <label>Preferred Budget (₪)</label>
              <input type="number" min="0" name="preferredBudget" value={formData.preferredBudget} onChange={handleChange} />
            </div>

            <div className="form-group full-width">
              <label>Favorite Flower Colors / Types (Optional)</label>
              <input type="text" name="favoriteColors" value={formData.favoriteColors} onChange={handleChange} placeholder="e.g. Pink, White Roses" />
            </div>

            <div className="form-group full-width">
              <label>Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows="2"></textarea>
            </div>

          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save Occasion</button>
        </div>
      </div>
    </div>
  );
}
