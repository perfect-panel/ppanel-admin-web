'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { convertToMajorUnit, formatDate } from '@/lib';
import { getUserDetail } from '@/services/admin/user';

export function UserDetail({ id }: { id: number }) {
  const t = useTranslations('user');
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data } = useQuery({
    enabled: id !== 0 && shouldFetch,
    queryKey: ['getUserDetail', id],
    queryFn: async () => {
      const { data } = await getUserDetail({ id });
      return data.data;
    },
  });

  if (!id) return '--';

  return (
    <HoverCard>
      <HoverCardTrigger asChild onMouseEnter={() => setShouldFetch(true)}>
        <Button variant='link' className='p-0'>
          @{data?.email?.split('@')[0] || 'Loading...'}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className='grid gap-3'>
          <ul className='grid gap-3'>
            <li className='flex items-center justify-between font-semibold'>
              <span className='text-muted-foreground'>ID</span>
              <span>{data?.id}</span>
            </li>
            <li className='flex items-center justify-between font-semibold'>
              <span className='text-muted-foreground'>{t('email')}</span>
              <span>{data?.email}</span>
            </li>
            <li className='flex items-center justify-between font-semibold'>
              <span className='text-muted-foreground'>{t('balance')}</span>
              <span>{convertToMajorUnit(data?.balance)}</span>
            </li>
            <li className='flex items-center justify-between'>
              <span className='text-muted-foreground'>{t('createdAt')}</span>
              <span>{data?.created_at && formatDate(data?.created_at)}</span>
            </li>
          </ul>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
