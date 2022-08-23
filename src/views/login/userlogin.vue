<template>
  <el-form ref="loginForm"
           :model="form"
           :rules="rules"
           status-icon
           label-width="0"
           @keydown.enter.native="handleSubmit"
           class="login-form"
  >
    <el-form-item prop="username">
      <el-input v-model="form.username"
                size="small"
                auto-complete="off"
                placeholder="请输入用户名"
      >
        <i slot="prefix" class="el-input__icon el-icon-user"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="form.password"
        size="small"
        auto-complete="off"
        placeholder="请输入密码"
      >
        <i slot="prefix" class="el-input__icon el-icon-lock"></i>
      </el-input>
    </el-form-item>
    <!--    <el-form-item>-->
    <!--        <el-checkbox v-model="form.auto">自动登录</el-checkbox>-->
    <!--        <el-button href="#" style="float: right">忘记密码</el-button>-->
    <!--    </el-form-item>-->
    <el-form-item>
      <el-button @click="handleSubmit" class="login-submit" :loading="loading" type="primary" long size="small">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import {mapActions} from 'vuex'
const Base64 = require('js-base64').Base64

export default {
  name: 'LoginForm',
  data() {
    return {
      loading: false,
      form: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[ formName ].validate((valid) => {
        if ( valid ) {
          let password = Base64.encode(this.form.password)
          this.setCookie(this.form.username, password, 7)
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    setCookie(username, password, days) {
      let date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * days)
      window.document.cookie = 'username' + '=' + username + ' ; path = / ; expires = ' + date.toGMTString()
      window.document.cookie = 'password' + '=' + password + ' ; path = / ; expires = ' + date.toGMTString()
    },
    getCookie() {
      if ( document.cookie.length > 0 ) {
        let arr = document.cookie.split(';')
        for ( let i = 0; i < arr.length; i++ ) {
          let arr2 = arr[ i ].split('=')
          if ( arr2[ 0 ] === 'username' ) {
            this.form.username = arr2[ i ]
          } else if ( arr2[ 0 ] === 'password' ) {
            this.form.password = Base64.decode(arr2[ i ])
          }
        }
      }
    },
    handleClick(type) {
      let url = this.config[ type ]
      if ( !url ) return
      this.openWin(url, type, 650, 500)
    },
    openWin(url, name, iWidth, iHeight) {
      //获得窗口的垂直位置
      var iTop = (window.screen.availHeight - 30 - iHeight) / 2
      //获得窗口的水平位置
      var iLeft = (window.screen.availWidth - 10 - iWidth) / 2
      window.open(url, name, 'height=' + iHeight + ',innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no')
    }
    // handleSubmit() {
    //
    //
    //
    //   this.$refs.loginForm.validate((valid) => {
    //     if ( valid ) {
    //       this.loading = true
    //       let username = this.form.username
    //       let password = this.form.password
    //       let auto = this.form.auto
    //       let code = ''
    //       this.handleLogin({ username, password, code, auto }).then(res => {
    //         this.$router.push({
    //           name: this.$config.homeName
    //         })
    //       }).finally(() => {
    //         this.loading = false
    //       })
    //     }
    //   })
    // }
  },
  mounted: function() {
    this.getCookie()
    let username = localStorage.getItem('username')
    if ( username ) {
      this.form.username = localStorage.getItem('username')
      this.form.password = Base64.decode(localStorage.getItem('password'))
    }
  }
}
</script>

