'use client';

import { usePathname } from 'next/navigation';

import ThemeToggle from '@/components/layout/theme/toggle';
import { cn, navItems } from '@/lib';

import { Breadcrumbs } from './breadcrumbs';
import LanguageSwitch from './language-switch';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';

export default function Header() {
  const path = usePathname();
  const navItem = path !== '/dashboard' && navItems.find((item) => item.href === path);

  return (
    <header className='sticky inset-x-0 top-0 z-40 w-full pt-[calc(env(safe-area-inset-top))] backdrop-blur-md'>
      <nav className='flex w-full items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-2'>
          <div className={cn('block sm:!hidden')}>
            <MobileSidebar />
          </div>
          {navItem && (
            <Breadcrumbs
              items={[
                {
                  label: 'Dashboard',
                  href: '/dashboard',
                },
                {
                  href: navItem?.href,
                  label: navItem?.label,
                },
              ]}
            />
          )}
        </div>

        <div className='flex items-center gap-2'>
          <LanguageSwitch />
          <ThemeToggle />
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
