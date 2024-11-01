'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { HTMLEditor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getEmailSmtpConfig, testEmailSmtp, updateEmailSmtpConfig } from '@/services/admin/system';

export default function Email() {
  const t = useTranslations('system.email');
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['getEmailSmtpConfig'],
    queryFn: async () => {
      const { data } = await getEmailSmtpConfig();
      return data.data;
    },
  });

  const [email, setEmail] = useState<string>();

  async function updateConfig(key: string, value: unknown) {
    if (data?.[key] === value) return;
    try {
      await updateEmailSmtpConfig({
        ...data,
        [key]: value,
      } as API.UpdateEmailSmtpConfigRequest);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        {[
          {
            key: 'email_smtp_host',
            label: t('smtpServerAddress'),
            description: t('smtpServerAddressDescription'),
          },
          {
            key: 'email_smtp_port',
            label: t('smtpServerPort'),
            description: t('smtpServerPortDescription'),
            type: 'number',
          },
          {
            key: 'email_smtp_ssl',
            label: t('smtpEncryptionMethod'),
            description: t('smtpEncryptionMethodDescription'),
            component: 'switch',
          },
          {
            key: 'email_smtp_user',
            label: t('smtpAccount'),
            description: t('smtpAccountDescription'),
          },
          {
            key: 'email_smtp_pass',
            label: t('smtpPassword'),
            description: t('smtpPasswordDescription'),
            type: 'password',
          },
          {
            key: 'email_smtp_from',
            label: t('senderAddress'),
            description: t('senderAddressDescription'),
          },
        ].map(({ key, label, description, type = 'text', component = 'input' }) => (
          <TableRow key={key}>
            <TableCell>
              <Label>{label}</Label>
              <p className='text-xs text-muted-foreground'>{description}</p>
            </TableCell>
            <TableCell className='text-right'>
              {component === 'input' ? (
                <FormattedInput
                  placeholder={t('inputPlaceholder')}
                  defaultValue={data?.[key]}
                  type={type}
                  onBlurValueChange={(value) => updateConfig(key, value)}
                />
              ) : (
                <Switch
                  checked={data?.[key]}
                  onCheckedChange={(checked) => updateConfig(key, checked)}
                />
              )}
            </TableCell>
          </TableRow>
        ))}

        {['verify_email_template', 'expiration_email_template', 'maintenance_email_template'].map(
          (templateKey) => (
            <TableRow key={templateKey}>
              <TableCell>
                <Label>{t(`${templateKey}`)}</Label>
                <p className='text-xs text-muted-foreground'>
                  {t(`${templateKey}Description`, { after: '{{', before: '}}' })}
                </p>
              </TableCell>
              <TableCell className='text-right'>
                <HTMLEditor
                  title={t(`${templateKey}`)}
                  placeholder={t('inputPlaceholder')}
                  value={data?.[templateKey]}
                  onSave={async (value) => {
                    await updateConfig(templateKey, value);
                    return true;
                  }}
                />
              </TableCell>
            </TableRow>
          ),
        )}

        <TableRow>
          <TableCell>
            <Label>{t('sendTestEmail')}</Label>
            <p className='text-xs text-muted-foreground'>{t('sendTestEmailDescription')}</p>
          </TableCell>
          <TableCell className='flex items-center gap-2 text-right'>
            <FormattedInput<string>
              placeholder={t('inputPlaceholder')}
              value={email}
              onValueChange={setEmail}
            />
            <Button
              disabled={!email}
              onClick={async () => {
                if (isFetching || !email) return;
                try {
                  await testEmailSmtp({ email });
                  toast.success(t('sendSuccess'));
                } catch {
                  toast.error(t('sendFailure'));
                }
              }}
            >
              {t('sendTestEmail')}
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
