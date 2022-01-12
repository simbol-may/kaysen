<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">凯信公众号管理系统</div>
      <div style="padding: 20px 60px">
        <el-form-item prop="userCode">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.userCode"
            placeholder="账号"
            size="mini"
            name="username"
            type="text"
            tabindex="1"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            size="mini"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; border: none; background-color: rgb(217, 0, 27)"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </div>
    </el-form>
    <div class="bottom">
      <a href="https://beian.miit.gov.cn" target="_blank"
        >粤ICP备2022003559号-1</a
      >
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码的长度不能小于6'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userCode: '',
        password: '',
      },
      loginRules: {
        userCode: [
          { required: true, trigger: 'blur', validator: validateUsername },
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store
        .dispatch('user/login', this.loginForm)
        .then(() => {
          // this.$router.push('/home')

          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #000;
$cursor: #000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('../../assets/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgb(232, 240, 254);
    border-radius: 5px;
    color: #454545;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.8);
    height: 23px;
    font-size: 14px;
    display: table;
    a {
      display: table-cell;
      vertical-align: middle;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #fff;
  overflow: hidden;

  .login-form {
    position: absolute;
    top: 50%;
    top: 100px;
    right: 10%;
    width: 400px;
    background-color: #f2f2f2;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    background-color: #fff;
    vertical-align: middle;
    width: 40px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: rgba(0, 0, 0, 0.561);
    font-size: 24px;
    font-weight: bold;
  }
  .logo {
    width: 150px;
    position: absolute;
    left: 280px;
    top: 30px;
    img {
      width: 150px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
