<style lang="less" scoped>
.home-container {
}
</style>
<template>
  <div>
    <Alert type="success"
           show-icon
           closable>
      你好，{{user}}
      <span slot="desc">欢迎使用中医药大学大数据分析系统 </span>
    </Alert>
    <Row :gutter="16">
      <Col span="6">
      <Card :bordered="false">
        <p slot="title">用户数</p>
        <count-up style="color: #dc9387;font-size:50px"
                  :end='data1'></count-up>
      </Card>
      </Col>
      <Col span="6">
      <Card :bordered="false">
        <p slot="title">宗教类别</p>
        <count-up style="color: #dc9387;font-size:50px"
                  :end='data2'></count-up>
      </Card>
      </Col>
      <Col span="6">
      <Card :bordered="false">
        <p slot="title">访问系数</p>
        <count-up style="color: #dc9387;font-size:50px"
                  :end='data3'></count-up>
      </Card>
      </Col>
      <Col span="6">
      <Card :bordered="false">
        <p slot="title">访问系数</p>
        <count-up style="color: #dc9387;font-size:50px"
                  :end='data4'></count-up>
      </Card>
      </Col>
    </Row>

  </div>
</template>
<script>
import { readUser } from '@/libs/cookie'
import countUp from '@/components/count/index.js'
export default {
  components: {
    countUp
  },
  data () {
    return {
      user: readUser(),
      data1: 56,
      data2: 7,
      data3: 6254,
      data4: 56566
    }
  },
  methods: {
  }
}
</script>


