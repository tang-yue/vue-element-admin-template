<template>
    <div>
        <div>创建广告计划</div>
        <div class="planWrapper">
            <el-form ref="dataForm" :rules="rules" :model="planData" label-position="left" label-width="95px" style="width: 400px; margin-left:50px;" size="small">
                <el-form-item label="广告客户端" prop="client_id">
                    <el-select v-model="planData.client_id" placeholder="请选择">
                        <el-option v-for="item in allClients" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告位置" prop="ad_position_id">
                    <el-select v-model="planData.ad_position_id" placeholder="请选择">
                        <el-option v-for="item in allPositions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务类型" prop="biz_type_id">
                    <div style="display: flex; width: 318px">
                        <el-select v-model="planData.biz_type_id" placeholder="请选择">
                            <el-option v-for="item in allBizs" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-button type="primary" style="margin-left: 20px">添加业务类型</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="广告名称" prop='name'>
                    <el-input v-model="planData.name" />
                </el-form-item>
            </el-form>
            <div style="width: 600px">
                <div style="width: 135px; margin:0 auto;">
                    <el-button type="primary" style="padding: 9px 50px">下一步</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { 
    getAllClients, 
    getAllPositions, 
    getAllBizs,
    addBiz,
    createAdvertisePlan
} from '../../../services/advertise'
export default {
    name: 'AdvertisePlan',
    data() {
        return {
            planData: {
                client_id: null,
                ad_position_id: null,
                biz_type_id: null,
                name: null
            },
            allClients: [],
            allPositions: [],
            allBizs: [],
            rules: {
                client_id: [{ required: true, message: '广告客户端不能为空', trigger: 'change' }],
                ad_position_id: [{ required: true, message: '广告位置不能为空', trigger: 'change' }],
                biz_type_id: [{ required: true, message: '业务类型', trigger: 'change' }],
                name: [{ required: true, message: '广告名称', trigger: 'change' }]
            }
        }
    },
    created() {
        this.getInitData()
        this.getBizData()
        console.log(this.planData.biz_type_id)
    },
    methods: {
        getInitData() {
            getAllClients({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allClients = res.data.data
                }
            })
            getAllPositions({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allPositions = res.data.data
                }
            })
        },
        // 获取业务类型数据
        getBizData() {
            getAllBizs({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allBizs = res.data.data
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.planWrapper {
    width: 600px;
    margin: 60px auto;
}
</style>
