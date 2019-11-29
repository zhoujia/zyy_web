<template>
  <div>
    账号：<input v-model="userName"
           @input='onChangeForm'><br><br>
    密码：<input v-model="password"
           @input='onChangeForm'><br><br>
    昵称：<input v-model="nickName"
           @input='onChangeForm'><br><br>
    备注：<input v-model="description"
           @input='onChangeForm'><br><br>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: 'addUser',
  data () {
    return {
      userName: '',
      password: '',
      nickName: '',
      description: ''
    }
  },
  methods: {
    onChangeForm () {
      this.$emit('onChange', {
        userName: this.userName,
        password: this.password,
        nickName: this.nickName,
        description: this.description
      })
    },
  }
}
</script>