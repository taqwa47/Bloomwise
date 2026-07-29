import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FlowerStatusBadge from '../components/flowers/FlowerStatusBadge'
import ConfirmDialog from '../components/inventory/ConfirmDialog'
import { Edit2, Trash2, ArrowLeft } from 'lucide-react'
import '../styles/Flowers.css'

const FlowerDetails = () => {
  const { flowerId } = useParams()
  const navigate = useNavigate()
  const [flower, setFlower] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('bloomwise_flowers')
    if (stored) {
      const items = JSON.parse(stored)
      const foundItem = items.find(i => i.id === flowerId)
      if (foundItem) {
        setFlower(foundItem)
      }
    }
    setLoading(false)
  }, [flowerId])

  const handleDeleteConfirm = () => {
    const stored = localStorage.getItem('bloomwise_flowers')
    if (stored) {
      const items = JSON.parse(stored)
      const newItems = items.filter(f => f.id !== flowerId)
      localStorage.setItem('bloomwise_flowers', JSON.stringify(newItems))
      alert("Flower deleted successfully")
      navigate('/owner/flowers')
    }
  }

  if (loading) return null

  if (!flower) {
    return (
      <main className="dashboard-main flowers-main">
        <div className="inventory-card" style={{textAlign: 'center', padding: '64px'}}>
          <h2 style={{fontFamily: 'Playfair Display', color: '#11281b'}}>Flower not found</h2>
          <button 
            className="save-btn" 
            style={{marginTop: '24px'}} 
            onClick={() => navigate('/owner/flowers')}
          >
            Back to Flower Catalog
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="dashboard-main flowers-main">
      <div className="flowers-header" style={{marginBottom: '0'}}>
        <button 
          onClick={() => navigate('/owner/flowers')}
          style={{background: 'transparent', border: 'none', color: '#5c6661', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500'}}
        >
          <ArrowLeft size={16} /> Back to Flower Catalog
        </button>
      </div>

      <div className="flower-details-card">
        <div className="details-image-wrapper">
          <img src={flower.imagePath} alt={flower.name} />
        </div>
        
        <div className="details-content">
          <div className="details-header">
            <h1>{flower.name}</h1>
            <div className="details-subtitle">{flower.category} • {flower.type}</div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Status</span>
              <div style={{marginTop: '4px'}}>
                <FlowerStatusBadge quantity={flower.quantity} minStock={flower.minStock} className="static-badge" style={{position: 'static'}} />
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-label">Quantity in Stock</span>
              <span className="detail-value">{flower.quantity} (Min: {flower.minStock})</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Selling Price</span>
              <span className="detail-value">₪{Number(flower.sellingPrice).toFixed(2)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Cost Price</span>
              <span className="detail-value">₪{Number(flower.cost).toFixed(2)}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Color</span>
              <span className="detail-value">{flower.color}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Season</span>
              <span className="detail-value">{flower.season || 'N/A'}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Supplier</span>
              <span className="detail-value">{flower.supplier || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Updated</span>
              <span className="detail-value">{flower.lastUpdated}</span>
            </div>
            
            <div className="detail-item" style={{gridColumn: '1 / -1'}}>
              <span className="detail-label">Description</span>
              <span className="detail-value" style={{lineHeight: '1.5'}}>{flower.description || 'No description provided.'}</span>
            </div>
            
            <div className="detail-item" style={{gridColumn: '1 / -1'}}>
              <span className="detail-label">Care Instructions</span>
              <span className="detail-value" style={{lineHeight: '1.5'}}>{flower.careInstructions || 'No care instructions provided.'}</span>
            </div>
          </div>

          <div className="details-actions">
            <button 
              className="save-btn" 
              style={{display: 'flex', alignItems: 'center', gap: '8px'}}
              onClick={() => navigate(`/owner/flowers/${flower.id}/edit`)}
            >
              <Edit2 size={16} /> Edit Flower
            </button>
            <button 
              className="cancel-btn" 
              style={{color: '#c93434', display: 'flex', alignItems: 'center', gap: '8px'}}
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmDialog 
          title="Delete Flower"
          message={`Are you sure you want to delete ${flower.name} from the Flower Catalog?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </main>
  )
}

export default FlowerDetails
