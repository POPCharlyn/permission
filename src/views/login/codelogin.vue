<template>
  <el-form ref="loginForm"
           :model="form"
           :rules="loginRules"
           status-icon
           label-width="0"
           @keydown.enter.native="handleSubmit"
           class="login-form"
  >
    <el-form-item prop="mobile">
      <el-input v-model="form.mobile"
                size="small"
                auto-complete="off"
                placeholder="请输入手机号码">
        <i slot="prefix" class="el-input__icon el-icon-mobile-phone"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="smsCode">
      <el-input
        type="password"
        v-model="form.code"
        size="small"
        auto-complete="off"
        placeholder="请输入验证码"
      >
        <i slot="prefix" class="el-input__icon el-icon-chat-line-round"></i>
        <template slot="append">
          <span :class="[{display:msgKey}]" class="msg-text" @click="handleSend">{{ msgText }}</span>
        </template>
      </el-input>
    </el-form-item>
    <!--    <el-form-item>
                        <el-checkbox v-model="form.auto">自动登录</el-checkbox>
                        <el-button href="#" style="float: right">忘记密码</el-button>
        </el-form-item>-->
    <el-form-item>
      <el-button @click="handleSubmit" class="login-submit" :loading="loading" type="primary" long size="small">登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import {mapActions} from "vuex";

const MSGINIT = "发送验证码",
  MSGSCUCCESS = "${time}秒后重发",
  MSGTIME = 60;

// import {isvalidatemobile} from "@/libs/validate"
// import {code} from "@/api/user"

export default {
  name: "Codelogin",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value.length != 4) {
        callback(new Error("请输入4位数的验证码"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      form: {
        mobile: "",
        code: "",
      },
      loginRules: {
        mobile: [{required: true, trigger: "blur", validator: validatePhone}],
        code: [{required: true, trigger: "blur", validator: validateCode}],
      },
    };
  },
  methods: {
    // ...mapActions([
    //   'handleLogin',
    //   'getUserInfo'
    // ]),
    handleSend() {
      // 判断是否可以发送（时间限制）
      if (this.msgKey) return;
      // 发送验证码
      this.$refs.loginForm.validateField("mobile", (valid) => {
        if (!valid) {
          code({type: 1, phone: this.form.mobile}).then(res => {
            console.log("返回结果", res)
            this.$message.success("验证码发送成功");
            this.timeCacl();
          });
        }
      });
    },
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          let username = this.form.mobile
          let code = this.form.code
          let auto = this.form.auto
          let password = "";
          this.handleLogin({username, password, code, auto}).then(res => {
            this.$router.push({
              name: this.$config.homeName
            })
          }).finally(() => {
            this.loading = false
          })
        }
      });
    },
    timeCacl() {
      // 计时避免重复发送
      this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
      this.msgKey = true;
      const time = setInterval(() => {
        this.msgTime--;
        this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
        if (this.msgTime === 0) {
          this.msgTime = MSGTIME;
          this.msgText = MSGINIT;
          this.msgKey = false;
          clearInterval(time);
        }
      }, 1000);
    },
  },
};
</script>

<style>
.msg-text {
  display: block;
  width: 60px;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  border: 1px;
}

.msg-text.display {
  color: #ccc;
  border: 1px;
}
</style>

