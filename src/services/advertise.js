import request from '../utils/request'
import { commonConfig } from '../utils/utils'
import qs from 'qs'

// 获取所有客户端
export async function getAllClients() {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/clients/client`)
}

// 获取所有广告位
export async function getAllPositions() {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/positions/position`)
}

// 获取所有业务类型
export async function getAllBizs() {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/bizs/biz`)
}

// 添加业务类型
export async function addBiz(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/bizs/biz`, params)
}

// 创建广告计划 
export async function createAdvertisePlan(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/adplans`, params)
}

// 根据id更新广告计划
export async function updateAdvertisePlan(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/adplans/adplan/${params.id}`, {
        type: 'PUT',
        params: params.params
    })
}

// 根据广告计划id更新广告条件
export async function updateCondition(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/adplans/adplan/${params.id}`, {
        type: 'PUT',
        params: params.params
    })
}

// 根据id 获取单个广告所有信息
export async function getAdvertiseInfo(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/adplans/adplan/${params.id}`)
}

// 获取所有广告计划（带条件查询和分页）
export async function getAdvertiseList(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/adplans?${qs.stringify(params)}`)
}

// 获取所有素材类型
export async function getAllMaterialsType(params) {
    return request(`${commonConfig.devApiUrl}/ad-service/v1/materials/types`)
}








