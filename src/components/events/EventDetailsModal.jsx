import React, { useState, useMemo } from 'react';
import { X, Calendar, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import { deductInventoryForEvent, restoreInventoryForEvent } from '../../data/mockEvents';
import DeleteEventDialog from './DeleteEventDialog';

const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];

const EventDetailsModal = ({ isOpen, onClose, event, onEdit, onDelete, onChangeStatus }) => {
  const inventory = useMemo(() => JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]'), [isOpen]);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!isOpen || !event) return null;

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    
    // Inventory logic based on inventoryReserved flag
    const requiresDeduction = ['Confirmed', 'Preparing'].includes(newStatus);
    const requiresRestore = ['Cancelled'].includes(newStatus);

    let updatedEvent = { ...event, status: newStatus };

    if (requiresDeduction && !event.inventoryReserved) {
      let insufficient = false;
      event.flowers.forEach(f => {
        const invItem = inventory.find(i => i.name === f.name);
        const available = invItem ? invItem.quantity : 0;
        if (f.required > available) insufficient = true;
      });
      
      if (insufficient) {
        if (!window.confirm('Warning: Insufficient inventory stock for this event. Do you want to proceed and reserve available stock anyway?')) {
          return; // User cancelled status change
        }
      }
      deductInventoryForEvent(event.flowers);
      updatedEvent.inventoryReserved = true;
    } else if (requiresRestore && event.inventoryReserved) {
      restoreInventoryForEvent(event.flowers);
      updatedEvent.inventoryReserved = false;
    }

    onChangeStatus(updatedEvent);
  };

  const handleDelete = () => {
    if (event.inventoryReserved) {
      restoreInventoryForEvent(event.flowers);
    }
    onDelete(event.id);
    setShowConfirmDelete(false);
  };

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content large" onClick={e => e.stopPropagation()}>
        <div className="event-modal-header" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: 28, marginBottom: 4 }}>{event.clientName}</h2>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
              {event.type} • Budget: ${event.budget}
            </span>
          </div>
          <button type="button" className="event-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="event-modal-body" style={{ padding: '32px 24px' }}>
          <div className="ed-info-grid">
            <div className="ed-info-item">
              <span>Date & Time</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Calendar size={16} color="#315e47" /> {event.date} 
                <Clock size={16} color="#315e47" style={{ marginLeft: 8 }} /> {event.time}
              </span>
            </div>
            
            <div className="ed-info-item">
              <span>Location</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={16} color="#315e47" /> {event.location}
              </span>
            </div>

            <div className="ed-info-item">
              <span>Theme / Flowers</span>
              <span>{event.theme || 'N/A'}</span>
            </div>

            <div className="ed-info-item">
              <span>Event Status</span>
              <select 
                value={event.status} 
                onChange={handleStatusChange}
                style={{
                  padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8e4',
                  background: '#fafbfb', fontFamily: 'var(--font-sans)', fontSize: 14,
                  outline: 'none', color: '#11281b', fontWeight: 600, width: 'fit-content'
                }}
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #f0efea', paddingTop: 24, marginTop: 12 }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: '#11281b', margin: '0 0 16px' }}>
              Flowers Needed
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {event.flowers.length === 0 ? (
                <span style={{ color: '#9aa69d', fontSize: 14 }}>No flowers assigned.</span>
              ) : (
                event.flowers.map((f, i) => {
                  const invItem = inventory.find(inv => inv.name === f.name);
                  const available = invItem ? invItem.quantity : 0;
                  const insufficient = f.required > available;
                  return (
                    <div key={i} style={{ 
                      padding: 16, borderRadius: 12, background: insufficient ? '#fcf1f1' : '#ebfdf2',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <strong style={{ color: '#11281b', fontSize: 14, display: 'block' }}>{f.name}</strong>
                        <span style={{ fontSize: 13, color: insufficient ? '#c93434' : '#315e47' }}>
                          {f.required} needed
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: insufficient ? '#c93434' : '#315e47' }}>
                        {available} in stock
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="ed-actions">
            <button className="ed-btn ed-btn-edit" onClick={onEdit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Edit2 size={16} /> Edit Event
            </button>
            <button className="ed-btn ed-btn-delete" onClick={() => setShowConfirmDelete(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>

      <DeleteEventDialog 
        isOpen={showConfirmDelete} 
        onCancel={() => setShowConfirmDelete(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EventDetailsModal;
