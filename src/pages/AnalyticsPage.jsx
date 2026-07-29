import React from 'react'
import { TrendingUp, Truck, Heart, Leaf } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts'
import { CustomTooltip } from '../components/analytics/CustomTooltip'
import '../styles/Analytics.css'

const monthlyRevenueData = [
  { name: 'Jan', revenue: 3000 },
  { name: 'Feb', revenue: 5800 },
  { name: 'Mar', revenue: 4000 },
  { name: 'Apr', revenue: 6500 },
  { name: 'May', revenue: 8000 },
  { name: 'Jun', revenue: 9500 },
  { name: 'Jul', revenue: 8500 },
  { name: 'Aug', revenue: 7000 },
  { name: 'Sep', revenue: 7200 },
  { name: 'Oct', revenue: 8800 },
  { name: 'Nov', revenue: 11500 },
  { name: 'Dec', revenue: 14500 },
]

const mostSoldFlowersData = [
  { name: 'Rose', sold: 450 },
  { name: 'Lily', sold: 320 },
  { name: 'Tulip', sold: 280 },
  { name: 'Peony', sold: 190 },
  { name: 'Orchid', sold: 150 },
  { name: 'Sunflower', sold: 120 },
]

const seasonRevenueData = [
  { name: 'Winter', revenue: 4000 },
  { name: 'Spring', revenue: 9000 },
  { name: 'Summer', revenue: 7600 },
  { name: 'Fall', revenue: 5500 },
]

const formatYAxisCurrency = (tickItem) => {
  if (tickItem === 0) return '$0k'
  return `$${tickItem / 1000}k`
}

const AnalyticsPage = () => {
  return (
    <main className="dashboard-main analytics-main">
      <header className="dashboard-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: 4, height: 24, background: '#315e47', borderRadius: 4}}></div>
          <h1 className="dashboard-title">Analytics</h1>
        </div>
        <div className="header-actions">
          <button className="action-btn">
            <div style={{width:20, height:20, background: '#f5f5f5', borderRadius:'50%', border:'2px solid #e2e1d7'}}></div>
          </button>
          <button className="action-btn">
            <span>🌻</span>
          </button>
        </div>
      </header>

      <div className="analytics-bottom-row" style={{gridTemplateColumns: '1fr 1fr'}}>
        {/* Monthly Revenue Chart */}
        <div className="chart-card-wrapper">
          <div className="chart-header">
            <h2 className="chart-title">Monthly Revenue 2025</h2>
            <p className="chart-subtitle">Year-to-date revenue overview</p>
          </div>
          <div style={{ width: '100%', height: 300 }} tabIndex="0" aria-label="Monthly Revenue Chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#315e47" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#315e47" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0efea" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9aa69d', fontSize: 12, fontFamily: 'var(--font-sans)'}} 
                  dy={10}
                />
                <YAxis 
                  tickFormatter={formatYAxisCurrency} 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: '#9aa69d', fontSize: 12, fontFamily: 'var(--font-sans)'}} 
                  domain={[0, 16000]}
                  ticks={[0, 4000, 8000, 12000, 16000]}
                />
                <Tooltip 
                  content={<CustomTooltip prefix="$" />} 
                  cursor={{ stroke: '#e2e8e4', strokeWidth: 1 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#315e47" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  activeDot={{ r: 6, fill: '#315e47', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Sold Flowers Chart */}
        <div className="chart-card-wrapper">
          <div className="chart-header">
            <h2 className="chart-title">Most Sold Flowers</h2>
            <p className="chart-subtitle">Units sold this year</p>
          </div>
          <div style={{ width: '100%', height: 300 }} tabIndex="0" aria-label="Most Sold Flowers Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mostSoldFlowersData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0efea" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9aa69d', fontSize: 12, fontFamily: 'var(--font-sans)'}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: '#9aa69d', fontSize: 12, fontFamily: 'var(--font-sans)'}} 
                  domain={[0, 600]}
                  ticks={[0, 150, 300, 450, 600]}
                />
                <Tooltip 
                  content={<CustomTooltip valueLabel="Sold" />}
                  cursor={{ fill: '#e2e8e4' }}
                />
                <Bar dataKey="sold" fill="#315e47" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="analytics-bottom-row">
        {/* Season Revenue Chart */}
        <div className="chart-card-wrapper">
          <div className="chart-header">
            <h2 className="chart-title">Season Revenue</h2>
            <p className="chart-subtitle">Revenue by season</p>
          </div>
          <div style={{ width: '100%', height: 260 }} tabIndex="0" aria-label="Season Revenue Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0efea" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#9aa69d', fontSize: 12, fontFamily: 'var(--font-sans)'}} 
                  dy={10}
                />
                <YAxis 
                  tickFormatter={formatYAxisCurrency} 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: '#9aa69d', fontSize: 12, fontFamily: 'var(--font-sans)'}} 
                  domain={[0, 10000]}
                  ticks={[0, 3000, 5000, 8000, 10000]}
                />
                <Tooltip 
                  content={<CustomTooltip prefix="$" />}
                  cursor={{ fill: '#e2e8e4' }}
                />
                <Bar dataKey="revenue" fill="#80a887" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2x2 Stats Grid */}
        <div className="analytics-stats-grid">
          <div className="analytics-stat-box">
            <div className="analytics-stat-icon-wrapper trend">
              <TrendingUp size={24} />
            </div>
            <div className="analytics-stat-label">BEST MONTH</div>
            <div className="analytics-stat-value">December</div>
            <div className="analytics-stat-desc">$14,500 revenue</div>
          </div>

          <div className="analytics-stat-box">
            <div className="analytics-stat-icon-wrapper flower">
              <Leaf size={24} />
            </div>
            <div className="analytics-stat-label">TOP FLOWER</div>
            <div className="analytics-stat-value">Red Rose</div>
            <div className="analytics-stat-desc">450 units sold</div>
          </div>

          <div className="analytics-stat-box">
            <div className="analytics-stat-icon-wrapper supplier">
              <Truck size={24} />
            </div>
            <div className="analytics-stat-label">BEST SUPPLIER</div>
            <div className="analytics-stat-value">Green Fields</div>
            <div className="analytics-stat-desc">$410 orders</div>
          </div>

          <div className="analytics-stat-box">
            <div className="analytics-stat-icon-wrapper customer">
              <Heart size={24} />
            </div>
            <div className="analytics-stat-label">TOP CUSTOMER</div>
            <div className="analytics-stat-value">Lisa Davis</div>
            <div className="analytics-stat-desc">15 orders • $1,240</div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AnalyticsPage
