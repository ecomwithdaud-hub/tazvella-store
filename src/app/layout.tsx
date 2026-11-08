import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';

export const metadata: Metadata = {
  title: 'Tazvella | Aesthetic Digital Planners, Notion Sanctuaries & Pet Care',
  description:
    'Aesthetic digital templates, Notion dashboards, iPad journals, and pet health trackers crafted for modern women and girls who cherish peaceful organization and their pets.',
  keywords: [
    'Notion life planner',
    'Aesthetic digital planner',
    'Pet health tracker',
    'Dog care Notion template',
    'GoodNotes iPad journal',
    '50/30/20 budget spreadsheet',
    'Tazvella',
  ],
  authors: [{ name: 'Tazvella Atelier' }],
  metadataBase: new URL('https://tazvella.com'),
  openGraph: {
    title: 'Tazvella | Aesthetic Digital Atelier & Pet Care',
    description:
      'Organize your life, finances, and fur baby routines with calming aesthetic digital systems.',
    url: 'https://tazvella.com',
    siteName: 'Tazvella',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-cream-100 text-espresso-950">
        <CurrencyProvider>
          <CartProvider>
            <AnnouncementBar />
            {children}
            <CartDrawer />
            <QuickViewModal />
            <CheckoutModal />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
