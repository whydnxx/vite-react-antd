import { DefaultFooter } from '@ant-design/pro-layout';
import { FC } from 'react';
import { useIntl } from 'react-intl';

const Footer: FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'unkwon',
  });

  const currentYear = new Date().getFullYear();

  return <DefaultFooter copyright={`${currentYear} ${defaultMessage}`} />;
};

export default Footer;
