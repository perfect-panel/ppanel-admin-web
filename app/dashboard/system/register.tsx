'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { getRegisterConfig, updateRegisterConfig } from '@/services/admin/system';

export default function Register() {
  const t = useTranslations('system.register');

  const { data, refetch } = useQuery({
    queryKey: ['getRegisterConfig'],
    queryFn: async () => {
      const { data } = await getRegisterConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateRegisterConfig({
        ...data,
        [key]: value,
      } as API.GetRegisterConfigResponse);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('stopNewUserRegistration')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('stopNewUserRegistrationDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.stop_register}
              onCheckedChange={(checked) => {
                updateConfig('stop_register', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('emailVerification')}</Label>
            <p className='text-xs text-muted-foreground'>{t('emailVerificationDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_email_verify}
              onCheckedChange={(checked) => {
                updateConfig('enable_email_verify', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('emailSuffixWhitelist')}</Label>
            <p className='text-xs text-muted-foreground'>{t('emailSuffixWhitelistDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_email_domain_suffix}
              onCheckedChange={(checked) => {
                updateConfig('enable_email_domain_suffix', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('whitelistSuffixes')}</Label>
            <p className='text-xs text-muted-foreground'>{t('whitelistSuffixesDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Textarea
              placeholder={t('whitelistSuffixesPlaceholder')}
              defaultValue={data?.email_domain_suffix_list}
              onBlur={(e) => {
                updateConfig('email_domain_suffix_list', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('ipRegistrationLimit')}</Label>
            <p className='text-xs text-muted-foreground'>{t('ipRegistrationLimitDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_ip_register_limit}
              onCheckedChange={(checked) => {
                updateConfig('enable_ip_register_limit', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('registrationLimitCount')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('registrationLimitCountDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              type='number'
              min={0}
              defaultValue={data?.ip_register_limit}
              onBlurValueChange={(value) => updateConfig('ip_register_limit', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('penaltyTime')}</Label>
            <p className='text-xs text-muted-foreground'>{t('penaltyTimeDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              type='number'
              min={0}
              defaultValue={data?.ip_register_limit_duration}
              onBlurValueChange={(value) => updateConfig('ip_register_limit_duration', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('trialRegistration')}</Label>
            <p className='text-xs text-muted-foreground'>{t('trialRegistrationDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.enable_trial}
              onCheckedChange={(checked) => {
                updateConfig('enable_trial', checked);
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
