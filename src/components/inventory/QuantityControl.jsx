import React from 'react'

const QuantityControl = ({ quantity, minStock, onIncrease, onDecrease }) => {
  let statusClass = 'in-stock'
  if (quantity === 0) statusClass = 'out-stock'
  else if (quantity <= minStock) statusClass = 'low-stock'

  // Calculate bar width (max 100%)
  // If minStock is 10, a quantity of 20 would be 100% full visually.
  // We'll use a simple formula: (quantity / (minStock * 2)) * 100
  const maxVisual = minStock > 0 ? minStock * 2 : 20
  const widthPercent = Math.min(100, Math.max(0, (quantity / maxVisual) * 100))

  return (
    <div className="quantity-control">
      <div className="qty-btns">
        <button className="qty-btn" onClick={onDecrease} disabled={quantity <= 0}>-</button>
        <span className="qty-value">{quantity}</span>
        <button className="qty-btn" onClick={onIncrease}>+</button>
      </div>
      <div className="qty-bar-container">
        <div 
          className={`qty-bar ${statusClass}`} 
          style={{ width: `${widthPercent}%` }}
        />
      </div>
    </div>
  )
}

export default QuantityControl
