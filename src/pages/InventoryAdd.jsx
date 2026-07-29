import React from 'react'
import { useNavigate } from 'react-router-dom'
import InventoryForm from '../components/inventory/InventoryForm'
import '../styles/Inventory.css'

const InventoryAdd = () => {
  const navigate = useNavigate()

  const handleSave = (newItemData) => {
    const stored = localStorage.getItem('bloomwise_inventory')
    const items = stored ? JSON.parse(stored) : []
    
    const now = new Date()
    const timeStr = `Today ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
    
    const newItem = {
      ...newItemData,
      id: `inv_${Date.now()}`,
      lastUpdated: timeStr
    }

    const newItems = [...items, newItem]
    localStorage.setItem('bloomwise_inventory', JSON.stringify(newItems))
    
    alert("Inventory item added successfully")
    navigate('/owner/inventory')
  }

  return (
    <main className="dashboard-main inventory-main">
      <InventoryForm 
        isEditing={false}
        onSave={handleSave}
        onCancel={() => navigate('/owner/inventory')}
      />
    </main>
  )
}

export default InventoryAdd
