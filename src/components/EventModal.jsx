import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const EventModal = ({ onClose, onSave, initialDate, editingEvent }) => {
  const [formData, setFormData] = useState({
    type: 'Wedding',
    title: '',
    clientName: '',
    date: initialDate || '',
    time: '',
    location: '',
    theme: '',
    budget: '',
    status: 'Pending'
  })
  
  const [errors, setErrors] = useState({})

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  useEffect(() => {
    if (editingEvent) {
      setFormData(editingEvent)
    }
  }, [editingEvent])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title) newErrors.title = 'Event Title is required'
    if (!formData.clientName) newErrors.clientName = 'Client Name is required'
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.time) newErrors.time = 'Time is required'
    if (formData.budget && Number(formData.budget) < 0) newErrors.budget = 'Budget cannot be negative'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSave({
        ...formData,
        budget: formData.budget === '' ? 0 : Number(formData.budget)
      })
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose()
    }
  }

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="event-modal">
        <div className="event-modal-header">
          <h2>{editingEvent ? 'Edit Event' : 'New Event'}</h2>
          <button className="close-btn" onClick={onClose}><X size={18} /></button>
        </div>
        
        <form className="event-modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Event Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Wedding">Wedding</option>
              <option value="Engagement">Engagement</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate Event">Corporate Event</option>
              <option value="Custom Bouquet">Custom Bouquet</option>
              <option value="Supplier Delivery">Supplier Delivery</option>
              <option value="Customer Appointment">Customer Appointment</option>
            </select>
          </div>

          <div className="form-group">
            <label>Event Title *</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Sarah & John" />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Client Name *</label>
            <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} placeholder="Sarah Johnson" />
            {errors.clientName && <span className="error-text">{errors.clientName}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
              {errors.date && <span className="error-text">{errors.date}</span>}
            </div>
            <div className="form-group">
              <label>Time *</label>
              <input type="time" name="time" value={formData.time} onChange={handleChange} />
              {errors.time && <span className="error-text">{errors.time}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Haifa" />
          </div>

          <div className="form-group">
            <label>Theme / Flowers</label>
            <input type="text" name="theme" value={formData.theme} onChange={handleChange} placeholder="White Roses" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Budget ($)</label>
              <input type="number" name="budget" value={formData.budget} onChange={handleChange} placeholder="800" min="0" />
              {errors.budget && <span className="error-text">{errors.budget}</span>}
            </div>
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Preparing">Preparing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <button type="submit" className="save-btn">Save Event</button>
        </form>
      </div>
    </div>
  )
}

export default EventModal
