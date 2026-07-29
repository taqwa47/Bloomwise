import React, { useEffect } from 'react';

const ConfirmModal = ({ isOpen, message, confirmText, onConfirm, onCancel }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" style={{ zIndex: 3000 }} onClick={onCancel}>
      <div className="event-modal-content" style={{ padding: 24, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 16px', color: '#11281b', fontFamily: 'var(--font-heading)' }}>Confirm Action</h3>
        <p style={{ color: '#5c6661', fontSize: 14, margin: '0 0 24px' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={onCancel}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid #e2e8e4', background: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', background: '#c93434', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
