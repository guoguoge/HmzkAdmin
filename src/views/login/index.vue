<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="top" status-icon>
      <div class="logo-container">
        <img src="../../assets/logo.png" width="100%">
      </div>

      <div class="title-container">
        <h3 class="title">
          {{ $t('login.title') }}
        </h3>
      </div>

      <el-form-item prop="username" label="管理员账号">
        <el-input v-model="loginForm.username" :placeholder="$t('login.username')" size="large" name="username" type="text" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password" label="账号密码">
        <el-input v-model="loginForm.password" :type="passwordType" :placeholder="$t('login.password')" size="large" name="password" auto-complete="on" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" class="beesbit-btn" size="large" type="primary" style="width:100%;margin-top:30px;" @click.native.prevent="handleLogin">
        {{ $t('login.logIn') }}
      </el-button>

    </el-form>

  </div>
</template>

<script>
import {
  isvalidUsername
} from '@/utils/validate'
import SocialSign from './socialsignin'

export default {
  name: 'Login',
  components: {
    SocialSign
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入正确的管理员账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码至少为6位数以上'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{
          trigger: 'blur',
          validator: validateUsername
        }],
        password: [{
          trigger: 'blur',
          validator: validatePassword
        }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)

  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  mounted() {
    const lang = 'zh'
    this.$i18n.locale = lang
    this.$store.dispatch('setLanguage', lang)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({
              path: '/'
            })
            console.log(12321)
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #212121;
$cursor: #fff;
/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 100%;
    }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #4D4F5C;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    background-image: url("../../assets/loginbackground.svg");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
    overflow: hidden;
    .login-form {
        position: relative;
        width: 480px;
        max-width: 100%;
        padding: 220px 35px 0;
        margin: 0 auto;
        overflow: hidden;
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }
    .logo-container {
        position: relative;
        text-align: center;
        img {
            margin-bottom: 4rem;
            width: 8rem;
            height: 8rem;
        }
    }
    .title-container {
        position: relative;
        .title {
            font-size: 20px;
            color: $light_gray;
            margin: 0 auto 40px;
            text-align: center;
            font-weight: bolder;
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
