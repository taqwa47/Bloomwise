import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const InventoryForm = ({ initialData, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    minStock: '',
    cost: '',
    sellingPrice: '',
    supplier: '',
    color: '',
    storageLocation: '',
    notes: ''
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Flower Name is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (formData.quantity === '' || Number(formData.quantity) < 0) newErrors.quantity = 'Valid quantity is required'
    if (formData.minStock === '' || Number(formData.minStock) < 0) newErrors.minStock = 'Valid minimum stock is required'
    if (formData.cost === '' || Number(formData.cost) < 0) newErrors.cost = 'Valid cost is required'
    if (formData.sellingPrice === '' || Number(formData.sellingPrice) < 0) newErrors.sellingPrice = 'Valid selling price is required'
    
    if (formData.cost !== '' && formData.sellingPrice !== '' && Number(formData.sellingPrice) < Number(formData.cost)) {
      newErrors.sellingPrice = 'Selling price cannot be less than cost'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      onSave({
        ...formData,
        quantity: Number(formData.quantity),
        minStock: Number(formData.minStock),
        cost: Number(formData.cost),
        sellingPrice: Number(formData.sellingPrice)
      })
    }
  }

  return (
    <div className="inventory-form-card">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Inventory Item' : 'Add Inventory Item'}</h2>
      </div>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Flower Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Red Rose" />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Rose" />
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="0" />
            {errors.quantity && <span className="form-error">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label>Minimum Stock Level *</label>
            <input type="number" name="minStock" value={formData.minStock} onChange={handleChange} min="0" />
            {errors.minStock && <span className="form-error">{errors.minStock}</span>}
          </div>

          <div className="form-group">
            <label>Cost Price ($) *</label>
            <input type="number" step="0.01" name="cost" value={formData.cost} onChange={handleChange} min="0" />
            {errors.cost && <span className="form-error">{errors.cost}</span>}
          </div>

          <div className="form-group">
            <label>Selling Price ($) *</label>
            <input type="number" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} min="0" />
            {errors.sellingPrice && <span className="form-error">{errors.sellingPrice}</span>}
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} placeholder="e.g. Local Farms" />
          </div>

          <div className="form-group">
            <label>Color</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Red" />
          </div>

          <div className="form-group">
            <label>Storage Location</label>
            <input type="text" name="storageLocation" value={formData.storageLocation} onChange={handleChange} placeholder="e.g. Cooler A" />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="3" placeholder="Additional details..." />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn">{isEditing ? 'Save Changes' : 'Save Item'}</button>
        </div>
      </form>
    </div>
  )
}

export default InventoryForm
