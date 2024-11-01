// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Get alipay f2f payment config GET /v1/admin/payment/alipay_f2f */
export async function getAlipayF2FPaymentConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PaymentConfig }>('/v1/admin/payment/alipay_f2f', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update alipay f2f payment config PUT /v1/admin/payment/alipay_f2f */
export async function updateAlipayF2FPaymentConfig(
  body: API.PaymentConfig,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/payment/alipay_f2f', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get all payment config GET /v1/admin/payment/all */
export async function getAllPaymentConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetAllPaymentConfigResponse }>(
    '/v1/admin/payment/all',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Get epay payment config GET /v1/admin/payment/epay */
export async function getEpayPaymentConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PaymentConfig }>('/v1/admin/payment/epay', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update epay payment config PUT /v1/admin/payment/epay */
export async function updateEpayPaymentConfig(
  body: API.PaymentConfig,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/payment/epay', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get stripe alipay payment config GET /v1/admin/payment/stripe_alipay */
export async function getStripeAlipayPaymentConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PaymentConfig }>('/v1/admin/payment/stripe_alipay', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Update stripe alipay payment config PUT /v1/admin/payment/stripe_alipay */
export async function updateStripeAlipayPaymentConfig(
  body: API.PaymentConfig,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/payment/stripe_alipay', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get stripe wechat pay payment config GET /v1/admin/payment/stripe_wechat_pay */
export async function getStripeWeChatPayPaymentConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PaymentConfig }>(
    '/v1/admin/payment/stripe_wechat_pay',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update stripe wechat pay payment config PUT /v1/admin/payment/stripe_wechat_pay */
export async function updateStripeWeChatPayPaymentConfig(
  body: API.PaymentConfig,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/payment/stripe_wechat_pay', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
