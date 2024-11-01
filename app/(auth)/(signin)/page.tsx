'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/legacy/image';

import useGlobalStore from '@/hooks/use-global';

import UserAuthForm from './user-auth-form';

export default function Page() {
  const t = useTranslations('auth');
  const { common } = useGlobalStore();
  const { site, background } = common;

  return (
    <div
      className='relative h-screen flex-col items-center justify-center backdrop-blur md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'
      style={{
        background: `url(${background})`,
      }}
    >
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white lg:flex'>
        <div
          className='absolute inset-0'
          style={{
            background: `url(${background})`,
          }}
        />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          {site.site_logo && (
            <Image src={site.site_logo!} width={48} height={48} className='size-12' alt='Logo' />
          )}
          <span>{site.site_name}</span>
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>{site.site_desc}</p>
          </blockquote>
        </div>
      </div>
      <div className='flex h-full items-center bg-background/60 p-4 backdrop-blur lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              {t('login')} {site.site_name}
            </h1>
            <p className='text-sm text-muted-foreground'>{t('description')}</p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
