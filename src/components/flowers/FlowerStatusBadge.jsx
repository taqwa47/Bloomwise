import React from 'react'

const FlowerStatusBadge = ({ quantity, minStock, className = '' }) => {
  let statusClass = 'in-stock'
  let label = 'In Stock'

  if (quantity === 0) {
    statusClass = 'out-stock'
    label = 'Out of Stock'
  } else if (quantity <= minStock) {
    statusClass = 'low-stock'
    label = 'Low Stock'
  }

  return (
    <span className={`flower-status-badge-absolute ${statusClass} ${className}`}>
      {label}
    </span>
  )
}

export default FlowerStatusBadge
