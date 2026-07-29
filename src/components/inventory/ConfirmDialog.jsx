import React from 'react'

const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-overlay" onClick={(e) => {
      if (e.target.className === 'confirm-dialog-overlay') onCancel()
    }}>
      <div className="confirm-dialog">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
