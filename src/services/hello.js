import request from '../utils/request.js';

export async function getData(params) {
    return request('https://api.randomuser.me/?nat=US&results=5', params);
    // console
}

export async function login(params) {
    return request('/staff/v1/login', params);
}