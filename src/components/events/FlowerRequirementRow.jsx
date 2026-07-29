import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

const FlowerRequirementRow = ({ flower, idx, inventory, updateFlowerRow, removeFlowerRow, errors }) => {
  const invItem = inventory.find(i => i.name === flower.name);
  const available = invItem ? invItem.quantity : 0;
  const isInsufficient = flower.name && flower.required > available;

  return (
    <div style={{ background: '#fafbfb', padding: 12, borderRadius: 12, border: '1px solid #f0efea', marginBottom: 8 }}>
      <div className="ef-flower-row">
        <div>
          <select 
            value={flower.name} 
            onChange={(e) => updateFlowerRow(idx, 'name', e.target.value)}
            className={errors[`flower_name_${idx}`] ? 'ef-error' : ''}
            style={{ width: '100%' }}
          >
            <option value="">Select a flower...</option>
            {inventory.map(inv => (
              <option key={inv.id} value={inv.name}>{inv.name}</option>
            ))}
          </select>
        </div>
        <div>
          <input 
            type="number" placeholder="Qty" 
            value={flower.required}
            onChange={(e) => updateFlowerRow(idx, 'required', e.target.value)}
            className={errors[`flower_qty_${idx}`] ? 'ef-error' : ''}
            style={{ width: '100%' }}
          />
        </div>
        <button type="button" onClick={() => removeFlowerRow(idx)} style={{ background: 'transparent', border: 'none', color: '#c93434', cursor: 'pointer', display: 'flex', padding: 8 }}>
          <Trash2 size={18} />
        </button>
      </div>
      
      {(errors[`flower_name_${idx}`] || errors[`flower_qty_${idx}`]) && (
        <div style={{ marginTop: 4, display: 'flex', gap: 16 }}>
          {errors[`flower_name_${idx}`] && <span className="ef-error-text">{errors[`flower_name_${idx}`]}</span>}
          {errors[`flower_qty_${idx}`] && <span className="ef-error-text">{errors[`flower_qty_${idx}`]}</span>}
        </div>
      )}

      {flower.name && (
        <div style={{ marginTop: 8, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6, color: isInsufficient ? '#c93434' : '#315e47' }}>
          {isInsufficient && <AlertTriangle size={14} />}
          {isInsufficient 
            ? `Insufficient stock (${available} available, ${flower.required - available} more needed)` 
            : `Stock available (${available} in stock)`
          }
        </div>
      )}
    </div>
  );
};

export default FlowerRequirementRow;
