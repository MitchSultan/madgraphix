'use client'

import { useState } from 'react'

export default function Cart({ items, onRemove, onUpdateQuantity, onSubmitOrder }) {
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSubmitOrder(notes)
      setNotes('')
      setShowCart(false)
    } catch (error) {
      console.error('Error submitting order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (items.length === 0) return null

  return (
    <>
      {/* Floating Cart Button */}
      <button className="cart-fab" onClick={() => setShowCart(true)}>
        🛒 <span className="cart-count">{items.length}</span>
      </button>

      {/* Cart Modal */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Your Order</h2>
              <button onClick={() => setShowCart(false)} className="close-btn">×</button>
            </div>

            <div className="cart-items">
              {items.map((item, index) => (
                <div key={index} className="cart-item">
                  {item.product.image_url && (
                    <img src={item.product.image_url} alt={item.product.name} />
                  )}
                  
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <div className="item-specs">
                      {item.color && <span className="spec">Color: {item.color}</span>}
                      {item.size && <span className="spec">Size: {item.size}</span>}
                      {item.custom_text && <span className="spec">Text: "{item.custom_text}"</span>}
                    </div>
                    
                    <div className="item-quantity">
                      <button 
                        onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                        className="qty-btn"
                      >
                        -
                      </button>
                      <span>Qty: {item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <button onClick={() => onRemove(index)} className="btn-remove">
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="order-form">
              <div className="form-group">
                <label>Special Notes or Requests (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any special instructions..."
                  rows={3}
                />
              </div>

              <button 
                type="submit" 
                className="btn-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Order'}
              </button>
            </form>

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
                max-width: 700px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                padding: 2rem;
              }

              .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
              }

              .modal-header h2 {
                margin: 0;
                font-size: 1.75rem;
                font-weight: 700;
                color: #1f2937;
              }

              .close-btn {
                background: none;
                border: none;
                font-size: 2rem;
                color: #9ca3af;
                cursor: pointer;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: color 0.2s;
              }

              .close-btn:hover {
                color: #374151;
              }

              .cart-items {
                max-height: 400px;
                overflow-y: auto;
                margin-bottom: 1.5rem;
              }

              .cart-item {
                display: flex;
                gap: 1rem;
                padding: 1rem;
                background: #f9fafb;
                border-radius: 12px;
                margin-bottom: 1rem;
              }

              .cart-item img {
                width: 80px;
                height: 80px;
                object-fit: cover;
                border-radius: 8px;
              }

              .item-details {
                flex: 1;
              }

              .item-details h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.125rem;
                font-weight: 600;
                color: #1f2937;
              }

              .item-specs {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
              }

              .spec {
                font-size: 0.875rem;
                color: #6b7280;
                background: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
              }

              .item-quantity {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 0.5rem;
              }

              .qty-btn {
                width: 28px;
                height: 28px;
                background: white;
                border: 1px solid #d1d5db;
                border-radius: 4px;
                font-size: 1rem;
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
                border-color: #3b82f6;
              }

              .btn-remove {
                background: #fee2e2;
                border: none;
                border-radius: 8px;
                width: 40px;
                height: 40px;
                cursor: pointer;
                font-size: 1.25rem;
                transition: all 0.2s;
              }

              .btn-remove:hover {
                background: #fecaca;
              }

              .order-form {
                border-top: 2px solid #e5e7eb;
                padding-top: 1.5rem;
              }

              .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #374151;
              }

              .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 1rem;
                font-family: inherit;
                resize: vertical;
                transition: border-color 0.2s;
              }

              .form-group textarea:focus {
                outline: none;
                border-color: #3b82f6;
              }

              .btn-submit {
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 1.125rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
                margin-top: 1rem;
              }

              .btn-submit:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 16px rgba(16, 185, 129, 0.4);
              }

              .btn-submit:disabled {
                opacity: 0.6;
                cursor: not-allowed;
              }
            `}</style>
          </div>
        </div>
      )}

      <style jsx>{`
        .cart-fab {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4);
          transition: all 0.3s;
          z-index: 999;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .cart-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 24px rgba(59, 130, 246, 0.5);
        }

        .cart-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #ef4444;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
        }
      `}</style>
    </>
  )
}
