'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import React, { lazy, Suspense, useEffect, useState } from 'react';

import useGlobalStore, { GlobalStore } from '@/hooks/use-global';
import { Logout } from '@/lib';

import ThemeProvider from './theme/provider';

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
);

export default function Providers({
  children,
  common,
  user,
}: {
  children: React.ReactNode;
  common: Partial<GlobalStore['common']>;
  user: GlobalStore['user'];
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const { setCommon, setUser } = useGlobalStore();

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      Logout();
    }
  }, [setUser, user]);

  useEffect(() => {
    setCommon(common);
  }, [setCommon, common]);

  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        {<ReactQueryDevtools initialIsOpen={false} />}
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
