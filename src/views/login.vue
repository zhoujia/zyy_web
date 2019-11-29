<template>
  <div class="page">
    <div class="login">
      <div class="login-from">
        <Card :bordered="false"
              dis-hover>
          <p slot="title">用户登录</p>
          <div style="padding:10px;">
            <Input prefix="ios-contact"
                   clearable
                   type="text"
                   v-model="userName"
                   placeholder="请输入用户名" />
            <Input prefix="ios-lock"
                   clearable
                   type="password"
                   @on-enter="login"
                   v-model="userPwd"
                   placeholder="请输入密码"
                   style="margin-top:15px;margin-bottom:15px" />
            <Button @click="login"
                    type="success"
                    long>登录</Button>
            <Button @click="forgetPwd"
                    style="float:right"
                    size="small"
                    type="text">忘记密码？</Button>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import { writeToken, writeUser, setCookie, getCookie } from '../libs/cookie'
import qs from 'qs'
import { setTimeout } from 'timers';
export default {
  components: {},
  props: {},
  data () {
    return {
      userName: '',
      userPwd: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    forgetPwd () {
      //忘记密码
      this.$Modal.info({
        title: '提示',
        content: '请联系管理员(0379-65956865)找回密码！'
      });
    },
    login () {
      //登录
      if (this.userName == '') {
        this.$Message.warning('用户名不能为空');
        return false
      } else if (this.userPwd == '') {
        this.$Message.warning('用户密码不能为空');
        return false
      } else {
        // ajax 登录接口
        this.$ajax.post('/api/user/login', qs.stringify({
          userName: this.userName,
          password: this.userPwd
        })).then(res => {
          console.log(res.data)
          if (res.data.retCode == 500) {
            this.$Modal.info({
              title: '提示',
              content: '用户未登录，请重新登陆'
            });
            this.$router.replace({ path: '/Login' })
          } else {
            this.$store.commit('set_token', res.data.data.token);
            writeToken(new Date().getTime())
            writeUser(this.userName)
            this.$Message.success('登录成功')
            //setTimeout(() => {
            this.$router.replace({ path: '/' })
            //}, 1000)
          }
          /* if (this.$store.state.token) {
            writeToken(new Date().getTime())
            writeUser(this.userName)
            this.$router.replace({ path: '/' })
            console.log(this.$store.state.token)
          } else {
            this.$router.replace({ path: '/Login' })
          } */
        })
      }
    }
  },
  created () { },
  mounted () {
    /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
    if (getCookie('userName')) {
      writeToken(new Date().getTime())
      writeUser(this.userName)
      this.$router.replace({ path: '/' })
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  .login {
    width: 100vw;
    height: 100vh;
    background: url(../images/login-bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    .login-from {
      position: absolute;
      top: 50%;
      right: 10%;
      width: 400px;
      height: 250px;
      margin-top: -125px;
      background-color: #fff;
    }
  }
}
</style>