import 'antd/dist/antd.variable.css';

import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { AuthContextProvider } from './context/auth.context';
import LayoutWrapper from './layouts';
import IntlProvider from './locales';
import QueryClientProvider from './queries';
ReactDOM.render(
  <React.StrictMode>
    <div style={{ height: '100vh' }}>
      <AuthContextProvider>
        <QueryClientProvider>
          <IntlProvider>
            <HashRouter>
              <ConfigProvider locale={enUS}>
                <LayoutWrapper />
              </ConfigProvider>
            </HashRouter>
          </IntlProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </div>
  </React.StrictMode>,
  document.getElementById('root'),
);
