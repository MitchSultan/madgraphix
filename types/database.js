/**
 * @typedef {'admin' | 'client'} UserRole
 */

/**
 * @typedef {'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled'} OrderStatus
 */

/**
 * @typedef {Object} Profile
 * @property {string} id
 * @property {string|null} full_name
 * @property {string|null} email
 * @property {UserRole} role
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} client_id
 * @property {string} title
 * @property {string|null} description
 * @property {number} quantity
 * @property {number} unit_price
 * @property {number} total_price
 * @property {OrderStatus} status
 * @property {string|null} notes
 * @property {string|null} due_date
 * @property {string} created_at
 * @property {string} updated_at
 * @property {{id: string, full_name: string|null, email: string|null}} [profiles] - joined when admin fetches
 */

/** Valid user roles */
export const USER_ROLES = ['admin', 'client']

/** Valid order statuses */
export const ORDER_STATUSES = ['pending', 'processing', 'ready', 'delivered', 'cancelled']

/** Order status display config */
export const ORDER_STATUS_CONFIG = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500' },
  ready:      { label: 'Ready',      color: 'bg-green-100 text-green-700',   dot: 'bg-green-500' },
  delivered:  { label: 'Delivered',  color: 'bg-gray-100 text-gray-600',     dot: 'bg-gray-400' },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',       dot: 'bg-red-500' },
}
