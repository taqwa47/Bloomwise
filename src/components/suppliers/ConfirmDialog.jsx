import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, isDestructive = false }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div className="modal-overlay" onClick={(e) => {
      if (e.target.className === 'modal-overlay') onCancel();
    }} style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1100,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div className="modal-container" style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 400,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)', overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px 24px', display: 'flex', 
          justifyContent: 'space-between', alignItems: 'center',
          borderBottom: '1px solid #f0efea'
        }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontSize: 20, color: '#11281b' }}>
            {title}
          </h2>
          <button 
            onClick={onCancel}
            style={{ 
              background: 'transparent', border: 'none', color: '#9aa69d', 
              cursor: 'pointer', display: 'flex'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', color: '#5c6661', fontSize: 14 }}>
          {message}
        </div>

        <div style={{ display: 'flex', gap: 12, padding: '16px 24px', background: '#fafbfb' }}>
          <button 
            onClick={onCancel}
            style={{
              flex: 1, padding: '10px 16px', borderRadius: 8, border: '1px solid #e2e8e4',
              background: '#fff', color: '#5c6661', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 14
            }}
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm}
            style={{
              flex: 1, padding: '10px 16px', borderRadius: 8, border: 'none',
              background: isDestructive ? '#c93434' : '#315e47', 
              color: '#fff', fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-sans)', fontSize: 14
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
