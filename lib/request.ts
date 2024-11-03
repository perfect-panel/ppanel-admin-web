import { getAuthorization, isBrowser, Logout } from '@/lib';
import { getTranslations } from '@/locales/utils';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_SITE_URL } from './env';

const request = axios.create({
  baseURL: NEXT_PUBLIC_API_URL || NEXT_PUBLIC_SITE_URL,
  // withCredentials: true,
  // withXSRFToken: true,
  timeout: 10000,
});

async function handleError(response: any) {
  const code = response.data?.code;
  if (response?.config?.skipErrorHandler) return;
  if (!isBrowser()) return;
  if ([40002, 40003, 40004].includes(code)) return Logout()

  const t = await getTranslations('common');
  const message = t(`request.${code}`) !== `request.${code}`
    ?
    t(`request.${code}`) : response.data?.message || response.message;

  toast.error(message);
}

request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig & {
    Authorization?: string
  }) => {
    const Authorization = getAuthorization(config.Authorization);
    if (Authorization) config.headers.Authorization = Authorization;
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  async (response) => {
    const { code } = response.data;
    if (code !== 200) throw response;
    return response;
  },
  async (error) => {
    await handleError(error)
    return Promise.reject(error)
  }
);


export default request;
