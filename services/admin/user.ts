// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Update user PUT /v1/admin/user/ */
export async function updateUser(body: API.UpdateUserRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: any }>('/v1/admin/user/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create user POST /v1/admin/user/ */
export async function createUser(body: API.CreateUserRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: any }>('/v1/admin/user/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete user DELETE /v1/admin/user/ */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteUserParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/user/', {
    method: 'DELETE',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Batch delete user DELETE /v1/admin/user/batch */
export async function batchDeleteUser(
  body: API.BatchDeleteUserRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/user/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Current user GET /v1/admin/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.User }>('/v1/admin/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Get user detail GET /v1/admin/user/detail */
export async function getUserDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.User }>('/v1/admin/user/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Get user list GET /v1/admin/user/list */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.GetUserListResponse }>('/v1/admin/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
