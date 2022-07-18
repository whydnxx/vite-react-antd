import { Space } from 'antd';
import React from 'react';

import { useLayout } from '@/layouts';
import { SelectLang } from '@/locales';

import Avatar from './AvatarDropdown';
import styles from './index.module.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const [{ navTheme, layout }] = useLayout();

  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix')
    className = `${styles.right}  ${styles.dark}`;

  return (
    <Space className={className}>
      <Avatar />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
