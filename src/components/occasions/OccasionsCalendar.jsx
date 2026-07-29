import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { generateCalendarGrid, isSameDay, isToday } from '../../utils/dateUtils';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getOccasionColorClass = (type) => {
  switch (type) {
    case 'Birthday': return 'bg-birthday';
    case 'Wedding Anniversary':
    case 'Engagement Anniversary': return 'bg-anniversary';
    case 'Wedding': return 'bg-wedding';
    case 'Graduation': return 'bg-graduation';
    case 'Mother\'s Day':
    case 'Father\'s Day': return 'bg-mothers-day';
    case 'Custom Occasion': return 'bg-custom';
    default: return 'bg-default';
  }
};

export default function OccasionsCalendar({ 
  currentDate, setCurrentDate, occasions, onDateClick, onOccasionClick 
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const grid = generateCalendarGrid(year, month);

  const getOccasionsForDate = (date) => {
    if (!date) return [];
    return occasions.filter(occ => {
      const occDate = new Date(occ.date);
      if (occ.repeatsYearly) {
        return occDate.getMonth() === date.getMonth() && occDate.getDate() === date.getDate();
      }
      return isSameDay(occDate, date);
    });
  };

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h3 className="calendar-month-title">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="calendar-nav">
          <button onClick={handleToday} style={{ width: 'auto', padding: '0 12px', fontSize: 13, fontWeight: 600, borderRadius: 16 }}>Today</button>
          <button onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
          <button onClick={handleNextMonth}><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="calendar-grid">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}

        {grid.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="calendar-day empty"></div>;
          }

          const dayOccasions = getOccasionsForDate(date);
          const isTodayDate = isToday(date);

          return (
            <div 
              key={date.toISOString()} 
              className={`calendar-day ${isTodayDate ? 'today' : ''}`}
              onClick={(e) => {
                if (e.target.closest('.day-indicator')) return;
                onDateClick(date);
              }}
            >
              <div className="day-number">{date.getDate()}</div>
              <div className="day-indicators">
                {dayOccasions.map(occ => (
                  <div 
                    key={occ.id} 
                    className={`day-indicator ${getOccasionColorClass(occ.type)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOccasionClick(occ);
                    }}
                    title={occ.title}
                  >
                    {occ.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
