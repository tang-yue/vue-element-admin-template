<template>
  <div class="power">
    <h2>用户</h2>
      <div class="createPower">
        <el-button 
          type="primary"
          size="medium"
          @click="addAccount"
          >+添加账号
        </el-button>
        <span class="total">共{{ total }}个用户</span>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="username"
          label="登录账号"
          width="300">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="成员姓名"
          width="380">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色">
        </el-table-column>
        <el-table-column
          label="管理">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 20, 30]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <el-dialog
          title="编辑"
          class="dialog"
          :visible.sync="dialogFormVisible"
          :before-close="handleClose">
          <el-form
            ref="ruleForm"
            :label-position="labelPosition" 
            label-width="100px" 
            :model="curItem">
            <el-form-item label="登录账号：" prop="username">
              <el-input :disabled='dialogType' v-model="curItem.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="curItem.password"></el-input>
            </el-form-item>
            <el-form-item label="成员姓名：" prop="nickname">
              <el-input :disabled='dialogType' v-model="curItem.nickname"></el-input>
            </el-form-item>
            <el-form-item label="所属角色：" prop="roleList">
              <el-checkbox-group 
                v-model="roleList"
                :min="1">
                <el-checkbox v-for="role in allRoleList" :label="role.label" :key="role.value">{{role.label}}</el-checkbox>
              </el-checkbox-group>
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
import { userQuery, roleQuery, get, allRole, editUser, deleteUser, createUser } from '@/services/user.js';
import Cookie from "js-cookie";
export default {
  name: 'Power',
  props: {
  },
  data() {
    return {
      showDialog: false,
      tableData: [],
      pageSize: 5,
      pageNum: 1,
      total: 0,
      loading: true,
      labelPosition: "right",
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      dialogFormVisible: false,
      addLoading: false,
      curItem: {
        username: '',
        nickname: '',
        password: '',
      },
      allRoleList: [],
      roleList: [],
      dialogType: false
    }
  },
  computed: {
     // 使用vuex的时候使用
  },
  created() {
   // this.$route的用法
   // 生命周期函数，编译模板前使用
   this.getListInfo({});
  },
  components: {
   // 引入的组件
  },
  methods: {
    getListInfo(obj) {
      let querysUser = {
        userId: 3,
        pageNum: this.pageNum,
        pageSize:this.pageSize
      }
      userQuery({
        type: 'get',
        params: querysUser,
      }).then((res) => {
        if(res.errCode === 0) {
          this.tableData = res.data.list;
          this.pageNum = res.data.pageNum;
          this.pageSize = res.data.pageSize;
          this.total = res.data.total;
          this.loading = false;
        } else if(res.errCode === 10110002) {
          this.$router.push(`/login`);
        }
      });
      allRole({
        type: 'get',
      }).then((res) => {
        if(res.errCode === 0) {
          let result = [];
          res.data.forEach(function(ele) {
            result.push({"label": ele.roleName, "value": ele.id});
          })
          this.allRoleList = result;
        } else if(res.errCode === 10110002) {
          this.$router.push(`/login`);
        }
      })
    },
    getRowInfo(id) {
      get({
        type: 'get',
        params: id
      }).then((res) => {
        if(res.errCode === 0) {
          this.curItem = res.data;
          this.roleList = res.data.roleName.split(",");
        } else if(res.errCode === 10110002) {
          this.$router.push(`/login`);
        }
      })
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    onSubmit() {
      let roleIdList = [];
      for(let i = 0; i < this.allRoleList.length; i++) {
        if(this.roleList.indexOf(this.allRoleList[i].label) !== -1) {
          roleIdList.push(this.allRoleList[i].value);
        }
      }
      if(this.dialogType) {
        editUser({
          type: 'put',
          params: { "roleIdList": roleIdList, userId: 1, ...this.curItem }, 
        }).then((res) => {
          if(res.errCode === 0) {
            this.$message({message: "更新账号成功", duration: 3000});
          } else if(res.errCode === 10110002) {
            this.$router.push(`/login`);
          }
        })
      } else {
        createUser({
          type: 'post',
          params: { "roleIdList": roleIdList, userId: 1, ...this.curItem },
        }).then((res) => {
          if(res.errCode === 0) {
            this.$message({message: "创建账号成功", duration: 3000});
          } else if(res.errCode === 10110002) {
            this.$router.push(`/login`);
          }
        })
      }
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.getRowInfo(row.id);
      this.dialogFormVisible = true;
      this.dialogType = true;
    },
    handleDelete(index, row) {
      deleteUser({
        type: "delete",
        params: {"userId": 1, "staffId": row.staffId}
      }).then((res) => {
        if(res.errCode === 0) {
          this.$message({message: "删除账号成功", duration: 3000});
          this.getListInfo({});
        } else if(res.errCode === 10110002) {
          this.$router.push(`/login`);
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getListInfo();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getListInfo();
    },
    addAccount() {
      this.dialogFormVisible = true;
      this.dialogType = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-pagination {
  display: block;
  text-align: center;
  margin: 40px auto;
}
.createPower {
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
