import React from 'react';

const SettingsInput = ({ label, type = "text", name, value, onChange, error }) => {
  return (
    <div className="settings-input-group">
      <label>{label}</label>
      <input 
        type={type} 
        name={name}
        className={`settings-input ${error ? 'error' : ''}`} 
        value={value} 
        onChange={onChange}
      />
      {error && <span className="settings-error-msg">{error}</span>}
    </div>
  );
};

export default SettingsInput;
