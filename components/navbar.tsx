'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './mobileSidebar';
import { ModeToggle } from './mode-toggle';

const font = Poppins({ weight: '600', subsets: ['latin'] });

interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({ isPro }: NavbarProps) => {
  return (
    <div className='fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-primary/10 bg-secondary'>
      <div className='flex items-center'>
        <MobileSidebar isPro={isPro} />
        <Link href='/'>
          <h1
            className={cn(
              'hidden md:block text-xl md:text-3xl font-bold text-primary',
              font.className
            )}
          >
            Companion.ai
          </h1>
        </Link>
      </div>
      <div className='flex items-center gap-x-3'>
        {!isPro && (
          <Button
            // onClick={() => {}}
            size='sm'
            variant='premium'
          >
            Upgrade
            <Sparkles className='w-4 h-4 ml-2 fill-white' />
          </Button>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  );
};
