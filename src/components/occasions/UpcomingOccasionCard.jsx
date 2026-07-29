import React from 'react';
import { CalendarHeart, Clock, Gift } from 'lucide-react';
import { getOccasionColorClass } from './OccasionsCalendar';

export default function UpcomingOccasionCard({ occasion, daysRemaining, onClick, onChooseGift }) {
  
  return (
    <div className="occasion-card">
      <div className="occasion-card-header">
        <div>
          <h4 className="occasion-card-title">{occasion.title}</h4>
          <p className="occasion-card-subtitle">{occasion.type} • For {occasion.recipientName}</p>
        </div>
        <div className="occasion-card-date">
          {new Date(occasion.date).toLocaleDateString('default', { month: 'short', day: 'numeric' })}
        </div>
      </div>
      
      <div className="occasion-card-meta">
        <div className="occasion-card-meta-item">
          <Clock size={16} />
          <span style={{ color: daysRemaining <= 7 ? '#d97706' : 'inherit', fontWeight: daysRemaining <= 7 ? 600 : 'normal' }}>
            {daysRemaining === 0 ? 'Today!' : daysRemaining === 1 ? 'Tomorrow' : `In ${daysRemaining} days`}
          </span>
        </div>
        {occasion.repeatsYearly && (
          <div className="occasion-card-meta-item" style={{ background: '#eef3ef', padding: '2px 6px', borderRadius: 4, fontSize: 11, color: '#315e47', fontWeight: 600 }}>
            YEARLY
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button 
          className="btn-choose-gift" 
          style={{ flex: 1, background: '#fff', color: '#1a2f24' }}
          onClick={() => onClick(occasion)}
        >
          Details
        </button>
        <button 
          className="btn-choose-gift" 
          style={{ flex: 1 }}
          onClick={() => onChooseGift(occasion)}
        >
          <Gift size={16} /> Choose Gift
        </button>
      </div>
    </div>
  );
}
