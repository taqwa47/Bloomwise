import React from 'react';

const DeleteEventDialog = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" style={{ zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <h3 style={{ margin: '0 0 16px', color: '#11281b', fontSize: 20 }}>Delete Event</h3>
        <p style={{ margin: '0 0 24px', color: '#5c6661' }}>Are you sure you want to delete this event?</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8e4', background: '#fff', cursor: 'pointer', fontWeight: 600, color: '#11281b' }}>
            Cancel
          </button>
          <button onClick={onDelete} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#c93434', cursor: 'pointer', fontWeight: 600, color: '#fff' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteEventDialog;
