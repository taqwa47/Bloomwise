import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function CommonProblemsSection({ problems }) {
  if (!problems || problems.length === 0) return null;

  return (
    <div className="problems-section">
      <h3>Common Problems</h3>
      <div className="problem-list">
        {problems.map((prob, idx) => (
          <div key={idx} className="problem-item">
            <h4><AlertTriangle size={16} /> {prob.issue}</h4>
            <p><strong>Cause:</strong> {prob.cause}</p>
            <p><strong>Action:</strong> {prob.action}</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '16px', fontSize: '13px', color: '#88928d', fontStyle: 'italic' }}>
        Note: These recommendations provide general plant-care guidance and are not a professional agricultural diagnosis.
      </p>
    </div>
  );
}
