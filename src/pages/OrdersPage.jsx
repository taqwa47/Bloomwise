import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import '../styles/Orders.css'

const initialMockOrders = [
  { id: "#1042", customerName: "Sarah Johnson", item: "Red Rose Bouquet", amount: 85, status: "Pending", date: "Today 10:30" },
  { id: "#1039", customerName: "Lisa Davis", item: "Sunflower Bundle", amount: 45, status: "Pending", date: "Yesterday" },
  { id: "#1036", customerName: "Omar Khalil", item: "Orchid Gift Set", amount: 130, status: "Pending", date: "Jun 23" },
  { id: "#1033", customerName: "Emma Wilson", item: "Lily Arrangement", amount: 120, status: "Completed", date: "Jun 22" },
  { id: "#1030", customerName: "James Smith", item: "Tulip Basket", amount: 65, status: "Completed", date: "Jun 20" },
  { id: "#1028", customerName: "Sophia Brown", item: "Bridal Bouquet", amount: 250, status: "Completed", date: "Jun 18" },
  { id: "#1027", customerName: "Michael Chen", item: "Potted Fern", amount: 35, status: "Cancelled", date: "Jun 17" },
  { id: "#1022", customerName: "Olivia Davis", item: "Custom Anniversary", amount: 180, status: "Cancelled", date: "Jun 14" }
]

const getInitialColor = (name) => {
  const char = name.charAt(0).toUpperCase()
  const colors = {
    'S': '#2d5440',
    'L': '#305d45',
    'O': '#244535',
    'E': '#3a7254',
    'J': '#1c3a27',
    'M': '#478966'
  }
  return colors[char] || '#315e47'
}

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [activeTab, setActiveTab] = useState('Pending')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const storedOrders = localStorage.getItem('bloomwise_orders')
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    } else {
      setOrders(initialMockOrders)
      localStorage.setItem('bloomwise_orders', JSON.stringify(initialMockOrders))
    }
  }, [])

  const pendingCount = orders.filter(o => o.status === 'Pending').length
  const completedCount = orders.filter(o => o.status === 'Completed').length
  const cancelledCount = orders.filter(o => o.status === 'Cancelled').length

  const filteredOrders = orders.filter(order => {
    const matchesTab = order.status === activeTab
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower) ||
      order.item.toLowerCase().includes(searchLower)
    
    return matchesTab && matchesSearch
  })

  return (
    <main className="dashboard-main orders-main">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Orders</h1>
        <div className="header-actions">
          <button className="action-btn">
            <div style={{width:20, height:20, borderRadius:'50%', border:'2px solid #e2e1d7'}}></div>
          </button>
          <button className="action-btn">
            <span>🌻</span>
          </button>
        </div>
      </header>

      <div className="orders-card">
        <div className="orders-card-header">
          <div className="orders-tabs">
            <button 
              className={`order-tab ${activeTab === 'Pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('Pending')}
            >
              Pending <span className="tab-count">({pendingCount})</span>
            </button>
            <button 
              className={`order-tab ${activeTab === 'Completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Completed')}
            >
              Completed <span className="tab-count">({completedCount})</span>
            </button>
            <button 
              className={`order-tab ${activeTab === 'Cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('Cancelled')}
            >
              Cancelled <span className="tab-count">({cancelledCount})</span>
            </button>
          </div>
          
          <div className="orders-search-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              className="orders-search" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="orders-table-wrapper">
          <table className="orders-table custom-table">
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>ITEM</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="fw-bold">{order.id}</td>
                    <td>
                      <div className="customer-cell">
                        <div className="customer-avatar" style={{backgroundColor: getInitialColor(order.customerName)}}>
                          {order.customerName.charAt(0).toUpperCase()}
                        </div>
                        <span className="customer-name">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="item-cell">{order.item}</td>
                    <td className="fw-bold amount-cell">${order.amount}</td>
                    <td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td className="date-cell">{order.date}</td>
                    <td>
                      <button className="view-btn">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="empty-state">No orders found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

export default OrdersPage
