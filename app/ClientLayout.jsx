'use client';
import { useState, useEffect } from 'react';
import Loader from './components/Loader';

export default function ClientLayout({ children }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onLoadComplete={() => setLoading(false)} />}
      {children}
    </>
  );
}
