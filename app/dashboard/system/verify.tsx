'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getVerifyConfig, updateVerifyConfig } from '@/services/admin/system';

export default function Verify() {
  const t = useTranslations('system.verify');

  const { data, refetch } = useQuery({
    queryKey: ['getVerifyConfig'],
    queryFn: async () => {
      const { data } = await getVerifyConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateVerifyConfig({
        ...data,
        [key]: value,
      } as API.GetVerifyConfigResponse);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('turnstileSiteKey')}</Label>
            <p className='text-xs text-muted-foreground'>{t('turnstileSiteKeyDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              defaultValue={data?.turnstile_site_key}
              onBlurValueChange={(value) => updateConfig('turnstile_site_key', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('turnstileSecret')}</Label>
            <p className='text-xs text-muted-foreground'>{t('turnstileSecretDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholder')}
              defaultValue={data?.turnstile_secret}
              onBlurValueChange={(value) => updateConfig('turnstile_secret', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('registrationVerificationCode')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('registrationVerificationCodeDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_register_verify}
              onCheckedChange={(checked) => {
                updateConfig('enable_register_verify', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('loginVerificationCode')}</Label>
            <p className='text-xs text-muted-foreground'>{t('loginVerificationCodeDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_login_verify}
              onCheckedChange={(checked) => {
                updateConfig('enable_login_verify', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('resetPasswordVerificationCode')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('resetPasswordVerificationCodeDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_reset_password_verify}
              onCheckedChange={(checked) => {
                updateConfig('enable_reset_password_verify', checked);
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
