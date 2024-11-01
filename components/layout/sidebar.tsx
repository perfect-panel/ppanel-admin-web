'use client';

import { Icon } from '@iconify/react';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { DashboardNav } from '@/components/layout/dashboard-nav';
import { buttonVariants } from '@/components/ui/button';
import useSidebar from '@/hooks/use-sidebar';
import { cn, navItems } from '@/lib';

type SidebarProperties = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProperties) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        'relative inset-y-0 left-0 z-10 hidden flex-col border-r bg-background transition-[width] duration-500 sm:flex',
        isMinimized ? 'w-14' : 'w-64',
        className,
      )}
    >
      <nav className='flex h-20 items-center gap-4 px-2 sm:py-4'>
        <Link
          href='/'
          className={cn(
            'flex size-full items-center gap-2 overflow-hidden rounded-full text-lg font-semibold md:text-base',
            isMinimized && 'gap-0',
          )}
        >
          <Image src='/favicon.svg' alt='logo' width={48} height={48} className='size-full' />
          <span
            className={cn(
              'w-40 overflow-hidden transition-[width] duration-500',
              isMinimized && 'w-0',
            )}
          >
            PPanel
          </span>
        </Link>
      </nav>
      <DashboardNav items={navItems} />
      <nav className='mt-auto flex flex-col items-end gap-4 px-2 sm:py-4'>
        <Icon
          icon='mdi:chevron-right-last'
          onClick={handleToggle}
          className={cn(
            buttonVariants({
              variant: 'ghost',
              size: 'icon',
            }),
            'size-8 transition-all',
            !isMinimized && 'rotate-180',
          )}
        />
      </nav>
    </aside>
  );
}
