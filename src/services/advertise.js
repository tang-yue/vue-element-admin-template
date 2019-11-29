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






