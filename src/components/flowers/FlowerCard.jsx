import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit2, Trash2 } from 'lucide-react'
import FlowerStatusBadge from './FlowerStatusBadge'

const FlowerCard = ({ flower, onUpdateQuantity, onDeleteClick }) => {
  const navigate = useNavigate()

  let statusClass = 'in-stock'
  if (flower.quantity === 0) statusClass = 'out-stock'
  else if (flower.quantity <= flower.minStock) statusClass = 'low-stock'

  // Progress bar calculation
  const maxVisual = flower.minStock > 0 ? flower.minStock * 2 : 20
  const widthPercent = Math.min(100, Math.max(0, (flower.quantity / maxVisual) * 100))

  return (
    <div className="flower-card">
      <div 
        className="flower-image-wrapper" 
        onClick={() => navigate(`/owner/flowers/${flower.id}`)}
      >
        <img src={flower.imagePath} alt={flower.name} />
        <FlowerStatusBadge quantity={flower.quantity} minStock={flower.minStock} />
      </div>
      
      <div className="flower-info">
        <div className="flower-info-top">
          <div className="flower-name-group">
            <h3 className="flower-name" onClick={() => navigate(`/owner/flowers/${flower.id}`)}>
              {flower.name}
            </h3>
            <span className="flower-category">{flower.category}</span>
          </div>
          <div className="flower-price">₪{Number(flower.sellingPrice).toFixed(2)}</div>
        </div>

        <div className="flower-stock-info">
          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <span>{flower.quantity} in stock</span>
            <div className="qty-small-btns">
              <button 
                className="qty-small-btn" 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(flower.id, -1) }} 
                disabled={flower.quantity <= 0}
              >
                -
              </button>
              <button 
                className="qty-small-btn" 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(flower.id, 1) }}
              >
                +
              </button>
            </div>
          </div>
          <span>Last: {flower.lastUpdated}</span>
        </div>

        <div className="flower-progress-wrapper">
          <div className="flower-progress-bg">
            <div 
              className={`flower-progress-fill ${statusClass}`}
              style={{ width: `${widthPercent}%` }}
            />
          </div>
        </div>

        <div className="flower-card-actions">
          <button 
            className="edit-flower-btn"
            onClick={(e) => {
              e.stopPropagation()
              navigate(`/owner/flowers/${flower.id}/edit`)
            }}
          >
            <Edit2 size={16} /> Edit
          </button>
          <button 
            className="delete-flower-btn"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteClick(flower)
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlowerCard
