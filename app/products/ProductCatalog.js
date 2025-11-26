'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'
import OrderModal from '@/components/OrderModal'
import Cart from '@/components/Cart'

export default function ProductCatalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item])
    setSelectedProduct(null)
  }

  const handleRemoveFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  const handleUpdateQuantity = (index, newQuantity) => {
    const updatedItems = [...cartItems]
    updatedItems[index].quantity = newQuantity
    setCartItems(updatedItems)
  }

  const handleSubmitOrder = async (notes) => {
    try {
      const orderData = {
        notes,
        items: cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          custom_text: item.custom_text
        }))
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (response.ok) {
        setCartItems([])
        alert('Order submitted successfully! The admin will review and contact you soon.')
      }
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('Failed to submit order. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    )
  }

  return (
    <div className="catalog-page">
      <div className="page-header">
        <h1>Product Catalog</h1>
        <p>Browse and customize your order</p>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <p>No products available at the moment</p>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
              <ProductCard product={product} isAdmin={false} />
            </div>
          ))
        )}
      </div>

      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      <Cart
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onSubmitOrder={handleSubmitOrder}
      />

      <style jsx>{`
        .catalog-page {
          max-width: 1400px;
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

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
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

        @media (max-width: 768px) {
          .catalog-page {
            padding: 1rem;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
