import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchPlants } from '../../data/plantCareData';

export default function PlantSearch({ onSelectPlant }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      setSuggestions(searchPlants(query));
      setShowDropdown(true);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [query]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) {
      alert('Please enter or select a plant name.');
      return;
    }
    const results = searchPlants(query);
    if (results.length > 0) {
      onSelectPlant(results[0]);
      setShowDropdown(false);
      setQuery('');
    } else {
      onSelectPlant({ notFound: true, query });
      setShowDropdown(false);
    }
  };

  const handleSelect = (plant) => {
    onSelectPlant(plant);
    setShowDropdown(false);
    setQuery('');
  };

  return (
    <div className="search-container" ref={wrapperRef}>
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Enter a plant name, for example: Pothos, Rose, Orchid..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          onFocus={() => query.trim().length > 1 && setShowDropdown(true)}
        />
        <button className="search-btn" onClick={handleSearch}>Get Care Guide</button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {suggestions.map(plant => (
            <div key={plant.id} className="autocomplete-item" onClick={() => handleSelect(plant)}>
              <img src={plant.image} alt={plant.nameEnglish} />
              <div className="autocomplete-names">
                <h4>{plant.nameEnglish}</h4>
                <p>{plant.nameArabic} • {plant.nameHebrew}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
