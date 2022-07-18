import axios, { AxiosError } from 'axios';
import Cookies from 'universal-cookie';

export const request = axios.create({
  headers: {
    'content-type': 'application/json;charset=UTF-8',
  },
  baseURL: '/',
  withCredentials: true,
  timeout: 60000,
});

request.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const token = cookies.get('token_access');
  if (token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

request.interceptors.response.use((response) => {
  if (response.data) return response.data;
  return response;
});

export function isAxiosError<T>(candidate: any): candidate is AxiosError<T> {
  return candidate.isAxiosError === true;
}
