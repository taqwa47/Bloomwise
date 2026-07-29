import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import InventoryForm from '../components/inventory/InventoryForm'
import '../styles/Inventory.css'

const InventoryEdit = () => {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('bloomwise_inventory')
    if (stored) {
      const items = JSON.parse(stored)
      const foundItem = items.find(i => i.id === itemId)
      if (foundItem) {
        setItem(foundItem)
      }
    }
    setLoading(false)
  }, [itemId])

  const handleSave = (updatedData) => {
    const stored = localStorage.getItem('bloomwise_inventory')
    if (!stored) return
    const items = JSON.parse(stored)
    
    const now = new Date()
    const timeStr = `Today ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
    
    const newItems = items.map(i => {
      if (i.id === itemId) {
        return { ...updatedData, id: itemId, lastUpdated: timeStr }
      }
      return i
    })
    
    localStorage.setItem('bloomwise_inventory', JSON.stringify(newItems))
    alert("Inventory item updated successfully")
    navigate('/owner/inventory')
  }

  if (loading) return null

  if (!item) {
    return (
      <main className="dashboard-main inventory-main">
        <div className="inventory-card" style={{textAlign: 'center', padding: '64px'}}>
          <h2 style={{fontFamily: 'Playfair Display', color: '#11281b'}}>Inventory item not found</h2>
          <button 
            className="save-btn" 
            style={{marginTop: '24px'}} 
            onClick={() => navigate('/owner/inventory')}
          >
            Back to Inventory
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="dashboard-main inventory-main">
      <InventoryForm 
        isEditing={true}
        initialData={item}
        onSave={handleSave}
        onCancel={() => navigate('/owner/inventory')}
      />
    </main>
  )
}

export default InventoryEdit
