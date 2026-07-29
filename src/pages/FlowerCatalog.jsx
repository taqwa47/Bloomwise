import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus } from 'lucide-react'
import FlowerCard from '../components/flowers/FlowerCard'
import ConfirmDialog from '../components/inventory/ConfirmDialog'
import '../styles/Flowers.css'

import { initialFlowers } from '../data/mockFlowers'

const FlowerCatalog = () => {
  const navigate = useNavigate()
  const [flowers, setFlowers] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [flowerToDelete, setFlowerToDelete] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('bloomwise_flowers')
    if (stored) {
      setFlowers(JSON.parse(stored))
    } else {
      setFlowers(initialFlowers)
      localStorage.setItem('bloomwise_flowers', JSON.stringify(initialFlowers))
    }
  }, [])

  const saveFlowers = (newFlowers) => {
    setFlowers(newFlowers)
    localStorage.setItem('bloomwise_flowers', JSON.stringify(newFlowers))
  }

  const handleUpdateQuantity = (id, delta) => {
    const newFlowers = flowers.map(flower => {
      if (flower.id === id) {
        const newQuantity = Math.max(0, flower.quantity + delta)
        const now = new Date()
        const timeStr = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`
        return { ...flower, quantity: newQuantity, lastUpdated: timeStr }
      }
      return flower
    })
    saveFlowers(newFlowers)
  }

  const handleDeleteConfirm = () => {
    if (flowerToDelete) {
      const newFlowers = flowers.filter(f => f.id !== flowerToDelete.id)
      saveFlowers(newFlowers)
      setFlowerToDelete(null)
      alert("Flower deleted successfully")
    }
  }

  const filteredFlowers = flowers.filter(flower => {
    const query = searchQuery.toLowerCase()
    return (
      flower.name.toLowerCase().includes(query) ||
      flower.type.toLowerCase().includes(query) ||
      flower.category.toLowerCase().includes(query) ||
      flower.color.toLowerCase().includes(query) ||
      flower.supplier.toLowerCase().includes(query)
    )
  })

  return (
    <main className="dashboard-main flowers-main">
      <div className="flowers-header">
        <h1 className="dashboard-title" style={{margin: 0}}>Flower Catalog</h1>
      </div>

      <div className="inventory-card" style={{background: 'transparent', boxShadow: 'none', padding: 0}}>
        <div className="inventory-card-header" style={{marginBottom: '24px'}}>
          <div className="flowers-search-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="flowers-search" 
              placeholder="Search flowers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
            )}
          </div>
          <div className="flowers-actions">
            <button className="add-flower-btn" onClick={() => navigate('/owner/flowers/add')}>
              <Plus size={18} /> Add Flower
            </button>
          </div>
        </div>

        {filteredFlowers.length > 0 ? (
          <div className="flowers-grid">
            {filteredFlowers.map(flower => (
              <FlowerCard 
                key={flower.id} 
                flower={flower} 
                onUpdateQuantity={handleUpdateQuantity}
                onDeleteClick={setFlowerToDelete}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">No flowers found</div>
        )}
      </div>

      {flowerToDelete && (
        <ConfirmDialog 
          title="Delete Flower"
          message={`Are you sure you want to delete ${flowerToDelete.name} from the Flower Catalog?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setFlowerToDelete(null)}
        />
      )}
    </main>
  )
}

export default FlowerCatalog
