import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { 
  initNotificationsData, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  clearAllNotifications 
} from '../data/mockNotifications';
import NotificationCard from '../components/notifications/NotificationCard';
import ConfirmModal from '../components/notifications/ConfirmModal';
import '../styles/Notifications.css';

const FILTERS = ['All', 'Unread', 'Low Stock', 'Events', 'Orders', 'Suppliers', 'AI Diagnosis'];

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { notifications } = useNotifications();
  const [filter, setFilter] = useState('All');
  
  const [confirmModalData, setConfirmModalData] = useState({
    isOpen: false,
    message: '',
    confirmText: '',
    action: null
  });

  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    initNotificationsData();
    // Dispatch storage to trigger hook to load initial data if needed
    window.dispatchEvent(new Event('storage'));
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAllClick = () => {
    setConfirmModalData({
      isOpen: true,
      message: 'Are you sure you want to delete all notifications?',
      confirmText: 'Delete All',
      action: () => {
        clearAllNotifications();
        showToast('All notifications cleared.');
      }
    });
  };

  const handleDeleteClick = (notification) => {
    setConfirmModalData({
      isOpen: true,
      message: 'Are you sure you want to delete this notification?',
      confirmText: 'Delete',
      action: () => {
        deleteNotification(notification.id);
        showToast('Notification deleted.');
      }
    });
  };

  const executeConfirmAction = () => {
    if (confirmModalData.action) {
      confirmModalData.action();
    }
    setConfirmModalData({ isOpen: false, message: '', confirmText: '', action: null });
  };

  const handleCardClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    if (notification.relatedPage) {
      navigate(notification.relatedPage);
    }
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'All') return true;
    if (filter === 'Unread') return !n.isRead;
    if (filter === 'Low Stock') return n.type === 'Low Stock';
    if (filter === 'Events') return n.type === 'Event Reminder';
    if (filter === 'Orders') return n.type === 'New Order';
    if (filter === 'Suppliers') return n.type === 'Supplier Payment';
    if (filter === 'AI Diagnosis') return n.type === 'AI Diagnosis';
    return true;
  });

  return (
    <div className="notifications-main">
      <div className="notifications-header">
        <h1>Notifications</h1>
        {notifications.length > 0 && (
          <div className="notifications-header-actions">
            <button className="notif-action-btn" onClick={handleMarkAllAsRead}>
              Mark All as Read
            </button>
            <button className="notif-action-btn danger" onClick={handleClearAllClick}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="notif-filters">
          {FILTERS.map(f => (
            <button 
              key={f} 
              className={`notif-filter-pill ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="notif-empty">
          <div className="notif-empty-icon">
            <Bell size={32} />
          </div>
          <div>
            <h3>No notifications</h3>
            <p>You're all caught up.</p>
          </div>
        </div>
      ) : (
        <div className="notif-list">
          {filteredNotifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9aa69d', background: '#fff', borderRadius: 20 }}>
              No notifications found.
            </div>
          ) : (
            filteredNotifications.map(notification => (
              <NotificationCard 
                key={notification.id}
                notification={notification}
                onClick={handleCardClick}
                onDelete={handleDeleteClick}
              />
            ))
          )}
        </div>
      )}

      <ConfirmModal 
        isOpen={confirmModalData.isOpen}
        message={confirmModalData.message}
        confirmText={confirmModalData.confirmText}
        onCancel={() => setConfirmModalData({ isOpen: false, message: '', confirmText: '', action: null })}
        onConfirm={executeConfirmAction}
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

export default NotificationsPage;
