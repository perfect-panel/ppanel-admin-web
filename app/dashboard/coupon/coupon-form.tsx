'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Combobox } from '@/components/customize/combobox';
import { DatePicker } from '@/components/customize/date-picker';
import { FormattedInput } from '@/components/customize/formatted-Input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { convertToMajorUnit, convertToMinorUnit } from '@/lib';
import { getSubscribeList } from '@/services/admin/subscribe';

const formSchema = z.object({
  name: z.string(),
  code: z.string().optional(),
  count: z.number().optional(),
  type: z.number().optional(),
  discount: z.number().optional(),
  start_time: z.number().optional(),
  expire_time: z.number().optional(),
  subscribe: z.array(z.number()).nullish(),
  user_limit: z.number().optional(),
});

interface CouponFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function CouponForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: CouponFormProps<T>) {
  const t = useTranslations('coupon');

  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 1,
      ...initialValues,
    } as any,
  });

  useEffect(() => {
    form?.reset(initialValues);
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    const bool = await onSubmit(data as T);
    if (bool) setOpen(false);
  }

  const type = form.watch('type');

  const { data: subscribe } = useQuery({
    queryKey: ['getSubscribeList', 'all'],
    queryFn: async () => {
      const { data } = await getSubscribeList({
        page: 1,
        size: 9999,
      });
      return data.data?.list as API.Subscribe[];
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
        <ScrollArea className='-mx-6 h-[calc(100vh-48px-36px-36px-env(safe-area-inset-top))]'>
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
                        placeholder={t('form.enterCouponName')}
                        value={field.value}
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
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.customCouponCode')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        placeholder={t('form.customCouponCodePlaceholder')}
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
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.type')}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        defaultValue={String(field.value)}
                        onValueChange={(value) => {
                          form.setValue('discount', undefined);
                          form.setValue(field.name, Number(value));
                        }}
                        className='flex gap-2'
                      >
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='1' />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {t('form.percentageDiscount')}
                          </FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value='2' />
                          </FormControl>
                          <FormLabel className='font-normal'>{t('form.amountDiscount')}</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {type === 1 && (
                <FormField
                  control={form.control}
                  name='discount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.percentageDiscount')}</FormLabel>
                      <FormControl>
                        <FormattedInput<number>
                          placeholder={t('form.enterValue')}
                          type='number'
                          suffix='%'
                          {...field}
                          onValueChange={(value) => {
                            form.setValue(field.name, value);
                          }}
                          min={1}
                          max={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {type === 2 && (
                <FormField
                  control={form.control}
                  name='discount'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.amountDiscount')}</FormLabel>
                      <FormControl>
                        <FormattedInput<number>
                          placeholder={t('form.enterValue')}
                          type='number'
                          value={field.value}
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
              )}
              <FormField
                control={form.control}
                name='server'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.specifiedServer')}</FormLabel>
                    <FormControl>
                      <Combobox<number, true>
                        multiple
                        placeholder={t('form.selectServer')}
                        value={field.value}
                        onChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                        options={subscribe?.map((item: API.Subscribe) => ({
                          value: item.id,
                          label: item.name,
                        }))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='start_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.startTime')}</FormLabel>
                    <FormControl>
                      <DatePicker
                        placeholder={t('form.enterValue')}
                        value={field.value}
                        disabled={(date) => date < new Date(Date.now() - 24 * 60 * 60 * 1000)}
                        onChange={(value) => {
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
                name='expire_time'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.expireTime')}</FormLabel>
                    <FormControl>
                      <DatePicker
                        placeholder={t('form.enterValue')}
                        value={field.value}
                        onChange={(value) => {
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
                name='count'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.count')}</FormLabel>
                    <FormControl>
                      <FormattedInput<number>
                        placeholder={t('form.countPlaceholder')}
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
                name='user_limit'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.userLimit')}</FormLabel>
                    <FormControl>
                      <FormattedInput<number>
                        placeholder={t('form.userLimitPlaceholder')}
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
