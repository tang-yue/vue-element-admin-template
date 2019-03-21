import Cookie from 'js-cookie';
import { request } from '../utils/request';

const userId = Cookie('staffUserId');
export async function createPower(params) {
    return request('/staff/v1/permissionCode/add', params);
}

export async function modifyPower(params) {
    return request(`/staff/v1/role/${params.params.id}/update`, params);
}

export async function getRoleDetails(params) {
    return request(`/staff/v1/role/${params.params.id}/get?userId=1`);
}

export async function getModuleAllName() {
    return request(`/staff/v1/module/all?userId=${userId}`)
}
