'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${searchParams?.toString() ? `?${searchParams.toString()}` : ''}`;
    window.gtag('config', 'G-NS3672QL6H', { page_path: url });
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}