// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Update subscribe PUT /v1/admin/subscribe/ */
export async function updateSubscribe(
  body: API.UpdateSubscribeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create subscribe POST /v1/admin/subscribe/ */
export async function createSubscribe(
  body: API.CreateSubscribeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete subscribe DELETE /v1/admin/subscribe/ */
export async function deleteSubscribe(
  body: API.DeleteSubscribeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Batch delete subscribe DELETE /v1/admin/subscribe/batch */
export async function batchDeleteSubscribe(
  body: API.BatchDeleteSubscribeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get subscribe details GET /v1/admin/subscribe/details */
export async function getSubscribeDetails(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetSubscribeDetailsParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.Subscribe }>('/v1/admin/subscribe/details', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Update subscribe group PUT /v1/admin/subscribe/group */
export async function updateSubscribeGroup(
  body: API.UpdateSubscribeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/group', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create subscribe group POST /v1/admin/subscribe/group */
export async function createSubscribeGroup(
  body: API.CreateSubscribeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete subscribe group DELETE /v1/admin/subscribe/group */
export async function deleteSubscribeGroup(
  body: API.DeleteSubscribeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/group', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Batch delete subscribe group DELETE /v1/admin/subscribe/group/batch */
export async function batchDeleteSubscribeGroup(
  body: API.BatchDeleteSubscribeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/subscribe/group/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get subscribe group list GET /v1/admin/subscribe/group/list */
export async function getSubscribeGroupList(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetSubscribeGroupListResponse }>(
    '/v1/admin/subscribe/group/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Get subscribe list GET /v1/admin/subscribe/list */
export async function getSubscribeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetSubscribeListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.GetSubscribeListResponse }>(
    '/v1/admin/subscribe/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
