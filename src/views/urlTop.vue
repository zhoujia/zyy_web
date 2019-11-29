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

          <Col span="24">
          <div class="clearfix"
               style="height:30px;line-height:33px;text-align:left;margin-top:10px;margin-left:-120px;text-align:center">
            <span style="color:#46d225;font-size:18px;">url网址访问排行榜</span>
          </div>
          <Table highlight-row
                 @on-row-click="currentChange"
                 size="small"
                 :height="tableHeight2"
                 :columns="columns10"
                 :data="data9"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="total"
                    :page-size="pageSize"
                    show-total
                    show-elevator
                    class-name="pageTable"
                    @on-change="changePage"></Page>
            </div>
          </div>
          </Col>
        </Row>
      </div>
    </div>
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
      ids: [],
      check: '',
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
          title: '访问次数',
          key: 'num',
          width: 100
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
      total: 0,
      page: 1,
      pageSize: 15,
      query: {
        startTime: '',
        endTime: ''
      }

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
    }, 500);
    this.sends()
  },
  mounted () {
    this.tableHeight2 = this.$refs.tab.offsetHeight - 2 - 30 - 80

    // 定时刷新时间
    let _this = this
    // this.$ajax.get('/dist/geoJson.json').then(response => {
    //     console.log(response)

    // }).then(err => {
    //     console.log(err)
    // })

    //获取传参，高亮显示，获取数据。如果没有显示第一个
    // if (this.$route.params.top != undefined) {
    //   this.$refs.currentRowTable.highlightCurrentRow(this.$route.params.top)
    // } else {
    //   this.$refs.currentRowTable.highlightCurrentRow(0)
    // }
    window.onresize = function () {
      _this.tableHeight2 = _this.$refs.tab.offsetHeight - 2 - 30 - 80
    }

  },
  methods: {
    sends () {
      this.$ajax.get('api/religion/religionRank', {
        params: {
          religionName: this.$route.params.name,
          startDate: this.$route.query.startTime,
          endDate: this.$route.query.endTime,
          page: this.page,
          pageSize: this.pageSize
        }
      }).then(res => {
        console.log(res.data.data);
        this.check = res.data.data.list
        this.total = res.data.data.total
        this.ids = []
        for (let index = 0; index < this.check.length; index++) {
          this.ids.push({
            url: this.check[index].url,
            num: this.check[index].visitTimes,
            title: this.check[index].title,
            termType: this.check[index].terminal,
            time: this.check[index].visitTime,
            ip: this.check[index].srcIP,
            webType: this.check[index].category,
            domain: this.check[index].domain,
            nds: this.check[index].dns,
            snapshot: this.check[index].snapshot,
            termDetail: this.check[index].terminalDetail,
            targetIp: this.check[index].tarIP,
            port: this.check[index].srcPort,
            agreement: this.check[index].protocol,
            mac: this.check[index].mac,
          })
        }
        console.log(this.ids)
        this.data9 = this.ids
      }).catch((error) => {
        console.log(error)
      })
    },
    showMan () {

      this.manInfo = true

    },
    currentChange (currentRow) {

      console.log(currentRow)
    },
    changePage (page) {
      this.page = page
      this.sends()
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