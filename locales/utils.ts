import { createTranslator } from 'next-intl';

import { getLocale } from '@/lib';

export async function getTranslations(namespace: string) {
  const locale = getLocale();
  const messages = (await import(`./${locale}/${namespace}.json`)).default;
  return createTranslator({ locale, messages });
}
