import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CalendarHeart, Search } from 'lucide-react';
import { calculateDaysRemaining, calculateReminderTriggerDate } from '../../utils/dateUtils';
import OccasionsCalendar from '../../components/occasions/OccasionsCalendar';
import AddOccasionModal from '../../components/occasions/AddOccasionModal';
import UpcomingOccasionCard from '../../components/occasions/UpcomingOccasionCard';
import OccasionDetailsModal from '../../components/occasions/OccasionDetailsModal';

import '../../styles/Occasions.css';

export default function MyOccasions() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [occasions, setOccasions] = useState([]);
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [editingOccasion, setEditingOccasion] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bloomwise_occasions');
    if (saved) {
      try {
        setOccasions(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing occasions", e);
      }
    }
  }, []);

  // Check reminders and generate notifications
  useEffect(() => {
    if (occasions.length === 0) return;

    let hasUpdates = false;
    const updatedOccasions = [...occasions];
    const newNotifications = [];

    const existingNotifications = JSON.parse(localStorage.getItem('bloomwise_notifications') || '[]');
    const now = new Date();

    updatedOccasions.forEach(occ => {
      if (!occ.reminders) return;
      
      occ.reminders.forEach(rem => {
        // Skip if notification already created for this reminder cycle
        if (rem.notificationCreated) return;

        const triggerDate = calculateReminderTriggerDate(occ.date, occ.repeatsYearly, rem.option);
        
        // Parse the reminder time
        const [hours, minutes] = rem.time.split(':').map(Number);
        triggerDate.setHours(hours, minutes, 0, 0);

        if (now >= triggerDate) {
          // Time to trigger
          newNotifications.push({
            id: `n_occ_${occ.id}_${rem.id}_${Date.now()}`,
            message: `${occ.title} for ${occ.recipientName} is coming up! (${rem.option})`,
            time: 'Just now',
            type: 'Occasion Reminder',
            isRead: false,
            relatedPage: '/customer/occasions',
            timestamp: Date.now()
          });

          rem.notificationCreated = true;
          hasUpdates = true;
        }
      });
    });

    if (hasUpdates) {
      localStorage.setItem('bloomwise_occasions', JSON.stringify(updatedOccasions));
      setOccasions(updatedOccasions);
      
      localStorage.setItem('bloomwise_notifications', JSON.stringify([...newNotifications, ...existingNotifications]));
      // Trigger cross-tab event
      window.dispatchEvent(new Event('storage'));
    }
  }, [occasions]);

  const handleSaveOccasion = (formData) => {
    const newOccasion = {
      ...formData,
      id: formData.id || `occ_${Date.now()}`,
      createdAt: formData.createdAt || Date.now(),
      updatedAt: Date.now()
    };

    // If editing, we reset notificationCreated if the date or reminders changed
    // For simplicity, just reset them all on edit
    newOccasion.reminders = newOccasion.reminders.map(r => ({ ...r, notificationCreated: false }));

    let newOccasions;
    if (editingOccasion) {
      newOccasions = occasions.map(o => o.id === newOccasion.id ? newOccasion : o);
    } else {
      newOccasions = [...occasions, newOccasion];
    }

    setOccasions(newOccasions);
    localStorage.setItem('bloomwise_occasions', JSON.stringify(newOccasions));
    
    setIsAddModalOpen(false);
    setEditingOccasion(null);
    if (isDetailsModalOpen && editingOccasion) {
      setSelectedOccasion(newOccasion);
    }
  };

  const handleDeleteOccasion = (id) => {
    if (window.confirm("Are you sure you want to delete this occasion?")) {
      const newOccasions = occasions.filter(o => o.id !== id);
      setOccasions(newOccasions);
      localStorage.setItem('bloomwise_occasions', JSON.stringify(newOccasions));
      setIsDetailsModalOpen(false);
    }
  };

  const handleChooseGift = (occasion) => {
    // In a real app, this might pass params to the shop
    // navigate(`/customer/shop?category=${occasion.type}&color=${occasion.favoriteColors}`);
    navigate('/customer/shop');
  };

  // Prepare sorted upcoming occasions
  const upcomingOccasions = occasions
    .filter(occ => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return occ.title.toLowerCase().includes(query) || occ.recipientName.toLowerCase().includes(query);
      }
      return true;
    })
    .filter(occ => {
      if (filterType === 'All') return true;
      return occ.type === filterType;
    })
    .map(occ => ({
      ...occ,
      daysRemaining: calculateDaysRemaining(occ.date, occ.repeatsYearly)
    }))
    .filter(occ => occ.daysRemaining >= 0) // Only future or today
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  return (
    <div className="occasions-container">
      <div className="occasions-header">
        <div>
          <h1 className="occasions-title">My Occasions</h1>
          <p style={{ margin: '8px 0 0', color: '#5c6661' }}>Manage your important dates and let us remind you.</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => { setSelectedDate(null); setEditingOccasion(null); setIsAddModalOpen(true); }}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <CalendarHeart size={18} /> Add Occasion
        </button>
      </div>

      <div className="occasions-layout">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Calendar Section */}
          <OccasionsCalendar 
            currentDate={currentDate} 
            setCurrentDate={setCurrentDate} 
            occasions={occasions}
            onDateClick={(date) => { setSelectedDate(date); setEditingOccasion(null); setIsAddModalOpen(true); }}
            onOccasionClick={(occ) => { setSelectedOccasion(occ); setIsDetailsModalOpen(true); }}
          />

          {/* Filters (Desktop below calendar, or above list) */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#fff', padding: 16, borderRadius: 16, border: '1px solid #e2e8e4' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#f8faf9', padding: '8px 16px', borderRadius: 12, flex: 1 }}>
              <Search size={18} color="#88928d" style={{ marginRight: 8 }} />
              <input 
                type="text" 
                placeholder="Search occasions or recipients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
              />
            </div>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: 12, border: '1px solid #e2e8e4', outline: 'none' }}
            >
              <option value="All">All Types</option>
              <option value="Birthday">Birthdays</option>
              <option value="Wedding Anniversary">Anniversaries</option>
              <option value="Mother's Day">Mother's Day</option>
            </select>
          </div>
        </div>

        {/* Upcoming Section */}
        <div className="upcoming-section">
          <h3 className="upcoming-title">Upcoming Occasions</h3>
          
          {upcomingOccasions.length > 0 ? (
            upcomingOccasions.map(occ => (
              <UpcomingOccasionCard 
                key={occ.id} 
                occasion={occ} 
                daysRemaining={occ.daysRemaining}
                onClick={(o) => { setSelectedOccasion(o); setIsDetailsModalOpen(true); }}
                onChooseGift={handleChooseGift}
              />
            ))
          ) : (
            <div className="empty-occasions">
              <CalendarHeart size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
              <h4 style={{ margin: '0 0 8px', color: '#1a2f24' }}>No upcoming occasions</h4>
              <p style={{ margin: 0, color: '#88928d', fontSize: 14 }}>
                {searchQuery ? 'No results match your search.' : 'Add your first occasion to get reminded!'}
              </p>
            </div>
          )}
        </div>
      </div>

      <AddOccasionModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleSaveOccasion}
        initialDate={selectedDate}
        editingOccasion={editingOccasion}
      />

      <OccasionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        occasion={selectedOccasion}
        daysRemaining={selectedOccasion ? calculateDaysRemaining(selectedOccasion.date, selectedOccasion.repeatsYearly) : 0}
        onEdit={(occ) => { setEditingOccasion(occ); setIsAddModalOpen(true); }}
        onDelete={handleDeleteOccasion}
        onChooseGift={handleChooseGift}
      />

    </div>
  );
}
