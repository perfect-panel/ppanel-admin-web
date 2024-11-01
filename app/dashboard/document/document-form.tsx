import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import TagInput from '@/components/customize/tag-input';
import { Markdown, MarkdownEditor } from '@/components/editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
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
  title: z.string(),
  tags: z.array(z.string()).nullish(),
  content: z.string().nullish(),
});

interface DocumentFormProps<T> {
  onSubmit: (data: T) => Promise<boolean> | boolean;
  initialValues?: T;
  loading?: boolean;
  trigger: string;
  title: string;
}

export default function DocumentForm<T extends Record<string, any>>({
  onSubmit,
  initialValues,
  loading,
  trigger,
  title,
}: DocumentFormProps<T>) {
  const t = useTranslations('document');

  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      ...initialValues,
    } as any,
  });

  useEffect(() => {
    form?.reset({
      tags: [],
      ...initialValues,
    });
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
        <ScrollArea className='-mx-6 h-[calc(100vh-48px-36px-36px-env(safe-area-inset-top))]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 px-6 pt-4'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.title')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('form.titlePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.tags')}</FormLabel>
                    <FormControl>
                      <TagInput
                        placeholder={t('form.tagsPlaceholder')}
                        value={field.value}
                        onChange={(value) => form.setValue(field.name, value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='content'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('form.content')}</FormLabel>
                    <FormControl>
                      <MarkdownEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => <Markdown>{text}</Markdown>}
                        defaultValue={field.value}
                        onChange={({ text }) => field.onChange(text)}
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
