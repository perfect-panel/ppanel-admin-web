// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Get application GET /v1/admin/system/application */
export async function getApplication(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetApplicationResponse }>(
    '/v1/admin/system/application',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update application PUT /v1/admin/system/application */
export async function updateApplication(
  body: API.UpdateApplicationRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/application', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create application POST /v1/admin/system/application */
export async function createApplication(
  body: API.CreateApplicationRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/application', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete application DELETE /v1/admin/system/application */
export async function deleteApplication(
  body: API.DeleteApplicationRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/application', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Currency Config GET /v1/admin/system/currency_config */
export async function getCurrencyConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetCurrencyConfigResponse }>(
    '/v1/admin/system/currency_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update Currency Config PUT /v1/admin/system/currency_config */
export async function updateCurrencyConfig(
  body: API.UpdateCurrencyConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/currency_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get email smtp config GET /v1/admin/system/email_config */
export async function getEmailSmtpConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetEmailSmtpConfigResponse }>(
    '/v1/admin/system/email_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update email smtp config PUT /v1/admin/system/email_config */
export async function updateEmailSmtpConfig(
  body: API.UpdateEmailSmtpConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/email_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get invite config GET /v1/admin/system/invite_config */
export async function getInviteConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetInviteConfigResponse }>(
    '/v1/admin/system/invite_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update invite config PUT /v1/admin/system/invite_config */
export async function updateInviteConfig(
  body: API.UpdateInviteConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/invite_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get node config GET /v1/admin/system/node_config */
export async function getNodeConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetNodeConfigResponse }>(
    '/v1/admin/system/node_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update node config PUT /v1/admin/system/node_config */
export async function updateNodeConfig(
  body: API.UpdateNodeConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/node_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get register config GET /v1/admin/system/register_config */
export async function getRegisterConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetRegisterConfigResponse }>(
    '/v1/admin/system/register_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update register config PUT /v1/admin/system/register_config */
export async function updateRegisterConfig(
  body: API.UpdateRegisterConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/register_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get site config GET /v1/admin/system/site_config */
export async function getSiteConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetSiteConfigResponse }>(
    '/v1/admin/system/site_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update site config PUT /v1/admin/system/site_config */
export async function updateSiteConfig(
  body: API.UpdateSiteConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/site_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get subscribe config GET /v1/admin/system/subscribe_config */
export async function getSubscribeConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetSubscribeConfigResponse }>(
    '/v1/admin/system/subscribe_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update subscribe config PUT /v1/admin/system/subscribe_config */
export async function updateSubscribeConfig(
  body: API.UpdateSubscribeConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/subscribe_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get subscribe type GET /v1/admin/system/subscribe_type */
export async function getSubscribeType(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetSubscribeTypeResponse }>(
    '/v1/admin/system/subscribe_type',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Get Telegram Config GET /v1/admin/system/telegram_config */
export async function getTelegramConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetTelegramConfigResponse }>(
    '/v1/admin/system/telegram_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update Telegram Config PUT /v1/admin/system/telegram_config */
export async function updateTelegramConfig(
  body: API.UpdateTelegramConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/telegram_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Test email smtp POST /v1/admin/system/test_email */
export async function testEmailSmtp(
  body: API.TestEmailSmtpRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/test_email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get Team of Service Config GET /v1/admin/system/tos_config */
export async function getTosConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetTosConfigResponse }>(
    '/v1/admin/system/tos_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update Team of Service Config PUT /v1/admin/system/tos_config */
export async function updateTosConfig(
  body: API.UpdateTosConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/tos_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get verify config GET /v1/admin/system/verify_config */
export async function getVerifyConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetVerifyConfigResponse }>(
    '/v1/admin/system/verify_config',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Update verify config PUT /v1/admin/system/verify_config */
export async function updateVerifyConfig(
  body: API.UpdateVerifyConfigRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/system/verify_config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
