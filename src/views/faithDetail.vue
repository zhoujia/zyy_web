<template>
  <div class="index">

    <Head></Head>
    <div style="padding:25px;height:-webkit-calc(100vh - 110px);height:calc(100vh - 110px)">
      <div ref="tab"
           class="box bigdatatable">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
        <div class="line line4"></div>
        <Row style="padding:15px"
             :gutter="16">
          <Col span="6">
          <div class="clearfix"
               style="height:30px;line-height:33px;text-align:left;margin-top:10px">
            <span style="color:#46d225;font-size:15px">搜索IP：</span>
            <i-input placeholder="请输入..."
                     style="width: 250px;margin-top:-10px"
                     v-model="search"
                     @on-enter="searchs"></i-input>
          </div>
          <div class="ipTable">
            <Table highlight-row
                   @on-row-click="currentChange"
                   ref="currentRowTable"
                   size="small"
                   :height="tableHeight"
                   :columns="columns1"
                   :data="data2"></Table>
            <div style="margin: 10px;overflow: hidden">
              <div style="margin:0 auto;color:white">
                <Page :total="total"
                      :page-size="pageSize"
                      show-total
                      simple
                      @on-change="changePage"></Page>
              </div>
            </div>
          </div>

          </Col>
          <Col span="18">
          <div class="clearfix"
               style="height:30px;line-height:33px;text-align:left;margin-top:10px;margin-left:-120px;text-align:center">
            <span style="color:#46d225;font-size:18px;">综合排行榜</span>
          </div>
          <!-- <Button style="position:absolute;right:10px;top:0px"
                  size="small"
                  @click="showMan"
                  type="info"
                  shape="circle"
                  icon="md-body">用户形象分析</Button> -->
          <Table :columns="columns10"
                 :height="tableHeight2"
                 :data="data9"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="totals"
                    :page-size="pageSize"
                    show-total
                    show-elevator
                    class-name="pageTable"
                    :current="1"
                    @on-change="changeDetailPage"></Page>
            </div>
          </div>
          </Col>
        </Row>
      </div>
    </div>
    <Modal v-model="manInfo"
           class-name="vertical-center-modal"
           width="700"
           footer-hide
           title="用户宗教信仰分析">
      <div class="clearfix"
           style="text-align:center;padding:15px;position:relative;background:rgb(6,35,69)">
        <div style="width:60%;height:1px;background:#47c6dc;position:absolute;top:49%;left:20%"></div>
        <div style="width: 1px;height: 140%;background:#47c6dc;position: absolute; top: -75px;left: 50%;transform: rotate(55deg);"></div>
        <div style="width: 1px;height: 140%;background:#47c6dc;position: absolute; top: -72px;left: 50%;transform: rotate(125deg);"></div>
        <div style="float:left;width:20%;position:relative;z-index:2;background: #fff;background:rgb(6,35,69);color:white;border-radius:20px">
          <span>
            <Icon size=18
                  type="md-clock" />访问时长562小时</span><br><br><br><br><br><br><br><br>
          <span>
            <Icon size=18
                  type="ios-archive" />访问次数689次</span><br><br><br><br><br><br><br><br>
          <span>
            <Icon size=18
                  type="ios-flag" />关键词命中5个</span><br>
        </div>
        <div style="float:left;width:60%;padding:10px;position:relative;z-index:2;">
          <img src="../images/12820658443598481537.jpg"
               alt=""
               style="width:80%;height:80%">
          <p>用户ip:{{this.check && this.check[0].srcIP}}</p>
        </div>
        <div style="float:left;width:20%;position:relative;z-index:2; background: #fff;background:rgb(6,35,69);color:white;border-radius:20px">
          <span>
            <Icon size=18
                  type="ios-film" />观看视频6个</span><br><br><br><br><br><br><br><br>
          <span>
            <Icon size=18
                  type="ios-chatbubbles" />>聊天传播65次</span><br><br><br><br><br><br><br><br>
          <span>
            <Icon size=18
                  type="md-mail" />邮件收发6次</span><br>
        </div>

      </div>
    </Modal>
  </div>
