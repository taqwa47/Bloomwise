import React from 'react';
import { AlertTriangle, Calendar, DollarSign, ScanLine, ShoppingBag, Trash2 } from 'lucide-react';

const getIconAndColor = (type) => {
  switch (type) {
    case 'Low Stock':
      return { icon: <AlertTriangle size={24} />, bgClass: 'icon-bg-yellow' };
    case 'Event Reminder':
      return { icon: <Calendar size={24} />, bgClass: 'icon-bg-green' };
    case 'Supplier Payment':
      return { icon: <DollarSign size={24} />, bgClass: 'icon-bg-red' };
    case 'AI Diagnosis':
      return { icon: <ScanLine size={24} />, bgClass: 'icon-bg-green' };
    case 'New Order':
      return { icon: <ShoppingBag size={24} />, bgClass: 'icon-bg-green' };
    default:
      return { icon: <AlertTriangle size={24} />, bgClass: 'icon-bg-yellow' };
  }
};

const NotificationCard = ({ notification, onClick, onDelete }) => {
  const { icon, bgClass } = getIconAndColor(notification.type);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(notification);
  };

  return (
    <div className={`notif-card ${notification.isRead ? 'read' : ''}`} onClick={() => onClick(notification)}>
      <div className={`notif-icon-wrapper ${bgClass}`}>
        {icon}
      </div>
      
      <div className="notif-content">
        <p className="notif-message">{notification.message}</p>
        <span className="notif-time">{notification.time}</span>
      </div>

      <div className="notif-right">
        {!notification.isRead && <div className="unread-dot"></div>}
        <button 
          className="notif-delete-btn" 
          onClick={handleDeleteClick}
          title="Delete Notification"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
