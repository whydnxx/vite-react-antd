import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { IntlProvider as Provider } from 'react-intl';

import { useLayout } from '@/layouts';

import enUS from './en-US';

export * from './components/SelectLang';

export default function IntlProvider({ children }: PropsWithChildren<any>) {
  const [{ locale }] = useLayout();
  const [message, setMessage] = useState(enUS);

  useEffect(() => {
    import(`../locales/${locale}.ts`).then((module) => {
      setMessage(module.default);
    });
  }, [locale]);

  return (
    <Provider messages={message} defaultLocale="en-US" locale="en-US">
      {children}
    </Provider>
  );
}
