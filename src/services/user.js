import request from '../utils/request';
import { commonConfig } from '../utils/utils'


export async function getInfo() {
    return request(`${commonConfig.apiUrl}/xxxxx`);
}

export async function login(params) {
    return request(`${commonConfig.apiUrl}/xxxx/xxx`, params);
}

export async function savePassword(params) {
    return request(`${commonConfig.apiUrl}/xxxx/xxxx`, params);
}