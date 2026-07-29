import React from 'react'
import { DollarSign, ShoppingBag, Leaf, AlertTriangle, ScanLine, HelpCircle } from 'lucide-react'

// Using random placeholders for the stock images based on the design
const whiteLilyImg = "https://images.unsplash.com/photo-1596438459194-f2832812cd80?auto=format&fit=crop&q=80&w=150"
const sunflowerImg = "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&q=80&w=150"

import WeeklySalesChart from './WeeklySalesChart'

const DashboardContent = () => {
  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="header-actions">
          <button className="action-btn">
            <div style={{width:20, height:20, borderRadius:'50%', border:'2px solid #e2e1d7'}}></div>
          </button>
          <button className="action-btn">
            <span>🌻</span>
          </button>
        </div>
      </header>

      <section className="welcome-banner">
        <div className="welcome-badge">
          <span>🌿</span> GOOD DAY
        </div>
        <h2 className="welcome-title">Welcome back, Sophie</h2>
        <p className="welcome-subtitle">
          Your shop has <strong>3 pending orders</strong> and <strong>2 low stock alerts</strong> today.
        </p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><DollarSign size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">$1,247</h3>
          <p className="stat-title">Today's Sales</p>
          <p className="stat-subtitle" style={{color:'#6a957a'}}>+12%</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><ShoppingBag size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">3</h3>
          <p className="stat-title">Pending Orders</p>
          <p className="stat-subtitle">New</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><Leaf size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">78</h3>
          <p className="stat-title">Flowers in Stock</p>
          <p className="stat-subtitle">6 types</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{color:'#d84545', background:'#fdf5eb'}}><AlertTriangle size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">2</h3>
          <p className="stat-title">Low Stock Alerts</p>
          <p className="stat-subtitle">Action</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><ScanLine size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">5</h3>
          <p className="stat-title">AI Diagnoses</p>
          <p className="stat-subtitle">Today</p>
        </div>
      </section>

      <WeeklySalesChart />

      <div className="bottom-grid">
        <section className="section-card">
          <div className="section-header">
            <h3 className="section-title">Recent Orders</h3>
            <span className="view-all">View all →</span>
          </div>
          
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1042</td>
                <td>
                  <div className="customer-cell">
                    <div className="customer-avatar" style={{background:'#2d5440'}}>S</div>
                    Sarah Johnson
                  </div>
                </td>
                <td>Red Rose Bouquet</td>
                <td>$85</td>
                <td><span className="status-pill pending">Pending</span></td>
              </tr>
              <tr>
                <td>#1041</td>
                <td>
                  <div className="customer-cell">
                    <div className="customer-avatar" style={{background:'#305d45'}}>E</div>
                    Emma Wilson
                  </div>
                </td>
                <td>Lily Arrangement</td>
                <td>$120</td>
                <td><span className="status-pill completed">Completed</span></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="section-card">
          <div className="section-header">
            <h3 className="section-title">Stock Alerts</h3>
            <div style={{background:'#d84545', color:'#fff', width:20, height:20, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700}}>3</div>
          </div>
          
          <div className="alerts-list">
            <div className="alert-item">
              <img src={whiteLilyImg} alt="White Lily" className="alert-img" />
              <div className="alert-info">
                <div className="alert-info-top">
                  <AlertTriangle size={14} className="alert-icon" />
                  <span className="alert-name">White Lily</span>
                </div>
                <p className="alert-desc">3 left</p>
              </div>
              <button className="fix-btn">Fix →</button>
            </div>
            
            <div className="alert-item">
              <img src={sunflowerImg} alt="Sunflower" className="alert-img" />
              <div className="alert-info">
                <div className="alert-info-top">
                  <AlertTriangle size={14} className="alert-icon" />
                  <span className="alert-name">Sunflower</span>
                </div>
                <p className="alert-desc">Out of stock</p>
              </div>
              <button className="fix-btn">Fix →</button>
            </div>
          </div>
        </section>
      </div>
      
      <div style={{position:'absolute', bottom:32, right:32}}>
         <button className="action-btn" style={{width:48, height:48}}>
            <HelpCircle size={24} />
         </button>
      </div>
    </main>
  )
}

export default DashboardContent
