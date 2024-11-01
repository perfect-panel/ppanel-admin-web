// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Update node PUT /v1/admin/server/ */
export async function updateNode(body: API.UpdateNodeRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: any }>('/v1/admin/server/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create node POST /v1/admin/server/ */
export async function createNode(body: API.CreateNodeRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: any }>('/v1/admin/server/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete node DELETE /v1/admin/server/ */
export async function deleteNode(body: API.DeleteNodeRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: any }>('/v1/admin/server/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Batch delete node DELETE /v1/admin/server/batch */
export async function batchDeleteNode(
  body: API.BatchDeleteNodeRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/server/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get node detail GET /v1/admin/server/detail */
export async function getNodeDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetNodeDetailParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.Server }>('/v1/admin/server/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Update node group PUT /v1/admin/server/group */
export async function updateNodeGroup(
  body: API.UpdateNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/server/group', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create node group POST /v1/admin/server/group */
export async function createNodeGroup(
  body: API.CreateNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/server/group', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete node group DELETE /v1/admin/server/group */
export async function deleteNodeGroup(
  body: API.DeleteNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/server/group', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Batch delete node group DELETE /v1/admin/server/group/batch */
export async function batchDeleteNodeGroup(
  body: API.BatchDeleteNodeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/server/group/batch', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get node group list GET /v1/admin/server/group/list */
export async function getNodeGroupList(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetNodeGroupListResponse }>(
    '/v1/admin/server/group/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Get node list GET /v1/admin/server/list */
export async function getNodeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetNodeListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.GetNodeServerListResponse }>('/v1/admin/server/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
