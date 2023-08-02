import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Companion AI',
  description: 'An SAAS Ai application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang='en'
        suppressHydrationWarning
      >
        <body className={font.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
