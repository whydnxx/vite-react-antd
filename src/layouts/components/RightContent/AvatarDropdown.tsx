import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React, { useCallback } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import { useAuthContext } from '@/context/auth.context';

import HeaderDropdown from '../HeaderDropdown';
import styles from './index.module.less';

export interface GlobalHeaderRightProps {
  menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuthContext();

  const loginOut = async () => {
    const cookies = new Cookies();
    const { search, pathname } = location;
    cookies.set('token_access', false);
    // Note: There may be security issues, please note
    navigate(
      `/login?${createSearchParams({
        redirect: pathname + search,
      }).toString()}`,
      {
        replace: true,
      },
    );
  };

  const onMenuClick = useCallback((event: any) => {
    const { key } = event;
    if (key === 'logout') {
      loginOut();
      return;
    }
    navigate(`/account/${key}`);
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!authContext.state.user || !authContext.state.user.name) return loading;

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          Personal Center
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          Personal settings
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        Sign Out
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{authContext.state.user.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
