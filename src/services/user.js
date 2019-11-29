import request from '../utils/request';
import { getToken, getStaffId, getStaffUserId } from '../utils/auth';


export async function getInfo() {
    return request(`https://api.testing.pipacoding.com/staff/v1/user/getInfo?userId=${getStaffUserId()}&staffId=${getStaffId()}&token=${getToken()}`);
}

export async function login(params) {
    return request('https://api.testing.pipacoding.com/staff/v1/login', params);
}