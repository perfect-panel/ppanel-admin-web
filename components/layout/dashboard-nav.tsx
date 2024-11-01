'use client';

import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useSidebar from '@/hooks/use-sidebar';
import { cn } from '@/lib';
import { NavItem } from '@/types';

interface DashboardNavProperties {
  isMobileNav?: boolean;
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ items, setOpen, isMobileNav = false }: DashboardNavProperties) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const t = useTranslations('menu');

  if (!items?.length) return;

  return (
    <nav className='grid items-start gap-2 p-2'>
      <TooltipProvider>
        {items.map((item, index) => {
          return (
            item.href && (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    className={cn(
                      'flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                      path === item.href ? 'bg-accent text-primary' : 'transparent',
                      item.disabled && 'cursor-not-allowed opacity-80',
                    )}
                    href={item.disabled ? '/' : item.href}
                    onClick={() => {
                      if (setOpen) setOpen(false);
                    }}
                  >
                    <Icon className={`ml-2 size-6 flex-none`} icon={item.icon!} />

                    {isMobileNav || (!isMinimized && !isMobileNav) ? (
                      <span className='mr-2 truncate'>{t(item.label)}</span>
                    ) : (
                      ''
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  align='center'
                  className={isMinimized ? 'inline-block' : 'hidden'}
                  side='right'
                  sideOffset={8}
                >
                  {t(item.label)}
                </TooltipContent>
              </Tooltip>
            )
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
