import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';

import { ClientProviders } from './ClientProviders';

import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'NGS Backoffice',
  description: 'NGS Backoffice Assistance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
