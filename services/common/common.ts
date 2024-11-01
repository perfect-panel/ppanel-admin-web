// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Get verification code POST /v1/common/send_code */
export async function sendEmailCode(body: API.SendCodeRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.SendCodeResponse }>('/v1/common/send_code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get global config GET /v1/common/site/config */
export async function getGlobalConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetGlobalConfigResponse }>('/v1/common/site/config', {
    method: 'GET',
    ...(options || {}),
  });
}
