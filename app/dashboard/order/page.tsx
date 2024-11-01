'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import { Combobox } from '@/components/customize/combobox';
import { Display } from '@/components/customize/display';
import { ProTable, ProTableActions } from '@/components/pro-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { cn, formatDate } from '@/lib';
import { getOrderList, updateOrderStatus } from '@/services/admin/order';
import { getSubscribeList } from '@/services/admin/subscribe';

import { UserDetail } from '../user/user-detail';

export default function Page() {
  const t = useTranslations('order');

  const statusOptions = [
    { value: 1, label: t('status.1'), className: 'bg-orange-500' },
    { value: 2, label: t('status.2'), className: 'bg-green-500' },
    { value: 3, label: t('status.3'), className: 'bg-gray-500' },
    { value: 4, label: t('status.4'), className: 'bg-red-500' },
    { value: 5, label: t('status.5'), className: 'bg-green-500' },
  ];

  const ref = useRef<ProTableActions>();

  const { data: subscribeList } = useQuery({
    queryKey: ['getSubscribeList', 'all'],
    queryFn: async () => {
      const { data } = await getSubscribeList({
        page: 1,
        size: 9999,
      });
      return data.data?.list as API.SubscribeGroup[];
    },
  });

  return (
    <ProTable<API.Order, any>
      action={ref}
      columns={[
        {
          accessorKey: 'order_no',
          header: t('orderNumber'),
        },
        {
          accessorKey: 'type',
          header: t('type.0'),
          cell: ({ row }) => t(`type.${row.getValue('type')}`),
        },
        {
          accessorKey: 'subscribe_id',
          header: t('subscribe'),
          cell: ({ row }) =>
            subscribeList?.find((item) => item.id === row.getValue('subscribe_id'))?.name,
        },
        {
          accessorKey: 'amount',
          header: t('amount'),
          cell: ({ row }) => (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant='link' className='p-0'>
                  <Display type='currency' value={row.original.amount} />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className='grid gap-3'>
                  {row.original.trade_no && (
                    <>
                      <div className='font-semibold'>{t('tradeNo')}</div>
                      <span className='text-muted-foreground'>{row.original.trade_no}</span>
                      <Separator className='my-2' />
                    </>
                  )}
                  <ul className='grid gap-3'>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>{t('subscribePrice')}</span>
                      <span>
                        <Display type='currency' value={row.original.price} />
                      </span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>{t('reductionPrice')}</span>
                      <span>
                        <Display type='currency' value={row.original.reduction} />
                      </span>
                    </li>
                    <li className='flex items-center justify-between'>
                      <span className='text-muted-foreground'>{t('feAmount')}</span>
                      <span>
                        <Display type='currency' value={row.original.fee_amount} />
                      </span>
                    </li>
                    <li className='flex items-center justify-between font-semibold'>
                      <span className='text-muted-foreground'>{t('total')}</span>
                      <span>
                        <Display type='currency' value={row.original.amount} />
                      </span>
                    </li>
                  </ul>
                </div>
                <Separator className='my-4' />
                <ul className='grid gap-3'>
                  <li className='flex items-center justify-between'>
                    <span className='text-muted-foreground'>支付方式</span>
                    <span>{t(`methods.${row.original.method}`)}</span>
                  </li>
                </ul>
              </HoverCardContent>
            </HoverCard>
          ),
        },
        {
          accessorKey: 'user_id',
          header: t('user'),
          cell: ({ row }) => <UserDetail id={row.original.user_id} />,
        },
        {
          accessorKey: 'updated_at',
          header: t('updateTime'),
          cell: ({ row }) => formatDate(row.original.updated_at),
        },
        {
          accessorKey: 'status',
          header: t('status.0'),
          cell: ({ row }) => {
            const option = statusOptions.find((opt) => opt.value === row.original.status);
            if ([1, 3, 4].includes(row.getValue('status'))) {
              return (
                <Combobox<number, false>
                  placeholder='状态'
                  value={row.original.status}
                  onChange={async (value) => {
                    await updateOrderStatus({
                      id: row.original.id,
                      status: value,
                    });
                    ref.current?.refresh();
                  }}
                  options={statusOptions}
                  className={cn(option?.className)}
                />
              );
            }
            return <Badge>{t(`status.${row.getValue('status')}`)}</Badge>;
          },
        },
      ]}
      params={[
        { key: 'search' },
        {
          key: 'status',
          placeholder: t('status.0'),
          options: statusOptions.map((item) => ({
            label: item.label,
            value: String(item.value),
          })),
        },
        {
          key: 'subscribe_id',
          placeholder: `${t('subscribe')}`,
          options: subscribeList?.map((item) => ({
            label: item.name,
            value: String(item.id),
          })),
        },
        { key: 'user_id', placeholder: `${t('user')}ID` },
      ]}
      request={async (pagination, filter) => {
        const { data } = await getOrderList({ ...pagination, ...filter });
        return {
          list: data.data?.list || [],
          total: data.data?.total || 0,
        };
      }}
    />
  );
}
