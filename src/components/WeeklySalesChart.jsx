import React from 'react'

const WeeklySalesChart = () => {
  return (
    <div className="section-card" style={{ marginBottom: '24px' }}>
      <div className="section-header" style={{ marginBottom: '10px' }}>
        <div>
          <h3 className="section-title">Weekly Sales</h3>
          <p style={{ color: '#9aa69d', margin: '4px 0 0', fontSize: '14px' }}>Revenue over the past 7 days</p>
        </div>
        <div style={{ background: '#ebfdf2', color: '#315e47', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          +14%
        </div>
      </div>
      
      <div style={{ width: '100%', overflowX: 'auto', paddingTop: '20px' }}>
        <svg viewBox="0 0 1000 300" style={{ width: '100%', minWidth: '700px', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#315e47" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#315e47" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          <g stroke="#f0efea" strokeWidth="1" strokeDasharray="4 4">
            <line x1="80" y1="50" x2="950" y2="50" />
            <line x1="80" y1="100" x2="950" y2="100" />
            <line x1="80" y1="150" x2="950" y2="150" />
            <line x1="80" y1="200" x2="950" y2="200" />
            <line x1="80" y1="250" x2="950" y2="250" />
          </g>

          {/* Y-Axis Labels */}
          <g fill="#9aa69d" fontSize="13" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="end">
            <text x="65" y="54">$2200</text>
            <text x="65" y="104">$1650</text>
            <text x="65" y="154">$1100</text>
            <text x="65" y="204">$550</text>
            <text x="65" y="254">$0</text>
          </g>

          {/* X-Axis Labels */}
          <g fill="#9aa69d" fontSize="13" fontFamily="var(--font-sans)" fontWeight="500" textAnchor="middle">
            <text x="100" y="280">Mon</text>
            <text x="242" y="280">Tue</text>
            <text x="383" y="280">Wed</text>
            <text x="525" y="280">Thu</text>
            <text x="667" y="280">Fri</text>
            <text x="808" y="280">Sat</text>
            <text x="950" y="280">Sun</text>
          </g>

          {/* Area Fill */}
          <path 
            d="M 100,250 L 100,177 C 171,177 171,150 242,150 C 313,150 313,159 383,159 C 454,159 454,127 525,127 C 596,127 596,100 667,100 C 738,100 738,55 808,55 C 879,55 879,136 950,136 L 950,250 Z" 
            fill="url(#chartGradient)" 
          />

          {/* Line Chart */}
          <path 
            d="M 100,177 C 171,177 171,150 242,150 C 313,150 313,159 383,159 C 454,159 454,127 525,127 C 596,127 596,100 667,100 C 738,100 738,55 808,55 C 879,55 879,136 950,136" 
            fill="none" 
            stroke="#315e47" 
            strokeWidth="3" 
            strokeLinecap="round"
          />

          {/* Data Points */}
          <g fill="#fff" stroke="#315e47" strokeWidth="2">
            <circle cx="100" cy="177" r="4" />
            <circle cx="242" cy="150" r="4" />
            <circle cx="383" cy="159" r="4" />
            <circle cx="525" cy="127" r="4" />
            <circle cx="667" cy="100" r="4" />
            <circle cx="808" cy="55" r="4" />
            <circle cx="950" cy="136" r="4" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export default WeeklySalesChart
