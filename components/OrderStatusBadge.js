export default function OrderStatusBadge({ status }) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      color: '#f59e0b',
      bg: '#fef3c7'
    },
    confirmed: {
      label: 'Confirmed',
      color: '#3b82f6',
      bg: '#dbeafe'
    },
    in_production: {
      label: 'In Production',
      color: '#8b5cf6',
      bg: '#ede9fe'
    },
    completed: {
      label: 'Completed',
      color: '#10b981',
      bg: '#d1fae5'
    },
    cancelled: {
      label: 'Cancelled',
      color: '#ef4444',
      bg: '#fee2e2'
    }
  }

  const config = statusConfig[status] || statusConfig.pending

  return (
    <span className="status-badge">
      {config.label}
      
      <style jsx>{`
        .status-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          background: ${config.bg};
          color: ${config.color};
        }
      `}</style>
    </span>
  )
}
