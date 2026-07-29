const INITIAL_NOTIFICATIONS = [
  {
    id: 'n_1',
    message: 'Red Roses are running low — only 25 remaining.',
    time: '5 min ago',
    type: 'Low Stock',
    isRead: false,
    relatedPage: '/owner/inventory'
  },
  {
    id: 'n_2',
    message: 'Tomorrow: Wedding event for Sarah & John at 4:00 PM.',
    time: '1 hour ago',
    type: 'Event Reminder',
    isRead: false,
    relatedPage: '/owner/events'
  },
  {
    id: 'n_3',
    message: 'Supplier payment due: Rose Valley Farm — $320.',
    time: '3 hours ago',
    type: 'Supplier Payment',
    isRead: false,
    relatedPage: '/owner/suppliers'
  },
  {
    id: 'n_4',
    message: 'AI detected Black Spot on Red Rose — 3rd recurrence.',
    time: 'Today 9:15',
    type: 'AI Diagnosis',
    isRead: true,
    relatedPage: '/owner/ai-diagnosis'
  },
  {
    id: 'n_5',
    message: 'New order #1042 from Sarah Johnson — $85.',
    time: 'Today 10:30',
    type: 'New Order',
    isRead: true,
    relatedPage: '/owner/orders'
  },
  {
    id: 'n_6',
    message: 'Sunflowers are out of stock. Reorder recommended.',
    time: 'Yesterday',
    type: 'Low Stock',
    isRead: true,
    relatedPage: '/owner/inventory'
  }
];

export const initNotificationsData = () => {
  if (!localStorage.getItem('bloomwise_notifications')) {
    localStorage.setItem('bloomwise_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
  }
};

export const getNotifications = () => {
  return JSON.parse(localStorage.getItem('bloomwise_notifications') || '[]');
};

export const saveNotifications = (notifications) => {
  localStorage.setItem('bloomwise_notifications', JSON.stringify(notifications));
  window.dispatchEvent(new Event('storage')); // Notify hooks
};

export const markAsRead = (id) => {
  const notifications = getNotifications();
  const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
  saveNotifications(updated);
  return updated;
};

export const markAllAsRead = () => {
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, isRead: true }));
  saveNotifications(updated);
  return updated;
};

export const deleteNotification = (id) => {
  const notifications = getNotifications();
  const updated = notifications.filter(n => n.id !== id);
  saveNotifications(updated);
  return updated;
};

export const clearAllNotifications = () => {
  saveNotifications([]);
  return [];
};