</template>
<script>
import Head from '../components/headtwo'
import expandRow from '../components/table-expand'
export default {
  components: { expandRow, Head },
  data () {
    return {
      manInfo: false,
      search: '',
      ips: '',
      id: 0,
      ids: [],
      check: '',
      ids2: [],
      checks: '',
      tableHeight: '',
      tableHeight2: '',

      columns1: [
        {
          title: '#',
          key: 'id',
          width: 50
        },
        {
          title: 'IP地址',
          key: 'ip'
        },
        {
          title: '访问次数',
          key: 'num',
          width: 100
        }
      ],
      data2: [],
      total: 0,
      page: 1,
      pageSize: 15,
      query: {
        startTime: '',
        endTime: ''
      },
      columns10: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          title: '网站URL',
          key: 'url'
        },
        {
          title: '网页标题',
          key: 'title',
          type: 'html'
        },
        {
          title: '终端类型',
          width: 100,
          key: 'termType',

        },
        {
          title: '访问时间',
          width: 200,
          key: 'time',
          sortable: true,

        }
      ],
      data9: [],
      totals: 0,
      detailPage: 1,
      _created: false
    }
  },
  created () {
    this.Drawer = false
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    setTimeout(() => {
      loading.close();
    }, 2000);
    this.sends()
  },
  mounted () {
    this.tableHeight = this.$refs.tab.offsetHeight - 2 - 30 - 80
    this.tableHeight2 = this.$refs.tab.offsetHeight - 2 - 30 - 80

    // 定时刷新时间
    let _this = this

    //获取传参，高亮显示，获取数据。如果没有显示第一个
    // this.dataShow[this.$route.params.top]._highlight = true
    console.log(this.$route.params.top)
    // if (this.$route.params.top != undefined) {
    //   this.$refs.currentRowTable.highlightCurrentRow(this.$route.params.top)
    // } else {
    //   this.$refs.currentRowTable.highlightCurrentRow(0)
    // }
    window.onresize = function () {
      _this.tableHeight = _this.$refs.tab.offsetHeight - 2 - 30 - 80
      _this.tableHeight2 = _this.$refs.tab.offsetHeight - 2 - 30 - 80
    }

  },
  methods: {
    searchs () {
      this.sends()
    },
    sends () {
      this.$ajax.get('api/religion/peopleVisitTimes', {
        params: {
          user: this.search || '',
          startDate: this.$route.query.startTime,
          endDate: this.$route.query.endTime,
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res.data.data);
        if (!this._created && res.data.data.list && res.data.data.list.length) {
          this._created = true;
          this.ips = res.data.data.list[0].srcIP;
          this.details(this.ips)
        }
        this.check = res.data.data.list
        this.total = res.data.data.total
        this.ids = []
        this.id = 0
        for (let index = 0; index < this.check.length; index++) {
          this.id += 1
          // console.log(this.id)
          this.ids.push({
            id: this.id,
            ip: this.check[index].srcIP,
            num: this.check[index].visitTimes,
          })
        }
        // console.log(this.ids)
        this.data2 = this.ids
      }).catch((error) => {
        console.log(error)
      })
    },
    details (user) {
      this.$ajax.get('api/religion/peopleVisitTimesDetail', {
        params: {
          user: user,
          startDate: this.$route.query.startTime,
          endDate: this.$route.query.endTime,
          page: this.detailPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        // console.log(res.data.data);
        this.checks = res.data.data.list
        // console.log(this.checks)
        this.totals = res.data.data.total
        this.ids2 = []
        for (let index = 0; index < this.checks.length; index++) {
          // console.log(this.id)
          this.ids2.push({
            url: this.checks[index].url,
            num: this.checks[index].visitTimes,
            title: this.checks[index].title,
            termType: this.checks[index].terminal,
            time: this.checks[index].visitTime,
            ip: this.checks[index].srcIP,
            webType: this.checks[index].category,
            domain: this.checks[index].domain,
            nds: this.checks[index].dns,
            snapshot: this.checks[index].snapshot,
            termDetail: this.checks[index].terminalDetail,
            targetIp: this.checks[index].tarIP,
            port: this.checks[index].srcPort,
            agreement: this.checks[index].protocol,
            mac: this.checks[index].mac,
          })
        }
        // console.log(this.ids2)
        this.data9 = this.ids2
        // console.log(this.data9)
      }).catch((error) => {
        console.log(error)
      })
    },
    showMan () {

      this.manInfo = true

    },
    currentChange (currentRow) {
      this.ips = currentRow.ip
      this.details(currentRow.ip)
      console.log(currentRow)
      this.Drawer = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 500);
    },
    changePage (page) {
      this.page = page
      this.sends()
    },
    changeDetailPage (page) {
      this.detailPage = page
      this.details(this.ips)
    }
  },


}
</script>
<style scoped lang="less">
.index {
  width: 100vw;
  height: 100vh;
  background: url(../images/main_bg.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  text-align: center;
  padding: 15px;
  min-width: 990px;

  .nav-bar,
  .nav-bar-right {
    i {
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .box {
    position: relative;
    height: 100%;
    border: 1px solid #07a6ff;
    .line {
      position: absolute;
      background-color: #07a6ff;
      z-index: 999;
    }
    .line1,
    .line2,
    .line3,
    .line4 {
      width: 10px;
      height: 10px;
    }
    .line1 {
      top: -5px;
      left: -5px;
    }
    .line2 {
      bottom: -5px;
      left: -5px;
    }
    .line3 {
      top: -5px;
      right: -5px;
    }
    .line4 {
      bottom: -5px;
      right: -5px;
    }
  }
}
</style>