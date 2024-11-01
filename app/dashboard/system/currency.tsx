'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getCurrencyConfig, updateCurrencyConfig } from '@/services/admin/system';

export default function Site() {
  const t = useTranslations('system.currency');

  const { data, refetch } = useQuery({
    queryKey: ['getCurrencyConfig'],
    queryFn: async () => {
      const { data } = await getCurrencyConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    if (data?.[key] === value) return;
    try {
      await updateCurrencyConfig({
        ...data,
        [key]: value,
      } as API.UpdateCurrencyConfigRequest);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('accessKey')}</Label>
            <p className='text-xs text-muted-foreground'>{t('accessKeyDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              defaultValue={data?.access_key}
              onBlurValueChange={(value) => updateConfig('access_key', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('currencyUnit')}</Label>
            <p className='text-xs text-muted-foreground'>{t('currencyUnitDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder='USD'
              defaultValue={data?.currency_unit}
              onBlurValueChange={(value) => updateConfig('currency_unit', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('currencySymbol')}</Label>
            <p className='text-xs text-muted-foreground'>{t('currencySymbolDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder='$'
              defaultValue={data?.currency_symbol}
              onBlurValueChange={(value) => updateConfig('currency_symbol', value)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
