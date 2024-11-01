'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Combobox } from '@/components/customize/combobox';
import { FormattedInput } from '@/components/customize/formatted-Input';
import { JSONEditor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bitsToMegabits, megabitsToBits } from '@/lib';
import { getNodeGroupList } from '@/services/admin/server';

const shadowsocksSchema = z.object({
  method: z.string(),
  port: z.number(),
  enable_relay: z.boolean().nullish(),
  relay_host: z.string().nullish(),
  relay_port: z.number().nullish(),
});

const vmessSchema = z.object({
  host: z.string(),
  port: z.number(),
  enable_tls: z.boolean().nullable(),
  tls_config: z.any().nullable(),
  network: z.string(),
  transport: z.any().nullable(),
  enable_relay: z.boolean().nullish(),
  relay_host: z.string().nullish(),
  relay_port: z.number().nullish(),
});

const vlessSchema = z.object({
  host: z.string(),
  port: z.number(),
  network: z.string(),
  transport: z.any().nullable(),
  security: z.string(),
  security_config: z.any().nullable(),
  xtls: z.string().nullish(),
  enable_relay: z.boolean().nullish(),
  relay_host: z.string().nullish(),
  relay_port: z.number().nullish(),
});

const trojanSchema = z.object({
  host: z.string(),
  port: z.number(),
  network: z.string(),
  sni: z.string().nullish(),
  allow_insecure: z.boolean().nullable(),
  transport: z.any().nullable(),
  enable_relay: z.boolean().nullish(),
  relay_host: z.string().nullish(),
  relay_port: z.number().nullish(),
});

const formSchema = z.object({
  name: z.string(),
  server_addr: z.string(),
  speed_limit: z.number().nullish(),
  traffic_ratio: z.number(),
  groupId: z.number().nullish(),
  protocol: z.enum(['shadowsocks', 'vmess', 'vless', 'trojan']),
  vmess: vmessSchema.nullish(),
  vless: vlessSchema.nullish(),
  trojan: trojanSchema.nullish(),
  shadowsocks: shadowsocksSchema.nullish(),
});

interface NodeFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function NodeForm<T extends { [x: string]: any }>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: NodeFormProps<T>) {
  const t = useTranslations('server.node');

  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      traffic_ratio: 1,
      protocol: 'shadowsocks',

