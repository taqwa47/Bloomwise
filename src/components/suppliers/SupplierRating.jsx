import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { saveSuppliers, getSuppliers } from '../../data/mockSuppliers';

const SupplierRating = ({ supplierId, initialRating, readOnly = false, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating || 0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRating = (newRating) => {
    if (readOnly) return;
    
    setRating(newRating);
    
    // Update localStorage
    const suppliers = getSuppliers();
    const updatedSuppliers = suppliers.map(s => 
      s.id === supplierId ? { ...s, rating: newRating } : s
    );
    saveSuppliers(updatedSuppliers);
    
    // Optional callback
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div 
      className="supplier-rating" 
      role="radiogroup" 
      aria-label={`Rate supplier ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = (hoverRating || rating) >= star;
        return (
          <Star
            key={star}
            size={16}
            className={`supplier-star ${isFilled ? 'filled' : ''}`}
            fill={isFilled ? 'currentColor' : 'none'}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            onClick={() => handleRating(star)}
            role="radio"
            aria-checked={isFilled}
            tabIndex={readOnly ? -1 : 0}
            onKeyDown={(e) => {
              if (!readOnly && (e.key === 'Enter' || e.key === ' ')) {
                handleRating(star);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default SupplierRating;
