import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Plus, SortAsc } from 'lucide-react';
import { initEventsData, getEvents, saveEvents, checkInventoryForEvent } from '../data/mockEvents';
import EventCard from '../components/events/EventCard';
import EventFormModal from '../components/events/EventFormModal';
import EventDetailsModal from '../components/events/EventDetailsModal';
import EventFilters from '../components/events/EventFilters';
import '../styles/Events.css';

const EVENT_TYPES = ['All Events', 'Wedding', 'Birthday', 'Graduation', 'Engagement', 'Anniversary', 'Corporate Event', 'Custom Bouquet'];
const STATUSES = ['All Statuses', 'Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'];
const SORTS = ['Nearest Event', 'Newest Event', 'Highest Budget', 'Lowest Budget'];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Events');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [stockFilter, setStockFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Nearest Event');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    initEventsData();
    const stored = getEvents();
    setEvents(stored);
    updateNotifications(stored);
  }, []);

  const updateNotifications = (eventsList) => {
    // Collect all warnings
    const allWarnings = [];
    eventsList.forEach(e => {
      // Only warn if not completed/cancelled
      if (!['Completed', 'Cancelled'].includes(e.status)) {
        const warns = checkInventoryForEvent(e.flowers);
        warns.forEach(w => {
          allWarnings.push({ eventName: e.clientName, flower: w.name, missing: w.required - w.available, date: e.date });
        });
      }
    });

    // Update localStorage for notifications
    const existing = JSON.parse(localStorage.getItem('bloomwise_notifications') || '[]');
    // Filter out old low-stock warnings
    const filteredExisting = existing.filter(n => n.type !== 'low_stock_event');
    
    const newNotifications = allWarnings.map(w => ({
      id: `warn_${Date.now()}_${Math.random()}`,
      type: 'low_stock_event',
      title: 'Insufficient Stock',
      message: `${w.flower} stock is insufficient for ${w.eventName}'s event. ${w.missing} more flowers required before ${w.date}.`,
      date: new Date().toISOString()
    }));

    // Removing duplicates by message
    const uniqueNew = newNotifications.filter((n, index, self) => 
      index === self.findIndex(t => t.message === n.message)
    );

    localStorage.setItem('bloomwise_notifications', JSON.stringify([...uniqueNew, ...filteredExisting]));
    
    // Dispatch a custom event to notify Sidebar (if it listens)
    window.dispatchEvent(new Event('storage'));
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSaveEvent = (eventData) => {
    let updated;
    if (eventData.id) {
      updated = events.map(e => e.id === eventData.id ? eventData : e);
      showToast('Event updated successfully.');
      if (selectedEvent && selectedEvent.id === eventData.id) setSelectedEvent(eventData);
    } else {
      const newEvent = { ...eventData, id: `evt_${Date.now()}`, status: 'Pending' };
      updated = [newEvent, ...events];
      showToast('Event added successfully.');
    }
    
    setEvents(updated);
    saveEvents(updated);
    updateNotifications(updated);
    setIsFormOpen(false);
  };

  const handleDeleteEvent = (id) => {
    const updated = events.filter(e => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
    updateNotifications(updated);
    setSelectedEvent(null);
    showToast('Event deleted.');
  };

  const handleChangeStatus = (updatedEvent) => {
    const updated = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
    setEvents(updated);
    saveEvents(updated);
    updateNotifications(updated);
    
    if (selectedEvent && selectedEvent.id === updatedEvent.id) {
      setSelectedEvent(updatedEvent);
    }
  };

  const openNewForm = () => {
    setEventToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = () => {
    setEventToEdit(selectedEvent);
    setIsFormOpen(true);
  };

  const filteredAndSortedEvents = useMemo(() => {
    let result = events.filter(e => {
      const matchSearch = e.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = typeFilter === 'All Events' || e.type === typeFilter;
      const matchStatus = statusFilter === 'All Statuses' || e.status === statusFilter;
      
      let matchStock = true;
      if (stockFilter !== 'All') {
        const inventory = JSON.parse(localStorage.getItem('bloomwise_inventory') || '[]');
        const hasInsufficient = e.flowers.some(f => {
          const invItem = inventory.find(i => i.name.toLowerCase() === f.name.toLowerCase());
          return f.required > (invItem ? invItem.quantity : 0);
        });
        if (stockFilter === 'Sufficient Stock') matchStock = !hasInsufficient;
        if (stockFilter === 'Insufficient Stock') matchStock = hasInsufficient;
      }

      return matchSearch && matchType && matchStatus && matchStock;
    });

    result.sort((a, b) => {
      if (sortOption === 'Nearest Event') return new Date(a.date) - new Date(b.date);
      if (sortOption === 'Newest Event') return new Date(b.date) - new Date(a.date);
      if (sortOption === 'Highest Budget') return b.budget - a.budget;
      if (sortOption === 'Lowest Budget') return a.budget - b.budget;
      return 0;
    });

    return result;
  }, [events, searchTerm, typeFilter, statusFilter, sortOption]);

  return (
    <div className="events-main">
      <div className="events-header">
        <h1>Events & Bouquets</h1>
        <button 
          className="new-supplier-btn" 
          onClick={openNewForm}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#315e47', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '16px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={18} /> New Event
        </button>
      </div>

      <EventFilters 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        typeFilter={typeFilter} setTypeFilter={setTypeFilter}
        statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        stockFilter={stockFilter} setStockFilter={setStockFilter}
        sortOption={sortOption} setSortOption={setSortOption}
      />

      <div className="events-list">
        {filteredAndSortedEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onClick={() => setSelectedEvent(event)} 
          />
        ))}

        {filteredAndSortedEvents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9aa69d', background: '#fff', borderRadius: 20 }}>
            No events found matching your criteria.
          </div>
        )}
      </div>

      <EventFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveEvent}
        eventToEdit={eventToEdit}
      />

      <EventDetailsModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onEdit={openEditForm}
        onDelete={handleDeleteEvent}
        onChangeStatus={handleChangeStatus}
      />

      {toastMsg && (
        <div className="toast" style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#11281b', color: '#fff', padding: '12px 24px', borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3000,
          fontFamily: 'var(--font-sans)', fontSize: 14
        }}>
          {toastMsg}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
