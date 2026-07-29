import React from 'react';
import { Trash2, Edit2, Bell, BookOpen } from 'lucide-react';

export default function SavedPlantCard({ plant, onRemove, onViewGuide }) {
  return (
    <div style={{ background: '#fff', borderRadius: '16px', padding: '16px', border: '1px solid #e2e8e4', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <img src={plant.image} alt={plant.nameEnglish} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: '0 0 4px', fontSize: '16px', color: '#1a2f24' }}>{plant.nameEnglish}</h3>
        <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#88928d' }}>Saved on {new Date(plant.savedAt).toLocaleDateString()}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onViewGuide(plant)} style={{ flex: 1, padding: '8px', background: '#ebfdf2', color: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <BookOpen size={14} /> Guide
          </button>
          <button style={{ padding: '8px', background: '#f8faf9', color: '#5c6661', border: '1px solid #e2e8e4', borderRadius: '8px', cursor: 'pointer' }}>
            <Edit2 size={14} />
          </button>
          <button style={{ padding: '8px', background: '#f8faf9', color: '#5c6661', border: '1px solid #e2e8e4', borderRadius: '8px', cursor: 'pointer' }}>
            <Bell size={14} />
          </button>
          <button onClick={() => onRemove(plant.id)} style={{ padding: '8px', background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: '8px', cursor: 'pointer' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
