import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';

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
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
