import { request } from "../utils/request.js";
import qs from "qs";

export async function roleQuery(params) {
    return request(`/staff/v1/role/query?${qs.stringify(params.params)}`)
}

export async function modifyPower(params) {
    const { id } = params.params;
    return request(`/staff/v1/role/${id}/update`, params);
} 

// 创建角色

export async function createRole(params) {
  console.log('params')
  return request(`/staff/v1/role/add`, params)
}

// 删除角色

export async function deleteRole(params) {
  const { id } = params.params;
  return request(`/staff/v1/role/${id}/delete`, params)
}

// 角色详情

export async function getRoleDetails(id) {
    return request(`/staff/v1/role/${id}/get?userId=staff_1`);
}