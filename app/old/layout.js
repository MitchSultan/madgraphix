import { Outfit } from 'next/font/google';

import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from './admin/dashboard/components/context/SidebarContext';
import { ThemeProvider } from './admin/dashboard/components/context/ThemeContext';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function AdnLayout({
  children,
}) {
  return (
    <>
      <div className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </div>
    </>
  );
}
