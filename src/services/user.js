import { request } from "../utils/request.js";
import qs from "qs";

export async function userQuery(params) {
    return request(`/staff/v1/account?${qs.stringify(params.params)}`);
}

export async function get(params) {
    return request(`/staff/v1/account/${params.params}`)
}

export async function allRole() {
    return request(`/staff/v1/role/all?userId=${3}`)
}

export async function editUser(params) {
    return request(`/staff/v1/account/${params.params.id}`, params);
}

// 删除账号
export async function deleteUser(params) {
    return request(`/staff/v1/account/${params.params.id}`, params)
}

// 创建新账号
export async function createUser(params) {
    return request(`/staff/v1/account`, params)
}


// 选择员工信息表，数据

export async function staffQuery(params) {
    return request(`/staff/v1/staffInfo?${qs.stringify(params.params)}`)
}


// 修改账号与员工绑定关系
export async function bindStaff(params) {
    return request(`/staff/v1/accountBindStaff`, params)
}


// 账号历史绑定查询接口
export async function accountStaff(params) {
    return request(`/staff/v1/accountStaffHistory?${qs.stringify(params.params)}`)
}

// 新增员工信息接口
export async function addStaffInfo(params) {
    return request(`/staff/v1/staffInfo`, params)
}