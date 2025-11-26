'use client'

import { useState } from 'react'

export default function ProductForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    image_url: product?.image_url || '',
    available_colors: product?.available_colors ? product.available_colors.join(', ') : '',
    available_sizes: product?.available_sizes ? product.available_sizes.join(', ') : '',
    allows_custom_text: product?.allows_custom_text || false,
    is_active: product?.is_active !== undefined ? product.is_active : true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Convert comma-separated strings to arrays
    const submitData = {
      ...formData,
      available_colors: formData.available_colors
        .split(',')
        .map(c => c.trim())
        .filter(c => c),
      available_sizes: formData.available_sizes
        .split(',')
        .map(s => s.trim())
        .filter(s => s)
    }
    
    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Product Name *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="e.g., Bag Main Label"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Product description..."
          rows={4}
        />
      </div>

      <div className="form-group">
        <label htmlFor="image_url">Image URL</label>
        <input
          type="url"
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
        {formData.image_url && (
          <div className="image-preview">
            <img src={formData.image_url} alt="Preview" />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="available_colors">Available Colors</label>
        <input
          type="text"
          id="available_colors"
          value={formData.available_colors}
          onChange={(e) => setFormData({ ...formData, available_colors: e.target.value })}
          placeholder="Red, Blue, Green, Yellow"
        />
        <small>Separate colors with commas</small>
      </div>

      <div className="form-group">
        <label htmlFor="available_sizes">Available Sizes</label>
        <input
          type="text"
          id="available_sizes"
          value={formData.available_sizes}
          onChange={(e) => setFormData({ ...formData, available_sizes: e.target.value })}
          placeholder="Small, Medium, Large, XL"
        />
        <small>Separate sizes with commas</small>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={formData.allows_custom_text}
            onChange={(e) => setFormData({ ...formData, allows_custom_text: e.target.checked })}
          />
          <span>Allow Custom Text/Name</span>
        </label>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          />
          <span>Product is Active</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          {product ? 'Update Product' : 'Create Product'}
        </button>
      </div>

      <style jsx>{`
        .product-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .form-group input[type="text"],
        .form-group input[type="url"],
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .form-group small {
          display: block;
          margin-top: 0.25rem;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .checkbox-group input[type="checkbox"] {
          width: 20px;
          height: 20px;
          margin-right: 0.75rem;
          cursor: pointer;
        }

        .checkbox-group span {
          font-weight: 500;
        }

        .image-preview {
          margin-top: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
          max-width: 300px;
        }

        .image-preview img {
          width: 100%;
          height: auto;
          display: block;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 2px solid #e5e7eb;
        }

        .btn-primary,
        .btn-secondary {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }
      `}</style>
    </form>
  )
}
