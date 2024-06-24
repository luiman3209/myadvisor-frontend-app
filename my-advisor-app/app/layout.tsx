// app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ServiceProvider } from '@/contexts/ServicesContext';
import DemoWatermark from '@/components/misc/DemoWatermark';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MyAdvisor.com - Find a financial advisor and book an appointment online',
  description: 'Find a financial advisor and book an appointment online',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ServiceProvider>
          <AuthProvider>
            <div className="pb-12">
              <DemoWatermark />
              {children}

            </div>
          </AuthProvider>
        </ServiceProvider>

      </body>
    </html>
  );
}
