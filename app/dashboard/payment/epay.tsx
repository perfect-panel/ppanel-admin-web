'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { convertToMajorUnit, convertToMinorUnit } from '@/lib';
import { getEpayPaymentConfig, updateEpayPaymentConfig } from '@/services/admin/payment';

export default function Epay() {
  const t = useTranslations('payment');

  const { data, refetch } = useQuery({
    queryKey: ['getEpayPaymentConfig'],
    queryFn: async () => {
      const { data } = await getEpayPaymentConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    try {
      await updateEpayPaymentConfig({
        ...data,
        [key]: value,
      } as API.PaymentConfig);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('enable')}</Label>
            <p className='text-xs text-muted-foreground'>{t('enableDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable}
              onCheckedChange={(checked) => {
                updateConfig('enable', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('showName')}</Label>
            <p className='text-xs text-muted-foreground'>{t('showNameDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.name}
              onBlurValueChange={(value) => updateConfig('name', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('iconUrl')}</Label>
            <p className='text-xs text-muted-foreground'>{t('iconUrlDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.icon}
              onBlurValueChange={(value) => updateConfig('icon', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('notifyUrl')}</Label>
            <p className='text-xs text-muted-foreground'>{t('notifyUrlDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.domain}
              onBlurValueChange={(value) => updateConfig('domain', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('feeMode')}</Label>
            <p className='text-xs text-muted-foreground'>{t('feeModeDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Select
              value={String(data?.fee_mode)}
              onValueChange={(value) => {
                updateConfig('fee_mode', Number(value));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder='请选择' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='0'>{t('feeModeItems.0')}</SelectItem>
                  <SelectItem value='1'>{t('feeModeItems.1')}</SelectItem>
                  <SelectItem value='2'>{t('feeModeItems.2')}</SelectItem>
                  <SelectItem value='3'>{t('feeModeItems.3')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('feePercent')}</Label>
            <p className='text-xs text-muted-foreground'>{t('feePercentDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              type='number'
              min={0}
              max={100}
              maxLength={3}
              value={data?.fee_percent}
              onBlurValueChange={(value) => updateConfig('fee_percent', value)}
              suffix='%'
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('fixedFee')}</Label>
            <p className='text-xs text-muted-foreground'>{t('fixedFeeDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              type='number'
              min={0}
              value={data?.fee_amount}
              formatInput={convertToMajorUnit}
              formatOutput={convertToMinorUnit}
              onBlurValueChange={(value) => updateConfig('fee_amount', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('epay.url')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.config.url}
              onBlurValueChange={(value) =>
                updateConfig('config', {
                  ...data?.config,
                  url: value,
                })
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('epay.pid')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.config.pid}
              onBlurValueChange={(value) =>
                updateConfig('config', {
                  ...data?.config,
                  pid: value,
                })
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('epay.key')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.config.key}
              onBlurValueChange={(value) =>
                updateConfig('config', {
                  ...data?.config,
                  key: value,
                })
              }
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
