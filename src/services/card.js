import request from '../utils/request'
import { commonConfig } from '../utils/utils'
import qs from 'qs'

export async function getPunchCardList(params) {
    return request(`${commonConfig.apiUrl}/gift/v1/courseShare?${qs.stringify(params)}`)
}

export async function getAllLevels(params) {
    return request(`${commonConfig.apiUrl}/gift/v1/courseLevelAll`);
}

export async function create(params) {
    return request(`${commonConfig.apiUrl}/gift/v1/courseShare`, params)
}

export async function update(params) {
    return request(`${commonConfig.apiUrl}/gift/v1/courseShare/${params.params.id}`, params)
}

export async function deleteItem(id) {
    return request(`${commonConfig.apiUrl}/gift/v1/courseShare/${id}`, {
        type: 'DELETE',
        params: {}
    })
}



