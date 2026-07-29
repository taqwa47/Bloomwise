import React, { useEffect } from 'react';

const UnsavedChangesDialog = ({ isOpen, onLeave, onStay }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onStay();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onStay]);

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" style={{ zIndex: 3000 }} onClick={onStay}>
      <div className="event-modal-content" style={{ padding: 24, maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <h3 style={{ margin: '0 0 16px', color: '#11281b', fontFamily: 'var(--font-heading)' }}>Unsaved Changes</h3>
        <p style={{ color: '#5c6661', fontSize: 14, margin: '0 0 24px' }}>
          You have unsaved changes. Are you sure you want to leave?
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={onStay}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid #315e47', background: '#fff', color: '#315e47', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            Stay
          </button>
          <button 
            onClick={onLeave}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', background: '#c93434', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600 }}
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChangesDialog;
