import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const EventStatusBadge = ({ status }) => {
  const statusClass = `status-${status.toLowerCase().replace(' ', '-')}`;
  return <span className={`event-status ${statusClass}`}>{status}</span>;
};

export const StockStatusBadge = ({ flower }) => {
  return (
    <div className={`flower-badge ${flower.isInsufficient ? 'insufficient' : 'sufficient'}`}>
      {flower.isInsufficient && <AlertTriangle size={14} />}
      {flower.name}: {flower.required} needed ({flower.available} in stock)
    </div>
  );
};

export const StockWarning = ({ date }) => {
  return (
    <div className="event-warning-bar">
      <AlertTriangle size={16} />
      <span>Insufficient stock for this event. Reorder required before {date}.</span>
    </div>
  );
};
