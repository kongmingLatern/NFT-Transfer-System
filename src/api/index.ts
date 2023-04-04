import message from '@/component/common/message/Message';
import axios from 'axios';
import { log } from 'console';

const api = axios.create({
  baseURL: 'http://101.35.251.18:3000',
  // baseURL: 'http://localhost:3000',
  // baseURL:
  // 'https://www.fastmock.site/mock/897825cb4cc73f1ae23df5e97bdd3f66/api',
  timeout: 10000
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use((response: any) => {
  if (response.data.code !== 200) {
    message.error(response.data.error as string);
    return;
  }
  return response.data;
});

export { api };
