import type { AxiosRequestConfig } from 'axios';
import dayjs from '../dayjs/index';

export const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Timezone': dayjs().format('Z'),
    'X-Timezone-Name': dayjs.tz.guess(),
  },
  baseURL:"http://localhost:5235/api",
  responseType: 'json',
};
