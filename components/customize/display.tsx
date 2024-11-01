'use client';

import { useTranslations } from 'next-intl';

import useGlobalStore from '@/hooks/use-global';
import { convertToMajorUnit, formatBytes } from '@/lib';

type DisplayType = 'currency' | 'traffic' | 'number';

interface DisplayProps<T> {
  value?: T;
  unlimited?: boolean;
  type?: DisplayType;
}

export function Display<T extends number | undefined | null>({
  value = 0,
  unlimited = false,
  type = 'number',
}: DisplayProps<T>): string {
  const t = useTranslations('common');
  const { common } = useGlobalStore();
  const { currency } = common;

  if (type === 'currency') {
    const formattedValue = `${currency?.currency_symbol ?? ''}${convertToMajorUnit(value as number)?.toFixed(2) ?? '0.00'}`;
    return formattedValue;
  }

  if (['traffic', 'number'].includes(type) && unlimited && !value) {
    return t('unlimited');
  }

  if (type === 'traffic') {
    return value ? formatBytes(value as number) : '0';
  }

  if (type === 'number') {
    return value ? value.toString() : '0';
  }

  return '0';
}
