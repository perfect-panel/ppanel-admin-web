import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { assign, shake } from 'radash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Combobox } from '@/components/customize/combobox';
import { DynamicFieldPopover } from '@/components/customize/dynamic-field-list';
import { FormattedInput } from '@/components/customize/formatted-Input';
import { JSONEditor } from '@/components/editor';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  bitsToMegabits,
  bytesToGigabytes,
  convertToMajorUnit,
  convertToMinorUnit,
  gigabytesToBytes,
  megabitsToBits,
} from '@/lib';
import { getNodeGroupList, getNodeList } from '@/services/admin/server';
import { getSubscribeGroupList } from '@/services/admin/subscribe';

interface SubscribeFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

const defaultValues = {
  inventory: -1,
  speed_limit: 0,
  device_limit: 0,
  traffic: 0,
  quota: 0,
  discount: [],
  server_group: [],
  server: [],
};

export default function SubscribeForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: SubscribeFormProps<T>) {
  const t = useTranslations('subscribe');
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    unit_price: z.number(),
    replacement: z.number().optional(),
    discount: z
      .array(
        z.object({
          months: z.number(),
          discount: z.number(),
        }),
      )
      .optional(),
    inventory: z.number().optional(),
    speed_limit: z.number().optional(),
    device_limit: z.number().optional(),
    traffic: z.number().optional(),
    quota: z.number().optional(),
    group_id: z.number().optional().nullish(),
    server_group: z.array(z.number()).optional(),
    server: z.array(z.number()).optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: assign(
      defaultValues,
      shake(initialValues, (value) => value === null) as Record<string, any>,
    ),
  });
  useEffect(() => {
    form?.reset(
      assign(defaultValues, shake(initialValues, (value) => value === null) as Record<string, any>),
    );
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    const bool = await onSubmit(data as T);

    if (bool) setOpen(false);
  }
  const { data: group } = useQuery({
    queryKey: ['getSubscribeGroupList'],
    queryFn: async () => {
      const { data } = await getSubscribeGroupList();
      return data.data?.list as API.SubscribeGroup[];
    },
  });

  const { data: server } = useQuery({
    queryKey: ['getNodeList', 'all'],
    queryFn: async () => {
      const { data } = await getNodeList({
        page: 1,
        size: 9999,
      });
      return data.data?.list;
    },
  });

  const { data: server_groups } = useQuery({
    queryKey: ['getNodeGroupList'],
    queryFn: async () => {
      const { data } = await getNodeGroupList();
      return (data.data?.list || []) as API.ServerGroup[];
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size='sm'
          onClick={() => {
            form.reset();
            setOpen(true);
          }}
        >
          {trigger}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[500px] max-w-full md:max-w-screen-md'>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className='-mx-6 h-[calc(100dvh-48px-36px-36px-env(safe-area-inset-top))]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-6 pt-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.name')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        {...field}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.description')}</FormLabel>
                    <FormControl>
                      <div>
                        <JSONEditor
                          title={t('form.description')}
                          value={field.value}
                          onSave={(value) => {
                            form.setValue(field.name, value);
                          }}
                          placeholder={{
                            description: 'description',
                            features: [
                              {
                                type: 'default',
                                icon: '',
                                label: 'label',
                              },
                              {
                                type: 'success',
                                icon: '',
                                label: 'label',
                              },
                              {
                                type: 'destructive',
                                icon: '',
                                label: 'label',
                              },
                            ],
                          }}
                          schema={{
                            type: 'object',
                            properties: {
                              description: {
                                type: 'string',
                                description: 'A brief description of the item.',
                              },
                              features: {
                                type: 'array',
                                items: {
                                  type: 'object',
                                  properties: {
                                    icon: {
                                      type: 'string',
                                      description:
                                        "Enter an Iconify icon identifier (e.g., 'mdi:account').",
                                      pattern: '^[a-z0-9]+:[a-z0-9-]+$',
                                      examples: [
                                        'uil:shield-check',
                                        'uil:shield-exclamation',
                                        'uil:database',
                                        'uil:server',
                                        'Visit https://icon-sets.iconify.design to browse available icons.',
                                      ],
                                    },
                                    label: {
                                      type: 'string',
                                      description: 'The label describing the feature.',
                                    },
                                    type: {
                                      type: 'string',
                                      enum: ['default', 'success', 'destructive'],
                                      description:
                                        'The type of feature, limited to specific values.',
                                    },
                                  },
                                },
                                description: 'A list of feature objects.',
                              },
                            },
                            required: ['description', 'features'],
                            additionalProperties: false,
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-3 gap-4'>
                <FormField
                  control={form.control}
                  name='unit_price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.unit_price')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          type='number'
                          {...field}
                          min={0}
                          formatInput={convertToMajorUnit}
                          formatOutput={convertToMinorUnit}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='replacement'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.replacement')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          type='number'
                          {...field}
                          min={0}
                          formatInput={convertToMajorUnit}
                          formatOutput={convertToMinorUnit}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='discount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.discount')}</FormLabel>
                      <FormControl>
                        <DynamicFieldPopover<API.SubscribeDiscount>
                          trigger={t('form.discountTrigger')}
                          title={t('form.discount')}
                          description={t('form.discountDescription')}
                          value={field.value}
                          onChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          fields={[
                            {
                              name: 'months',
                              type: 'number',
                              min: 1,
                              suffix: t('form.discountMonths'),
                            },
                            {
                              name: 'discount',
                              type: 'number',
                              min: 1,
                              max: 100,
                              placeholder: t('form.discountPercent'),
                              suffix: '%',
                            },
                          ]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='traffic'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.traffic')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          placeholder={t('form.noLimit')}
                          type='number'
                          {...field}
                          formatInput={bytesToGigabytes}
                          formatOutput={gigabytesToBytes}
                          suffix='GB'
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='speed_limit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.speedLimit')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          placeholder={t('form.noLimit')}
                          type='number'
                          {...field}
                          formatInput={bitsToMegabits}
                          formatOutput={megabitsToBits}
                          suffix='MB'
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='device_limit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.deviceLimit')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          placeholder={t('form.noLimit')}
                          type='number'
                          {...field}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='inventory'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.inventory')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          placeholder={`-1 ${t('form.noLimit')}`}
                          type='number'
                          {...field}
                          min={-1}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='quota'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.quota')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          placeholder={t('form.noLimit')}
                          type='number'
                          {...field}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='group_id'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.subscribeGroup')}</FormLabel>
                      <FormControl>
                        <Combobox<number, false>
                          placeholder={t('form.selectSubscribeGroup')}
                          {...field}
                          onChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          options={group?.map((item) => ({
                            label: item.name,
                            value: item.id,
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='server_group'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.serverGroup')}</FormLabel>
                      <FormControl>
                        <Accordion type='single' collapsible className='w-full'>
                          {server_groups?.map((group: API.ServerGroup) => {
                            const value = field.value || [];

                            return (
                              <AccordionItem key={group.id} value={String(group.id)}>
                                <AccordionTrigger>
                                  <div className='flex items-center gap-2'>
                                    <Checkbox
                                      checked={value.includes(group.id!)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? form.setValue(field.name, [...value, group.id])
                                          : form.setValue(
                                              field.name,
                                              value.filter((value: number) => value !== group.id),
                                            );
                                      }}
                                    />
                                    <Label>{group.name}</Label>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <ul className='list-disc [&>li]:mt-2'>
                                    {server
                                      ?.filter((server: API.Server) => server.groupId === group.id)
                                      ?.map((node: API.Server) => {
                                        return (
                                          <li
                                            key={node.id}
                                            className='flex items-center justify-between *:flex-1'
                                          >
                                            <span>{node.name}</span>
                                            <span>{node.server_addr}</span>
                                            <span className='text-right'>{node.protocol}</span>
                                          </li>
                                        );
                                      })}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='server'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.server')}</FormLabel>
                      <FormControl>
                        <div className='flex flex-col gap-2'>
                          {server
                            ?.filter((item: API.Server) => !item.groupId)
                            ?.map((item: API.Server) => {
                              const value = field.value || [];

                              return (
                                <div className='flex items-center gap-2' key={item.id}>
                                  <Checkbox
                                    checked={value.includes(item.id!)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? form.setValue(field.name, [...value, item.id])
                                        : form.setValue(
                                            field.name,
                                            value.filter((value: number) => value !== item.id),
                                          );
                                    }}
                                  />
                                  <Label className='flex w-full items-center justify-between *:flex-1'>
                                    <span>{item.name}</span>
                                    <span>{item.server_addr}</span>
                                    <span className='text-right'>{item.protocol}</span>
                                  </Label>
                                </div>
                              );
                            })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <SheetFooter className='flex-row justify-end gap-2 pt-3'>
          <Button
            variant='outline'
            disabled={loading}
            onClick={() => {
              setOpen(false);
            }}
          >
            {t('form.cancel')}
          </Button>
          <Button disabled={loading} onClick={form.handleSubmit(handleSubmit)}>
            {loading && <Icon icon='mdi:loading' className='mr-2 animate-spin' />}{' '}
            {t('form.confirm')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
