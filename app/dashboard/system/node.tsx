'use client';

import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { nanoid } from 'nanoid';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getNodeConfig, updateNodeConfig } from '@/services/admin/system';

export default function Node() {
  const t = useTranslations('system.node');

  const { data, refetch } = useQuery({
    queryKey: ['getNodeConfig'],
    queryFn: async () => {
      const { data } = await getNodeConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateNodeConfig({
        ...data,
        [key]: value,
      } as API.GetNodeConfigResponse);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('communicationKey')}</Label>
            <p className='text-xs text-muted-foreground'>{t('communicationKeyDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.node_secret}
              onBlurValueChange={(value) => updateConfig('node_secret', value)}
              suffix={
                <Icon
                  icon='uil:arrow-random'
                  onClick={() => {
                    updateConfig('node_secret', nanoid());
                  }}
                />
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('nodePullInterval')}</Label>
            <p className='text-xs text-muted-foreground'>{t('nodePullIntervalDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              type='number'
              min={0}
              onBlurValueChange={(value) => updateConfig('node_pull_interval', value)}
              suffix='S'
              value={data?.node_pull_interval}
              placeholder={t('inputPlaceholder')}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('nodePushInterval')}</Label>
            <p className='text-xs text-muted-foreground'>{t('nodePushIntervalDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              type='number'
              min={0}
              value={data?.node_push_interval}
              onBlurValueChange={(value) => updateConfig('node_push_interval', value)}
              placeholder={t('inputPlaceholder')}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
