import React from 'react';
import { X, Edit2, Trash2, Gift, Clock, Calendar } from 'lucide-react';
import { getOccasionColorClass } from './OccasionsCalendar';

export default function OccasionDetailsModal({ isOpen, onClose, occasion, onEdit, onDelete, onChooseGift, daysRemaining }) {
  if (!isOpen || !occasion) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className={`day-indicator ${getOccasionColorClass(occasion.type)}`} style={{ padding: '4px 12px', fontSize: 13, borderRadius: 12 }}>
              {occasion.type}
            </div>
            <h2 className="modal-title">{occasion.title}</h2>
          </div>
          <button className="modal-close" onClick={onClose}><X size={24} /></button>
        </div>
        
        <div className="modal-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, padding: 16, background: '#f8faf9', borderRadius: 16 }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: 14, color: '#5c6661' }}>Date</p>
              <p style={{ margin: 0, fontWeight: 600, color: '#1a2f24' }}>
                {new Date(occasion.date).toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: '0 0 4px', fontSize: 14, color: '#5c6661' }}>Status</p>
              <p style={{ margin: 0, fontWeight: 600, color: daysRemaining <= 7 ? '#d97706' : '#16a34a' }}>
                {daysRemaining === 0 ? 'Today!' : daysRemaining === 1 ? 'Tomorrow' : `In ${daysRemaining} days`}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
            <div>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#88928d' }}>Recipient</h4>
              <p style={{ margin: 0, fontWeight: 500 }}>{occasion.recipientName}</p>
              <p style={{ margin: 0, fontSize: 13, color: '#5c6661' }}>{occasion.relationship}</p>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#88928d' }}>Details</h4>
              <p style={{ margin: '0 0 4px', fontSize: 14 }}>
                <span style={{ color: '#5c6661' }}>Budget: </span> 
                {occasion.preferredBudget ? `₪${occasion.preferredBudget}` : 'Not set'}
              </p>
              <p style={{ margin: 0, fontSize: 14 }}>
                <span style={{ color: '#5c6661' }}>Repeat: </span> 
                {occasion.repeatsYearly ? 'Yearly' : 'One-time'}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#88928d' }}>Preferences</h4>
            <p style={{ margin: '0 0 4px', fontSize: 14 }}>
              <span style={{ color: '#5c6661' }}>Colors: </span> 
              {occasion.favoriteColors || 'None specified'}
            </p>
            <p style={{ margin: 0, fontSize: 14 }}>
              <span style={{ color: '#5c6661' }}>Flowers: </span> 
              {occasion.favoriteFlowers || 'None specified'}
            </p>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#88928d' }}>Reminders</h4>
            {occasion.reminders && occasion.reminders.map((rem, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, marginBottom: 4 }}>
                <Clock size={14} color="#88928d" />
                <span>{rem.option} at {rem.time}</span>
              </div>
            ))}
          </div>

          {occasion.notes && (
            <div>
              <h4 style={{ margin: '0 0 8px', fontSize: 14, color: '#88928d' }}>Notes</h4>
              <p style={{ margin: 0, fontSize: 14, color: '#5c6661', background: '#f8faf9', padding: 12, borderRadius: 8 }}>
                {occasion.notes}
              </p>
            </div>
          )}
        </div>
        
        <div className="modal-footer" style={{ borderTop: 'none', background: '#f8faf9', borderRadius: '0 0 24px 24px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-outline" onClick={() => onEdit(occasion)} style={{ padding: '8px 16px' }}>
              <Edit2 size={16} style={{ marginRight: 6 }} /> Edit
            </button>
            <button className="btn btn-outline" onClick={() => onDelete(occasion.id)} style={{ padding: '8px 16px', color: '#ef4444', borderColor: '#fee2e2' }}>
              <Trash2 size={16} style={{ marginRight: 6 }} /> Delete
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => onChooseGift(occasion)}>
            <Gift size={16} style={{ marginRight: 6 }} /> Choose Gift
          </button>
        </div>
      </div>
    </div>
  );
}
