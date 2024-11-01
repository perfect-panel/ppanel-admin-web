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

const formSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

interface GroupFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function GroupForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: GroupFormProps<T>) {
  const t = useTranslations('server');

  const [open, setOpen] = useState(false);
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('group.form.name')}</FormLabel>
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
                    <FormLabel>{t('group.form.description')}</FormLabel>
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
            {t('group.form.cancel')}
          </Button>
          <Button disabled={loading} onClick={form.handleSubmit(handleSubmit)}>
            {loading && <Icon icon='mdi:loading' className='mr-2 animate-spin' />}{' '}
            {t('group.form.confirm')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
