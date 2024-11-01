'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { getTelegramConfig, updateTelegramConfig } from '@/services/admin/system';

export default function Telegram() {
  const t = useTranslations('system.telegram');

  const { data, refetch } = useQuery({
    queryKey: ['getTelegramConfig'],
    queryFn: async () => {
      const { data } = await getTelegramConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateTelegramConfig({
        ...data,
        [key]: value,
      } as API.GetTelegramConfigResponse);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('botToken')}</Label>
            <p className='text-xs text-muted-foreground'>{t('botTokenDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholderBotToken')}
              defaultValue={data?.telegram_bot_token}
              onBlurValueChange={(value) => updateConfig('telegram_bot_token', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('enableBotNotifications')}</Label>
            <p className='text-xs text-muted-foreground'>
              {t('enableBotNotificationsDescription')}
            </p>
          </TableCell>
          <TableCell className='text-right'>
            <Switch
              checked={data?.telegram_notify}
              onCheckedChange={(checked) => {
                updateConfig('telegram_notify', checked);
              }}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('groupURL')}</Label>
            <p className='text-xs text-muted-foreground'>{t('groupURLDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('inputPlaceholderGroupURL')}
              defaultValue={data?.telegram_group_url}
              onBlurValueChange={(value) => updateConfig('telegram_group_url', value)}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
