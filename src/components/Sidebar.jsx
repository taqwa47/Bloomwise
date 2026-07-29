import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Calendar, 
  ShoppingBag, 
  Box, 
  Leaf, 
  ScanLine, 
  Activity, 
  BarChart2, 
  Truck, 
  Heart, 
  CalendarDays, 
  Bell, 
  Settings,
  ChevronLeft
} from 'lucide-react'
import { useNotifications } from '../hooks/useNotifications'
import { useSettings } from '../hooks/useSettings'

const Sidebar = ({ toggleCollapse }) => {
  const { unreadCount } = useNotifications();
  const { settings } = useSettings();
  
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {settings.logo ? (
            <img src={settings.logo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          ) : (
            <Leaf size={18} />
          )}
        </div>
        <span className="sidebar-brand" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {settings.shopName || 'BloomWise'}
        </span>
        <span className="pro-badge">Pro</span>
        <button className="collapse-btn" onClick={toggleCollapse}>
          <ChevronLeft size={16} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/owner/calendar" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Calendar size={18} />
          <span>Calendar</span>
        </NavLink>
        <NavLink to="/owner/orders" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ShoppingBag size={18} />
          <span>Orders</span>
        </NavLink>
        <NavLink to="/owner/inventory" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Box size={18} />
          <span>Inventory</span>
        </NavLink>
        <NavLink to="/owner/flowers" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Leaf size={18} />
          <span>Flowers</span>
        </NavLink>
        <NavLink to="/owner/diagnosis" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ScanLine size={18} />
          <span>AI Diagnosis</span>
        </NavLink>
        <NavLink to="/owner/smart-plant-care" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Activity size={18} />
          <span>Smart Plant Care</span>
        </NavLink>
        <NavLink to="/owner/analytics" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <BarChart2 size={18} />
          <span>Analytics</span>
        </NavLink>
        <NavLink to="/owner/suppliers" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Truck size={18} />
          <span>Suppliers</span>
        </NavLink>
        <NavLink to="/owner/customers" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Heart size={18} />
          <span>Customers</span>
        </NavLink>
        <NavLink to="/owner/events" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <CalendarDays size={18} />
          <span>Events & Bouquets</span>
        </NavLink>
        
      </nav>
      
      <div className="sidebar-footer">
        <NavLink to="/owner/notifications" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Bell size={18} />
          <span>Notifications</span>
          {unreadCount > 0 && <div className="nav-badge">{unreadCount}</div>}
        </NavLink>
        <NavLink to="/owner/settings" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar
