import React from 'react';
import { QueryClient, QueryClientProvider as Provider } from 'react-query';

import { request } from '@/libs/request';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      select(response: any) {
        return response.data;
      },
      queryFn: ({ queryKey }) => {
        return request(queryKey[0] as any);
      },
      retry: 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

export default function QueryClientProvider({
  children,
}: React.PropsWithChildren<Record<string, any>>) {
  return <Provider client={queryClient}>{children}</Provider>;
}
