import { PageLoading } from '@ant-design/pro-layout';
import { ReactNode } from 'react';
import { useCookies } from 'react-cookie';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from 'virtual:antd-layout';

import { useAuthContext } from '@/context/auth.context';
import { isAxiosError } from '@/libs/request';
import { routes } from '@/routes';
import { getMeFn } from '@/services/auth';

import Footer from './components/Footer';
import RightContent from './components/RightContent';
import { useLayout } from './hooks';

export * from './hooks';

export default function LayoutWrapper() {
  const [{ token_access }, setCookie] = useCookies(['token_access']);
  const [layout] = useLayout();
  const intl = useIntl();
  const authContext = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  if (token_access == undefined) {
    setCookie('token_access', false);
  }

  const query = useQuery(['authUser'], () => getMeFn(token_access), {
    enabled: !!token_access && location.pathname.includes('panel'),
    select: (data) => data,
    onSuccess: (data) => {
      authContext.dispatch({ type: 'SET_USER', payload: data });
      if (location.pathname == '/auth/login') {
        requestAnimationFrame(() => {
          navigate('/panel');
        });
      }
    },
    onError(err) {
      if (isAxiosError(err)) {
        if (err.response?.status == 401) {
          navigate('/auth/login');
        }
      }
    },
  });

  return (
    <Layout
      routes={routes}
      rightContentRender={() => <RightContent />}
      disableContentMargin={false}
      footerRender={() => <Footer />}
      formatMessage={intl.formatMessage}
      onPageChange={() => {
        if (!token_access) {
          requestAnimationFrame(() => {
            navigate('/login');
          });
        }
      }}
      menuHeaderRender={undefined}
      childrenRender={(children: ReactNode) => {
        if (query.isLoading) return <PageLoading />;
        return <>{children}</>;
      }}
      {...layout}
    />
  );
}
