'use client';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Markdown, MarkdownEditor } from '@/components/editor';
import { getTosConfig, updateTosConfig } from '@/services/admin/system';

export default function Tos() {
  const t = useTranslations('system.tos');

  const { data, refetch, isFetched } = useQuery({
    queryKey: ['getTosConfig'],
    queryFn: async () => {
      const { data } = await getTosConfig();

      return data.data;
    },
  });

  async function updateConfig(key: string, value: unknown) {
    // @ts-ignore
    if (data?.[key] === value) return;
    try {
      await updateTosConfig({
        ...data,
        [key]: value,
      } as API.GetTosConfigResponse);
      toast.success(t('saveSuccess'));
      refetch();
    } catch (error) {}
  }

  return (
    isFetched && (
      <MarkdownEditor
        className='h-[calc(100dvh-132px-env(safe-area-inset-top))]'
        renderHTML={(text) => <Markdown>{text}</Markdown>}
        defaultValue={data?.tos_content}
        onBlur={(e) => {
          if (data?.tos_content != e.target.value) {
            updateConfig('tos_content', e.target.value);
          }
        }}
      />
    )
  );
}
