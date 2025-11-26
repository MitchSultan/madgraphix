'use client'

import { useState, useEffect } from 'react'
import OrderStatusBadge from '@/components/OrderStatusBadge'

export default function OrdersManagement() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetchOrders()
    fetchStats()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/orders/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        await fetchOrders()
        await fetchStats()
        if (selectedOrder?.id === orderId) {
          const updated = await response.json()
          setSelectedOrder(updated)
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
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

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter
  })

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Order Management</h1>
        <p>View and manage all client orders</p>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-value">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card confirmed">
            <div className="stat-value">{stats.confirmed}</div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card production">
            <div className="stat-value">{stats.in_production}</div>
            <div className="stat-label">In Production</div>
          </div>
          <div className="stat-card completed">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>
      )}

      <div className="filter-bar">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All ({orders.length})
        </button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
          Pending ({stats?.pending || 0})
        </button>
        <button className={filter === 'confirmed' ? 'active' : ''} onClick={() => setFilter('confirmed')}>
          Confirmed ({stats?.confirmed || 0})
        </button>
        <button className={filter === 'in_production' ? 'active' : ''} onClick={() => setFilter('in_production')}>
          In Production ({stats?.in_production || 0})
        </button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
          Completed ({stats?.completed || 0})
        </button>
      </div>

      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="empty-state">
            <p>No orders found</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="order-card" onClick={() => setSelectedOrder(order)}>
              <div className="order-header">
                <div>
                  <h3>{order.order_number}</h3>
                  <p className="client-name">{order.user_profiles?.full_name || order.user_profiles?.email}</p>
                  {order.user_profiles?.company_name && (
                    <p className="company-name">{order.user_profiles.company_name}</p>
                  )}
                </div>
                <OrderStatusBadge status={order.status} />
              </div>
              
              <div className="order-details">
                <div className="detail-item">
                  <span className="label">Items:</span>
                  <span>{order.order_items?.length || 0}</span>
                </div>
                <div className="detail-item">
                  <span className="label">Date:</span>
                  <span>{formatDate(order.created_at)}</span>
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
              </div>
              <button onClick={() => setSelectedOrder(null)} className="close-btn">×</button>
            </div>

            <div className="order-info">
              <h3>Client Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Name:</span>
                  <span>{selectedOrder.user_profiles?.full_name || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span>{selectedOrder.user_profiles?.email}</span>
                </div>
                {selectedOrder.user_profiles?.company_name && (
                  <div className="info-item">
                    <span className="label">Company:</span>
                    <span>{selectedOrder.user_profiles.company_name}</span>
                  </div>
                )}
                {selectedOrder.user_profiles?.phone && (
                  <div className="info-item">
                    <span className="label">Phone:</span>
                    <span>{selectedOrder.user_profiles.phone}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="label">Order Date:</span>
                  <span>{formatDate(selectedOrder.created_at)}</span>
                </div>
              </div>
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
                <h3>Special Notes</h3>
                <p>{selectedOrder.notes}</p>
              </div>
            )}

            <div className="status-update">
              <h3>Update Order Status</h3>
              <div className="status-buttons">
                <button
                  className={`status-btn ${selectedOrder.status === 'pending' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'pending')}
                >
                  Pending
                </button>
                <button
                  className={`status-btn ${selectedOrder.status === 'confirmed' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'confirmed')}
                >
                  Confirmed
                </button>
                <button
                  className={`status-btn ${selectedOrder.status === 'in_production' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'in_production')}
                >
                  In Production
                </button>
                <button
                  className={`status-btn ${selectedOrder.status === 'completed' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'completed')}
                >
                  Completed
                </button>
                <button
                  className={`status-btn ${selectedOrder.status === 'cancelled' ? 'active' : ''}`}
                  onClick={() => handleStatusUpdate(selectedOrder.id, 'cancelled')}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .orders-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-header {
          margin-bottom: 2rem;
        }

        .page-header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
        }

        .page-header p {
          margin: 0.5rem 0 0 0;
          color: #6b7280;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #3b82f6;
        }

        .stat-card.pending { border-left-color: #f59e0b; }
        .stat-card.confirmed { border-left-color: #3b82f6; }
        .stat-card.production { border-left-color: #8b5cf6; }
        .stat-card.completed { border-left-color: #10b981; }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          color: #6b7280;
          font-size: 0.875rem;
        }

        .filter-bar {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0, 0.1);
        }

        .filter-bar button {
          padding: 0.5rem 1rem;
          background: #f3f4f6;
          color: #374151;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-bar button:hover {
          background: #e5e7eb;
        }

        .filter-bar button.active {
          background: #3b82f6;
          color: white;
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

        .client-name {
          margin: 0.25rem 0 0 0;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .company-name {
          margin: 0.25rem 0 0 0;
          color: #9ca3af;
          font-size: 0.8rem;
        }

        .order-details {
          display: flex;
          gap: 2rem;
        }

        .detail-item {
          display: flex;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .detail-item .label {
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
          max-width: 800px;
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

        .order-info,
        .order-items,
        .order-notes,
        .status-update {
          margin-bottom: 2rem;
        }

        .order-info h3,
        .order-items h3,
        .order-notes h3,
        .status-update h3 {
          margin: 0 0 1rem 0;
          font-size: 1.125rem;
          font-weight: 700;
          color: #1f2937;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item .label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
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

        .status-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .status-btn {
          padding: 0.75rem 1rem;
          background: #f3f4f6;
          color: #374151;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .status-btn:hover {
          background: #e5e7eb;
        }

        .status-btn.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        @media (max-width: 768px) {
          .orders-page {
            padding: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
