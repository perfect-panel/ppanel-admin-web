'use client';

import { TabsContent } from '@radix-ui/react-tabs';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { FormattedInput } from '@/components/customize/formatted-Input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  createApplication,
  deleteApplication,
  getApplication,
  getSubscribeConfig,
  getSubscribeType,
  updateApplication,
  updateSubscribeConfig,
} from '@/services/admin/system';

function compareData(
  originalData: API.GetApplicationResponse,
  modifiedData: API.GetApplicationResponse,
): {
  added: API.Application[];
  deleted: API.Application[];
  updated: API.Application[];
} {
  const added: API.Application[] = [];
  const deleted: API.Application[] = [];
  const updated: API.Application[] = [];

  const findById = (array: API.Application[], id: number): API.Application | undefined => {
    return array.find((item) => item.id === id);
  };

  const isUpdated = (original: API.Application, modified: API.Application): boolean => {
    return (
      original.name !== modified.name ||
      original.platform !== modified.platform ||
      original.subscribe_type !== modified.subscribe_type ||
      original.url !== modified.url ||
      original.icon !== modified.icon
    );
  };

  Object.values(originalData).forEach((platformData) => {
    platformData.forEach((originalApp) => {
      const modifiedApp = findById(
        modifiedData[originalApp.platform as API.CreateApplicationRequest['platform']],
        originalApp.id,
      );

      if (!modifiedApp) {
        deleted.push(originalApp);
      } else if (isUpdated(originalApp, modifiedApp)) {
        updated.push(modifiedApp);
      }
    });
  });

  Object.values(modifiedData).forEach((platformData) => {
    platformData.forEach((modifiedApp) => {
      if (
        !findById(
          originalData[modifiedApp.platform as API.CreateApplicationRequest['platform']],
          modifiedApp.id,
        )
      ) {
        added.push(modifiedApp);
      }
    });
  });

  return { added, deleted, updated };
}

export default function Subscription() {
  const t = useTranslations('system.subscription');

  const { data, refetch } = useQuery({
    queryKey: ['getSubscribeConfig'],
    queryFn: async () => {
      const { data } = await getSubscribeConfig();

      return data.data;
    },
  });

  const { data: apps, refetch: appsRefetch } = useQuery({
    queryKey: ['getApplication'],
    queryFn: async () => {
      const { data } = await getApplication();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateSubscribeConfig({
        ...data,
        [key]: value,
      } as API.GetSubscribeConfigResponse);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  const { data: subscribe_types } = useQuery<string[]>({
    queryKey: ['getSubscribeType'],
    queryFn: async () => {
      const { data } = await getSubscribeType();

      return data.data?.subscribe_types || [];
    },
  });
  const [app, setApp] = useState<API.GetApplicationResponse>();
  const appTypes = Object.keys(apps || {});

  useEffect(() => {
    if (!app) setApp(apps);
  }, [app, apps]);

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Label>{t('singleSubscriptionMode')}</Label>
              <p className='text-xs text-muted-foreground'>
                {t('singleSubscriptionModeDescription')}
              </p>
            </TableCell>
            <TableCell className='text-right'>
              <Switch
                checked={data?.single_model}
                onCheckedChange={(checked) => {
                  updateConfig('single_model', checked);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>{t('subscriptionDomain')}</Label>
              <p className='text-xs text-muted-foreground'>{t('subscriptionDomainDescription')}</p>
            </TableCell>
            <TableCell className='text-right'>
              <Textarea
                placeholder={t('subscriptionDomainPlaceholder')}
                defaultValue={data?.subscribe_domain}
                onBlur={(e) => {
                  updateConfig('subscribe_domain', e.target.value);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>{t('wildcardResolution')}</Label>
              <p className='text-xs text-muted-foreground'>{t('wildcardResolutionDescription')}</p>
            </TableCell>
            <TableCell className='text-right'>
              <Switch
                checked={data?.pan_domain}
                onCheckedChange={(checked) => {
                  updateConfig('pan_domain', checked);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>{t('subscriptionPath')}</Label>
              <p className='text-xs text-muted-foreground'>{t('subscriptionPathDescription')}</p>
            </TableCell>
            <TableCell className='flex items-center gap-2 text-right'>
              <FormattedInput
                placeholder={t('subscriptionPathPlaceholder')}
                defaultValue={data?.subscribe_path}
                onBlurValueChange={(value) => updateConfig('subscribe_path', value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Label>{t('app')}</Label>
              <p className='text-xs text-muted-foreground'>{t('appDescription')}</p>
            </TableCell>
            <TableCell className='flex justify-end gap-2'>
              <Button
                size='sm'
                variant='outline'
                onClick={() => {
                  setApp(apps);
                }}
              >
                {t('reset')}
              </Button>
              <Button
                size='sm'
                onClick={() => {
                  const { added, deleted, updated } = compareData(apps!, app!);

                  added.forEach(async (item) => {
                    await createApplication(item as API.CreateApplicationRequest);
                  });
                  deleted.forEach(async (item) => {
                    await deleteApplication({
                      id: item.id,
                    });
                  });
                  updated.forEach(async (item) => {
                    await updateApplication(item);
                  });
                  toast.success(t('saveSuccess'));
                  appsRefetch();
                }}
              >
                {t('save')}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Tabs defaultValue='windows'>
        <TabsList className='h-full flex-wrap'>
          {appTypes.map((type) => {
            return (
              <TabsTrigger value={type} key={type} className='uppercase'>
                {type}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {appTypes.map((type) => {
          //@ts-ignore
          const list = (app?.[type] as API.Application[]) || [];
          const updatedList = (key: string, value: string, index: number) => {
            const newList = list.map((item, i) => (i === index ? { ...item, [key]: value } : item));

            setApp({
              ...app,
              [type]: newList,
            } as API.GetApplicationResponse);
          };

          return (
            <TabsContent value={type} key={type} className='mt-4 space-y-4'>
              {list.map((item, index) => {
                return (
                  <div className='flex flex-col items-center gap-2 lg:flex-row' key={index}>
                    <Select
                      value={item.subscribe_type}
                      onValueChange={(value) => {
                        updatedList('subscribe_type', value, index);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('subscriptionProtocol')} />
                      </SelectTrigger>
                      <SelectContent>
                        {subscribe_types?.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormattedInput
                      placeholder={t('appName')}
                      value={item.name}
                      onValueChange={(value) => updatedList('name', value as string, index)}
                    />
                    <FormattedInput
                      placeholder={t('appIcon')}
                      value={item.icon}
                      onValueChange={(value) => updatedList('icon', value as string, index)}
                    />
                    <FormattedInput
                      placeholder={t('appDownloadURL')}
                      value={item.url}
                      onValueChange={(value) => updatedList('url', value as string, index)}
                    />
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => {
                        setApp({
                          ...app,
                          [type]: list.filter((l, i) => i !== index),
                        } as API.GetApplicationResponse);
                      }}
                    >
                      {t('delete')}
                    </Button>
                  </div>
                );
              })}
              <Button
                className='w-full'
                variant='outline'
                onClick={() => {
                  setApp({
                    ...app,
                    [type]: [
                      ...list,
                      {
                        platform: type,
                      },
                    ],
                  } as API.GetApplicationResponse);
                }}
              >
                {t('add')}
              </Button>
            </TabsContent>
          );
        })}
      </Tabs>
    </>
  );
}
