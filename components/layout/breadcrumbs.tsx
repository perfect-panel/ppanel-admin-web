'use client';

import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadcrumbItemProperties = {
  href: string;
  label: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItemProperties[] }) {
  const t = useTranslations('menu');

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index !== items.length - 1 && (
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{t(item.label)}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && <BreadcrumbSeparator />}
            {index === items.length - 1 && <BreadcrumbPage>{t(item.label)}</BreadcrumbPage>}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
