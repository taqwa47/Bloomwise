import { useState, useEffect } from 'react';
import { getNotifications } from '../data/mockNotifications';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  
  const refreshNotifications = () => {
    setNotifications(getNotifications());
  };

  useEffect(() => {
    // Initial load
    refreshNotifications();

    // Listen to our custom storage dispatch or cross-tab storage changes
    const handleStorageChange = () => {
      refreshNotifications();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, unreadCount, refreshNotifications };
};
