<template>
  <div class="power">
    <h2>用户</h2>
    <div class="search">
      <div class="item-input"> 
        <span>按账号id查询：</span> 
        <el-input
          size="small"
          placeholder="请输入账号id"
          v-model="id">
        </el-input>
      </div>
      <div class="item-input">
        <span>按花名查询：</span>
        <el-input
          size="small"
          placeholder="请输入花名"
          v-model="nickname">
        </el-input>
      </div>
      <div class="item-input">
        <span>按账号查询：</span>
        <el-input
          size="small"
          placeholder="请输入账号"
          v-model="username">
        </el-input>
      </div>
    </div>
    <div class="search-radio">
      <span>员工是否关联：</span>
      <template>
        <el-radio v-model="hasStaff" label="1">已关联员工</el-radio>
        <el-radio v-model="hasStaff" label="0">未关联员工</el-radio>
      </template>
      <span style="margin-left: 200px">状态：</span>
      <template>
        <el-radio v-model="accountStatus" label="1">正常</el-radio>
        <el-radio v-model="accountStatus" label="2">禁用</el-radio>
      </template>
    </div>
    <div class="createPower" >
      <el-button
        v-show="userAdd" 
        type="primary"
        size="medium"
        @click="addAccount"
        >添加
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="search"
        >查询
      </el-button>
      <el-button
        type="primary"
        size="medium"
        @click="reset"
        >重置
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="100"
        >
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="花名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="username"
        label="对应账号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        label="使用员工">
        <template slot-scope="scope">
          <span>{{ scope.row.staffInfo ? scope.row.staffInfo.name: '————' }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.deleteStatus === '1'">正常</span>
          <span style="color:red" v-if="scope.row.deleteStatus === '2'">禁用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="管理">
        <template slot-scope="scope">
          <el-button v-show="userUpdate"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="isUse(scope.$index, scope.row)"
            v-show="scope.row.deleteStatus !== '3'">
            {{scope.row.deleteStatus === '2' ?'启用':
            scope.row.deleteStatus === '1' ? '禁用' : '---'
            }}</el-button>
          <el-button v-show="userDelete"
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
          <el-input v-model="curItem.username"></el-input>
        </el-form-item>
        <el-form-item label="花名：" prop="nickname">
          <el-input v-model="curItem.nickname"></el-input>
        </el-form-item>
        <el-form-item label="所属角色：" prop="roleList">
          <el-checkbox-group 
            v-model="roleList"
            :min="1">
            <el-checkbox v-for="role in allRoleList" :label="role.label" :key="role.value">{{role.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="员工信息：">
          <div style="display: flex; align-items: center">
            <div v-show="curItem.staffInfo || JSON.stringify(newStaffInfo) !== '{}'">
              <p>姓名 :{{newStaffInfo.name ? newStaffInfo.name : curItem.staffInfo&&curItem.staffInfo.name}}</p>
              <p>手机号 :{{newStaffInfo.phone ? newStaffInfo.phone : curItem.staffInfo&&curItem.staffInfo.phone}}</p>
              <p>邮箱 :{{newStaffInfo.email ? newStaffInfo.email : curItem.staffInfo&&curItem.staffInfo.email }}</p>
            </div>
            <el-button
              style="height: 30px;margin-left:80px"
              size="mini"
              type="primary"
              @click="modifyStaffInfo">
              {{curItem.staffInfo || JSON.stringify(newStaffInfo) !== '{}' ? '更换员工':'绑定员工'}}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="addLoading" @click="onSubmit">确定</el-button>
      </span>
      <div style="margin-left: 20px" v-show="dialogType">账号历史使用记录</div>
      <el-table
        v-show="dialogType"
        v-loading="loading"
        :data="accountHistory"
        stripe
        style="width: 90%; margin-left: 20px">
        <el-table-column
          prop="createTime"
          label="时间"
          width="200">
          <template slot-scope="scope">
            <span>{{ handleMoment(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="员工ID">
          <template slot-scope="scope">
            <span>{{scope.row.staffInfoVo&&scope.row.staffInfoVo.id ? scope.row.staffInfoVo.id : "----"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="staffInfoVo"
          label="员工姓名">
          <template slot-scope="scope">
            <span>{{scope.row.staffInfoVo&&scope.row.staffInfoVo.name ? scope.row.staffInfoVo.name : "----"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="staffInfoVo"
          label="员工手机号">
          <template slot-scope="scope">
            <span>{{scope.row.staffInfoVo&&scope.row.staffInfoVo.phone ? scope.row.staffInfoVo.phone : "----"}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operateType"
          label="类型">
          <template slot-scope="scope">
            <span>{{scope.row.operateType === 'create' ? 
            '新建': scope.row.operateType === 'unbind' ?
            '解绑': '交接'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operatorName"
          label="操作人">
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="选择员工"
      class="dialog"
      style="width: 80%"
      v-if="selectStaffVisible"
      :visible.sync="selectStaffVisible"
      :before-close="closeSelectStaff">
        <span>员工姓名：</span> 
        <el-input
          class="search-staff"
          size="small"
          placeholder="请输入员工姓名"
          v-model="staffName">
        </el-input>
        <span style="margin-left: 180px">员工手机号：</span>
        <el-input
          class="search-staff"
          size="small"
          placeholder="请输入员工手机号"
          v-model="staffPhone">
        </el-input>
        <div style="display:flex; margin:15px 0 15px 0">
          <span style="display:block">员工邮箱：</span>
          <el-input
            size="small"
            class="search-staff"
            placeholder="请输入员工邮箱"
            v-model="staffEmail">
          </el-input>
          <el-button
            style="margin-left: 180px"
            type="primary"
            size="mini"
            @click="searchStaff">
            查询
          </el-button>
        </div>
      <el-table
        v-loading="loading"
       :data="staffData"
        stripe
        border
        style="width: 100%; margin-bottom: 10px"
        >
        <el-table-column
          prop="id"
          label="id"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="员工姓名"
          width="125">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="员工手机号"
          width="155">
        </el-table-column>
        <el-table-column
          prop="email"
          label="员工邮箱"
          width="230">
        </el-table-column>
        <el-table-column
          label="操作"
          width="115">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="selectStaff(scope.$index, scope.row)">
              选择
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="staffPagination"
        small
        layout="prev, pager, next"
        @current-change="handleCurrentChangeStaff"
        prev-text="上一页"
        next-text="下一页"
        :page-size="staffPageSize"
        :total="staffTotal">
      </el-pagination>
      <p>
        新教师还未添加？点击
        <span 
          style="color: #409EFF; cursor: pointer"
          @click="addStaff"
        >添加新员工信息。</span>
      </p>
    </el-dialog>
    <el-dialog
      title="添加员工"
      class="dialog"
      style="width: 80%"
      :visible.sync="addStaffVisible"
      :before-close="closeAddStaff">
      <el-form
        ref="ruleForm"
        :label-position="labelPosition" 
        label-width="100px" 
        :model="addStaffData">
        <el-form-item label="员工姓名：" prop="name">
          <el-input v-model="addStaffData.name"></el-input>
        </el-form-item>
        <el-form-item label="员工手机：" prop="phone">
          <el-input v-model="addStaffData.phone"></el-input>
        </el-form-item>
        <el-form-item label="员工邮箱：" prop="email">
          <el-input v-model="addStaffData.email"></el-input>
        </el-form-item>
        <el-form-item label="员工性别：">
          <template>
            <el-radio v-model="gender" label="1">男</el-radio>
            <el-radio v-model="gender" label="0">女</el-radio>
          </template>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddStaff">取消</el-button>
        <el-button type="primary" @click="submitStaffInfo">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { 
  staffQuery, 
  userQuery, 
  roleQuery, 
  get, 
  allRole, 
  editUser, 
  deleteUser, 
  createUser,
  bindStaff,
  accountStaff,
  addStaffInfo 
} from '@/services/user.js';
import Cookie from "js-cookie";
import moment from "moment";
import { mapState } from 'vuex';
import { 
  Input, 
  Select, 
  Option 
} from 'iview';

export default {
  name: 'Power',
  props: {
  },
  computed: {
    ...mapState([
        'userAdd',
        'userDelete',
        'userUpdate'
    ])
  },
  data() {
    return {
      staffInfoId: null,
      addStaffData: {},
      gender: 2,
      addStaffVisible:false,
      accountHistory:[],
      staffData:[],
      newStaffInfo:{},
      selectStaffVisible:false,
      staffTotal:0,
      staffPageSize: 5,
      staffPageNum: 1,
      staffName:'',
      staffPhone:'',
      staffEmail:'',
      id: '',
      username: '',
      nickname: '',
      hasStaff: null,
      accountStatus: null,
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
      curItem: {},
      allRoleList: [],
      roleList: [],
      dialogType: false
    }
  },
  created() {
   this.getListInfo(true);
  },
  components: {
    Input,
    Select,
    Option
  },
  methods: {

    isUse(index, row) {
      let deleteStatus = 1;
      if(row.deleteStatus === '1') {
        deleteStatus = 2;
      } 
      editUser({
          type: 'put',
          params: { 
            id: row.id,
            deleteStatus,
            }, 
        }).then((res) => {
          if(res.errCode === 0) {
            this.getListInfo();
          } else if(res.errCode === 10110002) {
            this.$router.push(`/fe-staff/login`);
          }
        })
    },
    handleMoment(timestamp) {
      let arr = moment(timestamp).format("L").split('/');
      return arr[2] + '-' + arr[0] + '-' + arr[1];
    },
    getListInfo(obj) {
      let querysUser = {
        pageNum: this.pageNum,
        pageSize:this.pageSize,
        id:this.id === '' ? '' : Number(this.id),
        username:this.username,
        nickname:this.nickname,
        hasStaff: this.hasStaff === null ? null : Number(this.hasStaff),
        accountStatus: Number(this.accountStatus) || null
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
          this.$router.push(`/fe-staff/login`);
        }
      });
      if(obj) {
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
            this.$router.push(`/fe-staff/login`);
          }
        })
      }
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
          this.$router.push(`/fe-staff/login`);
        }
      })
      accountStaff({
        type: 'get',
        params: {accountId:id,}
      }).then((res) => {
        if(res.errCode === 0) {
          this.accountHistory = res.data;
        } else if(res.errCode === 10110002) {
          this.$router.push(`/fe-staff/login`);
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
          params: { 
            "roleIdList": roleIdList,
            id: this.curItem.id, 
            username: this.curItem.username,
            nickname: this.curItem.nickname,
            staffInfoId: this.staffInfoId,
            operatorId: Number(Cookie("staffUserId"))
          } 
        }).then((res) => {
          if(res.errCode === 0) {
            this.$message({message: "更新账号成功", duration: 3000});
            this.getListInfo();
          } else if(res.errCode === 10110002) {
            this.$router.push(`/fe-staff/login`);
          }
        })
          this.$message({message: "请稍等...", duration: 8000});
      } else {
        createUser({
          type: 'post',
          params: { 
            "roleIdList": roleIdList, 
            username: this.curItem.username,
            nickname: this.curItem.nickname,
            staffInfoId: this.staffInfoId,
            operatorId: Number(Cookie("staffUserId"))
          }
        }).then((res) => {
          if(res.errCode === 0) {
            this.$message({message: "创建账号成功", duration: 3000});
            this.getListInfo();
          } else if(res.errCode === 10110011) {
            this.$message({message: "该账号已经存在，请勿重复添加", duration: 3000});
          } else if(res.errCode === 10110002) {
            this.$router.push(`/fe-staff/login`);
          }
        })
        this.$message({message: "请稍等...", duration: 8000});
      }
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      this.newStaffInfo = {};
      this.getRowInfo(row.id);
      this.dialogFormVisible = true;
      this.dialogType = true;
    },
    handleDelete(index, row) {
      this.$confirm('你确定要删除该账号吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          deleteUser({
            type: "delete",
            params: {id:row.id}
          }).then((res) => {
          if(res.errCode === 0) {
            this.$message({
              message: "删除账号成功", 
              duration: 3000
            });
            this.getListInfo();
          } else if(res.errCode === 10110002) {
            this.$router.push(`/fe-staff/login`);
          }
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '删除取消'
          // });
        })
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
    handleCurrentChangeStaff(val) {
      this.staffPageNum = val;
      this.getStaffInfo();
    },
    addAccount() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.curItem = {};
      this.roleList = [];
      this.newStaffInfo = {};
      this.dialogFormVisible = true;
      this.dialogType = false;
    },
    search() {
      this.pageNum = 1;
      this.pageSize = 5;
      this.getListInfo();
    },
    reset() {
      this.id = '';
      this.username = '';
      this.nickname = '';
      this.hasStaff = null;
      this.accountStatus = null;
      this.pageNum = 1;
      this.pageSize = 5;
      this.getListInfo();
    },
    modifyStaffInfo() {
      this.dialogFormVisible = false;
      this.getStaffInfo();  
    },
    getStaffInfo() {
      let querys = {
        pageNum:this.staffPageNum,
        pageSize:this.staffPageSize,
        name:this.staffName,
        phone:this.staffPhone,
        email:this.staffEmail
      }
      staffQuery({
        type: "get",
        params: querys
      }).then((res) => {
        if(res.errCode === 0) {
          this.staffData = res.data.list;
          this.staffPageNum = res.data.pageNum;
          this.staffPageSize = res.data.pageSize;
          this.staffTotal = res.data.total;
          this.$nextTick(function() {
            this.selectStaffVisible = true;
          });
        } else if(res.errCode === 10110002) {
          this.$router.push(`/fe-staff/login`);
        }
      })  
    },
    selectStaff(index, row) {
      this.selectStaffVisible = false;
      this.staffInfoId = row.id;
      this.dialogFormVisible = true;
      this.newStaffInfo = row;
    },
    closeSelectStaff() {
      this.dialogFormVisible = true;
      this.selectStaffVisible = false;
    },
    searchStaff() {
      this.staffPageNum = 1;
      this.getStaffInfo();
    },
    // 关闭添加员工信息弹窗
    closeAddStaff() {
      this.addStaffVisible = false;
      this.selectStaffVisible = true;
    },
    // 添加新员工信息
    addStaff() {
      this.addStaffData = {};
      this.addStaffVisible = true;
      this.selectStaffVisible = false;
    },
    submitStaffInfo() {
      if(this.addStaffData.name === '' || undefined) {
        this.$message({message: "员工姓名不能为空，请重新填写", duration: 3000});
      } else if(!/^1[34578]\d{9}$/.test(this.addStaffData.phone)) {
        this.$message({message: "填写手机号格式有误，请重新填写", duration: 3000});
      } else if(!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.addStaffData.email)) {
        this.$message({message: "填写的邮箱格式有误，请重新填写", duration: 3000});
      } else {
        addStaffInfo({
          type: "POST",
          params: {
            ...this.addStaffData, 
            gender:this.gender
          }
        }).then((res) => {
          if(res.errCode === 0) {
            this.closeAddStaff();
            this.$message({message: "添加员工信息成功", duration: 3000});
            this.modifyStaffInfo();
          } else if(res.errCode === 10110002) {
            this.$router.push(`/fe-staff/login`);
          }
        })
      }
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
.staffPagination {
  margin-top: 0.5px;
  float: right;
}
.createPower {
  margin: 20px 0 20px 0;
}
.search {
  display: flex;
  margin-bottom: 20px; 
}
.item-input {
  width: 35%;
  display: flex;
  align-items: baseline;
}
.el-input {
  width: 60%;
}
.search-staff {
  width: 20%;
}
.el-table td, 
.el-table th {
  padding: 6px 0;
}
</style>
