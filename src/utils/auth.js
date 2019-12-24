import Cookies from 'js-cookie';

export function getToken() {
    return Cookies.get('token') 
}
export function removeUserId() {
    return Cookies.remove('userId')
}
export function removeId() {
    return Cookies.remove('staffId')
}
export function removeNickname() {
    return Cookies.remove('nickname')
}
export function removeToken() {
    return Cookies.remove('token')
}
export function setToken(token) {
    return Cookies.set('token', token)
}
export function getStaffId() {
    return Cookies.get('staffId')
}
export function getUserId() {
    return Cookies.get('userId')
}
export function getNickname() {
    return Cookies.get('nickname')
}