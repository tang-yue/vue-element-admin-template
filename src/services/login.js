import { request } from "../utils/request.js";
import qs from "qs";


export async function login(params) {
    return request(`/staff/v1/login`, params);
}

export async function savePassword(params) {
    return request(`/staff/v1/user/update/password`, params);
}


export async function getUserInfo(params) { 
    return request(`/staff/v1/user/getInfo?${qs.stringify(params.params)}`);
}