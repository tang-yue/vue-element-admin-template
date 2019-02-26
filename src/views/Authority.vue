<template>
    <div class="authority">
        <h2>权限管理</h2>
        <div class="flex-container">
            <div class="flex">
                <el-col :span="10">
                    <el-input 
                        v-model="roleName"
                        size="small"
                        maxlength="200"
                    >
                    </el-input>
                </el-col>
                <div>（这里可修改角色名称）</div>
            </div>
            <div class="create" v-show="permissionAdd" @click="createPower">+创建新权限</div>
        </div>
        <div class="navigation">
            <span class="module">模块</span>
            <span class="control">权限</span>
        </div>
        <div class="checkout" v-for="item in checkoutList" :key="item.moduleName">
            <div class="name">{{ item.moduleName }}</div>
            <el-checkbox-group 
                v-model="ownPermissionList"
                :min="1">
                <el-checkbox 
                    v-for="opt in item.checkoutOptions" 
                    :label="opt.label" 
                    :key="opt.value">{{opt.label}}</el-checkbox>
            </el-checkbox-group> 
        </div>
        <el-button type="primary" v-show="permissionUpdate" @click="preserve">保存</el-button>
        <el-dialog
            title="创建新权限"
            class="dialog"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose">
            <el-form
                ref="ruleForm"
                :label-position="labelPosition" 
                label-width="100px" 
                :model="curItem">
                <el-form-item label="所属模块：" prop="moduleCode">
                    <el-select v-model="curItem.moduleCode" placeholder="请选择模块系统">
                        <el-option label="账号系统" value="account"></el-option>
                        <el-option label="市场系统" value="market"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限码（英文）：" prop="permissionCode">
                    <el-input placeholder="请输入英文权限码" v-model="curItem.permissionCode"></el-input>
                </el-form-item>
                <el-form-item label="权限名称：" prop="permissionName">
                    <el-input placeholder="请输入名称" v-model="curItem.permissionName"></el-input>
                </el-form-item>
                <el-form-item label="权限说明：" prop="permissionDesc">
                    <el-input 
                        type="textarea" 
                        placeholder="请输入该权限的说明，便于其他人理解" 
                        :rows="3" 
                        v-model="curItem.permissionDesc">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" :loading="addLoading" @click="onSubmit">确定</el-button>
            </span> 
        </el-dialog>
    </div>
</template>


<script>
import { 
    getRoleDetails, 
    createPower, 
    modifyPower 
} from '@/services/authority';
import { mapState } from 'vuex';

export default {
    name: 'Authority',
    data() {
        return {
            id: '',
            roleName: '',
            checkoutList: [],
            ownPermissionList: [],
            dialogFormVisible: false,
            curItem: {
                permissionName: '',
                permissionDesc: '',
                permissionCode: '',
                moduleCode: ''
            },
            roleCode: '',
            addLoading: false,
            labelPosition: 'right'
        }
    },
    computed: {
        ...mapState([
            'permissionAdd',
            'permissionUpdate'
        ])
    }, 
    created() {
        this.getAllInfo();
    },
    methods: {
        getAllInfo() {
            const regex = /=/g;
            const id = window.location.search.slice(1).replace(regex, ' ').split(' ')[1];
            this.id = id;
            getRoleDetails({
              type: 'get',
              params: { id, }
            }).then((res) => {
              if (res.errCode === 0) {
                this.roleName = res.data.role.roleName;
                this.roleCode = res.data.role.roleCode;
                const checkoutList = res.data.permissionList.reduce((result, item) => {
                    const resItem = {};
                    resItem.moduleName = item.moduleName;
                    resItem.checkoutOptions = item.modulePermissionList.reduce((last, val) => {
                        const lastItem = {};
                        lastItem.label = val.permissionName;
                        if (res.data.ownerPermissionIdList.indexOf(val.id) !== -1) {
                           this.ownPermissionList.push(val.permissionName); 
                        }
                        lastItem.value = val.id;
                        last.push(lastItem);
                        return last;
                    }, []);
                    result.push(resItem);
                    return result;
                }, []);
                this.checkoutList = checkoutList;
              } else if (res.errCode === 10110002) {
                  this.$router.push('/fe-staff/login');
              } 
            })
        },
        preserve() {
            const ownPermissionIdList = [];
            for (let i = 0; i < this.checkoutList.length; i += 1) {
                for (let j = 0; j < this.checkoutList[i].checkoutOptions.length; j += 1) {
                   if (this.ownPermissionList.indexOf(
                    this.checkoutList[i].checkoutOptions[j].label
                    ) !== -1) {
                        ownPermissionIdList.push(this.checkoutList[i].checkoutOptions[j].value)
                    } 
                }  
            }            
            modifyPower({
                type: 'put',
                params: {
                    roleName: this.roleName,
                    roleCode: this.roleCode,
                    userId: 1,
                    permissionIds: ownPermissionIdList.join(','),
                    id: this.id
                }
            }).then((res) => {
                if (res.errCode === 0) {
                    this.$message({ message: '保存信息成功', duration: 3000 });
                } else if (res.errCode === 10110002) {
                    this.$router.push('/fe-staff/login');
                }
            })
        },      
        handleClose() {
            this.dialogFormVisible = false;
        },
        createPower() {
            this.dialogFormVisible = true;
        },
        onSubmit() {
            createPower({
                type: 'post',
                params: { ...this.curItem, userId: 1 }
            }).then((res) => {
                if (res.errCode === 0) {
                    this.$message({ message: '创建新权限成功', duration: 3000 });
                } else if (res.errCode === 10110002) {
                    this.$message({ message: '创建新权限成功', duration: 3000 }); 
                }
            })
            this.dialogFormVisible = false;
        },
    },
}
</script>

<style scoped>
.create {
    cursor: pointer;
    color: #409EFF;
}
.navigation {
    margin-top: 20px;
    display: flex;
    background: #eee;
    height: 45px;
    align-items: baseline;
    background: rgb(221, 221, 221);
}
.module {
    margin-top: 10px;
    margin-right: 280px;
}
.checkout {
   border-bottom: 1px solid #aaa;
   padding-bottom: 20px;
   display: flex;
   margin: 20px 0 20px 0;
}
.name {
    width: 200px;
    margin-right: 50px;
}
.el-checkbox_label {
    line-height: 25px;
}
.authority {
    padding: 0 200px 40px 40px;
}
.flex {
    display: flex;
    align-items: baseline;
}
.right {
    margin-right: 30px;
    float: right;
}
.flex-container {
    display: flex;
    justify-content: space-between;
}
</style>
