import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const locales = ['zh-CN', 'en-US'];

export default getRequestConfig(async () => {
  const browserLocale = (await headers()).get('Accept-Language')?.split(',')?.[0] || '';
  const defaultLocale = locales.includes(browserLocale) ? browserLocale : '';
  const cookieLocale = (await cookies()).get('locale')?.value || '';

  const locale =
    cookieLocale || defaultLocale || process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || locales[0];

  const messages = {
    language: (await import(`./${locale}/language.json`)).default,
    menu: (await import(`./${locale}/menu.json`)).default,
    auth: (await import(`./${locale}/auth.json`)).default,
    common: (await import(`./${locale}/common.json`)).default,
    system: (await import(`./${locale}/system.json`)).default,
    payment: (await import(`./${locale}/payment.json`)).default,
    server: (await import(`./${locale}/server.json`)).default,
    subscribe: (await import(`./${locale}/subscribe.json`)).default,
    order: (await import(`./${locale}/order.json`)).default,
    coupon: (await import(`./${locale}/coupon.json`)).default,
    user: (await import(`./${locale}/user.json`)).default,
    announcement: (await import(`./${locale}/announcement.json`)).default,
    ticket: (await import(`./${locale}/ticket.json`)).default,
    document: (await import(`./${locale}/document.json`)).default,
    index: (await import(`./${locale}/index.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
