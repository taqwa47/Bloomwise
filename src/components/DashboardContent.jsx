import React, { useMemo } from 'react';
import { DollarSign, ShoppingBag, Leaf, AlertTriangle, ScanLine, HelpCircle } from 'lucide-react';
import WeeklySalesChart from './dashboard/WeeklySalesChart';
import RecentOrdersCard from './dashboard/RecentOrdersCard';
import StockAlertsCard from './dashboard/StockAlertsCard';
import { useOrders } from '../hooks/useOrders';
import { useInventory } from '../hooks/useInventory';

const DashboardContent = () => {
  const { orders } = useOrders();
  const { inventory } = useInventory();

  // Compute live stats
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  
  const alerts = inventory.filter(item => item.quantity <= item.minStock);
  const alertsCount = alerts.length;

  const inStockCount = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const typesCount = inventory.length;

  const todaysSales = useMemo(() => {
    const todayStr = 'Today';
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    
    const todayOrders = orders.filter(o => {
      if (o.status === 'Cancelled' || o.status === 'Rejected') return false;
      if (o.timestamp && o.timestamp >= startOfToday.getTime()) return true;
      if (o.date?.includes(todayStr)) return true;
      return false;
    });
    
    return todayOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  }, [orders]);

  return (
    <main className="dashboard-main">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <div className="header-actions">
          <button className="action-btn">
            <div style={{width: 20, height: 20, borderRadius: '50%', border: '2px solid #e2e1d7'}}></div>
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
          Your shop has <strong>{pendingOrdersCount} pending orders</strong> and <strong>{alertsCount} stock alerts</strong> today.
        </p>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><DollarSign size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">₪{todaysSales.toLocaleString()}</h3>
          <p className="stat-title">Today's Sales</p>
          <p className="stat-subtitle" style={{color: '#6a957a'}}>Real-time</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><ShoppingBag size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">{pendingOrdersCount}</h3>
          <p className="stat-title">Pending Orders</p>
          <p className="stat-subtitle">Action required</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon"><Leaf size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value">{inStockCount}</h3>
          <p className="stat-title">Flowers in Stock</p>
          <p className="stat-subtitle">{typesCount} types</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <div className="stat-icon" style={{color: alertsCount > 0 ? '#d84545' : '#16a34a', background: alertsCount > 0 ? '#fdf5eb' : '#ebfdf2'}}><AlertTriangle size={20} /></div>
            <div className="stat-badge">Live</div>
          </div>
          <h3 className="stat-value" style={{color: alertsCount > 0 ? '#d84545' : '#1a2f24'}}>{alertsCount}</h3>
          <p className="stat-title">Low Stock Alerts</p>
          <p className="stat-subtitle">{alertsCount > 0 ? 'Needs attention' : 'All good'}</p>
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
        <RecentOrdersCard />
        <StockAlertsCard />
      </div>
      
      <div style={{position: 'absolute', bottom: 32, right: 32}}>
         <button className="action-btn" style={{width: 48, height: 48}}>
            <HelpCircle size={24} />
         </button>
      </div>
    </main>
  );
};

export default DashboardContent;
