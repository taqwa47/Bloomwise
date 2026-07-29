import React from 'react';

const CustomerCard = ({ customer, onClick }) => {
  const initial = customer.name.charAt(0).toUpperCase();

  return (
    <div className="customer-card" onClick={() => onClick(customer)}>
      <div className="customer-card-header">
        <div className="customer-avatar">
          {initial}
        </div>
        <div className="customer-name-info">
          <h3 className="customer-name">{customer.name}</h3>
          <span className="customer-type">{customer.type}</span>
        </div>
      </div>

      <div className="customer-stats">
        <div className="customer-stat-box stat-orders">
          <span className="stat-value">{customer.ordersCount}</span>
          <span className="stat-label">Orders</span>
        </div>
        <div className="customer-stat-box stat-spent">
          <span className="stat-value">${customer.totalSpent}</span>
          <span className="stat-label">Total Spent</span>
        </div>
      </div>

      <div className="customer-card-footer">
        <div className="customer-footer-row">
          <span className="customer-footer-label">Last Order</span>
          <span className="customer-footer-value" style={{ color: '#11281b' }}>{customer.lastOrderDate}</span>
        </div>
        <div className="customer-footer-row">
          <span className="customer-footer-label">Birthday</span>
          <span className="customer-footer-value birthday-value">
            🎂 {customer.birthday}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
