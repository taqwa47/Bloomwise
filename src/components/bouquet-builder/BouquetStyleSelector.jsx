import React from 'react';

const STYLES = [
  'Romantic', 'Elegant', 'Soft', 'Luxury', 'Colorful', 'Minimal', 'Wild Garden', "Florist's Choice"
];

export default function BouquetStyleSelector({ bouquetStyle, setBouquetStyle, designInstructions, setDesignInstructions }) {
  return (
    <div>
      <h3 className="step-title">3. Bouquet Style & Instructions</h3>
      <p style={{ color: '#5c6661', marginBottom: 24 }}>
        Select the overall vibe of your bouquet and add any special design instructions.
      </p>

      <div className="options-grid" style={{ marginBottom: 32 }}>
        {STYLES.map(style => (
          <div 
            key={style}
            className={`option-card ${bouquetStyle === style ? 'selected' : ''}`}
            onClick={() => setBouquetStyle(style)}
          >
            <h4>{style}</h4>
          </div>
        ))}
      </div>

      <div className="form-group">
        <label>Special Design Instructions (Optional)</label>
        <textarea 
          rows="4" 
          placeholder="e.g. Use mostly pink flowers with a soft elegant arrangement."
          value={designInstructions}
          onChange={(e) => setDesignInstructions(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
