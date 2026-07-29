import React from 'react'
import Sidebar from './Sidebar'
import '../styles/Dashboard.css'
import '../styles/Calendar.css'

const OwnerLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      {children}
    </div>
  )
}

export default OwnerLayout
