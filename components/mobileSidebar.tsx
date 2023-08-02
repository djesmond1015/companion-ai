import { Menu } from 'lucide-react';

import { Sidebar } from '@/components/sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MobileSidebarProps {
  isPro: boolean;
}

export const MobileSidebar = ({ isPro }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className='pr-4 md:hidden'>
        <Menu />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='w-32 p-0 pt-10 bg-secondary'
      >
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};
