import React from 'react';

export default function RecentPlantSearches({ recentSearches, onSelectPlant, onClear }) {
  if (!recentSearches || recentSearches.length === 0) return null;

  return (
    <div style={{ marginTop: '40px', padding: '24px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8e4' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ margin: 0, color: '#1a2f24' }}>Recently Viewed Plants</h3>
        <button onClick={onClear} style={{ background: 'none', border: 'none', color: '#88928d', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}>
          Clear History
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
        {recentSearches.map((plant, idx) => (
          <div key={idx} onClick={() => onSelectPlant(plant)} style={{ minWidth: '120px', cursor: 'pointer', textAlign: 'center' }}>
            <img src={plant.image} alt={plant.nameEnglish} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover', marginBottom: '8px' }} />
            <h4 style={{ margin: 0, fontSize: '14px', color: '#315e47' }}>{plant.nameEnglish}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
