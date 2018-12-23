<template>
  <div class="login">
    <div
      class="formCard"
      >
      <h3>用户后台登录</h3>
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
      <p class="space" v-else="usernameWarning"></p>
      <p>
        <input
          id="password"
          v-model="password"
          name="password"
          placeholder="密码"
        >
      </p>
      <p class="warning" v-if="passwordWarning">请输入密码</p>
      <p class="space" v-else="passwordWarning"></p>
      <p>
        <input class="submit" type="submit" value="登录" @click="checkForm">
      </p>
      <p>
      <input class="modifyPassword" type="submit" value="修改密码" @click="modifyPassword">
      </p>
    </div>
  </div>
</template>
<script>
  import { login } from '@/services/login.js';
  import Cookie from 'js-cookie';
  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        usernameWarning: false,
        passwordWarning: false
      }
    },
    methods: {
      checkForm() {
        if(this.username === '') {
          this.usernameWarning = true;
        } else {
          this.usernameWarning = false;
        }
        if(this.password === '') {
          this.passwordWarning = true;
        } else {
          this.passwordWarning = false;
        }
        if(this.username !== '' && this.password !== '') {
          login({
            type: 'post',
            params: { username: this.username, password: this.password },
          }).then((res) => {
            if(res.errCode === 0) {
              Cookie.set('staffToken', res.data.token);
              Cookie.set('staffUserId', res.data.user.id);
              Cookie.set('staffId', res.data.user.staffId);
              Cookie.set('staffNickname', res.data.user.username);
              this.$router.push(`/power`);
            } else if(res.errCode === 10110002) {
              this.$router.push(`/login`);
            } else {
              this.$message({message: "对不起，你和用户名和密码输入错误，请重新输入", duration: 3000});
            }
          })
        }
      }, 
      modifyPassword() {
        
      }
    }
  }
</script>

<style>
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
.modifyPassword {
  cursor: pointer;
  width: 60%;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 4px;
  margin: 0 0 0 190px;
  padding-left: 0;
}
.formCard p {
  margin: 0;
}
.warning {
  margin: 4px 0;
  color: #f56c6c;
}
.space {
  height: 18px;
}
.submit {
  margin-bottom: 20px;
  cursor: pointer;
  padding-left: 0;
  width: 108%;
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
  margin-top: 0;
}
.login {
  height: 100%;
  background-color: #2d3a4b;
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
.el-button {
  display: block;
  padding: 10px 100px; 
}
</style>