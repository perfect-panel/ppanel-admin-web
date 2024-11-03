import CryptoJS from 'crypto-js';
import { intlFormat } from 'date-fns';
import { evaluate } from 'mathjs';
import Cookies from 'universal-cookie';
import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_DEFAULT_LANGUAGE } from './env';

export const isBrowser = () => typeof window !== 'undefined';

export const locales = ['en-US', 'zh-CN'];

const cookies = new Cookies(null, {
  path: '/',
  maxAge: 365 * 24 * 60 * 60,
});

export function getLocale() {
  const browserLocale = navigator.language?.split(',')?.[0] || '';
  const defaultLocale = locales.includes(browserLocale) ? browserLocale : '';
  const cookies = new Cookies(null, { path: '/' });
  const cookieLocale = cookies.get('locale') || '';
  const locale = cookieLocale || defaultLocale || NEXT_PUBLIC_DEFAULT_LANGUAGE || locales[0];
  return locale
}

export function setLocale(value: string) {
  return cookies.set('locale', value);
}

export function setAuthorization(value: string) {
  const Authorization = CryptoJS.AES.encrypt(value, NEXT_PUBLIC_API_URL || '').toString();
  return cookies.set('Authorization', Authorization);
}

export function getAuthorization(value?: string) {
  const Authorization = isBrowser() ? cookies.get('Authorization') : value;
  if(!Authorization) return;
  const bytes = CryptoJS.AES.decrypt(Authorization, NEXT_PUBLIC_API_URL || '');
  return bytes.toString(CryptoJS.enc.Utf8);
}


export function setRedirectUrl(value?: string) {
  if(value) {
    sessionStorage.setItem("redirect-url", value)
  }
}

export function getRedirectUrl() {
  return sessionStorage.getItem("redirect-url") ?? "/dashboard"
}

export function Logout() {
  const cookies = new Cookies(null, { path: '/' });
  cookies.remove("Authorization")
  const pathname = location.pathname;
  if (!['', '/'].includes(pathname)) {
    setRedirectUrl(location.pathname)
    location.href = `/`;
  }
}

export function convertToMajorUnit(value?: number | string) {
  return value ? evaluate(`${value} / 100`) : 0;
}

export function convertToMinorUnit(value?: number | string) {
  return value ? evaluate(`${value} * 100`) : 0;
}

export function bitsToMegabits(value?: string | number) {
  return value ? evaluate(`${value} / 1000 / 1000`) : 0;
}
export function megabitsToBits(value?: string | number) {
  return value ? evaluate(`${value} * 1000 * 1000`) : 0;
}

export function bytesToGigabytes(value?: string | number) {
  return value ? evaluate(`${value} / 1000 / 1000 / 1000`) : 0;
}
export function gigabytesToBytes(value?: string | number) {
  return value ? evaluate(`${value} * 1000 * 1000 * 1000`) : 0;
}

export function formatBytes(bytes: number) {
  if (bytes === 0) return '0B';
  const k = 1000, // or 1024
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

export function formatDate(date?: Date | number) {
  if(!date) return;
  return intlFormat(date, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  })
}