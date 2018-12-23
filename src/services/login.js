import { request } from "../utils/request.js";
import qs from "qs";


export async function login(params) {
    return request(`/staff/v1/login`, params);
}