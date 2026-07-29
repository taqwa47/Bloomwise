import React, { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';

const EVENT_ICONS = {
  'Wedding': '💍',
  'Birthday': '🎂',
  'Graduation': '🎓',
  'Engagement': '💖',
  'Anniversary': '🥂',
  'Corporate Event': '🏢',
  'Custom Bouquet': '💐',
  'Other': '📅'
};

const EventCard = ({ event, onClick }) => {
  const icon = EVENT_ICONS[event.type] || EVENT_ICONS['Other'];
  
  // Need to read inventory and compare
  const inventory = useMemo(() => JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]'), []);
  
  const flowerStatuses = (event.flowers || []).map(f => {
    const invItem = inventory.find(i => i.name.toLowerCase() === f.name.toLowerCase());
    const available = invItem ? invItem.quantity : 0;
    const isInsufficient = f.required > available;
    return { ...f, available, isInsufficient };
  });

  const hasInsufficient = flowerStatuses.some(f => f.isInsufficient);

  const statusClass = `status-${event.status.toLowerCase().replace(' ', '-')}`;

  return (
    <div className="event-card" onClick={() => onClick(event)}>
      <div className="event-card-top">
        <div className="event-card-info">
          <div className="event-icon-box">{icon}</div>
          <div>
            <h3 className="event-client">
              {event.clientName}
              <span className="event-type-badge">{event.type}</span>
            </h3>
            <span className="event-meta">
              {event.date} • {event.time} • {event.location}
            </span>
          </div>
        </div>
        <div className="event-card-right">
          <span className={`event-status ${statusClass}`}>{event.status}</span>
          <span className="event-budget">${event.budget}</span>
        </div>
      </div>

      <div className="event-flowers-section">
        <span className="flowers-label">Flowers Needed</span>
        <div className="flower-badges">
          {flowerStatuses.map((f, i) => (
            <div key={i} className={`flower-badge ${f.isInsufficient ? 'insufficient' : 'sufficient'}`}>
              {f.isInsufficient && <AlertTriangle size={14} />}
              {f.name}: {f.required} needed ({f.available} in stock)
            </div>
          ))}
          {flowerStatuses.length === 0 && (
            <span style={{ fontSize: 13, color: '#9aa69d' }}>No flowers specified.</span>
          )}
        </div>
        
        {hasInsufficient && (
          <div className="event-warning-bar">
            <AlertTriangle size={16} />
            <span>Insufficient stock for this event. Reorder required before {event.date}.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
