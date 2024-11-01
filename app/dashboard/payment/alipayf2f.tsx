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
import { Textarea } from '@/components/ui/textarea';
import { convertToMajorUnit, convertToMinorUnit } from '@/lib';
import { getAlipayF2FPaymentConfig, updateAlipayF2FPaymentConfig } from '@/services/admin/payment';

export default function AlipayF2F() {
  const t = useTranslations('payment');

  const { data, refetch } = useQuery({
    queryKey: ['getAlipayF2FPaymentConfig'],
    queryFn: async () => {
      const { data } = await getAlipayF2FPaymentConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    try {
      await updateAlipayF2FPaymentConfig({
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
              value={data?.icon_url}
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
            <Label>{t('alipayf2f.appId')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              value={data?.config.app_id}
              onBlurValueChange={(value) =>
                updateConfig('config', {
                  ...data?.config,
                  app_id: value,
                })
              }
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('alipayf2f.privateKey')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <Textarea
              placeholder={t('inputPlaceholder')}
              value={data?.config.private_key}
              onBlur={(e) => {
                updateConfig('config', {
                  config: {
                    ...data?.config,
                    private_key: e.target.value,
                  },
                });
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('alipayf2f.publicKey')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <Textarea
              placeholder={t('inputPlaceholder')}
              value={data?.config.public_key}
              onBlur={(e) => {
                updateConfig('config', {
                  config: {
                    ...data?.config,
                    public_key: e.target.value,
                  },
                });
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('alipayf2f.invoiceName')}</Label>
            <p className='text-xs text-muted-foreground' />
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('alipayf2f.invoiceNameDescription')}
              value={data?.config.invoice_name}
              onBlurValueChange={(value) =>
                updateConfig('config', {
                  ...data?.config,
                  invoice_name: value,
                })
              }
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
