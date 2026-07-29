import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#fff', border: '1px solid #e2e8e4', padding: '12px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <p style={{ margin: '0 0 8px', fontWeight: '600', color: '#1a2f24' }}>{payload[0].payload.fullDate}</p>
        <p style={{ margin: '0 0 4px', color: '#315e47', fontWeight: '600' }}>Sales: ₪{payload[0].value}</p>
        <p style={{ margin: 0, color: '#5c6661', fontSize: '13px' }}>Orders: {payload[0].payload.ordersCount}</p>
      </div>
    );
  }
  return null;
};

export default function WeeklySalesChart() {
  const { orders } = useOrders();
  
  // State for the currently displayed week's start date (Monday)
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(d.setDate(diff));
  });

  // Calculate if the displayed week is the current actual week
  const isThisWeek = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const actualWeekStart = new Date(d.setDate(diff));
    return currentWeekStart.getTime() === actualWeekStart.getTime();
  }, [currentWeekStart]);

  const handlePrevWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const handleNextWeek = () => {
    if (isThisWeek) return;
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const handleThisWeek = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    setCurrentWeekStart(new Date(d.setDate(diff)));
  };

  // Generate data for a specific week start
  const getWeeklyData = (weekStart) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let weekTotal = 0;
    
    const data = days.map((dayName, index) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + index);
      const startOfDay = date.getTime();
      const endOfDay = startOfDay + 24 * 60 * 60 * 1000 - 1;

      // Find orders for this day (ignoring cancelled/rejected)
      const dailyOrders = orders.filter(o => {
        if (o.status === 'Cancelled' || o.status === 'Rejected') return false;
        // In a real app we'd use exact timestamps, here we approximate if timestamp exists, or match 'date' strings like 'Today' for demo.
        // Let's rely on o.timestamp if available.
        if (o.timestamp) {
          return o.timestamp >= startOfDay && o.timestamp <= endOfDay;
        }
        return false; // For older hardcoded mocks without timestamp, they'll show 0 unless we add logic
      });

      const dailySales = dailyOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
      weekTotal += dailySales;

      return {
        name: dayName,
        fullDate: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
        sales: dailySales,
        ordersCount: dailyOrders.length
      };
    });
    
    return { data, weekTotal };
  };

  const currentWeekData = getWeeklyData(currentWeekStart);
  
  const prevWeekStart = new Date(currentWeekStart);
  prevWeekStart.setDate(prevWeekStart.getDate() - 7);
  const prevWeekData = getWeeklyData(prevWeekStart);

  // Calculate percentage change
  const currentTotal = currentWeekData.weekTotal;
  const prevTotal = prevWeekData.weekTotal;
  
  let percentageChange = 0;
  if (prevTotal > 0) {
    percentageChange = ((currentTotal - prevTotal) / prevTotal) * 100;
  } else if (currentTotal > 0) {
    percentageChange = 100; // infinite growth if prev was 0
  }

  const weekEnd = new Date(currentWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const dateRangeStr = `${currentWeekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

  const hasSales = currentTotal > 0;

  return (
    <div className="section-card" style={{ marginBottom: '24px' }}>
      <div className="section-header" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
        <div>
          <h3 className="section-title">Weekly Sales</h3>
          <p style={{ color: '#88928d', margin: '4px 0 0', fontSize: '14px' }}>Revenue: ₪{currentTotal.toLocaleString()}</p>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ 
            background: percentageChange > 0 ? '#ebfdf2' : percentageChange < 0 ? '#fef2f2' : '#f8faf9', 
            color: percentageChange > 0 ? '#16a34a' : percentageChange < 0 ? '#ef4444' : '#5c6661', 
            padding: '6px 12px', 
            borderRadius: '20px', 
            fontSize: '13px', 
            fontWeight: '700', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px' 
          }}>
            {percentageChange > 0 ? <TrendingUp size={16} /> : percentageChange < 0 ? <TrendingDown size={16} /> : <Minus size={16} />}
            {percentageChange > 0 ? '+' : ''}{Math.round(percentageChange)}%
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
            <span style={{ fontSize: '13px', color: '#5c6661', fontWeight: 500 }}>{dateRangeStr}</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button onClick={handlePrevWeek} style={{ background: '#f8faf9', border: '1px solid #e2e8e4', borderRadius: '6px', padding: '4px', cursor: 'pointer' }}>
                <ChevronLeft size={16} color="#1a2f24" />
              </button>
              <button onClick={handleThisWeek} style={{ background: '#f8faf9', border: '1px solid #e2e8e4', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', fontWeight: 600, color: '#1a2f24' }}>
                This Week
              </button>
              <button onClick={handleNextWeek} disabled={isThisWeek} style={{ background: '#f8faf9', border: '1px solid #e2e8e4', borderRadius: '6px', padding: '4px', cursor: isThisWeek ? 'not-allowed' : 'pointer', opacity: isThisWeek ? 0.5 : 1 }}>
                <ChevronRight size={16} color="#1a2f24" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 300, position: 'relative' }}>
        {!hasSales ? (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#88928d', background: '#f8faf9', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
            No sales recorded for this week.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentWeekData.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#315e47" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#315e47" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8e4" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#88928d', fontSize: 13 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#88928d', fontSize: 13 }} tickFormatter={(value) => `₪${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#315e47" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSales)" 
                activeDot={{ r: 6, fill: '#315e47', stroke: '#fff', strokeWidth: 2 }}
                dot={{ r: 4, fill: '#fff', stroke: '#315e47', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
