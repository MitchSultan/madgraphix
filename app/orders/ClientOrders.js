'use client'

import { useState, useEffect } from 'react'
import OrderStatusBadge from '@/components/OrderStatusBadge'

export default function ClientOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your orders...</p>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>My Orders</h1>
        <p>View and track your order history</p>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>You haven't placed any orders yet</p>
            <a href="/products" className="btn-primary">Browse Products</a>
          </div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
              <div className="order-header">
                <div>
                  <h3>{order.order_number}</h3>
                  <p className="order-date">{formatDate(order.created_at)}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>
              
              <div className="order-summary">
                <div className="summary-item">
                  <span className="label">Items:</span>
                  <span>{order.order_items?.length || 0}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Updated:</span>
                  <span>{formatDate(order.updated_at)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedOrder.order_number}</h2>
                <OrderStatusBadge status={selectedOrder.status} />
                <p className="order-date">{formatDate(selectedOrder.created_at)}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="close-btn">×</button>
            </div>

            <div className="order-items">
              <h3>Order Items</h3>
              {selectedOrder.order_items?.map((item, idx) => (
                <div key={idx} className="item-card">
                  <div className="item-header">
                    <h4>{item.products?.name}</h4>
                    <span className="qty-badge">Qty: {item.quantity}</span>
                  </div>
                  <div className="item-specs">
                    {item.color && <span className="spec">Color: {item.color}</span>}
                    {item.size && <span className="spec">Size: {item.size}</span>}
                    {item.custom_text && <span className="spec">Custom Text: "{item.custom_text}"</span>}
                  </div>
                </div>
              ))}
            </div>

            {selectedOrder.notes && (
              <div className="order-notes">
                <h3>Your Notes</h3>
                <p>{selectedOrder.notes}</p>
              </div>
            )}

            <div className="order-timeline">
              <h3>Order Timeline</h3>
              <div className="timeline">
                <div className={`timeline-step ${selectedOrder.status === 'pending' || selectedOrder.status === 'confirmed' || selectedOrder.status === 'in_production' || selectedOrder.status === 'completed' ? 'completed' : ''}`}>
                  <div className="step-marker"></div>
                  <div className="step-info">
                    <div className="step-title">Pending</div>
                    <div className="step-desc">Order submitted</div>
                  </div>
                </div>
                <div className={`timeline-step ${selectedOrder.status === 'confirmed' || selectedOrder.status === 'in_production' || selectedOrder.status === 'completed' ? 'completed' : ''}`}>
                  <div className="step-marker"></div>
                  <div className="step-info">
                    <div className="step-title">Confirmed</div>
                    <div className="step-desc">Order confirmed by admin</div>
                  </div>
                </div>
                <div className={`timeline-step ${selectedOrder.status === 'in_production' || selectedOrder.status === 'completed' ? 'completed' : ''}`}>
                  <div className="step-marker"></div>
                  <div className="step-info">
                    <div className="step-title">In Production</div>
                    <div className="step-desc">Your order is being made</div>
                  </div>
                </div>
                <div className={`timeline-step ${selectedOrder.status === 'completed' ? 'completed' : ''}`}>
                  <div className="step-marker"></div>
                  <div className="step-info">
                    <div className="step-title">Completed</div>
                    <div className="step-desc">Order ready</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .orders-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          margin: 0;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          margin: 0.5rem 0 0 0;
          color: #6b7280;
          font-size: 1.125rem;
        }

        .orders-list {
          display: grid;
          gap: 1rem;
        }

        .order-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.2s;
        }

        .order-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .order-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
        }

        .order-date {
          margin: 0.25rem 0 0 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .order-summary {
          display: flex;
          gap: 2rem;
        }

        .summary-item {
          display: flex;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .summary-item .label {
          color: #6b7280;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          border: 2px dashed #d1d5db;
        }

        .empty-state p {
          font-size: 1.25rem;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }

        .btn-primary {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          gap: 1rem;
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

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
          align-items: flex-start;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .modal-header h2 {
          margin: 0 0 0.5rem 0;
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

        .order-items,
        .order-notes,
        .order-timeline {
          margin-bottom: 2rem;
        }

        .order-items h3,
        .order-notes h3,
        .order-timeline h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          font-weight: 700;
          color: #1f2937;
        }

        .item-card {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 0.75rem;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .item-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .qty-badge {
          background: #dbeafe;
          color: #1e40af;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .item-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .spec {
          font-size: 0.8rem;
          color: #6b7280;
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .order-notes p {
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          margin: 0;
          color: #374151;
        }

        .timeline {
          position: relative;
        }

        .timeline-step {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .timeline-step:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 15px;
          top: 32px;
          width: 2px;
          height: calc(100% + 0.5rem);
          background: #e5e7eb;
        }

        .timeline-step.completed::after {
          background: #3b82f6;
        }

        .step-marker {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f3f4f6;
          border: 3px solid #e5e7eb;
          flex-shrink: 0;
          z-index: 1;
        }

        .timeline-step.completed .step-marker {
          background: #3b82f6;
          border-color: #3b82f6;
        }

        .step-info {
          padding-top: 0.25rem;
        }

        .step-title {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .step-desc {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .timeline-step.completed .step-title {
          color: #3b82f6;
        }

        @media (max-width: 768px) {
          .orders-page {
            padding: 1rem;
          }

          .page-header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
