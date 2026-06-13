// lib/roles.js

// Which routes each role can access
export const ROLE_ROUTES = {
  '/admin':  ['admin'],
  '/staff':  ['admin', 'staff'],
  '/client': ['admin', 'staff', 'client'],
};

// Where each role lands after login
export const ROLE_HOME = {
  admin:  '/admin/',
  staff:  '/staff',
  client: '/client',
};

// Routes that don't require authentication
export const PUBLIC_ROUTES = ['/login', '/set-password', '/error'];