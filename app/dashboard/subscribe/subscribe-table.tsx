'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { DeleteButton } from '@/components/customize/delete-button';
import { Display } from '@/components/customize/display';
import { ProTable, ProTableActions } from '@/components/pro-table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  batchDeleteSubscribe,
  createSubscribe,
  deleteSubscribe,
  getSubscribeGroupList,
  getSubscribeList,
  updateSubscribe,
} from '@/services/admin/subscribe';

import SubscribeForm from './subscribe-form';

export default function SubscribeTable() {
  const t = useTranslations('subscribe');
  const [loading, setLoading] = useState(false);
  const { data: groups } = useQuery({
    queryKey: ['getSubscribeGroupList', 'all'],
    queryFn: async () => {
      const { data } = await getSubscribeGroupList({
        page: 1,
        size: 9999,
      });
      return data.data?.list as API.SubscribeGroup[];
    },
  });
  const ref = useRef<ProTableActions>();
  return (
    <ProTable<API.Subscribe, { group_id: number; query: string }>
      action={ref}
      header={{
        toolbar: (
          <SubscribeForm<API.CreateSubscribeRequest>
            trigger={t('create')}
            title={t('createSubscribe')}
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await createSubscribe({
                  ...values,
                  show: false,
                  sell: false,
                });
                toast.success(t('createSuccess'));
                ref.current?.refresh();
                setLoading(false);

                return true;
              } catch (error) {
                setLoading(false);

                return false;
              }
            }}
          />
        ),
      }}
      params={[
        {
          key: 'search',
        },
        {
          key: 'group_id',
          placeholder: t('subscribeGroup'),
          options: groups?.map((item) => ({
            label: item.name,
            value: String(item.id),
          })),
        },
      ]}
      request={async (pagination, filters) => {
        const { data } = await getSubscribeList({
          ...pagination,
          ...filters,
        });
        return {
          list: data.data?.list || [],
          total: data.data?.total || 0,
        };
      }}
      columns={[
        {
          accessorKey: 'show',
          header: t('show'),
          cell: ({ row }) => {
            return (
              <Switch
                defaultChecked={row.getValue('show')}
                onCheckedChange={async (checked) => {
                  await updateSubscribe({
                    ...row.original,
                    show: checked,
                  } as API.UpdateSubscribeRequest);
                  ref.current?.refresh();
                }}
              />
            );
          },
        },
        {
          accessorKey: 'sell',
          header: t('sell'),
          cell: ({ row }) => {
            return (
              <Switch
                defaultChecked={row.getValue('sell')}
                onCheckedChange={async (checked) => {
                  await updateSubscribe({
                    ...row.original,
                    sell: checked,
                  } as API.UpdateSubscribeRequest);
                  ref.current?.refresh();
                }}
              />
            );
          },
        },
        {
          accessorKey: 'name',
          header: t('name'),
        },
        {
          accessorKey: 'unit_price',
          header: t('unitPrice'),
          cell: ({ row }) => <Display type='currency' value={row.getValue('unit_price')} />,
        },
        {
          accessorKey: 'replacement',
          header: t('replacement'),
          cell: ({ row }) => <Display type='currency' value={row.getValue('replacement')} />,
        },
        {
          accessorKey: 'traffic',
          header: t('traffic'),
          cell: ({ row }) => <Display type='traffic' value={row.getValue('traffic')} unlimited />,
        },
        {
          accessorKey: 'device_limit',
          header: t('deviceLimit'),
          cell: ({ row }) => (
            <Display type='number' value={row.getValue('device_limit')} unlimited />
          ),
        },
        {
          accessorKey: 'inventory',
          header: t('inventory'),
          cell: ({ row }) => (
            <Display
              type='number'
              value={row.getValue('inventory') === -1 ? 0 : row.getValue('inventory')}
              unlimited
            />
          ),
        },
        {
          accessorKey: 'quota',
          header: t('quota'),
          cell: ({ row }) => <Display type='number' value={row.getValue('quota')} unlimited />,
        },
        {
          accessorKey: 'group_id',
          header: t('subscribeGroup'),
          cell: ({ row }) => {
            const name = groups?.find((group) => group.id === row.getValue('group_id'))?.name;
            return name ? <Badge variant='outline'>{name}</Badge> : '--';
          },
        },
      ]}
      actions={{
        render: (row) => [
          <SubscribeForm<API.Subscribe>
            key='edit'
            trigger={t('edit')}
            title={t('editSubscribe')}
            loading={loading}
            initialValues={row}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await updateSubscribe({
                  ...row,
                  ...values,
                } as API.UpdateSubscribeRequest);
                toast.success(t('updateSuccess'));
                ref.current?.refresh();
                setLoading(false);
                return true;
              } catch (error) {
                setLoading(false);

                return false;
              }
            }}
          />,
          <DeleteButton
            key='delete'
            trigger={t('delete')}
            title={t('confirmDelete')}
            description={t('deleteWarning')}
            onConfirm={async () => {
              await deleteSubscribe({
                id: row.id,
              });
              toast.success(t('deleteSuccess'));
              ref.current?.refresh();
            }}
            onCancelText={t('cancel')}
            onConfirmText={t('confirm')}
          />,
        ],
        batchRender: (rows) => [
          <DeleteButton
            key='delete'
            trigger={t('delete')}
            title={t('confirmDelete')}
            description={t('deleteWarning')}
            onConfirm={async () => {
              await batchDeleteSubscribe({
                ids: rows.map((item) => item.id),
              });

              toast.success(t('deleteSuccess'));
              ref.current?.reset();
            }}
            onCancelText={t('cancel')}
            onConfirmText={t('confirm')}
          />,
        ],
      }}
    />
  );
}
