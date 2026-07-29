import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function PersonalizedCareForm() {
  const [light, setLight] = useState('');
  const [drainage, setDrainage] = useState('');

  const showTips = light || drainage;

  return (
    <div className="personalized-form">
      <h3 style={{ margin: '0 0 8px', color: '#1a2f24', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Sparkles size={18} color="#315e47"/> Tell us about your plant
      </h3>
      <p style={{ margin: 0, color: '#5c6661', fontSize: '14px' }}>Get personalized tips based on your home environment.</p>
      
      <div className="form-grid">
        <select value={light} onChange={(e) => setLight(e.target.value)}>
          <option value="">Select Light Level</option>
          <option value="low">Low Light (Windowless / Far from window)</option>
          <option value="medium">Medium Light (North/East window)</option>
          <option value="high">High Light (South/West window)</option>
        </select>

        <select value={drainage} onChange={(e) => setDrainage(e.target.value)}>
          <option value="">Pot Drainage?</option>
          <option value="yes">Pot has drainage holes</option>
          <option value="no">Pot does NOT have drainage holes</option>
        </select>
      </div>

      {showTips && (
        <div className="personalized-tips">
          <h4 style={{ margin: '0 0 12px', color: '#315e47' }}>Personalized Tips:</h4>
          <ul>
            {light === 'low' && <li>Your plant may need less frequent watering because it is in low light. The soil dries much slower.</li>}
            {light === 'high' && <li>Move the plant slightly away from direct afternoon sunlight to prevent scorching, and water more frequently.</li>}
            {drainage === 'no' && <li><strong>Caution:</strong> A pot without drainage holes may greatly increase the risk of root rot. Water very sparingly or add drainage.</li>}
            {drainage === 'yes' && <li>Great! Good drainage is essential for preventing root rot. Always empty the saucer after watering.</li>}
          </ul>
          {/* TODO: Connect to Gemini AI for deeper contextual suggestions based on plant species and exact location */}
        </div>
      )}
    </div>
  );
}
