'use client'

import { useState } from 'react'

export default function OrderModal({ product, onClose, onAddToCart }) {
  const [formData, setFormData] = useState({
    product_id: product.id,
    quantity: 1,
    color: product.available_colors?.[0] || '',
    size: product.available_sizes?.[0] || '',
    custom_text: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddToCart({ ...formData, product })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="close-btn">×</button>
        
        <div className="modal-body">
          {product.image_url && (
            <div className="product-image">
              <img src={product.image_url} alt={product.name} />
            </div>
          )}
          
          <div className="product-details">
            <h2>{product.name}</h2>
            {product.description && <p className="description">{product.description}</p>}
            
            <form onSubmit={handleSubmit}>
              {product.available_colors && product.available_colors.length > 0 && (
                <div className="form-group">
                  <label>Choose Color *</label>
                  <div className="options-grid">
                    {product.available_colors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className={`option-btn ${formData.color === color ? 'selected' : ''}`}
                        onClick={() => setFormData({ ...formData, color })}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.available_sizes && product.available_sizes.length > 0 && (
                <div className="form-group">
                  <label>Choose Size *</label>
                  <div className="options-grid">
                    {product.available_sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        className={`option-btn ${formData.size === size ? 'selected' : ''}`}
                        onClick={() => setFormData({ ...formData, size })}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.allows_custom_text && (
                <div className="form-group">
                  <label>Custom Text/Name</label>
                  <input
                    type="text"
                    value={formData.custom_text}
                    onChange={(e) => setFormData({ ...formData, custom_text: e.target.value })}
                    placeholder="Enter custom text (optional)"
                  />
                </div>
              )}
              
              <div className="form-group">
                <label>Quantity *</label>
                <div className="quantity-selector">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="quantity-display">{formData.quantity}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <button type="submit" className="btn-add-to-cart">
                Add to Cart
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
          }

          .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
          }

          .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: white;
            border: none;
            font-size: 2rem;
            color: #9ca3af;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            z-index: 10;
          }

          .close-btn:hover {
            background: #f3f4f6;
            color: #374151;
          }

          .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 2rem;
          }

          .product-image {
            background: #f3f4f6;
            border-radius: 12px;
            overflow: hidden;
            aspect-ratio: 1;
          }

          .product-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .product-details h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.75rem;
            font-weight: 700;
            color: #1f2937;
          }

          .description {
            margin: 0 0 1.5rem 0;
            color: #6b7280;
            line-height: 1.5;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-group label {
            display: block;
            margin-bottom: 0.75rem;
            font-weight: 600;
            color: #374151;
          }

          .options-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            gap: 0.5rem;
          }

          .option-btn {
            padding: 0.75rem 1rem;
            background: #f3f4f6;
            border: 2px solid transparent;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .option-btn:hover {
            background: #e5e7eb;
          }

          .option-btn.selected {
            background: #dbeafe;
            border-color: #3b82f6;
            color: #1e40af;
          }

          .form-group input[type="text"] {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s;
          }

          .form-group input:focus {
            outline: none;
            border-color: #3b82f6;
          }

          .quantity-selector {
            display: flex;
            align-items: center;
            gap: 1rem;
            background: #f3f4f6;
            padding: 0.5rem;
            border-radius: 8px;
            width: fit-content;
          }

          .qty-btn {
            width: 36px;
            height: 36px;
            background: white;
            border: none;
            border-radius: 6px;
            font-size: 1.25rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .qty-btn:hover {
            background: #3b82f6;
            color: white;
          }

          .quantity-display {
            font-size: 1.25rem;
            font-weight: 700;
            min-width: 40px;
            text-align: center;
          }

          .btn-add-to-cart {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1.125rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 1rem;
          }

          .btn-add-to-cart:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
          }

          @media (max-width: 768px) {
            .modal-body {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </div>
  )
}
