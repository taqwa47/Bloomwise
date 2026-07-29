import React, { useState } from 'react';
import { Sun, Droplets, Thermometer, Wind, Leaf, FlaskConical, Scissors, Move, Activity, Heart, BookmarkPlus, Bell } from 'lucide-react';
import CareInformationCard from './CareInformationCard';
import CommonProblemsSection from './CommonProblemsSection';
import PersonalizedCareForm from './PersonalizedCareForm';
import CareReminderModal from './CareReminderModal';

export default function PlantCareReport({ plant, onSavePlant }) {
  const [showReminderModal, setShowReminderModal] = useState(false);

  if (!plant) return null;
  if (plant.notFound) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', background: '#fef2f2', borderRadius: '16px', color: '#991b1b', border: '1px dashed #fca5a5' }}>
        <h3 style={{ margin: '0 0 8px' }}>Plant Not Found</h3>
        <p style={{ margin: 0 }}>We could not find care information for "{plant.query}". Try searching for Pothos, Orchid, or Rose.</p>
      </div>
    );
  }

  return (
    <div className="care-report">
      <div className="report-header">
        <img src={plant.image} alt={plant.nameEnglish} className="report-image" />
        <div className="report-title-section">
          <span className="category-badge">{plant.category}</span>
          <h2>{plant.nameEnglish}</h2>
          <div className="names-row">
            <span>{plant.nameArabic}</span> • 
            <span>{plant.nameHebrew}</span> • 
            <span style={{ fontStyle: 'italic' }}>{plant.scientificName}</span>
          </div>
          <p style={{ color: '#1a2f24', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
            {plant.description}
          </p>
          
          <div className="report-actions">
            <button className="btn-primary" onClick={() => onSavePlant(plant)}>
              <BookmarkPlus size={18} /> Save to My Plants
            </button>
            <button className="btn-secondary" onClick={() => setShowReminderModal(true)}>
              <Bell size={18} /> Create Reminder
            </button>
          </div>
        </div>
      </div>

      <div className="quick-summary">
        <div className="summary-card">
          <span className="summary-card-title">Difficulty</span>
          <span className="summary-card-value"><Activity size={16} color="#315e47"/> {plant.careDifficulty}</span>
        </div>
        <div className="summary-card">
          <span className="summary-card-title">Light</span>
          <span className="summary-card-value"><Sun size={16} color="#eab308"/> Bright Indirect</span>
        </div>
        <div className="summary-card">
          <span className="summary-card-title">Water</span>
          <span className="summary-card-value"><Droplets size={16} color="#3b82f6"/> Top Soil Dry</span>
        </div>
        <div className="summary-card">
          <span className="summary-card-title">Pet Safety</span>
          <span className="summary-card-value"><Heart size={16} color={plant.petSafety.includes('Non-toxic') ? '#16a34a' : '#ef4444'}/> {plant.petSafety.includes('Non-toxic') ? 'Safe' : 'Toxic'}</span>
        </div>
      </div>

      <div className="care-grid">
        <CareInformationCard title="Light Requirements" icon={<Sun size={20} color="#eab308"/>} content={plant.light} />
        <CareInformationCard title="Watering" icon={<Droplets size={20} color="#3b82f6"/>} content={plant.watering} />
        <CareInformationCard title="Soil & Potting" icon={<Leaf size={20} color="#84cc16"/>} content={plant.soil} />
        <CareInformationCard title="Temperature" icon={<Thermometer size={20} color="#ef4444"/>} content={plant.temperature} />
        <CareInformationCard title="Humidity" icon={<Wind size={20} color="#0ea5e9"/>} content={plant.humidity} />
        <CareInformationCard title="Fertilizer" icon={<FlaskConical size={20} color="#8b5cf6"/>} content={plant.fertilizer} />
        <CareInformationCard title="Pruning" icon={<Scissors size={20} color="#64748b"/>} content={plant.pruning} />
        <CareInformationCard title="Placement" icon={<Move size={20} color="#14b8a6"/>} content={plant.recommendedLocation} />
      </div>

      <CommonProblemsSection problems={plant.commonProblems} />
      
      <PersonalizedCareForm />

      <CareReminderModal 
        isOpen={showReminderModal} 
        onClose={() => setShowReminderModal(false)} 
        plantName={plant.nameEnglish} 
      />
    </div>
  );
}
