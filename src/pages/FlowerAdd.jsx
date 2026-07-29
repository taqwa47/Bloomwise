import React from 'react'
import { useNavigate } from 'react-router-dom'
import FlowerForm from '../components/flowers/FlowerForm'
import '../styles/Flowers.css'

const FlowerAdd = () => {
  const navigate = useNavigate()

  const handleSave = (newItemData) => {
    const stored = localStorage.getItem('bloomwise_flowers')
    const items = stored ? JSON.parse(stored) : []
    
    const now = new Date()
    const timeStr = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`
    
    const newItem = {
      ...newItemData,
      id: `flw_${Date.now()}`,
      lastUpdated: timeStr,
      status: newItemData.quantity > 0 ? "Available" : "Unavailable"
    }

    const newItems = [...items, newItem]
    localStorage.setItem('bloomwise_flowers', JSON.stringify(newItems))
    
    alert("Flower added successfully")
    navigate('/owner/flowers')
  }

  return (
    <main className="dashboard-main flowers-main">
      <FlowerForm 
        isEditing={false}
        onSave={handleSave}
        onCancel={() => navigate('/owner/flowers')}
      />
    </main>
  )
}

export default FlowerAdd
