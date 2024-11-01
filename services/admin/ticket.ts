// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Update ticket status PUT /v1/admin/ticket/ */
export async function updateTicketStatus(
  body: API.UpdateTicketStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/ticket/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get ticket detail GET /v1/admin/ticket/detail */
export async function getTicket(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetTicketParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.Ticket }>('/v1/admin/ticket/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Create ticket follow POST /v1/admin/ticket/follow */
export async function createTicketFollow(
  body: API.CreateTicketFollowRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/ticket/follow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get ticket list GET /v1/admin/ticket/list */
export async function getTicketList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetTicketListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.GetTicketListResponse }>('/v1/admin/ticket/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
