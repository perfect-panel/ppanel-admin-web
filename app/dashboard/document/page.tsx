'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { DeleteButton } from '@/components/customize/delete-button';
import { ProTable, ProTableActions } from '@/components/pro-table';
import { Switch } from '@/components/ui/switch';
import { formatDate } from '@/lib';
import {
  batchDeleteDocument,
  createDocument,
  deleteDocument,
  getDocumentList,
  updateDocument,
} from '@/services/admin/document';

import DocumentForm from './document-form';

export default function Page() {
  const t = useTranslations('document');
  const [loading, setLoading] = useState(false);

  const ref = useRef<ProTableActions>();
  return (
    <ProTable<API.Document, { tag: string; search: string }>
      action={ref}
      header={{
        title: t('DocumentList'),
        toolbar: (
          <DocumentForm<API.CreateDocumentRequest>
            key='create'
            trigger={t('create')}
            title={t('createDocument')}
            loading={loading}
            onSubmit={async (values) => {
              setLoading(true);
              try {
                await createDocument({
                  ...values,
                  show: false,
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
      columns={[
        {
          accessorKey: 'show',
          header: t('show'),
          cell: ({ row }) => {
            return (
              <Switch
                defaultChecked={row.getValue('show')}
                onCheckedChange={async (checked) => {
                  // @ts-ignore
                  await updateDocument({
                    ...row.original,
                    show: checked,
                  });
                  ref.current?.refresh();
                }}
              />
            );
          },
        },
        {
          accessorKey: 'title',
          header: t('title'),
        },
        {
          accessorKey: 'tags',
          header: t('tags'),
          cell: ({ row }) => row.original.tags.join(', '),
        },
        {
          accessorKey: 'updated_at',
          header: t('updatedAt'),
          cell: ({ row }) => formatDate(row.getValue('updated_at')),
        },
      ]}
      params={[
        {
          key: 'search',
        },
        {
          key: 'tag',
          placeholder: t('tags'),
        },
      ]}
      request={async (pagination, filter) => {
        const { data } = await getDocumentList({ ...pagination, ...filter });
        return {
          list: data.data?.list || [],
          total: data.data?.total || 0,
        };
      }}
      actions={{
        render(row) {
          return [
            <DocumentForm<API.UpdateDocumentRequest>
              key='edit'
              trigger={t('edit')}
              title={t('editDocument')}
              loading={loading}
              initialValues={row}
              onSubmit={async (values) => {
                setLoading(true);
                try {
                  await updateDocument({
                    ...row,
                    ...values,
                  });
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
              description={t('deleteDescription')}
              onConfirm={async () => {
                await deleteDocument({
                  id: row.id,
                });
                toast.success(t('deleteSuccess'));
                ref.current?.refresh();
              }}
              onCancelText={t('cancel')}
              onConfirmText={t('confirm')}
            />,
          ];
        },
        batchRender(rows) {
          return [
            <DeleteButton
              key='delete'
              trigger={t('delete')}
              title={t('confirmDelete')}
              description={t('deleteDescription')}
              onConfirm={async () => {
                await batchDeleteDocument({
                  ids: rows.map((item) => item.id),
                });
                toast.success(t('deleteSuccess'));
                ref.current?.refresh();
              }}
              onCancelText={t('cancel')}
              onConfirmText={t('confirm')}
            />,
          ];
        },
      }}
    />
  );
}
