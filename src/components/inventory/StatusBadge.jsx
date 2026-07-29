import React from 'react'

const StatusBadge = ({ quantity, minStock }) => {
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
    <span className={`status-badge ${statusClass}`}>
      {label}
    </span>
  )
}

export default StatusBadge
