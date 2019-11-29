<template>
    <div class="container">
        <div style="display: flex; justify-content: space-between;">
            <div class="search-container">
                <span>等级：</span>
                <el-select v-model="listQuery.courseLevel" placeholder="等级">
                    <el-option label="全部" :value="null" />
                    <el-option v-for="item in allLevels" :key="item" :label="item" :value="item" />
                </el-select>
                <span>高低等级：</span>
                <el-select v-model="listQuery.gradeLevel" placeholder="高低等级">
                    <el-option label="全部" :value="null" />
                    <el-option v-for="item in grades" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>
                <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleSearch">
                查询
            </el-button>
            </div>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">创建</el-button>
        </div>
        <el-table
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
        >
         <el-table-column label="等级" prop="id" align="center" width="50">
             <template slot-scope="{row}">
                 <span>{{ row.id }}</span>
             </template>
         </el-table-column>
         <el-table-column label="第几节课" align="center" width="80">
            <template slot-scope="{row}">
                <span>{{ row.unitSequence }}</span>
            </template>
         </el-table-column>
         <el-table-column label="高低年级" align="center" width="80">
            <template slot-scope="{row}">
                <span>{{ row.gradeLevel }}</span>
            </template>
         </el-table-column>
         <el-table-column label="分享icon/文案" width="300">
            <template slot-scope="{row}">
                <img
                    :src="row.shareIcon"
                    style="width: 30px"
                    alt="icon"
                />
                <span>{{ row.shareContent }}</span>
            </template>
         </el-table-column>
         <el-table-column label="分享页背景" align="center">
             <template slot-scope="{row}">
                 <img 
                    :src="row.backgroundImg"
                    alt="backgroundImg"
                    style="width: 50px" 
                />
             </template>
         </el-table-column>
         <el-table-column label="背景色" align="center">
             <template slot-scope="{row}">
                 <span :style="{padding: '3px 10px', backgroundColor: row.backgroundColor}"></span>
                 <span>{{row.backgroundColor}}</span>
             </template>
         </el-table-column>
         <el-table-column label="打卡页动画" align="center">
             <template slot-scope="{row}">
                 <span>{{ row.animationFile ? row.animationFile.slice(-15) : '---' }}</span>
             </template>
         </el-table-column>
         <el-table-column label="打卡页文案" width="250">
             <template slot-scope="{row}">
                 <div>{{ row.punchTitle }}</div>
                 <div>{{ row.punchContent }}</div>
             </template>
         </el-table-column>
         <el-table-column label="操作" align="center" width="80" class-name="small-padding fixed-width">
             <template slot-scope="{row}">
                 <el-button type="primary" size="mini" @click="handleUpdate(row)">
                     编辑
                 </el-button>
                 <el-popover
                    placement="left"
                    trigger="hover"
                 >
                    <qrcode-vue :value="getLink({...row})" />
                    <el-button slot="reference" type="success" size="mini">
                        预览
                    </el-button>
                 </el-popover>
                 <el-button type="danger" size="mini" @click="handleDelete(row.id)">
                     删除
                 </el-button>
             </template>
         </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
        
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;" size="small">
                <el-form-item label="等级" prop="courseLevel">
                    <el-select v-model="temp.courseLevel" placeholder="Please select">
                        <el-option v-for="item in allLevels" :key="item" :label="item" :value="item" />     
                    </el-select>
                </el-form-item>
                <el-form-item label="第几课" prop="unitSequence">
                    <el-input v-model="temp.unitSequence" />
                </el-form-item>
                <el-form-item label="高低年级" prop="gradeLevel">
                    <el-select v-model="temp.gradeLevel" placeholder="Please select">
                        <el-option v-for="item in grades" :key="item.value" :label="item.name" :value="item.value" />
                    </el-select>
                </el-form-item>
                <div style="display: flex; margin-bottom: 5px;">
                    <span><span style="color: #F56C6C">* </span>分享icon</span>
                    <img v-if="Boolean(temp.shareIcon || uploadImages.shareIcon)" :src="uploadImages['shareIcon'] ? uploadImages['shareIcon'] : temp.shareIcon" style="width: 40px" alt="shareIcon" />
                    <div v-if="Boolean(!temp.shareIcon && !uploadImages.shareIcon)" class="emptyImg"></div>
                    <span class="size">尺寸100*100</span>
                    <upload-img dirname="punchCard/punch" imgname="shareIcon">上传图片</upload-img>
                </div>
                <el-form-item label="分享文案" prop="shareContent">
                    <el-input v-model="temp.shareContent" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
                </el-form-item>
                <div style="display: flex; margin-bottom: 5px;">
                    <span><span style="color: #F56C6C">* </span>分享页背景</span>
                    <img v-if="Boolean(temp.backgroundImg || uploadImages.backgroundImg)" :src="uploadImages['backgroundImg'] ? uploadImages['backgroundImg'] : temp.backgroundImg" style="width: 40px; height: 60px;" alt="shareIcon" />
                    <div v-if="Boolean(!temp.backgroundImg&&!uploadImages.backgroundImg)" class="emptyImg" style="height: 60px;"></div>
                    <span class="size">尺寸......</span>
                    <upload-img dirname="punchCard/punch" imgname="backgroundImg">上传图片</upload-img>
                </div>
                <el-form-item label="背景色" prop="backgroundColor">
                    <el-input v-model="temp.backgroundColor" />
                </el-form-item>
                <div style="display: flex; margin-bottom: 5px;">
                    <span><span style="color: #F56C6C">* </span>动画文件</span>
                    <div v-if="Boolean(temp.animationFile || uploadImages.animationFile)" class="marinClass">{{uploadImages['animationFile'] ? uploadImages['animationFile'].slice(-15) : temp.animationFile}}</div>
                    <div v-if="Boolean(!temp.animationFile&&!uploadImages.animationFile)" class="marginClass">请上传json文件</div>
                    <upload-img dirname="punchCard/punch" imgname="animationFile">上传文件</upload-img>
                </div>
                <el-form-item label="打卡页标题" prop="punchTitle">
                    <el-input v-model="temp.punchTitle" />
                </el-form-item>
                <el-form-item label="打卡页文案" prop="punchContent">
                    <el-input v-model="temp.shareContent" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
                </el-form-item>
                <el-form-item label="字色" prop="fontColor">
                    <el-radio-group v-model="temp.fontColor">
                        <el-radio :label="`1`">浅色字</el-radio>
                        <el-radio :label="`2`">深色字</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                取消
                </el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                确认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import { mapGetters } from 'vuex';
