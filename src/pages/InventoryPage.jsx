import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, CheckCircle2, AlertTriangle, XCircle, Edit2, Trash2 } from 'lucide-react'
import StatusBadge from '../components/inventory/StatusBadge'
import QuantityControl from '../components/inventory/QuantityControl'
import ConfirmDialog from '../components/inventory/ConfirmDialog'
import '../styles/Inventory.css'

const initialMockInventory = [
  { id: "inv_1", name: "Red Rose", category: "Rose", quantity: 25, minStock: 10, cost: 2.50, sellingPrice: 4.99, supplier: "Local Farms", color: "Red", storageLocation: "Cooler A", lastUpdated: "Today 9:14 AM", notes: "" },
  { id: "inv_2", name: "White Lily", category: "Lily", quantity: 3, minStock: 5, cost: 3.00, sellingPrice: 6.50, supplier: "Global Blooms", color: "White", storageLocation: "Cooler B", lastUpdated: "Yesterday", notes: "" },
  { id: "inv_3", name: "Yellow Tulip", category: "Tulip", quantity: 40, minStock: 15, cost: 1.80, sellingPrice: 3.75, supplier: "Dutch Imports", color: "Yellow", storageLocation: "Display 1", lastUpdated: "Today 11:02 AM", notes: "" },
  { id: "inv_4", name: "Sunflower", category: "Sunflower", quantity: 0, minStock: 10, cost: 2.20, sellingPrice: 5.25, supplier: "Sunny Farms", color: "Yellow", storageLocation: "Display 2", lastUpdated: "2 days ago", notes: "" },
  { id: "inv_5", name: "Orchid", category: "Orchid", quantity: 8, minStock: 5, cost: 12.00, sellingPrice: 25.00, supplier: "Exotic Plants", color: "Purple", storageLocation: "Greenhouse", lastUpdated: "Today 8:00 AM", notes: "" },
  { id: "inv_6", name: "Baby's Breath", category: "Filler", quantity: 50, minStock: 20, cost: 0.50, sellingPrice: 1.50, supplier: "Local Farms", color: "White", storageLocation: "Cooler A", lastUpdated: "Yesterday", notes: "" }
]

const InventoryPage = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('bloomwise_inventory')
    if (stored) {
      setItems(JSON.parse(stored))
    } else {
      setItems(initialMockInventory)
      localStorage.setItem('bloomwise_inventory', JSON.stringify(initialMockInventory))
    }
  }, [])

  const saveItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem('bloomwise_inventory', JSON.stringify(newItems))
  }

  const handleUpdateQuantity = (id, delta) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta)
        const now = new Date()
        const timeStr = `Today ${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
        return { ...item, quantity: newQuantity, lastUpdated: timeStr }
      }
      return item
    })
    saveItems(newItems)
  }

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      const newItems = items.filter(item => item.id !== itemToDelete.id)
      saveItems(newItems)
      setItemToDelete(null)
      alert("Inventory item deleted successfully")
    }
  }

  // Calculate summary
  const inStockCount = items.filter(item => item.quantity > item.minStock).length
  const lowStockCount = items.filter(item => item.quantity > 0 && item.quantity <= item.minStock).length
  const outOfStockCount = items.filter(item => item.quantity === 0).length

  // Filter items
  const filteredItems = items.filter(item => {
    const query = searchQuery.toLowerCase()
    const matchesSearch = 
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.supplier.toLowerCase().includes(query)
    return matchesSearch
  })

  return (
    <main className="dashboard-main inventory-main">
      <div className="inventory-summary-cards">
        <div className="summary-card">
          <div className="summary-icon-wrapper in-stock">
            <CheckCircle2 size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-number">{inStockCount}</span>
            <span className="summary-label">In Stock</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon-wrapper low-stock">
            <AlertTriangle size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-number">{lowStockCount}</span>
            <span className="summary-label">Low Stock</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon-wrapper out-stock">
            <XCircle size={24} />
          </div>
          <div className="summary-details">
            <span className="summary-number">{outOfStockCount}</span>
            <span className="summary-label">Out of Stock</span>
          </div>
        </div>
      </div>

      <div className="inventory-card">
        <div className="inventory-card-header">
          <h1 className="inventory-card-title">All Inventory</h1>
          <div className="inventory-actions">
            <div className="inventory-search-wrapper">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                className="inventory-search" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>
            <button className="add-btn" onClick={() => navigate('/owner/inventory/add')}>
              <Plus size={18} /> Add
            </button>
          </div>
        </div>

        <div className="inventory-table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>FLOWER</th>
                <th>CATEGORY</th>
                <th>QUANTITY</th>
                <th>COST</th>
                <th>SELLING PRICE</th>
                <th>STATUS</th>
                <th>UPDATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <tr key={item.id}>
                    <td className="fw-bold">{item.name}</td>
                    <td><span className="category-pill">{item.category}</span></td>
                    <td>
                      <QuantityControl 
                        quantity={item.quantity} 
                        minStock={item.minStock} 
                        onIncrease={() => handleUpdateQuantity(item.id, 1)}
                        onDecrease={() => handleUpdateQuantity(item.id, -1)}
                      />
                    </td>
                    <td>${Number(item.cost).toFixed(2)}</td>
                    <td className="fw-bold">${Number(item.sellingPrice).toFixed(2)}</td>
                    <td><StatusBadge quantity={item.quantity} minStock={item.minStock} /></td>
                    <td className="updated-cell">
                      <span>🕒</span> {item.lastUpdated}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-icon-btn" onClick={() => navigate(`/owner/inventory/${item.id}/edit`)}>
                          <Edit2 size={16} />
                        </button>
                        <button className="action-icon-btn delete" onClick={() => setItemToDelete(item)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-state">No inventory items found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {itemToDelete && (
        <ConfirmDialog 
          title="Delete Item"
          message={`Are you sure you want to delete ${itemToDelete.name} from inventory?`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setItemToDelete(null)}
        />
      )}
    </main>
  )
}

export default InventoryPage
