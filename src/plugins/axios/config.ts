import type { AxiosRequestConfig } from 'axios';
import dayjs from '../dayjs/index';

export const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Timezone': dayjs().format('Z'),
    'X-Timezone-Name': dayjs.tz.guess(),
  },
  baseURL: import.meta.env.VUE_APP_API_URL,
  responseType: 'json',
};
