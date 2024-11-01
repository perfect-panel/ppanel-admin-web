import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AlipayF2F from './alipayf2f';
import Epay from './epay';
import StripeAlipay from './stripe-alipay';
import StripeWeChatPay from './stripe-wechat-pay';

export default function Page() {
  return (
    <Tabs defaultValue='Epay'>
      <TabsList>
        <TabsTrigger value='Epay'>Epay</TabsTrigger>
        <TabsTrigger value='Stripe-Alipay'>Stripe(AliPay)</TabsTrigger>
        <TabsTrigger value='Strip-WeChatPay'>Stripe(WeChatPay)</TabsTrigger>
        <TabsTrigger value='AlipayF2F'>AlipayF2F</TabsTrigger>
      </TabsList>
      <TabsContent value='Epay'>
        <Epay />
      </TabsContent>
      <TabsContent value='Stripe-Alipay'>
        <StripeAlipay />
      </TabsContent>
      <TabsContent value='Strip-WeChatPay'>
        <StripeWeChatPay />
      </TabsContent>
      <TabsContent value='AlipayF2F'>
        <AlipayF2F />
      </TabsContent>
    </Tabs>
  );
}
