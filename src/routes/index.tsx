import { MenuDataItem } from '@ant-design/pro-layout';

export const routes: MenuDataItem[] = [
  {
    path: '/',
    name: 'Landing',
    layout: false,
    hideInMenu: true,
    component: './Landing',
  },
  {
    path: '/auth/login',
    name: 'Login',
    layout: false,
    hideInMenu: true,
    component: './Login',
  },
  {
    path: '/panel',
    name: 'Dashboard',
    component: './Panel/Dashboard',
  },
  {
    component: './404',
  },
];
