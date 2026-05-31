/**
 * @typedef {'admin' | 'agent' | 'client'} UserRole
 */

/**
 * @typedef {'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled'} OrderStatus
 */

/**
 * @typedef {'Raw Material' | 'Finished Good' | 'Consumable'} MaterialType
 */

/**
 * @typedef {'info' | 'warning' | 'error' | 'security'} LogLevel
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
 * @typedef {Object} Supplier
 * @property {string} id
 * @property {string} name
 * @property {string|null} contact_name
 * @property {string|null} email
 * @property {string|null} phone
 * @property {number} lead_time_days
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Inventory
 * @property {string} id
 * @property {string|null} material_id
 * @property {string} name
 * @property {MaterialType} type
 * @property {string} unit_of_measure
 * @property {number} current_stock
 * @property {number} reorder_point
 * @property {number} cost_per_unit
 * @property {string|null} location
 * @property {string|null} supplier_id
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} title
 * @property {string|null} description
 * @property {number} price
 * @property {string|null} image_url
 * @property {boolean} is_active
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @typedef {Object} SystemLog
 * @property {string} id
 * @property {string|null} user_id
 * @property {string} action
 * @property {string} resource
 * @property {Object} metadata
 * @property {string|null} ip_address
 * @property {LogLevel} level
 * @property {string} created_at
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
export const USER_ROLES = ['admin', 'agent', 'client']

/** Valid order statuses */
export const ORDER_STATUSES = ['pending', 'processing', 'ready', 'delivered', 'cancelled']

/** Valid material types */
export const MATERIAL_TYPES = ['Raw Material', 'Finished Good', 'Consumable']

/** Order status display config */
export const ORDER_STATUS_CONFIG = {
  pending:    { label: 'Pending',    color: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500' },
  ready:      { label: 'Ready',      color: 'bg-green-100 text-green-700',   dot: 'bg-green-500' },
  delivered:  { label: 'Delivered',  color: 'bg-gray-100 text-gray-600',     dot: 'bg-gray-400' },
  cancelled:  { label: 'Cancelled',  color: 'bg-red-100 text-red-700',       dot: 'bg-red-500' },
}
