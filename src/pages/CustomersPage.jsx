import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { initCustomersData, getCustomers, saveCustomers } from '../data/mockCustomers';
import CustomerCard from '../components/customers/CustomerCard';
import AddCustomerModal from '../components/customers/AddCustomerModal';
import CustomerDetailsModal from '../components/customers/CustomerDetailsModal';
import '../styles/Customers.css';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Customers');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    initCustomersData();
    setCustomers(getCustomers());
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleAddCustomer = (newCustomerData) => {
    const newCustomer = { ...newCustomerData, id: `cust_${Date.now()}` };
    const updated = [newCustomer, ...customers];
    setCustomers(updated);
    saveCustomers(updated);
    showToast('Customer added successfully');
    setIsAddModalOpen(false);
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All Customers' || customer.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="customers-main">
      <div className="customers-header">
        <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: 32, color: '#11281b' }}>
          Customers
        </h1>
        <div className="customers-actions-top">
          <button 
            className="new-supplier-btn" // Reuse this nice green button from suppliers
            onClick={() => setIsAddModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <Plus size={18} /> Add Customer
          </button>
        </div>
      </div>

      <div className="dashboard-controls" style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
        <div className="search-bar" style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#fff', padding: '12px 16px', borderRadius: 16, border: '1px solid #f0efea' }}>
          <Search size={20} color="#9aa69d" style={{ marginRight: 12 }} />
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'var(--font-sans)', fontSize: 14 }}
          />
        </div>
        
        <div className="filter-dropdown" style={{ display: 'flex', alignItems: 'center', background: '#fff', padding: '12px 16px', borderRadius: 16, border: '1px solid #f0efea' }}>
          <Filter size={18} color="#5c6661" style={{ marginRight: 8 }} />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 14, color: '#11281b', cursor: 'pointer' }}
          >
            <option value="All Customers">All Customers</option>
            <option value="VIP Customer">VIP Customers</option>
            <option value="Regular Customer">Regular Customers</option>
            <option value="Corporate Customer">Corporate Customers</option>
          </select>
        </div>
      </div>

      <div className="customer-grid">
        {filteredCustomers.map(customer => (
          <CustomerCard 
            key={customer.id} 
            customer={customer} 
            onClick={() => setSelectedCustomer(customer)}
          />
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9aa69d' }}>
          No customers found matching your criteria.
        </div>
      )}

      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />

      <CustomerDetailsModal
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        customer={selectedCustomer}
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

export default CustomersPage;
