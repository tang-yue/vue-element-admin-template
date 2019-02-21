import qs from 'qs';
import { request } from '../utils/request';

export async function roleQuery(params) {
    return request(`/staff/v1/role/query?${qs.stringify(params.params)}`)
}

export async function modifyPower(params) {
    const { id } = params.params;
    return request(`/staff/v1/role/${id}/update`, params);
} 

// 创建角色

export async function createRole(params) {
  return request('/staff/v1/role/add', params)
}

// 删除角色

export async function deleteRole(params) {
  const { id } = params.params;
  return request(`/staff/v1/role/${id}/delete`, params)
}
