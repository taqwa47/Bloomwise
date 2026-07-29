import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import '../styles/Dashboard.css'
import '../styles/Calendar.css'

const OwnerLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`dashboard-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      {children}
      
      {/* Global Logout Button */}
      <button 
        onClick={handleLogout}
        className="global-logout-btn"
        style={{
          position: 'fixed',
          top: '24px',
          right: '32px',
          zIndex: 1000,
          background: '#11281b',
          color: '#fff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  )
}

export default OwnerLayout
