<template>
  <div class="login-container">
    <el-form ref="forgotPasswordForm" :model="forgotPasswordForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-alert
        v-if="alertVisible"
        :title="title"
        type="success"
        show-icon
        effect="dark"
      />
      <div class="title-container">
        <h3 class="title">
          {{ $t('forgot_password.title') }}
        </h3>
      </div>

      <!--<el-form-item prop="username">-->
      <!--<span class="svg-container">-->
      <!--<svg-icon icon-class="user" />-->
      <!--</span>-->
      <!--<el-input-->
      <!--ref="username"-->
      <!--v-model="forgotPasswordForm.username"-->
      <!--:placeholder="$t('forgot_password.username')"-->
      <!--name="username"-->
      <!--type="text"-->
      <!--auto-complete="on"-->
      <!--/>-->
      <!--</el-form-item>-->

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="forgotPasswordForm.email"
          :placeholder="$t('forgot_password.email')"
          name="email"
          type="email"
          auto-complete="on"
        />
      </el-form-item>
      <!--<el-row class="fr margin-bottom-15">-->
      <!--<el-checkbox v-model="loginForm.is_remember" label="Remember me" />-->
      <!--<span class="margin-right-0 link-type font-size-14">Forgot password</span>-->
      <!--</el-row>-->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleReset">
        {{ $t('forgot_password.reset') }}
      </el-button>
      <el-row class="fr margin-bottom-15">
        <router-link :to="'/login'">
          <el-button type="info" icon="el-icon-back">Go Login</el-button>
        </router-link>
      </el-row>
    </el-form>
    <el-dialog :title="$t('login.thirdparty')" :visible.sync="showDialog">
      {{ $t('login.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>
  </div>
</template>

<script>
import { forgotPassword } from '@/api/auth'
export default {
  name: 'ForgotPassword',
  data() {
    var validateEmail = (rule, value, callback) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (value === '') {
        callback(new Error('Please input the email'))
      } else if (!re.test(value)) {
        callback(new Error('Email not correct'))
      } else {
        callback()
      }
    }
    return {
      title: '',
      alertVisible: false,
      forgotPasswordForm: {
        // username: '',
        email: ''
      },
      loginRules: {
        // username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }]
      },
      passwordType: 'password',
      capsTooltip: false,
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
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    handleReset() {
      this.$refs.forgotPasswordForm.validate(valid => {
        if (valid) {
          this.loading = true
          forgotPassword(this.forgotPasswordForm).then(response => {
            this.$notify({
              dangerouslyUseHTMLString: true,
              message: response.message,
              type: 'success'
            })
            this.alertVisible = true
            this.title = response.message
            // this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch((error) => {
            this.$notify({
              message: error.response.data.message,
              type: 'error'
            })
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

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
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
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 18px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 40px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 18px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
