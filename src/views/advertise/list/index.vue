<template>
    <div>
        <div>广告管理</div>
        <div class="search-container">
            <span>广告客户端：</span>
            <el-select v-model="listQuery.adClientId" placeholder="请选择广告客户端" size="small">
                <el-option label="全部" :value="null" />
                <el-option v-for="item in allClients" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <span class="marginL">广告位置：</span>
            <el-select v-model="listQuery.adPositionId" placeholder="请选择广告位置" size="small">
                <el-option label="全部" :value="null" />
                <el-option v-for="item in allPositions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <span class="marginL">业务类型：</span>
            <el-select v-model="listQuery.bizTypeId" placeholder="请选择业务类型" size="small">
                <el-option label="全部" :value="null" />
                <el-option v-for="item in allBizs" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
            <div style="margin-top: 10px">
                <span>广告状态：</span>
                <el-select v-model="listQuery.bizTypeId" placeholder="请选择广告状态" size="small">
                    <el-option label="全部" :value="null" />
                    <el-option v-for="item in allStatus" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <span class="marginL">创建人：</span>
                <el-select v-model="listQuery.bizTypeId" placeholder="请选择创建人" size="small">
                    <el-option label="全部" :value="null" />
                    <el-option v-for="item in allCreators" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
                <el-button class="filter-item marginL" type="primary" size="small" icon="el-icon-search" @click="handleSearch">
                查询
                </el-button>
            </div>
        </div>
        <el-table
            v-loading="listLoading"
            :data="list"
            fit
        >
            <el-table-column label="ID" width="50">
                <template slot-scope="{row}">
                    <span>{{ row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="广告客户端">
                <template slot-scope="{row}">
                    <span>{{ row.client_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="广告位置">
                <template slot-scope="{row}">
                    <span>{{ row.ad_position_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="广告名称">
                <template slot-scope="{row}">
                    <span>{{ row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="业务类型">
                <template slot-scope="{row}">
                    <span>{{ row.biz_type_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="生效时间">
                <template slot-scope="{row}">
                    <span>{{ row.start_time ? getMoment(row.start_time) : '---' }}至{{ row.end_time ? getMoment(row.end_time) : '---' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人">
                <template slot-scope="{row}">
                    <span>{{ row.owner_id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="广告状态">
                <template slot-scope="{row}">
                    <span>{{ row.status }}</span>
                </template>
            </el-table-column>
            <el-table-column label="优先级" align="center">
                <template slot-scope="{row}">
                    <span>{{ row.priority }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button type="primary" size="mini" @click="watchAdvertise(row)">
                        查看广告
                    </el-button>
                    <el-button type="primary" size="mini" @click="editAdvertise(row)">
                        编辑广告
                    </el-button>
                    <el-button type="primary" size="mini" @click="endAdvertise(row)">
                        结束广告
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getAdvertiseList" />
    </div>
</template>


<script>
import moment from 'moment'
import {
    getAdvertiseList,
    getAllBizs,
    getAllPositions,
    getAllClients
} from '../../../services/advertise'
import Pagination from '@/components/Pagination/index';

export default { 
    name: 'AdvertiseList',
    components: {
        Pagination
    },
    data() {
        return {
            list: [],
            listLoading: false,
            listQuery: {
                pageNum: 1,
                pageSize: 10,
                adClientId: null,
                adPositionId: null,
                bizTypeId: null,
                ownerId: 25796
            },
            allClients: [],
            allPositions: [],
            allBizs: [],
            allStatus: [],
            allCreators: [],
            total: 0
        }
    },
    computed: {

    },
    created() {
        this.getInitData();
        this.listLoading = true
        setTimeout(() => {
            this.getAdvertiseList();
        }, 2000)
    },
    methods: {
        getAdvertiseList() {
            this.listLoading = true
            if(this.allClients.length > 0 &&
            this.allPositions.length > 0 &&
            this.allBizs.length > 0) {
                getAdvertiseList(this.listQuery).then((res) => {
                    if(res.data && res.data.errCode === 0) {
                        const { data } = res.data
                        let new_list = [].concat(data.ad_plans)
                        for(let i = 0; i < new_list.length; i++) {
                            
                            if(this.allClients.length > 0) {
                                for(let j = 0; j < this.allClients.length; j++) {
                                    if(new_list[i].client_id === this.allClients[j].id) {
                                        new_list[i].client_id = this.allClients[j].name
                                    }
                                }
                            }
                            if(this.allPositions.length > 0) {
                                for(let n = 0; n < this.allPositions.length; n++) {
                                    if(new_list[i].ad_position_id === this.allPositions[n].id) {
                                        new_list[i].ad_position_id = this.allPositions[n].name
                                    }
                                }
                            }
                            if(this.allBizs.length > 0) {
                                for(let m = 0; m < this.allBizs.length; m++) {
                                    if(new_list[i].biz_type_id === this.allBizs[m].id) {
                                        new_list[i].biz_type_id = this.allBizs[m].name
                                    }
                                }
                            }
                        }
                        this.list = new_list
                        this.total = data.total
                        setTimeout(() => {
                            this.listLoading = false
                        }, 500)
                    }
                })
            }
        },
        getMoment(timestamp) {
            return moment(timestamp).format().slice(0,10)
        },
         // 获取业务类型数据
        getInitData() {
            getAllBizs({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allBizs = res.data.data
                }
            })
            getAllPositions({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allPositions = res.data.data
                }
            })
            getAllClients({}).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.allClients = res.data.data
                }
            })
        },
        watchAdvertise() {

        },
        editAdvertise() {

        },
        endAdvertise() {

        },
        handleSearch() {

        }
    }
}
</script>

<style lang="less" scoped>
// .title {
//     color: blue;
//     .subTitle {
//         color: red;
//     }
// }
.el-button {
    padding: 5px 8px;
}
.marginL {
    margin-left: 40px;
}
</style>
