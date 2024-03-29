import { SettingDrawerProps } from '@ant-design/pro-layout';
import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useLocalStorage } from 'react-use';

export const LAYOUT_STORAGE_KEY = 'VITE_ANT_DESIGN_PRO_LAYOUT';

const initialState: SettingDrawerProps['settings'] & Record<string, any> = {
  locale: 'en-US',
  siderWidth: 208,
  navTheme: 'dark',
  fixedHeader: false,
  colorWeak: false,
  headerTheme: 'dark',
  primaryColor: '#16C829',
  layout: 'side',
  contentWidth: 'Fluid',
  fixSiderbar: false,
  iconfontUrl: '',
  headerHeight: 48,
  splitMenus: false,
  title: 'Backoffice',
  pwa: false,
};

export const useLayout = () => {
  const [local, ...rest] = useLocalStorage(LAYOUT_STORAGE_KEY, initialState);

  const queryClient = useQueryClient();

  useEffect(() => {
    ConfigProvider.config({
      theme: {
        primaryColor: local!.primaryColor,
      },
    });
    queryClient.setQueryData([LAYOUT_STORAGE_KEY], () => {
      return local;
    });
  }, [local, queryClient]);

  const { data } = useQuery([LAYOUT_STORAGE_KEY], {
    select: (data) => data,
    initialData: () => local,
    enabled: false,
  });

  return [data ?? initialState, ...rest] as const;
};
