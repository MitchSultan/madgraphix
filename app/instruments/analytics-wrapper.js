'use client';

import { useEffect } from 'react';
import { trackPageView } from '@/app/lib/utils/analytics';

export default function InstrumentsPageWithAnalytics({ children }) {
  useEffect(() => {
    // Track page view when component mounts
    trackPageView('/instruments');
  }, []);

  return <>{children}</>;
}
