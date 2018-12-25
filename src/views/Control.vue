<template>
    <div class="power">
      <h2>角色</h2>
      <div class="createRole" v-show="roleAdd">
        <el-button 
          type="primary"
          size="medium"
          @click="addRole"
          >+创建角色
        </el-button>
        <span>共{{ total }}个角色</span>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="memberName"
          label="角色成员"
          width="450">
        </el-table-column>
        <el-table-column
          label="管理">
          <template slot-scope="scope">
            <el-button v-show="permissionMenu"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">权限管理</el-button>
            <el-button
              size="mini"
              type="danger"
              v-show="roleDelete"
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
          title="添加"
          class="dialog"
          :visible.sync="dialogFormVisible"
          :before-close="handleClose">
          <el-form
            ref="ruleForm"
            :label-position="labelPosition" 
            label-width="100px" 
            :model="curItem">
            <el-form-item label="角色名称：" prop="roleName">
              <el-input v-model="curItem.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色Code：" prop="roleCode">
              <el-input placeholder="请输入英文的角色Code" v-model="curItem.roleCode"></el-input>
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
import { roleQuery, createRole, deleteRole, getRoleDetails } from '@/services/role.js';
import Cookie from "js-cookie";
import { mapState } from 'vuex';

export default {
  name: 'Control',
  data() {
    return {
      showDialog: false,
      tableData: [],
      pageSize: 5,
      pageNum: 1,
      total: 0,
      loading: true,
      labelPosition: "right",
      dialogFormVisible: false,
      curItem: {},
      addLoading: false,
    }
  },
  computed: {
    ...mapState([
      'roleAdd',
      'roleDelete',
      'permissionMenu'
    ])
  },
  props: {

  },
  created() {
 // this.$route的用法
 // 生命周期函数，编译模板前使用
  this.getListInfo({});
  },
  methods: {
    getListInfo(obj) {
      let querysUser = {
          userId: 3,
          pageNum: this.pageNum,
          pageSize: this.pageSize
      }
      roleQuery({
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
            this.$router.push(`/fe-staff/login`);
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
    addRole() {
      this.dialogFormVisible = true; 
    },
    handleDelete(index, row) {
      deleteRole({
        type: 'delete',
        params:{userId: 1, id: row.id}
      }).then((res) => {
        if(res.errCode === 0) {
          this.$message({message: '删除角色成功', duration: 3000})
        } else if(res.errCode === 10110002 ) {
          this.$router.push(`/fe-staff/login`);
        }
      })
      this.getListInfo({});
    },
    onSubmit() {
      createRole({
        type: 'post',
        params:{userId: 1, ...this.curItem}
      }).then((res) => {
        if(res.errCode === 0) {
          this.$message({message: "添加角色成功", duration: 3000});
        } else if(res.errCode === 10110002) {
          this.$router.push(`/fe-staff/login`);
        }
      })
      this.dialogFormVisible = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.$router.push(`/fe-staff/authority?id=${row.id}`);
    }
  }
}
</script>

<style scoped>
.el-pagination {
  display: block;
  text-align: center;
  margin: 40px auto;
}
.createRole {
  margin-bottom: 20px;
}
</style>