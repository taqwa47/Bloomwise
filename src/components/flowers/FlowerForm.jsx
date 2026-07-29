import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FlowerForm = ({ initialData, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    category: '',
    color: '',
    quantity: '',
    minStock: '',
    cost: '',
    sellingPrice: '',
    supplier: '',
    season: '',
    freshness: 'Fresh',
    description: '',
    careInstructions: '',
    imagePath: ''
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
    if (!formData.type) newErrors.type = 'Type is required'
    if (!formData.color) newErrors.color = 'Color is required'
    if (formData.quantity === '' || Number(formData.quantity) < 0) newErrors.quantity = 'Valid quantity is required'
    if (formData.minStock === '' || Number(formData.minStock) < 0) newErrors.minStock = 'Valid minimum stock is required'
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
        cost: formData.cost ? Number(formData.cost) : 0,
        sellingPrice: Number(formData.sellingPrice)
      })
    }
  }

  return (
    <div className="inventory-form-card">
      <div className="form-header">
        <h2>{isEditing ? 'Edit Flower' : 'Add Flower'}</h2>
      </div>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Flower Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Red Rose" />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Flower Type *</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="e.g. Rose" />
            {errors.type && <span className="form-error">{errors.type}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Rose" />
          </div>

          <div className="form-group">
            <label>Color *</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="e.g. Red" />
            {errors.color && <span className="form-error">{errors.color}</span>}
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
            <label>Cost Price (₪)</label>
            <input type="number" step="0.01" name="cost" value={formData.cost} onChange={handleChange} min="0" />
          </div>

          <div className="form-group">
            <label>Selling Price (₪) *</label>
            <input type="number" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} min="0" />
            {errors.sellingPrice && <span className="form-error">{errors.sellingPrice}</span>}
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} placeholder="e.g. Local Farms" />
          </div>

          <div className="form-group">
            <label>Season</label>
            <input type="text" name="season" value={formData.season} onChange={handleChange} placeholder="e.g. All Year" />
          </div>

          <div className="form-group">
            <label>Image URL or Path</label>
            <input type="text" name="imagePath" value={formData.imagePath} onChange={handleChange} placeholder="e.g. /src/assets/flowers/red-rose.jpg" />
          </div>
          
          <div className="form-group" style={{gridColumn: '1 / -1'}}>
            <label>Short Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="2" placeholder="Describe the flower..." />
          </div>
          
          <div className="form-group" style={{gridColumn: '1 / -1'}}>
            <label>Care Instructions</label>
            <textarea name="careInstructions" value={formData.careInstructions} onChange={handleChange} rows="2" placeholder="e.g. Keep in water and trim stems." />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn">{isEditing ? 'Save Changes' : 'Save Flower'}</button>
        </div>
      </form>
    </div>
  )
}

export default FlowerForm
