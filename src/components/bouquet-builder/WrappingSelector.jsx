import React from 'react';

const WRAPPING_STYLES = [
  { id: 'Classic Paper', label: 'Classic Paper', price: 0 },
  { id: 'Kraft Paper', label: 'Kraft Paper', price: 0 },
  { id: 'Soft Pink Wrapping', label: 'Soft Pink Wrapping', price: 15 },
  { id: 'White Elegant Wrapping', label: 'White Elegant Wrapping', price: 20 },
  { id: 'Black Luxury Wrapping', label: 'Black Luxury Wrapping', price: 25 },
  { id: 'Transparent Wrapping', label: 'Transparent Wrapping', price: 10 },
  { id: 'Fabric Wrapping', label: 'Fabric Wrapping', price: 35 },
  { id: 'No Wrapping', label: 'No Wrapping', price: 0 },
];

const WRAPPING_COLORS = [
  { id: 'White', color: '#ffffff' },
  { id: 'Cream', color: '#fefce8' },
  { id: 'Beige', color: '#f5f5dc' },
  { id: 'Pink', color: '#fbcfe8' },
  { id: 'Black', color: '#171717' },
  { id: 'Green', color: '#22c55e' },
  { id: 'Gold', color: '#fbbf24' },
  { id: 'Florist Choice', color: 'linear-gradient(45deg, #fbcfe8, #22c55e, #fbbf24)' },
];

export default function WrappingSelector({ wrappingStyle, setWrappingStyle, wrappingColor, setWrappingColor }) {
  return (
    <div>
      <h3 className="step-title">4. Wrapping Options</h3>
      
      <p style={{ color: '#1a2f24', fontWeight: 600, marginTop: 24, marginBottom: 12 }}>Wrapping Style</p>
      <div className="options-grid">
        {WRAPPING_STYLES.map(style => (
          <div 
            key={style.id}
            className={`option-card ${wrappingStyle?.id === style.id ? 'selected' : ''}`}
            onClick={() => setWrappingStyle(style)}
          >
            <h4>{style.label}</h4>
            {style.price > 0 && <span className="price">+₪{style.price}</span>}
            {style.price === 0 && <span className="price">Free</span>}
          </div>
        ))}
      </div>

      {wrappingStyle && wrappingStyle.id !== 'No Wrapping' && (
        <>
          <p style={{ color: '#1a2f24', fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Wrapping Color</p>
          <div className="color-swatches">
            {WRAPPING_COLORS.map(c => (
              <div 
                key={c.id} 
                className={`color-swatch-wrapper ${wrappingColor === c.id ? 'selected' : ''}`}
                onClick={() => setWrappingColor(c.id)}
              >
                <div className="color-swatch" style={{ background: c.color }}></div>
                <span className="color-swatch-label">{c.id}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
