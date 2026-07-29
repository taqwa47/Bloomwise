import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

const EVENT_TYPES = ['All Events', 'Wedding', 'Birthday', 'Graduation', 'Engagement', 'Anniversary', 'Corporate Event', 'Custom Bouquet', 'Other'];
const STATUSES = ['All Statuses', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
const SORTS = ['Nearest Event', 'Newest Event', 'Highest Budget', 'Lowest Budget'];
const STOCKS = ['All', 'Sufficient Stock', 'Insufficient Stock'];

const EventFilters = ({ 
  searchTerm, setSearchTerm, 
  typeFilter, setTypeFilter, 
  statusFilter, setStatusFilter,
  stockFilter, setStockFilter,
  sortOption, setSortOption 
}) => {
  return (
    <div className="events-controls">
      <div className="events-control-box">
        <Search size={18} color="#9aa69d" />
        <input 
          type="text" 
          placeholder="Search by client, type, location..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="events-control-box" style={{ flex: '0 1 auto' }}>
        <Filter size={18} color="#5c6661" />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="events-control-box" style={{ flex: '0 1 auto' }}>
        <Filter size={18} color="#5c6661" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="events-control-box" style={{ flex: '0 1 auto' }}>
        <Filter size={18} color="#5c6661" />
        <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}>
          {STOCKS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="events-control-box" style={{ flex: '0 1 auto' }}>
        <SortAsc size={18} color="#5c6661" />
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  );
};

export default EventFilters;
