<template>
  <div class="login">
    <div
      class="formCard"
      v-if="login"
      >
      <h3>增长运营后台</h3>
      <p>
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
          placeholder="用户名"
        >
      </p>
      <p class="warning" v-if="usernameWarning">请输入用户名</p>
      <p class="space" v-else></p>
      <p>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          placeholder="密码"
        >
      </p>
      <p class="warning" v-if="passwordWarning">请输入密码</p>
      <p class="space" v-else></p>
      <p>
        <input class="submit" type="submit" value="登录" @click="checkForm">
      </p>
      <p>
      <input class="modifyPassword" type="submit" value="修改密码" @click="modifyPassword">
      </p>
    </div>
    <div
      v-else
      class="formCard"
    >
      <h3>修改密码</h3>
      <p>
        <input
          id="usernameM"
          v-model="usernameM"
          type="text"
          name="usernameM"
          placeholder="用户名"
        >
      </p>
      <p class="warning" v-if="usernameWarningM">请输入用户名</p>
      <p class="space" v-else></p>
      <p>
        <input
          id="password"
          v-model="password"
          type="text"
          name="password"
          placeholder="原密码"
        >
      </p>
      <p class="warning" v-if="passwordWarning">请输入原密码</p>
      <p class="space" v-else></p>
      <p>
        <input
          id="newPassword"
          v-model="newPassword"
          type="text"
          name="newPassword"
          placeholder="新密码"
        >
      </p>
       <p class="warning" v-if="newPasswordWarning">请输入新密码</p>
       <p class="space" v-else></p>
      <p>
        <input class="submit" type="submit" value="保存" @click="preserve">
      </p>
      <p>
        <input class="modifyPassword" type="submit" value="返回登录" @click="backLogin">
      </p>
    </div>
  </div>
</template>
<script>
  import { login } from '@/services/user';
  import Cookie from 'js-cookie';

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        usernameM: '',
        newPassword: '',
        usernameWarning: false,
        login: true,
        usernameWarningM: false,
        passwordWarning: false,
        newPasswordWarning: false
      }
    },
    methods: {
      checkForm() {
        if (this.username === '') {
          this.usernameWarning = true;
        } else {
          this.usernameWarning = false;
        }
        if (this.password === '') {
          this.passwordWarning = true;
        } else {
          this.passwordWarning = false;
        }
        if (this.username !== '' && this.password !== '') {
          login({
            type: 'post',
            params: { username: this.username, password: this.password },
          }).then((res) => {
            if (res.data&&res.data.errCode === 0) {
              const { data } = res.data;
              Cookie.set('staffToken', data.token);
              Cookie.set('staffUserId', data.user.id);
              Cookie.set('staffId', data.user.uuid);
              Cookie.set('staffNickname', data.user.username);
              window.location.href = window.location.origin + '/fe-user-growth/dashboard/userRelation'
            } else if (res.data&&res.data.errCode === 10110002) {
              Cookie.remove('staffToken')
              this.$router.push('/login');
            } else {
              this.$message({ message: '对不起，你和用户名和密码输入错误，请重新输入', duration: 3000 });
            }
          })
        }
      }, 
      modifyPassword() {
        this.login = false;
        this.username = '';
        this.password = '';
        this.passwordWarning = false;
        this.usernameWarning = false;
      },
      preserve() {
        if (this.usernameM === '') {
          this.usernameWarningM = true;
        } else {
          this.usernameWarningM = false;
        }
        if (this.password === '') {
          this.passwordWarning = true;
        } else {
          this.passwordWarning = false;
        }
        if (this.newPassword === '') {
          this.newPasswordWarning = true;
        } else {
          this.newPasswordWarning = false;
        }
        if (this.usernameM !== '' 
          && this.password !== ''
          && this.newPassword !== ''
          ) {
          savePassword({
            type: 'PUT',
            params: {
              username: this.usernameM,
              password: this.password,
              newPassword: this.newPassword
            }
          }).then((res) => {
            if (res.data&&res.data.errCode === 0) {
              this.$message({ message: '修改密码成功', duration: 3000 });
              this.login = true;
            } else if (res.data&&res.data.errCode === 10110002) {
              this.$router.push('/fe-staff/login')
            } else {
              this.$message({ message: '修改密码失败，请重试', duration: 3000 });
            }
          })
        }
      },
      backLogin() {
        this.login = true;
        this.passwordWarning = false;
        this.usernameWarningM = false;
        this.newPasswordWarning = false;
        this.usernameM = '';
        this.password = '';
        this.newPassword = '';
      }
    }
  }
</script>

<style scoped>
html,body,#app {
    height: 100%;
  }
input {
  height: 40px;
  caret-color: #fff;
  padding: 4px 0;
  padding-left: 30px;
  width: 100%;
  text-decoration: none;
  background-color: rgba(0,0,0,.1);
  border: 1px solid hsla(0,0%,100%,.1);
  border-radius: 4px;
  outline: none;
  color: #fff;
}
.formCard p {
  margin: 0;
}
.warning {
  margin: 4px 0;
  color: #f56c6c;
}
.space {
  height: 21.8px;
}
.submit {
  margin-bottom: 20px;
  cursor: pointer;
  padding-left: 0;
  width: 100%;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 4px;
}
input::placeholder {
  color: #fff;
}
h3 {
  font-size: 26px;
  color: #fff;
  text-align: center;
  margin: 0 0 10px 0;
}
.login {
  height: 100%;
  background-color: #2d3a4b;
  min-height: 100vh;
}
.formCard {
  width: 400px;
  margin: 0 auto; 
  padding-top: 160px;
  margin-bottom: 30px;
}
.el-input-inner {
  width: 30%;
}
.modifyPassword {
  cursor: pointer;
  width: 30%;
  background-color: #409eff;
  float: right;
  padding-left: 0;
}
</style>
