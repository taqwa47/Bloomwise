import React, { useState, useEffect } from 'react';
import PlantSearch from '../components/care/PlantSearch';
import PlantCareReport from '../components/care/PlantCareReport';
import RecentPlantSearches from '../components/care/RecentPlantSearches';
import SavedPlantCard from '../components/care/SavedPlantCard';
import '../styles/SmartPlantCare.css';

export default function SmartPlantCare() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [savedPlants, setSavedPlants] = useState([]);

  useEffect(() => {
    const storedRecent = JSON.parse(localStorage.getItem('bloomwise_recent_searches') || '[]');
    setRecentSearches(storedRecent);
    
    const storedSaved = JSON.parse(localStorage.getItem('bloomwise_saved_plants') || '[]');
    setSavedPlants(storedSaved);
  }, []);

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
    if (!plant.notFound) {
      const updatedRecent = [plant, ...recentSearches.filter(p => p.id !== plant.id)].slice(0, 4);
      setRecentSearches(updatedRecent);
      localStorage.setItem('bloomwise_recent_searches', JSON.stringify(updatedRecent));
    }
  };

  const handleSavePlant = (plant) => {
    if (savedPlants.find(p => p.id === plant.id)) {
      alert('This plant is already saved.');
      return;
    }
    const newSaved = { ...plant, savedAt: new Date().toISOString() };
    const updatedSaved = [newSaved, ...savedPlants];
    setSavedPlants(updatedSaved);
    localStorage.setItem('bloomwise_saved_plants', JSON.stringify(updatedSaved));
    alert('Plant saved to your collection!');
  };

  const handleRemoveSaved = (plantId) => {
    const updatedSaved = savedPlants.filter(p => p.id !== plantId);
    setSavedPlants(updatedSaved);
    localStorage.setItem('bloomwise_saved_plants', JSON.stringify(updatedSaved));
  };

  return (
    <main className="smart-care-main">
      <div className="care-hero">
        <h1>Smart Plant Care</h1>
        <p>Search for a flower or plant and discover the best way to care for it.</p>
      </div>

      <PlantSearch onSelectPlant={handleSelectPlant} />

      {!selectedPlant && (
        <>
          {savedPlants.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '24px', color: '#1a2f24', marginBottom: '24px' }}>My Saved Plants</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {savedPlants.map(plant => (
                  <SavedPlantCard 
                    key={plant.id} 
                    plant={plant} 
                    onRemove={handleRemoveSaved} 
                    onViewGuide={setSelectedPlant}
                  />
                ))}
              </div>
            </div>
          )}

          <RecentPlantSearches 
            recentSearches={recentSearches} 
            onSelectPlant={setSelectedPlant} 
            onClear={() => {
              setRecentSearches([]);
              localStorage.setItem('bloomwise_recent_searches', JSON.stringify([]));
            }}
          />
        </>
      )}

      {selectedPlant && (
        <>
          <button 
            onClick={() => setSelectedPlant(null)}
            style={{ marginBottom: '24px', background: 'none', border: 'none', color: '#315e47', fontWeight: 600, cursor: 'pointer', padding: 0 }}
          >
            ← Back to Search
          </button>
          
          <PlantCareReport 
            plant={selectedPlant} 
            onSavePlant={handleSavePlant} 
          />
        </>
      )}
    </main>
  );
}
