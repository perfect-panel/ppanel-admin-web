import { getTranslations } from 'next-intl/server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import GroupTable from './group-table';
import SubscribeTable from './subscribe-table';

export default async function Page() {
  const t = await getTranslations('subscribe');

  return (
    <Tabs defaultValue='subscribe'>
      <TabsList>
        <TabsTrigger value='subscribe'>{t('tabs.subscribe')}</TabsTrigger>
        <TabsTrigger value='group'>{t('tabs.subscribeGroup')}</TabsTrigger>
      </TabsList>
      <TabsContent value='subscribe'>
        <SubscribeTable />
      </TabsContent>
      <TabsContent value='group'>
        <GroupTable />
      </TabsContent>
    </Tabs>
  );
}
