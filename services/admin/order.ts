// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Create order POST /v1/admin/order/ */
export async function createOrder(body: API.CreateOrderRequest, options?: { [key: string]: any }) {
  return request<API.Response & { data?: any }>('/v1/admin/order/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get order list GET /v1/admin/order/list */
export async function getOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetOrderListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.GetOrderListResponse }>('/v1/admin/order/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Update order status PUT /v1/admin/order/status */
export async function updateOrderStatus(
  body: API.UpdateOrderStatusRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/order/status', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
