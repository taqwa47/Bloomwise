import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, CheckCircle2, AlertTriangle, XCircle, Edit2, Trash2 } from 'lucide-react'
import StatusBadge from '../components/inventory/StatusBadge'
import QuantityControl from '../components/inventory/QuantityControl'
import ConfirmDialog from '../components/inventory/ConfirmDialog'
import '../styles/Inventory.css'
import { useLocation } from 'react-router-dom'
import { useInventory } from '../hooks/useInventory'
// Mock inventory moved to useInventory hook

const InventoryPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { inventory: items, saveInventory: saveItems, updateQuantity: handleUpdateQuantity } = useInventory()
  const [searchQuery, setSearchQuery] = useState('')
  const [itemToDelete, setItemToDelete] = useState(null)
  
  // Custom filter state (e.g. 'all', 'alerts')
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('filter') === 'alerts') {
      setActiveFilter('alerts');
    }
  }, [location]);

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
    if (activeFilter === 'alerts' && item.quantity > item.minStock) {
      return false; // Skip healthy stock when alerts filter is active
    }
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
          <h1 className="inventory-card-title">{activeFilter === 'alerts' ? 'Stock Alerts' : 'All Inventory'}</h1>
          <div className="inventory-actions">
            {activeFilter === 'alerts' && (
              <button 
                className="clear-search-btn" 
                onClick={() => {
                  setActiveFilter('all');
                  navigate('/owner/inventory');
                }}
                style={{ padding: '8px 16px', background: '#e2e8e4', borderRadius: '8px', color: '#1a2f24', border: 'none', cursor: 'pointer', fontWeight: 600, marginRight: '12px' }}
              >
                Clear Filter
              </button>
            )}
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
