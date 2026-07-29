import { useState, useEffect } from 'react';
import { getSettings } from '../data/mockSettings';

export const useSettings = () => {
  const [settings, setSettings] = useState(getSettings());
  
  const refreshSettings = () => {
    setSettings(getSettings());
  };

  useEffect(() => {
    refreshSettings();

    const handleStorageChange = () => {
      refreshSettings();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { settings, refreshSettings };
};
