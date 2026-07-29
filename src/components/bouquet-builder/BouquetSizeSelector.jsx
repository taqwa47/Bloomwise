import React from 'react';
import { AlertCircle } from 'lucide-react';

const SIZES = [
  { id: 'Small', label: 'Small', stems: '10–15 stems', price: 0 },
  { id: 'Medium', label: 'Medium', stems: '20–25 stems', price: 20 },
  { id: 'Large', label: 'Large', stems: '30–40 stems', price: 40 },
  { id: 'Luxury', label: 'Luxury', stems: '50+ stems', price: 80 },
  { id: 'Custom', label: 'Custom', stems: 'Exact quantities', price: 0 }
];

export default function BouquetSizeSelector({ bouquetSize, setBouquetSize, totalStems }) {
  // Simple validation to show a warning if stem count doesn't match the size roughly
  const showWarning = () => {
    if (!bouquetSize || bouquetSize.id === 'Custom') return false;
    if (totalStems === 0) return false;

    const size = bouquetSize.id;
    if (size === 'Small' && (totalStems < 5 || totalStems > 18)) return true;
    if (size === 'Medium' && (totalStems < 15 || totalStems > 28)) return true;
    if (size === 'Large' && (totalStems < 25 || totalStems > 45)) return true;
    if (size === 'Luxury' && totalStems < 45) return true;
    
    return false;
  };

  return (
    <div>
      <h3 className="step-title">2. Bouquet Size</h3>
      <p style={{ color: '#5c6661', marginBottom: 24 }}>
        Choose the overall size of your arrangement. 
        Currently you have selected <strong>{totalStems}</strong> stems.
      </p>

      {showWarning() && (
        <div className="warning-message">
          <AlertCircle size={20} />
          Your selected flower quantity ({totalStems} stems) doesn't quite match the typical stem count for a {bouquetSize.label} bouquet. 
          You can adjust the flower quantities in Step 1, or choose 'Custom' if you want exactly what you selected.
        </div>
      )}

      <div className="options-grid">
        {SIZES.map(size => (
          <div 
            key={size.id}
            className={`option-card ${bouquetSize?.id === size.id ? 'selected' : ''}`}
            onClick={() => setBouquetSize(size)}
          >
            <h4>{size.label}</h4>
            <p>{size.stems}</p>
            {size.price > 0 && <span className="price">+₪{size.price}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
