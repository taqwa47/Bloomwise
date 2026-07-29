import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FlowerForm from '../components/flowers/FlowerForm'
import '../styles/Flowers.css'

const FlowerEdit = () => {
  const { flowerId } = useParams()
  const navigate = useNavigate()
  const [flower, setFlower] = useState(null)
  const [loading, setLoading] = useState(true)

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

  const handleSave = (updatedData) => {
    const stored = localStorage.getItem('bloomwise_flowers')
    if (!stored) return
    const items = JSON.parse(stored)
    
    const now = new Date()
    const timeStr = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`
    
    const newItems = items.map(i => {
      if (i.id === flowerId) {
        return { 
          ...updatedData, 
          id: flowerId, 
          lastUpdated: timeStr,
          status: updatedData.quantity > 0 ? "Available" : "Unavailable"
        }
      }
      return i
    })
    
    localStorage.setItem('bloomwise_flowers', JSON.stringify(newItems))
    alert("Flower updated successfully")
    navigate('/owner/flowers')
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
      <FlowerForm 
        isEditing={true}
        initialData={flower}
        onSave={handleSave}
        onCancel={() => navigate('/owner/flowers')}
      />
    </main>
  )
}

export default FlowerEdit
