<template>
    <div>
        <div>设置广告条件</div>
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="margin-left: 60px" size="small">
            <div>投放人群：</div>
            <el-form-item label="购买状态" prop="buy_status">
                <el-radio-group v-model="temp.buy_status">
                    <el-radio :label="`ALL`">全部</el-radio>
                    <el-radio :label="`UNPAID`">未购课</el-radio>
                    <el-radio :label="`PAID`">已购课</el-radio>
                </el-radio-group>
            </el-form-item>
            <div style="margin-left: 29px">
                <span style="color: #606266">AB测试：</span>
                <div style="display: inline-block">
                    <el-button v-if="!addAB" type="primary" size="small" @click="add('AB')">添加</el-button>
                    <div v-if="addAB" style="display: flex; padding-left: 10px">
                        <el-form-item label="实验ID" prop="experiment_id">
                            <el-input v-model="temp.experiment_id" style="width: 100px" />
                        </el-form-item> 
                        <el-form-item label="测试组ID" prop="test_group_id">
                            <el-input v-model="temp.test_group_id" style="width: 100px" />
                        </el-form-item>
                    </div>
                </div>
            </div>
             <div>投放时间：</div>
             <el-form-item label="上线时间" prop="start_time">
                 <el-date-picker
                    v-model="temp.start_time"
                    type="datetime"
                    placeholder="选择上线时间">
                </el-date-picker>
             </el-form-item>
             <el-form-item label="结束时间" prop="end_time">
                 <el-date-picker
                    v-model="temp.end_time"
                    type="datetime"
                    placeholder="选择结束时间"
                    default-time="23:59:59">
                </el-date-picker>
             </el-form-item>
        <div>广告优先级：</div>
            <el-form-item label="广告优先级" prop="priority">
                <el-select v-model="temp.priority" placeholder="Please select">
                    <el-option v-for="item in advertiseLevels" :key="item" :label="item" :value="item" />
                </el-select>
            </el-form-item>
        <div>
            <span>设置白名单：</span>
            <el-button v-if="!addWhiteList" type="primary" size="small" @click="add('whiteList')">添加</el-button>
            <span v-if="addWhiteList">
                <span style="color: #bbb; display: block">输入白名单用户的user_id，多个用户使用英文逗号分开，例如：12,34,2090,345</span>
                <el-form-item v-if="addWhiteList" label="user_id" prop="white_list">
                    <el-input v-model="temp.white_list" style="width: 350px"/>
                </el-form-item>
            </span>
        </div>
        <div style="width: 500px; margin: 50px auto">
            <el-button type="primary" @click="updateCondition('previous')" class="btn">上一步</el-button>
            <el-button type="primary" @click="updateCondition('next')" class="btn">下一步</el-button>
        </div>
        </el-form>
    </div>
</template>


<script>
import { 
    updateCondition,
    getAdvertiseInfo
} from '../../../services/advertise'

export default {
    name: 'AdvertiseCondition',
    data() {
        return {
            temp: {
                buy_status: null,
                experiment_id: null,
                test_group_id: null,
                start_time: 1575160230000,
                end_time: null,
                priority: 5,
                white_list: null
            },
            addAB: false,
            addWhiteList: false,
            rules: {
                buy_status: [{ required: true, message: '购买状态不能为空', trigger: 'change' }],
                start_time: [{ required: true, message: '上线时间不能为空', trigger: 'change' }],
                end_time: [{ required: true, message: '结束时间不能为空', trigger: 'change' }],
                priority: [{ required: true, message: '广告优先级不能为空', trigger: 'change' }]
            },
            advertiseId: this.$route.params.id,
            adPositionId: null
        }
    },
    computed: {
        advertiseLevels() {
            return Array.from(new Array(10).keys())
        }
    },
    created() {
        this.getAdvertiseInfo()
    },
    methods: {
        add(str) {
            if(str === 'AB') {
                this.addAB = true;
            } else {
                this.addWhiteList = true;
            }
        },
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
        updateCondition(origin) {
            const { buy_status, start_time, end_time, priority, white_list } = this.temp;
            if(buy_status && start_time && end_time && priority) {
                if(white_list) {
                    if(/^[0-9,]+$/g.test(white_list)) {
                        this.updateConditionRequest(origin)
                    } else {
                        this.$message.error('请检查白名单的输入格式是否正确')
                    }
                } else {
                    this.updateConditionRequest(origin)
                }
            } else {
                this.$message.error('请检查必填项是否都必填')
            }
        },
        updateConditionRequest(origin) {
            updateCondition({
                id: this.advertiseId,
                params:  {
                    ...this.temp, 
                    start_time: Math.floor(this.temp.start_time),
                    end_time: Math.floor(this.temp.end_time)
                }
            }).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.$message.success('保存信息成功')
                    if(origin === 'previous') {
                        this.$router.push({path: `/advertise/create/plan/${this.advertiseId}`})
                    } else {
                        console.log(this.adPositionId, 'this.adPositionId');
                        // 关注客服消息
                        if(this.adPositionId === 2) {
                            this.$router.push({path: `/advertise/create/content/${this.advertiseId}/customerServiceNews`})
                        // 关注48小时内客服消息
                        } else if(this.adPositionId === 3) {
                            this.$router.push({path: `/advertise/create/content/${this.advertiseId}/fortyEightcustomerServiceNews`})
                        // 关注交互客服消息
                        } else if(this.adPositionId === 4) {
                            this.$router.push({path: `/advertise/create/content/${this.advertiseId}/interactiveCustomerServiceMessages`})
                        }
                    }
                } else {
                    this.$message.success('保存信息失败')
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.btn {
    padding: 8px 40px;
}
.el-button {
    margin-left: 40px !important;
}
.el-form-item {
    margin-left: 20px !important;
}
</style>
