import React from 'react'

const getEventTypeConfig = (type) => {
  switch(type) {
    case 'Wedding': return { icon: '💍', bg: '#eaf1fa', color: '#2c5991' }
    case 'Engagement': return { icon: '💖', bg: '#fbeaf3', color: '#a83d73' }
    case 'Birthday': return { icon: '🍰', bg: '#fbeaf3', color: '#a83d73' }
    case 'Corporate Event': return { icon: '🏢', bg: '#e6ecf1', color: '#3f5569' }
    case 'Custom Bouquet': return { icon: '🎓', bg: '#f4eafd', color: '#733da8' } // '🎓 Mar...' in screenshot, let's use 🎓 for custom or graduation
    case 'Supplier Delivery': return { icon: '🚚', bg: '#fdf5eb', color: '#d18a45' }
    case 'Customer Appointment': return { icon: '🤝', bg: '#ebfdf2', color: '#389e65' }
    default: return { icon: '📍', bg: '#f4f7f5', color: '#5c6661' }
  }
}

const CalendarGrid = ({ currentMonth, selectedDate, events, onSelectDate }) => {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const days = []
  
  // Padding before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Actual days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    days.push({
      dateStr,
      dayNumber: d
    })
  }

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  return (
    <div className="calendar-grid-container">
      <div className="calendar-weekdays">
        {weekdays.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {days.map((dayObj, i) => {
          if (!dayObj) {
            return <div key={`empty-${i}`} className="calendar-cell empty"></div>
          }
          
          const { dateStr, dayNumber } = dayObj
          const isSelected = dateStr === selectedDate
          const isToday = dateStr === todayStr
          
          const dayEvents = events.filter(e => e.date === dateStr)
          
          return (
            <div 
              key={dateStr} 
              className={`calendar-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => onSelectDate(dateStr)}
            >
              <div className="cell-date-wrapper">
                <span className="cell-date">{dayNumber}</span>
              </div>
              <div className="cell-events">
                {dayEvents.length > 0 && (
                  <div className="event-badge" style={{ backgroundColor: getEventTypeConfig(dayEvents[0].type).bg, color: getEventTypeConfig(dayEvents[0].type).color }}>
                    <span className="event-icon">{getEventTypeConfig(dayEvents[0].type).icon}</span>
                    <span className="event-title">{dayEvents[0].title.substring(0, 5)}...</span>
                  </div>
                )}
                {dayEvents.length > 1 && (
                  <div className="event-more">+{dayEvents.length - 1} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CalendarGrid
