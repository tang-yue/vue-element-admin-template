<template>
    <div>
        <div>配置广告内容（关注客服消息）</div>
        <div v-for="(item, index) in contents" :key="index">
            <div>第{{ chineseNum[index] }}条客服消息：</div>
            <el-form ref="dataForm" :rules="rules" :model="item" label-position="left" label-width="110px" style="margin-left:50px;" size="small">
                <div style="display: flex">
                    <el-form-item label="广告内容名称" prop="name">
                        <el-input v-model="item.name" />
                    </el-form-item>
                    <div class="marginL">
                        <span v-bind:class="classObj(index)" @click="index !== 0 ? moveTop(index) : null">上移</span>
                        <span v-bind:class="{ col: index !== contents.length -1, gray: index === contents.length -1 }" @click="index !== contents.length - 1 ? moveDown(index) : null">下移</span>
                        <span class="otherCol">（改变推送顺序）</span>
                    </div>
                </div>
                <el-form-item label="推送时间延时" prop="delay_time">
                    <el-time-picker v-model="item.delay_time">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="配置客服" prop="customer_service_id">
                    <el-button type="primary">配置客服</el-button>
                    <span>{{ item.customer_service_id }}</span>
                </el-form-item>
                <el-form-item label="选择素材类型" prop="material_type">
                    <el-select v-model="item.material_type">
                        <el-option v-for="item in allMaterialsType" :key="item.value" :label="item.name" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="素材ID" prop="material_id">
                    <el-select v-model="item.material_id">
                        <el-option v-for="item in allMaterialsId" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <el-button type="primary" size="small" @click="addCustomerNews">添加客服消息</el-button>
        <div style="width: 500px; margin: 50px auto">
            <el-button type="primary" @click="updateContent('previous')" size="small" class="preBtn">上一步</el-button>
            <el-button type="primary" @click="updateContent('preview')" size="small" class="btn">保存并预览</el-button>
        </div>
    </div>
</template>


<script>
import {
    getAllMaterialsType
} from '../../../../services/advertise'
export default {
    name: 'CustomerNews',
    data() {
        return {
            contents: [
                {name: '', delay_time: null, customer_service_id: null, material_type: null, material_id: null }
            ],
            advertiseId: this.$route.params.id,
            adPositionId: null,
            chineseNum: ['一', '二', '三', '四', '五', '六', '七'],
            allMaterialsType: [
                {name: '文字', value: 'TEXT'},
                {name: '小程序卡片', value: 'MINICARD'},
                {name: '图文', value: 'NEWS'}
            ],
            rules: {
                name: [{ required: true, message: '广告内容名称不能为空', trigger: 'change' }],
                delay_time: [{ required: true, message: '推送时间延时不能为空', trigger: 'change' }],
                customer_service_id: [{ required: true, message: '配置客服不能为空', trigger: 'change' }],
                material_type: [{ required: true, message: '选择素材类型不能为空', trigger: 'change' }],
                material_id: [{ required: true, message: '选择素材ID', trigger: 'change' }]
            },
            allMaterialsId: [1,2,3,4,5,6,7,8]
        }
    },
    computed: {

    },
    created() {
        
    },
    methods: {
        getAdvertiseInfo() {
            getAdvertiseInfo({
                id: this.advertiseId
            }).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.adPositionId = res.data.data.ad_position_id;
                    if(res.data.data.start_time&&res.data.data.end_time) {
                        Object.assign(this.temp, res.data.data)
                    }
                }
            })
        },
        getAllMaterialsType() {
            getAllMaterialsType({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allMaterialsType = res.data.data
                }
            })
        },
        addCustomerNews() {
            this.contents.push({name: '', delay_time: null, customer_service_id: null, material_type: null, material_id: null })
        },
        updateContent(origin) {
            console.log(this.contents, 'this.contents')
        },
        moveTop(index) {
            // 如果是第三条客服消息， 那么必然是 第二条客服消息和第三条客服消息颠倒
            let deleteItem = this.contents.splice(index, 1)
            this.contents.splice(index-1,0,deleteItem[0])
        },
        moveDown(index) {
            // 如果是第一条客服消息，那么必然是第一条消息和第二条消息颠倒
            let deleteItem = this.contents.splice(index, 1)
            this.contents.splice(index+1,0,deleteItem[0])
        },
        classObj(index) {
            return {
                'col': index !== 0,
                'gray': index === 0
            }
        }
    }
}
</script>

<style lang="less" scoped>
.preBtn {
    padding: 9px 50px;   
    margin-right: 80px;
}
.btn {
    padding: 9px 40px;
}
.marginL {
    margin-left: 80px;
    .col {
        color: #409EFF;
        margin-right: 18px;
        cursor: pointer;
    }
    .gray {
        color: #aaa;
        margin-right: 18px;
    }
    .otherCol {
        color: #bbb;
    }
}
</style>
