<style lang="less" scoped>
.home-container {
}
</style>
<template>
  <section class="home-container">
    <MasterPage title="用户信息">
      <div slot="title-icon">
        <Icon size=25
              type="ios-contact" />
      </div>
      <div slot="title-toolbar">
        <Button type="primary"
                @click="updaPWD"
                icon="ios-unlock">修改密码</Button>
      </div>
      <div slot="paddingContent">
        <Row>
          <Col span="8">
          <Card :padding="0"
                shadow
                style="width: 100%;">
            <CellGroup>
              <Cell title="用户名"
                    :extra="username" />
              <Cell title="创建时间"
                    extra="2018/12/05 12:45:21" />
              <Cell title="最近登录时间"
                    extra="2019/01/05 16:20:05" />
            </CellGroup>
          </Card>
          </Col>
        </Row>
        <Modal v-model="show"
               title="用户修改密码">
          <Input v-model="value"
                 type="password"
                 placeholder="请输入新密码" />
          <Input style="margin-top:15px"
                 type="password"
                 v-model="value2"
                 placeholder="请再次输入新密码" />
          <div slot="footer">
            <Button type="text"
                    size="large"
                    @click="modalCancel">取消</Button>
            <Button type="primary"
                    size="large"
                    @click="ok">确定</Button>
          </div>
        </Modal>
      </div>

    </MasterPage>
  </section>
</template>
<script>
import MasterPage from '@/components/Master'
import { readUser } from '@/libs/cookie'
export default {
  components: {
    MasterPage
  },
  data () {
    return {
      username: readUser(),
      value2: '',
      value: '',
      show: false
    }
  },
  methods: {
    updaPWD () {
      this.show = true
    },
    ok () {
      if (this.value == '' || this.value2 == '') {
        this.$Message.warning('请输入新密码！');
        return false
      }
      if (this.value != this.value2) {
        this.$Message.warning('新密码不一致，请重新输入！');
        return false
      }
      this.show = false
      this.update()
    },
    modalCancel () {
      this.show = false
    },
    update () {
      //更新密码
    }
  }
}
</script>


