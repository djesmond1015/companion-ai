import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme-provider';
import { ProModal } from '@/components/pro-modal';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { cn } from '@/lib/utils';

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
        <body className={cn('bg-secondary', font.className)}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
          >
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
