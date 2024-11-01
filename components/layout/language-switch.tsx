'use client';

import { Icon } from '@iconify/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCountry, locales, setLocale } from '@/lib';

export default function LanguageSwitch() {
  const locale = useLocale();
  const country = getCountry(locale);
  const t = useTranslations('language');
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='outline'>
          <Icon icon={`flagpack:${country?.alpha2.toLowerCase()}`} className='size-5' />
          <span className='sr-only'>Switch Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {locales.map(getCountry).map((item) => (
          <DropdownMenuItem
            key={`${item?.lang}-${item?.alpha2}`}
            onClick={() => {
              setLocale(`${item?.lang}-${item?.alpha2}`);
              router.refresh();
            }}
          >
            <div className='flex items-center gap-1'>
              <Icon icon={`flagpack:${item?.alpha2.toLowerCase()}`} />
              {t(`${item?.lang}-${item?.alpha2}`)}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
