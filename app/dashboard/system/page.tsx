import { getTranslations } from 'next-intl/server';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Currency from './currency';
import Email from './email';
import Invite from './invite';
import Node from './node';
import Register from './register';
import Site from './site';
import Subscription from './subscription';
import Telegram from './telegram';
import Tos from './tos';
import Verify from './verify';

export default async function Page() {
  const t = await getTranslations('system');

  return (
    <Tabs defaultValue='site'>
      <TabsList className='h-full flex-wrap'>
        <TabsTrigger value='site'>{t('tabs.site')}</TabsTrigger>
        <TabsTrigger value='currency'>{t('tabs.currency')}</TabsTrigger>
        <TabsTrigger value='subscription'>{t('tabs.subscription')}</TabsTrigger>
        <TabsTrigger value='register'>{t('tabs.register')}</TabsTrigger>
        <TabsTrigger value='verify'>{t('tabs.verify')}</TabsTrigger>
        <TabsTrigger value='email'>{t('tabs.email')}</TabsTrigger>
        <TabsTrigger value='node'>{t('tabs.node')}</TabsTrigger>
        <TabsTrigger value='invite'>{t('tabs.invite')}</TabsTrigger>
        <TabsTrigger value='telegram'>{t('tabs.telegram')}</TabsTrigger>
        <TabsTrigger value='tos'>{t('tabs.tos')}</TabsTrigger>
      </TabsList>
      <TabsContent value='site'>
        <Site />
      </TabsContent>
      <TabsContent value='currency'>
        <Currency />
      </TabsContent>
      <TabsContent value='subscription'>
        <Subscription />
      </TabsContent>
      <TabsContent value='register'>
        <Register />
      </TabsContent>
      <TabsContent value='verify'>
        <Verify />
      </TabsContent>
      <TabsContent value='email'>
        <Email />
      </TabsContent>
      <TabsContent value='node'>
        <Node />
      </TabsContent>
      <TabsContent value='invite'>
        <Invite />
      </TabsContent>
      <TabsContent value='telegram'>
        <Telegram />
      </TabsContent>
      <TabsContent value='tos'>
        <Tos />
      </TabsContent>
    </Tabs>
  );
}
