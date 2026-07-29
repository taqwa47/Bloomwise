import React from 'react'
import { Plus } from 'lucide-react'

const getEventIcon = (type) => {
  switch(type) {
    case 'Wedding': return '💍'
    case 'Engagement': return '💖'
    case 'Birthday': return '🍰'
    case 'Corporate Event': return '🏢'
    case 'Custom Bouquet': return '🎓'
    case 'Supplier Delivery': return '🚚'
    case 'Customer Appointment': return '🤝'
    default: return '📍'
  }
}

const EventDetails = ({ selectedDate, events, onEdit, onDelete, onNewEvent }) => {
  const dayEvents = events.filter(e => e.date === selectedDate)
  
  // Format date for display
  const dateObj = new Date(selectedDate)
  const dateDisplay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  
  return (
    <div className="event-details-container">
      {dayEvents.length > 0 ? (
        <div className="event-card">
          <div className="event-card-header">
            <div className="event-card-icon">{getEventIcon(dayEvents[0].type)}</div>
            <div className="event-card-title-area">
              <h3 className="event-card-title">{dayEvents[0].title}</h3>
              <span className="event-card-type">{dayEvents[0].type}</span>
            </div>
          </div>
          
          <div className="event-info-list">
            <div className="info-row">
              <span className="info-label">Client</span>
              <span className="info-value">{dayEvents[0].clientName}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Time</span>
              <span className="info-value">{dayEvents[0].time}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">{dayEvents[0].location}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Theme</span>
              <span className="info-value">{dayEvents[0].theme}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Status</span>
              <span className="info-value">{dayEvents[0].status}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Budget</span>
              <span className="info-value">${dayEvents[0].budget}</span>
            </div>
          </div>
          
          <div className="event-actions">
            <button className="edit-btn" onClick={() => onEdit(dayEvents[0])}>Edit Event</button>
            <button className="delete-btn" onClick={() => onDelete(dayEvents[0].id)}>Delete Event</button>
          </div>
        </div>
      ) : (
        <div className="event-card empty-card">
          <p>No events scheduled for this date</p>
          <p className="empty-date">{dateDisplay}</p>
        </div>
      )}
      
      <button className="new-event-btn" onClick={onNewEvent}>
        <Plus size={18} /> New Event
      </button>
    </div>
  )
}

export default EventDetails
