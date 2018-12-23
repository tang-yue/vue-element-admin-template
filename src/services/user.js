import { request } from "../utils/request.js";
import qs from "qs";

export async function userQuery(params) {
    return request(`/staff/v1/user/query?${qs.stringify(params.params)}`);
}

export async function get(params) {
    return request(`/staff/v1/user/${params.params}/get`)
}

export async function allRole() {
    return request(`/staff/v1/role/all?userId=${3}`)
}

export async function editUser(params) {
    const { staffId } = params.params;
    return request(`/staff/v2/user/${staffId}/update`, params);
}

// 删除账号
export async function deleteUser(params) {
    return request(`/staff/v2/user/${params.params.staffId}/delete`, params)
}

// 创建新账号
export async function createUser(params) {
    return request(`/staff/v1/user/add`, params)
}