'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getInviteConfig, updateInviteConfig } from '@/services/admin/system';

export default function Invite() {
  const t = useTranslations('system.invite');

  const { data, refetch } = useQuery({
    queryKey: ['getInviteConfig'],
    queryFn: async () => {
      const { data } = await getInviteConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateInviteConfig({
        ...data,
        [key]: value,
      } as API.UpdateInviteConfigRequest);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('enableForcedInvite')}</Label>
            <p className='text-xs text-muted-foreground'>{t('enableForcedInviteDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.forced_invite}
              onCheckedChange={(checked) => {
                updateConfig('forced_invite', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('inviteCommissionPercentage')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('inviteCommissionPercentageDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              defaultValue={data?.referral_percentage}
              type='number'
              min={0}
              max={100}
              suffix='%'
              onBlurValueChange={(value) => updateConfig('referral_percentage', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('commissionFirstTimeOnly')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('commissionFirstTimeOnlyDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.only_first_purchase}
              onCheckedChange={(checked) => {
                updateConfig('only_first_purchase', checked);
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
