'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import ProductForm from '@/components/admin/ProductForm'

export default function ProductsManagement() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [filter, setFilter] = useState('all') // all, active, inactive

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateProduct = async (productData) => {
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      
      if (response.ok) {
        await fetchProducts()
        setShowForm(false)
        setEditingProduct(null)
      }
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  const handleUpdateProduct = async (productData) => {
    try {
      const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      
      if (response.ok) {
        await fetchProducts()
        setShowForm(false)
        setEditingProduct(null)
      }
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchProducts()
      }
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  const handleToggleStatus = async (id, isActive) => {
    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: isActive })
      })
      
      if (response.ok) {
        await fetchProducts()
      }
    } catch (error) {
      console.error('Error toggling product status:', error)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const filteredProducts = products.filter(product => {
    if (filter === 'active') return product.is_active
    if (filter === 'inactive') return !product.is_active
    return true
  })

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Product Management</h1>
          <p>Manage products available for client orders</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }} 
          className="btn-primary"
        >
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowForm(false)} className="close-btn">×</button>
            </div>
            <ProductForm
              product={editingProduct}
              onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
              onCancel={() => {
                setShowForm(false)
                setEditingProduct(null)
              }}
            />
          </div>
        </div>
      )}

      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({products.length})
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''} 
          onClick={() => setFilter('active')}
        >
          Active ({products.filter(p => p.is_active).length})
        </button>
        <button 
          className={filter === 'inactive' ? 'active' : ''} 
          onClick={() => setFilter('inactive')}
        >
          Inactive ({products.filter(p => !p.is_active).length})
        </button>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>No products found</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your First Product
            </button>
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isAdmin={true}
              onEdit={handleEdit}
              onDelete={handleDeleteProduct}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>

      <style jsx>{`
        .products-page {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .btn-primary {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .empty-state {
          grid-column: 1 / -1;
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
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
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
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 2rem;
          color: #9ca3af;
          cursor: pointer;
          padding: 0;
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

        @media (max-width: 768px) {
          .products-page {
            padding: 1rem;
          }

          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .modal-overlay {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}
