// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** Update announcement PUT /v1/admin/announcement/ */
export async function updateAnnouncement(
  body: API.UpdateAnnouncementRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/announcement/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Create announcement POST /v1/admin/announcement/ */
export async function createAnnouncement(
  body: API.CreateAnnouncementRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/announcement/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Delete announcement DELETE /v1/admin/announcement/ */
export async function deleteAnnouncement(
  body: API.DeleteAnnouncementRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/announcement/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get announcement GET /v1/admin/announcement/detail */
export async function getAnnouncement(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetAnnouncementParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.Announcement }>('/v1/admin/announcement/detail', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** Update announcement enable PUT /v1/admin/announcement/enable */
export async function updateAnnouncementEnable(
  body: API.UpdateAnnouncementEnableRequest,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any }>('/v1/admin/announcement/enable', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Get announcement list GET /v1/admin/announcement/list */
export async function getAnnouncementList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetAnnouncementListParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.GetAnnouncementListResponse }>(
    '/v1/admin/announcement/list',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
