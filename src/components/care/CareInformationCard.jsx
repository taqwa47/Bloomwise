import React from 'react';

export default function CareInformationCard({ title, icon, content }) {
  return (
    <div className="care-card">
      <h3>
        {icon}
        {title}
      </h3>
      <p>{content}</p>
    </div>
  );
}
