<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div style="background:rgba(4, 4, 4, 0.12);padding:15px">
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">源IP: </span>
      <span class="expand-value">{{ row.ip }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">终端类型: </span>
      <span class="expand-value">{{ row.termType }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">网站分类: </span>
      <span class="expand-value">{{ row.webType }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="16">
      <span class="expand-key">标题: </span>
      <span class="expand-value"
            v-html="row.title"></span>
      </Col>
      <Col span="8">
      <span class="expand-key">访问域名： </span>
      <span class="expand-value">{{ row.domain }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">URL地址: </span>
      <span class="expand-value"><a style="color:#07a6ff"
           :href="row.url"
           target="new">{{ row.url }}</a></span>
      </Col>
      <Col span="8">
      <span class="expand-key">DNS: </span>
      <span class="expand-value">{{ row.nds }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">网页快照: </span>
      <span class="expand-value"><a style="color:#07a6ff"
           :href="row.snapshot"
           target="new">查看</a></span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">终端详情: </span>
      <span class="expand-value">{{ row.termDetail }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">目标IP: </span>
      <span class="expand-value">{{ row.targetIp }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">源端口: </span>
      <span class="expand-value">{{ row.port }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span class="expand-key">访问时间: </span>
      <span class="expand-value">{{ row.time }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">协议: </span>
      <span class="expand-value">{{ row.agreement }}</span>
      </Col>
      <Col span="8">
      <span class="expand-key">MAC地址: </span>
      <span class="expand-value">{{ row.mac }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>
