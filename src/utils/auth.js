import Cookies from 'js-cookie';

export function getToken() {
    return Cookies.get('staffToken') 
}
export function removeStaffUserId() {
    return Cookies.remove('staffUserId')
}
export function removeStaffId() {
    return Cookies.remove('staffId')
}
export function removeStaffNickname() {
    return Cookies.remove('staffNickname')
}
export function removeToken() {
    return Cookies.remove('staffToken')
}
export function setToken(token) {
    return Cookies.set('staffToken', token)
}
export function getStaffId() {
    return Cookies.get('staffId')
}
export function getStaffUserId() {
    return Cookies.get('staffUserId')
}
export function getStaffNickname() {
    return Cookies.get('staffNickname')
}