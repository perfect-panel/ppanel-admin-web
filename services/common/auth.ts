// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Check user is exist GET /v1/auth/check */
export async function checkUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.CheckUserParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.CheckUserResponse }>('/v1/auth/check', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** User login POST /v1/auth/login */
export async function userLogin(body: API.UserLoginRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.LoginResponse }>('/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** User register POST /v1/auth/register */
export async function userRegister(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.LoginResponse }>('/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Reset password POST /v1/auth/reset */
export async function resetPassword(
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.LoginResponse }>('/v1/auth/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
