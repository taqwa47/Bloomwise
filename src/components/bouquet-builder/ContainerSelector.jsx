import React from 'react';

const CONTAINERS = [
  { id: 'Hand-Tied Bouquet', label: 'Hand-Tied Bouquet', price: 0 },
  { id: 'Basket', label: 'Basket', price: 40 },
  { id: 'Gift Box', label: 'Gift Box', price: 35 },
  { id: 'Flower Vase', label: 'Flower Vase', price: 50 },
  { id: 'Plant-Style Pot', label: 'Plant-Style Pot Arrangement', price: 45 },
  { id: 'No Container', label: 'No Container', price: 0 },
];

export default function ContainerSelector({ containerOption, setContainerOption }) {
  return (
    <div>
      <h3 className="step-title">5. Container Options</h3>
      <p style={{ color: '#5c6661', marginBottom: 24 }}>
        How would you like your flowers presented?
      </p>

      <div className="options-grid">
        {CONTAINERS.map(container => (
          <div 
            key={container.id}
            className={`option-card ${containerOption?.id === container.id ? 'selected' : ''}`}
            onClick={() => setContainerOption(container)}
          >
            <h4>{container.label}</h4>
            {container.price > 0 && <span className="price">+₪{container.price}</span>}
            {container.price === 0 && <span className="price">Free</span>}
          </div>
        ))}
      </div>
      
      {/* If Basket, Box or Vase is selected, we could show sub-options here. 
          For the scope of this frontend, we just add the base container price. */}
    </div>
  );
}
