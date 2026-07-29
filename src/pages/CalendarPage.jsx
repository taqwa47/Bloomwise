import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CalendarGrid from '../components/CalendarGrid'
import EventDetails from '../components/EventDetails'
import EventModal from '../components/EventModal'

const initialMockEvents = [
  { id: "1", type: "Wedding", title: "Sarah & John", clientName: "Sarah Johnson", date: "2025-07-15", time: "16:00", location: "Haifa", theme: "White Roses", budget: 800, status: "Preparing" },
  { id: "2", type: "Birthday", title: "Emma's Bday", clientName: "Emma", date: "2025-07-05", time: "18:00", location: "Tel Aviv", theme: "Pink Lilies", budget: 300, status: "Confirmed" },
  { id: "3", type: "Corporate Event", title: "Tech Conf", clientName: "TechCorp", date: "2025-07-20", time: "09:00", location: "Jerusalem", theme: "Modern Minimalist", budget: 1500, status: "Pending" },
  { id: "4", type: "Custom Bouquet", title: "Mary's Order", clientName: "Mary", date: "2025-07-28", time: "11:00", location: "Store Pickup", theme: "Mixed Summer", budget: 120, status: "Completed" }
]

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 6, 1)) // Start at July 2025 to match screenshots
  const [selectedDate, setSelectedDate] = useState("2025-07-15") // Start with July 15 selected
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)

  useEffect(() => {
    const storedEvents = localStorage.getItem('bloomwise_events')
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    } else {
      setEvents(initialMockEvents)
      localStorage.setItem('bloomwise_events', JSON.stringify(initialMockEvents))
    }
  }, [])

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const handleDateSelect = (dateString) => {
    setSelectedDate(dateString)
  }

  const handleOpenNewEvent = () => {
    setEditingEvent(null)
    setIsModalOpen(true)
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    setIsModalOpen(true)
  }

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const newEvents = events.filter(e => e.id !== eventId)
      setEvents(newEvents)
      localStorage.setItem('bloomwise_events', JSON.stringify(newEvents))
      alert("Event deleted successfully.")
    }
  }

  const handleSaveEvent = (eventData) => {
    let newEvents
    if (editingEvent) {
      newEvents = events.map(e => e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e)
    } else {
      newEvents = [...events, { ...eventData, id: Date.now().toString() }]
    }
    setEvents(newEvents)
    localStorage.setItem('bloomwise_events', JSON.stringify(newEvents))
    setIsModalOpen(false)
    
    // Automatically navigate to the event's month and select the date
    const [year, month, day] = eventData.date.split('-')
    setCurrentMonth(new Date(parseInt(year), parseInt(month) - 1, 1))
    setSelectedDate(eventData.date)
    
    // alert is optional, requested small success message
    alert("Event added successfully")
  }

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const title = `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`

  return (
    <main className="dashboard-main calendar-main">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Calendar</h1>
        <div className="header-actions">
          <button className="action-btn">
            <div style={{width:20, height:20, borderRadius:'50%', border:'2px solid #e2e1d7'}}></div>
          </button>
          <button className="action-btn">
            <span>🌻</span>
          </button>
        </div>
      </header>

      <div className="calendar-content">
        <div className="calendar-card">
          <div className="calendar-card-header">
            <button className="cal-nav-btn" onClick={handlePrevMonth}><ChevronLeft size={20} /></button>
            <h2 className="cal-month-title">{title}</h2>
            <button className="cal-nav-btn" onClick={handleNextMonth}><ChevronRight size={20} /></button>
          </div>
          
          <CalendarGrid 
            currentMonth={currentMonth} 
            selectedDate={selectedDate}
            events={events}
            onSelectDate={handleDateSelect}
          />
        </div>

        <div className="calendar-sidebar">
          <EventDetails 
            selectedDate={selectedDate}
            events={events}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onNewEvent={handleOpenNewEvent}
          />
        </div>
      </div>

      {isModalOpen && (
        <EventModal 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          initialDate={selectedDate}
          editingEvent={editingEvent}
        />
      )}
    </main>
  )
}

export default CalendarPage
