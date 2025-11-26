'use client'

export default function ProductCard({ product, onEdit, onDelete, onToggleStatus, isAdmin = false }) {
  return (
    <div className="product-card">
      {product.image_url && (
        <div className="product-image">
          <img src={product.image_url} alt={product.name} />
          {!product.is_active && (
            <div className="inactive-badge">Inactive</div>
          )}
        </div>
      )}
      
      <div className="product-content">
        <h3>{product.name}</h3>
        {product.description && <p className="description">{product.description}</p>}
        
        <div className="product-options">
          {product.available_colors && product.available_colors.length > 0 && (
            <div className="option-group">
              <span className="option-label">Colors:</span>
              <div className="colors">
                {product.available_colors.slice(0, 4).map((color, idx) => (
                  <span key={idx} className="color-tag">{color}</span>
                ))}
                {product.available_colors.length > 4 && (
                  <span className="more-tag">+{product.available_colors.length - 4} more</span>
                )}
              </div>
            </div>
          )}
          
          {product.available_sizes && product.available_sizes.length > 0 && (
            <div className="option-group">
              <span className="option-label">Sizes:</span>
              <div className="sizes">
                {product.available_sizes.map((size, idx) => (
                  <span key={idx} className="size-tag">{size}</span>
                ))}
              </div>
            </div>
          )}
          
          {product.allows_custom_text && (
            <div className="option-group">
              <span className="feature-tag">✏️ Custom text available</span>
            </div>
          )}
        </div>

        {isAdmin && (
          <div className="admin-actions">
            <button onClick={() => onEdit(product)} className="btn-edit">
              Edit
            </button>
            <button 
              onClick={() => onToggleStatus(product.id, !product.is_active)} 
              className={product.is_active ? "btn-deactivate" : "btn-activate"}
            >
              {product.is_active ? 'Deactivate' : 'Activate'}
            </button>
            <button onClick={() => onDelete(product.id)} className="btn-delete">
              Delete
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .product-image {
          position: relative;
          width: 100%;
          height: 200px;
          background: #f3f4f6;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .inactive-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(239, 68, 68, 0.9);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
        }

        .product-content {
          padding: 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1f2937;
        }

        .description {
          margin: 0 0 1rem 0;
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .product-options {
          flex: 1;
          margin-bottom: 1rem;
        }

        .option-group {
          margin-bottom: 0.75rem;
        }

        .option-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #6b7280;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .colors,
        .sizes {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .color-tag,
        .size-tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #eff6ff;
          color: #1e40af;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .more-tag {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          background: #f3f4f6;
          color: #6b7280;
          border-radius: 6px;
          font-size: 0.8rem;
        }

        .feature-tag {
          display: inline-block;
          padding: 0.5rem 0.75rem;
          background: #f0fdf4;
          color: #166534;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .admin-actions {
          display: flex;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 2px solid #f3f4f6;
        }

        .admin-actions button {
          flex: 1;
          padding: 0.5rem;
          border: none;
          border-radius: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-edit {
          background: #dbeafe;
          color: #1e40af;
        }

        .btn-edit:hover {
          background: #bfdbfe;
        }

        .btn-activate {
          background: #d1fae5;
          color: #065f46;
        }

        .btn-activate:hover {
          background: #a7f3d0;
        }

        .btn-deactivate {
          background: #fef3c7;
          color: #92400e;
        }

        .btn-deactivate:hover {
          background: #fde68a;
        }

        .btn-delete {
          background: #fee2e2;
          color: #991b1b;
        }

        .btn-delete:hover {
          background: #fecaca;
        }
      `}</style>
    </div>
  )
}
