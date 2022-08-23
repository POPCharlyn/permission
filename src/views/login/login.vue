<template>
  <div class="login-container">
    <div class="login-weaper  animated bounceInDown">
      <div class="login-logo">
        <img src="./loginImages/5.jpg" alt="">
      </div>
      <div class="login-border">
        <div class="login-main">
          <userLogin v-if="activeName==='user'"/>
          <codeLogin v-else-if="activeName==='code'"/>

          <div class="login-menu">
            <a href="#"
               @click.stop="activeName='user'">账号密码</a>
            <a href="#"
               @click.stop="activeName='code'">手机号登录</a>
          </div>
        </div>
      </div>
    </div>
    <div class="login-copyright">
      Copyright © 2021 whale dynamic.com. All rights reserved.
    </div>
  </div>

</template>

<script>
import userLogin from "@/views/login/userlogin";
import codeLogin from "@/views/login/codelogin";

export default {
  name: 'Login',
  components: {
    userLogin,
    codeLogin
  },
  data() {
    return {
      activeName: 'user',
    }
  },
}
</script>
<style lang="scss">
@import "./login.scss";

</style>
