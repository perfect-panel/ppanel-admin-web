'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { getSiteConfig, updateSiteConfig } from '@/services/admin/system';

export default function Site() {
  const t = useTranslations('system.site');

  const { data, refetch } = useQuery({
    queryKey: ['getSiteConfig'],
    queryFn: async () => {
      const { data } = await getSiteConfig();
      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateSiteConfig({
        ...data,
        [key]: value,
      } as API.SiteConfig);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <Label>{t('logo')}</Label>
            <p className='text-xs text-muted-foreground'>{t('logoDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('logoPlaceholder')}
              defaultValue={data?.site_logo}
              onBlurValueChange={(value) => updateConfig('site_logo', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('siteName')}</Label>
            <p className='text-xs text-muted-foreground'>{t('siteNameDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('siteNamePlaceholder')}
              defaultValue={data?.site_name}
              onBlurValueChange={(value) => updateConfig('site_name', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('siteDesc')}</Label>
            <p className='text-xs text-muted-foreground'>{t('siteDescDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <FormattedInput
              placeholder={t('siteDescPlaceholder')}
              defaultValue={data?.site_desc}
              onBlurValueChange={(value) => updateConfig('site_desc', value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Label>{t('siteDomain')}</Label>
            <p className='text-xs text-muted-foreground'>{t('siteDomainDescription')}</p>
          </TableCell>
          <TableCell className='text-right'>
            <Textarea
              placeholder={t('siteDomainPlaceholder')}
              defaultValue={data?.host}
              onBlur={(e) => {
                updateConfig('host', e.target.value);
              }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
