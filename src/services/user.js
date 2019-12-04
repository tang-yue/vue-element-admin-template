import request from '../utils/request';
import { getToken, getStaffId, getStaffUserId } from '../utils/auth';
import { commonConfig } from '../utils/utils'


export async function getInfo() {
    return request(`${commonConfig.apiUrl}/staff/v1/user/getInfo?userId=${getStaffUserId()}&staffId=${getStaffId()}&token=${getToken()}`);
}

export async function login(params) {
    return request(`${commonConfig.apiUrl}/staff/v1/login`, params);
}

export async function savePassword(params) {
    return request(`${commonConfig.apiUrl}/staff/v1/user/update/password`, params);
}