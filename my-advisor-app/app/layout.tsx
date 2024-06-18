// app/layout.tsx
import { AuthProvider } from '@/contexts/AuthContext';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ServiceProvider } from '@/contexts/ServicesContext';

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
        <ServiceProvider><AuthProvider><div className="flex flex-col min-h-screen">{children}</div></AuthProvider></ServiceProvider>

      </body>
    </html>
  );
}
