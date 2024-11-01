'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { convertToMajorUnit, convertToMinorUnit } from '@/lib';

interface UserFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
  update?: boolean;
}

export default function UserForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: UserFormProps<T>) {
  const t = useTranslations('user');

  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    email: z.string().email(t('form.invalidEmailFormat')),
    password: z.string().optional(),
    referer_id: z.number().optional(),
    refer_code: z.string().optional(),
    is_admin: z.boolean().optional(),
    balance: z.number().optional(),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialValues,
    },
  });

  useEffect(() => {
    form?.reset(initialValues);
  }, [form, initialValues]);

  async function handleSubmit(data: { [x: string]: any }) {
    const bool = await onSubmit(data as T);

    if (bool) setOpen(false);
  }

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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.userEmail')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        placeholder={t('form.userEmailPlaceholder')}
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
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.password')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        placeholder={t('form.passwordPlaceholder')}
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
                name='referer_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.refererId')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        placeholder={t('form.refererIdPlaceholder')}
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
                name='refer_code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.inviteCode')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        placeholder={t('form.inviteCodePlaceholder')}
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
                name='balance'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.balance')}</FormLabel>
                    <FormControl>
                      <FormattedInput
                        prefix='¥'
                        placeholder={t('form.balancePlaceholder')}
                        type='number'
                        {...field}
                        formatInput={convertToMajorUnit}
                        formatOutput={convertToMinorUnit}
                        onValueChange={(value) => {
                          form.setValue(field.name, value);
                        }}
                        min={0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='is_admin'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.manager')}</FormLabel>
                    <FormControl>
                      <div className='pt-2'>
                        <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                      </div>
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
