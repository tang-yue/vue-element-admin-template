import { request } from "../utils/request.js";
import qs from "qs";


export async function getModuleAllName() {
    return request(`/staff/v1/module/all?userId=staff_1`);
}


export async function createPower(params) {
    return request(`/staff/v1/permissionCode/add`, params);
}


export async function modifyPower(params) {
    return request(`/staff/v1/role/${params.params.id}/update`, params);
}

export async function getRoleDetails(params) {
    return request(`/staff/v1/role/${params.params.id}/get?userId=1`);
}  