import Pagination from '@/components/Pagination/index';
import { getPunchCardList, getAllLevels, create, update, deleteItem } from '../../../services/card';
import QrcodeVue from 'qrcode.vue';
import UploadImg from '@/components/UploadImg/UploadImg';

export default {
    name: 'PunchCard',
    components: {
        QrcodeVue,
        UploadImg,
        Pagination,
    },
    data() {
        return {
            list: [],
            listLoading: false,
            listQuery: {
                pageSize: 10,
                pageNum: 1,
                courseLevel: null,
                gradeLevel: null
            },
            temp: {
                courseLevel: null,
                unitSequence: null,
                gradeLevel: null,
                shareContent: null,
                backgroundColor: null,
                punchTitle: null,
                punchContent: null,
                fontColor: null
            },
            textMap: {
                update: '编辑',
                create: '创建'
            },
            dialogFormVisible: false,
            dialogStatus: '',
            total: 0,
            allLevels: [],
            grades:[{name: '低年级', value: 1},{name: '高年级', value: 2}],
            rules: {
                courseLevel: [{ required: true, message: '等级不能为空', trigger: 'change' }],
                unitSequence: [{ required: true, message: '第几节课不能为空', trigger: 'change'}],
                gradeLevel: [{required: true, message: '高低年级不能为空', trigger: 'change' }],
                shareContent: [{ required: true, message: '分享文案不能为空', trigger: 'change' }],
                backgroundColor: [{ required: true, message: '背景色不能为空', trigger: 'change' }],
                punchTitle: [{ required: true, message: '打卡页标题不能为空', trigger: 'change' }],
                punchContent: [{ required: true, message: '打卡页文案不能为空', trigger: 'change' }],
                fontColor: [{ required: true, message: '字色不能为空', trigger: 'change' }]
            },
        }
    },
    computed: {
        ...mapGetters([
            "uploadImages",
        ]),
    },
    created() {
        this.getList()
        this.getAllLevels()
    },
    methods: {
        getList() {
            this.listLoading = true;
            getPunchCardList(this.listQuery).then((res) => {
                if(res.data&&res.data.errCode === 0) {
                    const { list, total } = res.data.data;
                    this.list = list;
                    this.total = total;
                }
                setTimeout(() => {
                    this.listLoading = false
                }, 1 * 1000)
            })
        },
        getAllLevels() {
            getAllLevels({}).then((res) => {
                if(res.data&&res.data.errCode === 0) {
                    this.allLevels = res.data.data;
                }
            })
        },
        getLink(data) {
            const { courseLevel, unitSequence, gradeLevel } = data;
            return window.location.origin.indexOf("console.pipacoding.com") !== -1
              ? `https://hd.pipabiancheng.com/punch-detail/1990/level/${courseLevel}/unit/${unitSequence}?gradeLevel=${gradeLevel}`
              : `https://hd.testing.pipabiancheng.com/punch-detail/1990/level/${courseLevel}/unit/${unitSequence}?gradeLevel=${gradeLevel}`
        },
        handleSearch() {
            this.getList();
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleDelete(id) {
            deleteItem(id).then((res) => {
                if(res.data&&res.data.errCode === 0) {
                    this.$message.success('删除成功')
                    this.getList();
                }
            })
        },
        createData() {
            create({
                type: 'post',
                params: {...this.temp, ...this.uploadImages}
            }).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.dialogFormVisible = false
                    this.$message.success('创建成功')
                    this.getList()
                } else {
                    this.$message.error('创建失败')
                }
            })
        },
        updateData() {
            update({
                type: 'put',
                params: {...this.temp, ...this.uploadImages}
            }).then((res) => {
                if(res.data && res.data.errCode === 0) {
                    this.dialogFormVisible = false
                    this.$message.success('更新成功');
                    this.getList()
                } else {
                    this.$message.error('更新失败')
                }
            })
        },
        resetTemp() {
            this.temp = {
               courseLevel: null,
                unitSequence: null,
                gradeLevel: null,
                shareContent: null,
                backgroundColor: null,
                punchTitle: null,
                punchContent: null,
                fontColor: null 
            }
        },
        handleCreate() {
            this.resetTemp()
            this.$store.dispatch('removeUploadImages')
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-form-item {
    margin-bottom: 5px !important;
}
.emptyImg {
    width: 40px; 
    height: 40px; 
    margin-left: 40px;
    background-color: #aaa;
}
.size {
    margin-left: 100px; 
    font-size: 10px;
}
.marginClass {
    margin: 0 100px 0 30px;
}

.title {
    color: blue;
    .subTitle {
        color: red;
    }
}
</style>
