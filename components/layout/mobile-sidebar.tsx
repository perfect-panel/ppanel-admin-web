'use client';

import { MenuIcon } from 'lucide-react';
import { useState } from 'react';

import { DashboardNav } from '@/components/layout/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/lib';

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>
      <SheetContent className='!px-0' side='left'>
        <div className='space-y-4 py-4'>
          <div className='px-3 py-2'>
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>Overview</h2>
            <div className='space-y-1'>
              <DashboardNav isMobileNav={true} items={navItems} setOpen={setOpen} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
