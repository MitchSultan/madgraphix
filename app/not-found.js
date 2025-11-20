import React from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

export default function notfound() {
  return (
    <div>
        <Navigation />
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
          <a href="/" className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Go Back Home
          </a>
        </div>
        <Footer />
    </div>
  )
}
