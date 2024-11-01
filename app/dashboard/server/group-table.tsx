'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { DeleteButton } from '@/components/customize/delete-button';
import { ProTable, ProTableActions } from '@/components/pro-table';
import { formatDate } from '@/lib';
import {
  batchDeleteNodeGroup,
  createNodeGroup,
  deleteNodeGroup,
  getNodeGroupList,
  updateNodeGroup,
} from '@/services/admin/server';

import GroupForm from './group-form';

export default function GroupTable() {
  const t = useTranslations('server');
  const [loading, setLoading] = useState(false);
  const ref = useRef<ProTableActions>();

  return (
    <ProTable<API.ServerGroup, any>
      action={ref}
      header={{
        title: t('group.title'),
        toolbar: (
          <GroupForm<API.CreateNodeGroupRequest>
            trigger={t('group.create')}
            title={t('group.createNodeGroup')}
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await createNodeGroup(values);
                toast.success(t('group.createdSuccessfully'));
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
      columns={[
        {
          accessorKey: 'name',
          header: t('group.name'),
        },
        {
          accessorKey: 'description',
          header: t('group.description'),
          cell: ({ row }) => <p className='line-clamp-3'>{row.getValue('description')}</p>,
        },
        {
          accessorKey: 'updated_at',
          header: t('group.updatedAt'),
          cell: ({ row }) => formatDate(row.getValue('updated_at')),
        },
      ]}
      request={async () => {
        const { data } = await getNodeGroupList();
        return {
          list: data.data?.list || [],
          total: data.data?.total || 0,
        };
      }}
      actions={{
        render: (row) => [
          <GroupForm<API.ServerGroup>
            key='edit'
            trigger={t('group.edit')}
            title={t('group.editNodeGroup')}
            loading={loading}
            initialValues={row}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await updateNodeGroup({
                  ...row,
                  ...values,
                });
                toast.success(t('group.createdSuccessfully'));
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
            trigger={t('group.delete')}
            title={t('group.confirmDelete')}
            description={t('group.deleteWarning')}
            onConfirm={async () => {
              await deleteNodeGroup({
                id: row.id!,
              });
              toast.success(t('group.deletedSuccessfully'));
              ref.current?.refresh();
            }}
            onCancelText={t('group.cancel')}
            onConfirmText={t('group.confirm')}
          />,
        ],
        batchRender(rows) {
          return [
            <DeleteButton
              key='delete'
              trigger={t('group.delete')}
              title={t('group.confirmDelete')}
              description={t('group.deleteWarning')}
              onConfirm={async () => {
                await batchDeleteNodeGroup({
                  ids: rows.map((item) => item.id),
                });
                toast.success(t('group.deleteSuccess'));
                ref.current?.refresh();
              }}
              onCancelText={t('group.cancel')}
              onConfirmText={t('group.confirm')}
            />,
          ];
        },
      }}
    />
  );
}
