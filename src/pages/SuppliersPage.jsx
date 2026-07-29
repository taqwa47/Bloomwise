import React, { useState, useEffect, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { 
  initSuppliersData, 
  getSuppliers, 
  saveSuppliers 
} from '../data/mockSuppliers';
import SupplierCard from '../components/suppliers/SupplierCard';
import SupplierFormModal from '../components/suppliers/SupplierFormModal';
import NewSupplierModal from '../components/suppliers/NewSupplierModal';
import ConfirmDialog from '../components/suppliers/ConfirmDialog';
import '../styles/Suppliers.css';

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [supplierToEdit, setSupplierToEdit] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);
  
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    initSuppliersData();
    setSuppliers(getSuppliers());
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleAddSupplier = (newSupplierData) => {
    const newSupplier = { ...newSupplierData, id: `sup_${Date.now()}` };
    const updatedSuppliers = [...suppliers, newSupplier];
    setSuppliers(updatedSuppliers);
    saveSuppliers(updatedSuppliers);
    showToast('Supplier added successfully');
    setIsNewModalOpen(false);
  };

  const handleSaveSupplier = (data) => {
    let updatedSuppliers;
    if (supplierToEdit) {
      updatedSuppliers = suppliers.map(s => s.id === data.id ? data : s);
      showToast('Supplier updated successfully');
    } else {
      const newSupplier = { ...data, id: `sup_${Date.now()}` };
      updatedSuppliers = [...suppliers, newSupplier];
      showToast('Supplier added successfully');
    }
    
    setSuppliers(updatedSuppliers);
    saveSuppliers(updatedSuppliers);
    setIsModalOpen(false);
  };

  const confirmDelete = (supplier) => {
    setSupplierToDelete(supplier);
    setIsConfirmOpen(true);
  };

  const handleDelete = () => {
    if (!supplierToDelete) return;
    const updatedSuppliers = suppliers.filter(s => s.id !== supplierToDelete.id);
    setSuppliers(updatedSuppliers);
    saveSuppliers(updatedSuppliers);
    setIsConfirmOpen(false);
    setSupplierToDelete(null);
    showToast('Supplier deleted successfully');
  };

  const handleRatingUpdate = (id, newRating) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, rating: newRating } : s));
  };

  const filteredAndSorted = useMemo(() => {
    let result = suppliers;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.includes(q)
      );
    }

    if (filterStatus !== 'All') {
      result = result.filter(s => s.status === filterStatus);
    }

    result.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      if (sortBy === 'rating-asc') return a.rating - b.rating;
      if (sortBy === 'recent-order') {
        return new Date(b.lastOrderDate || 0) - new Date(a.lastOrderDate || 0);
      }
      return 0;
    });

    return result;
  }, [suppliers, searchQuery, filterStatus, sortBy]);

  return (
    <main className="dashboard-main suppliers-main">
      {toastMsg && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, 
          background: '#ebfdf2', color: '#315e47', 
          padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 9999
        }}>
          {toastMsg}
        </div>
      )}

      <header className="suppliers-header">
        <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <div style={{width: 4, height: 24, background: '#315e47', borderRadius: 4}}></div>
          <h1 className="dashboard-title">Suppliers</h1>
        </div>
        
        <div className="suppliers-actions-top">
          <button 
            className="new-supplier-btn" 
            onClick={() => setIsNewModalOpen(true)}
          >
            <Plus size={18} /> New Supplier
          </button>
        </div>
      </header>

      <div className="suppliers-search-wrap">
        <div className="suppliers-search">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search suppliers..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="On Hold">On Hold</option>
        </select>

        <select 
          className="filter-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="name-asc">Supplier Name A-Z</option>
          <option value="name-desc">Supplier Name Z-A</option>
          <option value="rating-desc">Highest Rating</option>
          <option value="recent-order">Most Recent Order</option>
        </select>
      </div>

      <div className="supplier-grid">
        {filteredAndSorted.length > 0 ? (
          filteredAndSorted.map(supplier => (
            <SupplierCard 
              key={supplier.id} 
              supplier={supplier} 
              onEdit={(s) => { setSupplierToEdit(s); setIsModalOpen(true); }}
              onDelete={confirmDelete}
              onRatingUpdate={handleRatingUpdate}
            />
          ))
        ) : (
          <div style={{ padding: 40, textAlign: 'center', color: '#9aa69d', gridColumn: '1 / -1' }}>
            No suppliers found
          </div>
        )}
      </div>

      <NewSupplierModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onAddSupplier={handleAddSupplier}
      />

      <SupplierFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSupplier}
        supplierToEdit={supplierToEdit}
      />

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        title="Delete Supplier"
        message={`Are you sure you want to delete ${supplierToDelete?.name}?`}
        confirmText="Delete"
        isDestructive={true}
        onConfirm={handleDelete}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </main>
  );
};

export default SuppliersPage;
