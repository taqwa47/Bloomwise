import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { initSettingsData, getSettings, saveSettings } from '../data/mockSettings';
import SettingsInput from '../components/settings/SettingsInput';
import UnsavedChangesDialog from '../components/settings/UnsavedChangesDialog';
import '../styles/Settings.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const SettingsPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState(() => {
    initSettingsData();
    return getSettings();
  });

  const [formData, setFormData] = useState(settings);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Unsaved changes dialog state
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [pendingNavUrl, setPendingNavUrl] = useState('');

  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(formData);

  useEffect(() => {
    // 1. Intercept browser refresh/close
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = ''; // Required for Chrome
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. Intercept internal React Router navigation clicks (Sidebar links)
    const handleGlobalClick = (e) => {
      if (!hasUnsavedChanges) return;

      const link = e.target.closest('a');
      if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
        e.preventDefault();
        e.stopPropagation();
        setPendingNavUrl(link.getAttribute('href'));
        setShowUnsavedDialog(true);
      }
    };
    // Capture phase to catch it before react-router
    document.addEventListener('click', handleGlobalClick, { capture: true });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleGlobalClick, { capture: true });
    };
  }, [hasUnsavedChanges]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.shopName.trim()) newErrors.shopName = 'Shop name is required.';
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    setIsSaving(true);
    setTimeout(() => {
      saveSettings(formData);
      setSettings(formData); // Update baseline
      setIsSaving(false);
      setToastMsg('Settings saved successfully.');
      setTimeout(() => setToastMsg(''), 3000);
    }, 800);
  };

  const handleReset = () => {
    setFormData(settings);
    setErrors({});
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file.');
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE) {
      alert('Logo size must be less than 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, logo: event.target.result }));
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // Reset input
  };

  const handleRemoveLogo = () => {
    setFormData(prev => ({ ...prev, logo: null }));
  };

  const confirmLeave = () => {
    setShowUnsavedDialog(false);
    if (pendingNavUrl) {
      navigate(pendingNavUrl);
    }
  };

  const cancelLeave = () => {
    setShowUnsavedDialog(false);
    setPendingNavUrl('');
  };

  return (
    <div className="settings-main">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      {hasUnsavedChanges && (
        <div className="unsaved-warning">
          You have unsaved changes.
        </div>
      )}

      {/* Shop Information */}
      <section className="settings-section">
        <h2>Shop Information</h2>
        <div className="settings-form-grid">
          <SettingsInput 
            label="Shop Name" 
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            error={errors.shopName}
          />
          <SettingsInput 
            label="Address" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <div className="settings-form-row">
            <SettingsInput 
              label="Phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            <SettingsInput 
              label="Email" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
        </div>
      </section>

      {/* Shop Logo */}
      <section className="settings-section">
        <h2>Shop Logo</h2>
        <div className="settings-logo-area">
          <div className="settings-logo-preview">
            {formData.logo ? (
              <img src={formData.logo} alt="Shop Logo Preview" />
            ) : (
              <span style={{ fontSize: 32 }}>🌿</span>
            )}
          </div>
          <div className="settings-logo-actions">
            <button className="settings-upload-btn" onClick={() => fileInputRef.current.click()}>
              <Upload size={16} /> Upload Logo
            </button>
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg, image/webp, image/svg+xml"
              style={{ display: 'none' }}
              onChange={handleLogoUpload}
            />
            {formData.logo && (
              <button className="settings-remove-btn" onClick={handleRemoveLogo}>
                Remove Logo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer Actions */}
      <div className="settings-footer">
        <button 
          className="settings-reset-btn" 
          onClick={handleReset}
          disabled={!hasUnsavedChanges || isSaving}
        >
          Reset Changes
        </button>
        <div className="settings-save-btn-container">
          <button 
            className="settings-save-btn" 
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <UnsavedChangesDialog 
        isOpen={showUnsavedDialog}
        onStay={cancelLeave}
        onLeave={confirmLeave}
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

export default SettingsPage;
