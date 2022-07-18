import { useMutation } from 'react-query';
import Cookies from 'universal-cookie';

import { request } from '@/libs/request';

import { LoginParams } from './form';
import { ILoginResponse } from './types';

export const useLoginMutation = () => {
  return useMutation(
    (data: LoginParams) => {
      return request<any>({
        url: '/api/v1/auth/member/login',
        method: 'post',
        data,
      });
    },
    {
      onSuccess(data: ILoginResponse) {
        const cookies = new Cookies();
        cookies.set('token_access', data.token, {
          httpOnly: false,
          secure: false,
          maxAge: data.expires,
          sameSite: 'strict',
          path: '/',
        });
      },
    },
  );
};

export const getMeFn = async (token: string) => {
  return await request.get<any>('/api/v1/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
