import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function CareReminderModal({ isOpen, onClose, plantName }) {
  const [type, setType] = useState('Watering');
  const [freq, setFreq] = useState('Every week');

  if (!isOpen) return null;

  const handleSave = () => {
    // We are going to simulate saving a reminder to localStorage
    const saved = JSON.parse(localStorage.getItem('bloomwise_care_reminders') || '[]');
    saved.push({
      id: Date.now(),
      plantName,
      type,
      freq,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('bloomwise_care_reminders', JSON.stringify(saved));
    
    // Create a notification immediately for demo purposes
    const notifications = JSON.parse(localStorage.getItem('bloomwise_notifications') || '[]');
    notifications.unshift({
      id: Date.now(),
      title: `${type} Reminder Created`,
      message: `You will be reminded to ${type.toLowerCase()} your ${plantName} ${freq.toLowerCase()}.`,
      time: 'Just now',
      read: false,
      type: 'system'
    });
    localStorage.setItem('bloomwise_notifications', JSON.stringify(notifications));
    window.dispatchEvent(new Event('storage'));

    alert('Reminder created successfully! Check your notifications.');
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div className="modal-content" style={{ background: '#fff', width: '90%', maxWidth: '400px', borderRadius: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', color: '#1a2f24' }}>Create Reminder</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20}/></button>
        </div>

        <p style={{ margin: '0 0 16px', color: '#5c6661' }}>For: <strong>{plantName}</strong></p>
        
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a2f24' }}>Reminder Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <option>Watering</option>
            <option>Fertilizing</option>
            <option>Pruning</option>
            <option>Repotting</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#1a2f24' }}>Repeat Frequency</label>
          <select value={freq} onChange={(e) => setFreq(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <option>One time</option>
            <option>Every week</option>
            <option>Every two weeks</option>
            <option>Every month</option>
          </select>
        </div>

        <div style={{ fontSize: '13px', color: '#88928d', marginBottom: '24px', fontStyle: 'italic' }}>
          Note: Real push notifications while the app is closed require a future backend service.
        </div>

        <button onClick={handleSave} style={{ width: '100%', background: '#315e47', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <Check size={18} /> Save Reminder
        </button>
      </div>
    </div>
  );
}