      ...initialValues,
    } as any,
  });
  const protocol = form.watch('protocol');
  const vmessNetwork = form.watch('vmess.network');
  const vlessNetwork = form.watch('vless.network');
  const trojanNetwork = form.watch('trojan.network');

  useEffect(() => {
    form?.reset(initialValues);
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    let newData = {};
    switch (data.protocol) {
      case 'vmess':
        newData = {
          tls_config: {},
          transport: {},
          enable_tls: false,
          enable_relay: false,
        };
        break;
      case 'vless':
        newData = {
          security_config: {},
          transport: {},
          enable_tls: false,
          enable_relay: false,
        };
        break;
      case 'trojan':
        newData = {
          transport: {},
          allow_insecure: false,
          enable_tls: false,
          enable_relay: false,
        };
        break;
    }
    const bool = await onSubmit({
      ...newData,
      ...data,
    } as unknown as T);

    if (bool) setOpen(false);
  }

  const { data: groups } = useQuery({
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
            <form className='grid grid-cols-1 gap-2 px-6 pt-4'>
              <div className='grid grid-cols-2 gap-2'>
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
                  name='groupId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.nodeGroupId')}</FormLabel>
                      <FormControl>
                        <Combobox<number, false>
                          placeholder={t('form.selectNodeGroup')}
                          {...field}
                          options={groups?.map((item) => ({
                            value: item.id,
                            label: item.name,
                          }))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-3 gap-2'>
                <FormField
                  control={form.control}
                  name='server_addr'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.serverAddr')}</FormLabel>
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
                  name='speed_limit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.speedLimit')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          type='number'
                          {...field}
                          placeholder={t('form.speedLimitPlaceholder')}
                          formatInput={bitsToMegabits}
                          formatOutput={megabitsToBits}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          suffix='MB'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='traffic_ratio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.trafficRatio')}</FormLabel>
                      <FormControl>
                        <FormattedInput
                          {...field}
                          type='number'
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          suffix='X'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='protocol'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.protocol')}</FormLabel>
                    <FormControl>
                      <Tabs
                        value={field.value}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                          const protocols = ['shadowsocks', 'vmess', 'vless', 'trojan'];
                          protocols.forEach((proto) => {
                            if (proto !== value) {
                              form.setValue(proto, undefined);
                            }
                          });
                          const host = form.getValues().server_addr;
                          if (value !== 'shadowsocks') form.setValue(`${value}.host`, host);
                          if (value === 'vless') {
                            form.setValue('vless.security', 'none');
                            form.setValue('vless.xtls', 'none');
                          }
                        }}
                      >
                        <TabsList className='w-full flex-wrap *:flex-1'>
                          <TabsTrigger value='shadowsocks'>Shadowsocks</TabsTrigger>
                          <TabsTrigger value='vmess'>Vmess</TabsTrigger>
                          <TabsTrigger value='vless'>Vless</TabsTrigger>
                          <TabsTrigger value='trojan'>Trojan</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {protocol === 'shadowsocks' && (
                <div className='grid grid-cols-2 gap-2'>
                  <FormField
                    control={form.control}
                    name='shadowsocks.method'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.encryptionMethod')}</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('form.selectEncryptionMethod')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='aes-128-gcm'>aes-128-gcm</SelectItem>
                              <SelectItem value='aes-192-gcm'>aes-192-gcm</SelectItem>
                              <SelectItem value='aes-256-gcm'>aes-256-gcm</SelectItem>
                              <SelectItem value='chacha20-ietf-poly1305'>
                                chacha20-ietf-poly1305
                              </SelectItem>
                              <SelectItem value='2022-blake3-aes-128-gcm'>
                                2022-blake3-aes-128-gcm
                              </SelectItem>
                              <SelectItem value='2022-blake3-aes-256-gcm'>
                                2022-blake3-aes-256-gcm
                              </SelectItem>
                              <SelectItem value='2022-blake3-chacha20-poly1305'>
                                2022-blake3-chacha20-poly1305
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='shadowsocks.port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.port')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
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
                    name='shadowsocks.enable_relay'
                    render={({ field }) => (
                      <FormItem className='col-span-3'>
                        <FormLabel>{t('form.enableRelay')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='shadowsocks.relay_host'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayHost')}</FormLabel>
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
                    name='shadowsocks.relay_port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayPort')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {protocol === 'vmess' && (
                <div className='grid grid-cols-3 gap-2'>
                  <FormField
                    control={form.control}
                    name='vmess.host'
                    render={({ field }) => (
                      <FormItem className='col-span-2'>
                        <FormLabel>{t('form.Host Name')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            placeholder={t('form.Address or IP')}
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
                    name='vmess.port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.port')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
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
                    name='vmess.enable_tls'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.enableTls')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vmess.tls_config.server_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.serverName')}</FormLabel>
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
                    name='vmess.tls_config.allow_insecure'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.allowInsecure')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name='vmess.network'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.networkType')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                              form.setValue('vmess.transport', undefined);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('form.networkType')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='tcp'>TCP</SelectItem>
                              <SelectItem value='websocket'>WebSocket</SelectItem>
                              <SelectItem value='grpc'>gRPC</SelectItem>
                              <SelectItem value='quic'>QUIC</SelectItem>
                              <SelectItem value='mkcp'>mkcp</SelectItem>
                              <SelectItem value='httpupgrade'>HTTPUPgrade</SelectItem>
                              <SelectItem value='splithttp'>SplitHTTP</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vmess.transport'
                    render={({ field }) => {
                      const placeholders: any = {
                        tcp: {
                          header: {
                            type: 'http',
                            request: {
                              path: ['/'],
                              headers: {
                                Host: ['www.baidu.com', 'www.bing.com'],
                              },
                            },
                            response: {},
                          },
                        },
                        websocket: {
                          path: '/',
                          headers: {
                            Host: 'ppanel.dev',
                          },
                        },
                        grpc: {
                          serviceName: 'GunService',
                        },
                        quic: {
                          security: 'none',
                          key: '',
                          header: {
                            type: 'none',
                          },
                        },
                        mkcp: {
                          header: {
                            type: 'none',
                          },
                          seed: '',
                        },
                        httpupgrade: {
                          path: '/',
                          host: 'xtls.github.io',
                        },
                        splithttp: {
                          path: '/',
                          host: 'xtls.github.io',
                        },
                      };
                      return (
                        <FormItem>
                          <FormLabel>{t('form.transport')}</FormLabel>
                          <FormControl>
                            <div>
                              <JSONEditor
                                title={t('form.transport')}
                                trigger={t('form.editTransport')}
                                placeholder={placeholders[vmessNetwork]}
                                value={JSON.stringify(field.value, null, 2)}
                                onSave={(value) => {
                                  form.setValue(field.name, value);
                                  return true;
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='vmess.enable_relay'
                    render={({ field }) => (
                      <FormItem className='col-span-3'>
                        <FormLabel>{t('form.enableRelay')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vmess.relay_host'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayHost')}</FormLabel>
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
                    name='vmess.relay_port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayPort')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {protocol === 'vless' && (
                <div className='grid grid-cols-3 gap-2'>
                  <FormField
                    control={form.control}
                    name='vless.host'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.Host Name')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            placeholder={t('form.Address or IP')}
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
                    name='vless.port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.port')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
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
                    name='vless.security'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t('form.security')}
                          {field.value && field.value !== 'none' && (
                            <Sheet>
                              <SheetTrigger asChild>
                                <a className='ml-2 cursor-pointer text-primary'>{t('form.edit')}</a>
                              </SheetTrigger>
                              <SheetContent className='p-4'>
                                <SheetHeader>
                                  <SheetTitle>{t('form.editSecurity')}</SheetTitle>
                                </SheetHeader>
                                <div className='grid grid-cols-1 gap-2 pt-4'>
                                  {field.value === 'tls' && (
                                    <>
                                      <FormField
                                        control={form.control}
                                        name='vless.security_config.server_name'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.serverName')}
                                            </FormLabel>
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
                                        name='vless.security_config.fingerprint'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.fingerprint')}
                                            </FormLabel>
                                            <Select
                                              value={field.value}
                                              onValueChange={(value) => {
                                                form.setValue(field.name, value);
                                              }}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder={t('form.security')} />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value='chrome'>Chrome</SelectItem>
                                                <SelectItem value='firefox'>Firefox</SelectItem>
                                                <SelectItem value='safari'>Safari</SelectItem>
                                                <SelectItem value='ios'>IOS</SelectItem>
                                                <SelectItem value='android'>Android</SelectItem>
                                                <SelectItem value='edge'>edge</SelectItem>
                                                <SelectItem value='360'>360</SelectItem>
                                                <SelectItem value='qq'>QQ</SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name='vless.security_config.allow_insecure'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>{t('form.allowInsecure')}</FormLabel>
                                            <FormControl>
                                              <div className='pt-2'>
                                                <Switch
                                                  checked={!!field.value}
                                                  onCheckedChange={(value) => {
                                                    form.setValue(field.name, value);
                                                  }}
                                                />
                                              </div>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </>
                                  )}
                                  {field.value === 'reality' && (
                                    <>
                                      <FormField
                                        control={form.control}
                                        name='vless.security_config.server_name'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.serverName')}
                                            </FormLabel>
                                            <FormControl>
                                              <FormattedInput
                                                {...field}
                                                placeholder={t(
                                                  'form.security_config.serverNamePlaceholder',
                                                )}
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
                                        name='vless.security_config.server_address'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.serverAddress')}
                                            </FormLabel>
                                            <FormControl>
                                              <FormattedInput
                                                {...field}
                                                placeholder={t(
                                                  'form.security_config.serverAddressPlaceholder',
                                                )}
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
                                        name='vless.security_config.server_port'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.serverPort')}
                                            </FormLabel>
                                            <FormControl>
                                              <FormattedInput
                                                {...field}
                                                type='number'
                                                placeholder={t(
                                                  'form.security_config.serverPortPlaceholder',
                                                )}
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
                                        name='vless.security_config.proxy_protocol'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.proxyProtocol')}
                                            </FormLabel>
                                            <Select
                                              value={field.value}
                                              onValueChange={(value) => {
                                                form.setValue(field.name, value);
                                              }}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder={t('form.security')} />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value='0'>0</SelectItem>
                                                <SelectItem value='1'>1</SelectItem>
                                                <SelectItem value='2'>2</SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name='vless.security_config.private_key'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.privateKey')}
                                            </FormLabel>
                                            <FormControl>
                                              <FormattedInput
                                                {...field}
                                                placeholder={t(
                                                  'form.security_config.privateKeyPlaceholder',
                                                )}
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
                                        name='vless.security_config.public_key'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.publicKey')}
                                            </FormLabel>
                                            <FormControl>
                                              <FormattedInput
                                                {...field}
                                                placeholder={t(
                                                  'form.security_config.publicKeyPlaceholder',
                                                )}
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
                                        name='vless.security_config.short_id'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.shortId')}
                                            </FormLabel>
                                            <FormControl>
                                              <FormattedInput
                                                {...field}
                                                placeholder={t(
                                                  'form.security_config.shortIdPlaceholder',
                                                )}
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
                                        name='vless.security_config.fingerprint'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              {t('form.security_config.fingerprint')}
                                            </FormLabel>
                                            <Select
                                              value={field.value}
                                              onValueChange={(value) => {
                                                form.setValue(field.name, value);
                                              }}
                                            >
                                              <FormControl>
                                                <SelectTrigger>
                                                  <SelectValue placeholder={t('form.security')} />
                                                </SelectTrigger>
                                              </FormControl>
                                              <SelectContent>
                                                <SelectItem value='chrome'>Chrome</SelectItem>
                                                <SelectItem value='firefox'>Firefox</SelectItem>
                                                <SelectItem value='safari'>Safari</SelectItem>
                                                <SelectItem value='ios'>IOS</SelectItem>
                                                <SelectItem value='android'>Android</SelectItem>
                                                <SelectItem value='edge'>edge</SelectItem>
                                                <SelectItem value='360'>360</SelectItem>
                                                <SelectItem value='qq'>QQ</SelectItem>
                                              </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name='vless.security_config.allow_insecure'
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>{t('form.allowInsecure')}</FormLabel>
                                            <FormControl>
                                              <div className='pt-2'>
                                                <Switch
                                                  checked={!!field.value}
                                                  onCheckedChange={(value) => {
                                                    form.setValue(field.name, value);
                                                  }}
                                                />
                                              </div>
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                    </>
                                  )}
                                </div>
                              </SheetContent>
                            </Sheet>
                          )}
                        </FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                            switch (value) {
                              case 'none':
                                form.setValue('vless.security_config', undefined);
                                break;
                              case 'tls':
                                form.setValue('vless.security_config', {
                                  proxy_protocol: '0',
                                  fingerprint: 'chrome',
                                });
                                break;
                              case 'reality':
                                form.setValue('vless.security_config', {
                                  proxy_protocol: '0',
                                  fingerprint: 'chrome',
                                });
                                break;
                              default:
                                break;
                            }
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={t('form.security')} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='none'>none</SelectItem>
                            <SelectItem value='tls'>TLS</SelectItem>
                            <SelectItem value='reality'>Reality</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vless.network'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.networkType')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                              form.setValue('vless.transport', undefined);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('form.networkType')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='tcp'>TCP</SelectItem>
                              <SelectItem value='websocket'>WebSocket</SelectItem>
                              <SelectItem value='grpc'>gRPC</SelectItem>
                              <SelectItem value='http2'>HTTP/2</SelectItem>
                              <SelectItem value='quic'>QUIC</SelectItem>
                              <SelectItem value='mkcp'>mkcp</SelectItem>
                              <SelectItem value='httpupgrade'>HTTPUPgrade</SelectItem>
                              <SelectItem value='splithttp'>SplitHTTP</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vless.transport'
                    render={({ field }) => {
                      const placeholders: any = {
                        tcp: {
                          header: {
                            type: 'http',
                            request: {
                              path: ['/'],
                              headers: {
                                Host: ['www.baidu.com', 'www.bing.com'],
                              },
                            },
                            response: {},
                          },
                        },
                        websocket: {
                          path: '/',
                          headers: {
                            Host: 'ppanel.dev',
                          },
                        },
                        grpc: {
                          serviceName: 'GunService',
                        },
                        http2: {
                          path: '/',
                          host: 'xtls.github.io',
                        },
                        quic: {
                          security: 'none',
                          key: '',
                          header: {
                            type: 'none',
                          },
                        },
                        mkcp: {
                          header: {
                            type: 'none',
                          },
                          seed: '',
                        },
                        httpupgrade: {
                          path: '/',
                          host: 'xtls.github.io',
                        },
                        splithttp: {
                          path: '/',
                          host: 'xtls.github.io',
                        },
                      };
                      return (
                        <FormItem>
                          <FormLabel>{t('form.transport')}</FormLabel>
                          <FormControl>
                            <div>
                              <JSONEditor
                                title={t('form.transport')}
                                trigger={t('form.editTransport')}
                                placeholder={placeholders[vlessNetwork]}
                                value={JSON.stringify(field.value, null, 2)}
                                onSave={(value) => {
                                  form.setValue(field.name, value);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='vless.xtls'
                    render={({ field }) => (
                      <FormItem className='col-span-3'>
                        <FormLabel>{t('form.xtls')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('form.xtls')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='none'>none</SelectItem>
                              <SelectItem value='xtls-rprx-vision'>xtls-rprx-vision</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vless.enable_relay'
                    render={({ field }) => (
                      <FormItem className='col-span-3'>
                        <FormLabel>{t('form.enableRelay')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='vless.relay_host'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayHost')}</FormLabel>
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
                    name='vless.relay_port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayPort')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {protocol === 'trojan' && (
                <div className='grid grid-cols-3 gap-2'>
                  <FormField
                    control={form.control}
                    name='trojan.host'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.Host Name')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            placeholder={t('form.Address or IP')}
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
                    name='trojan.port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.port')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
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
                    name='trojan.allow_insecure'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.allowInsecure')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='trojan.sni'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.sni')}</FormLabel>
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
                    name='trojan.network'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.networkType')}</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                              form.setValue('trojan.transport', undefined);
                            }}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t('form.networkType')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='tcp'>TCP</SelectItem>
                              <SelectItem value='websocket'>WebSocket</SelectItem>
                              <SelectItem value='grpc'>gRPC</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='trojan.transport'
                    render={({ field }) => {
                      const placeholders: any = {
                        tcp: {},
                        websocket: {
                          path: '/',
                          headers: {
                            Host: 'ppanel.dev',
                          },
                        },
                        grpc: {
                          serviceName: 'GunService',
                        },
                      };
                      return (
                        <FormItem>
                          <FormLabel>{t('form.transport')}</FormLabel>
                          <FormControl>
                            <div>
                              <JSONEditor
                                title={t('form.transport')}
                                trigger={t('form.editTransport')}
                                placeholder={placeholders[trojanNetwork]}
                                value={JSON.stringify(field.value, null, 2)}
                                onSave={(value) => {
                                  form.setValue(field.name, value);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='trojan.enable_relay'
                    render={({ field }) => (
                      <FormItem className='col-span-3'>
                        <FormLabel>{t('form.enableRelay')}</FormLabel>
                        <FormControl>
                          <div className='pt-2'>
                            <Switch
                              checked={!!field.value}
                              onCheckedChange={(value) => {
                                form.setValue(field.name, value);
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='trojan.relay_host'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayHost')}</FormLabel>
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
                    name='trojan.relay_port'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('form.relayPort')}</FormLabel>
                        <FormControl>
                          <FormattedInput
                            {...field}
                            type='number'
                            onValueChange={(value) => {
                              form.setValue(field.name, value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
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
          <Button
            disabled={loading}
            onClick={form.handleSubmit(handleSubmit, (errors) => {
              return errors;
            })}
          >
            {loading && <Icon icon='mdi:loading' className='mr-2 animate-spin' />}{' '}
            {t('form.confirm')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
