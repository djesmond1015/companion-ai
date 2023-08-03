'use client';

import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Sparkles } from 'lucide-react';

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from '@/components/mobileSidebar';
import { ModeToggle } from '@/components/mode-toggle';
import { useProModal } from '@/hooks/use-pro-modal';

const font = Poppins({ weight: '600', subsets: ['latin'] });

interface NavbarProps {
  isPro: boolean;
}

export const Navbar = ({ isPro }: NavbarProps) => {
  const proModal = useProModal();

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
            onClick={proModal.onOpen}
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
