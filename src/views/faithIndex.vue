<template>
  <div class="index">

    <Head></Head>
    <div>
      <Row :gutter="16">
        <Col span="18">
        <div>
          <div class="item_title">
            <span>宗教信仰访问趋势图</span>
            <h5>
              <i></i>
              <b></b>
            </h5>
          </div>
          <div id="leftTopEcharts"
               style="width:100%;height:50vh;margin-bottom:10px">

          </div>
          <Row :gutter="16">
            <Col span="8">
            <div class="item_title">
              <span>世界信仰宗教人数占比</span>
              <h5>
                <i></i>
                <b></b>
              </h5>
            </div>
            <div id="buttomCenterEcharts"
                 style="width:100%;height:-webkit-calc(100vh - 110px - 60px - 50vh);height:calc(100vh - 110px - 60px - 50vh)">

            </div>
            </Col>
            <Col span="8">
            <div class="item_title">
              <span>信仰访问人次占比</span>
              <h5>
                <i></i>
                <b></b>
              </h5>
            </div>
            <div id="leftCenterEcharts"
                 style="width:100%;height:-webkit-calc(100vh - 110px - 60px - 50vh);height:calc(100vh - 110px - 60px - 50vh)">

            </div>
            </Col>
            <Col span="8">
            <div class="item_title">
              <span>宗教信仰url网址访问TOP3</span>
              <h5>
                <i></i>
                <b></b>
              </h5>
            </div>
            <div style="width:100%;height:-webkit-calc(100vh - 110px - 60px - 50vh);height:calc(100vh - 110px - 60px - 50vh);overflow:hidden">
              <Card :padding="0"
                    shadow
                    class="clearfix"
                    @click.native="goUrl(0)"
                    style="width: 100%;background:rgba(0,0,0,0);margin-top:10px;cursor:pointer;overflow:hidden">
                <div style="float:left;margin-top:20px;">
                  <Avatar icon="ios-person"
                          size="large" />
                </div>
                <div style="float:left;text-align:left;margin-left:15px;margin-top:20px;overflow:hidden">
                  <p style="color:#fff;font-size:16px;overflow:hidden">{{$store.state.url.list && $store.state.url.list[0] && $store.state.url.list[0].url}}</p>
                  <p style="color:#86d4ff;overflow:hidden">{{$store.state.url.list && $store.state.url.list[0] && $store.state.url.list[0].visitTimes}}次访问次数</p>
                </div>
              </Card>
              <Card :padding="0"
                    shadow
                    class="clearfix"
                    @click.native="goUrl(1)"
                    style="width: 100%;background:rgba(0,0,0,0);margin-top:10px;cursor:pointer;overflow:hidden">
                <div style="margin-top:20px;float:left">
                  <Avatar icon="ios-person"
                          size="large" />
                </div>
                <div style="float:left;text-align:left;margin-left:15px;margin-top:20px;overflow:hidden">
                  <p style="color:#fff;font-size:16px;overflow:hidden">{{$store.state.url.list && $store.state.url.list[1] && $store.state.url.list[1].url}}</p>
                  <p style="color:#86d4ff;overflow:hidden">{{$store.state.url.list && $store.state.url.list[1] && $store.state.url.list[1].visitTimes}}次访问次数</p>
                </div>
              </Card>
              <Card :padding="0"
                    shadow
                    class="clearfix"
                    @click.native="goUrl(2)"
                    style="width: 100%;background:rgba(0,0,0,0);margin-top:10px;cursor:pointer;">
                <div style="margin-top:20px;float:left">
                  <Avatar icon="ios-person"
                          size="large" />
                </div>
                <div style="float:left;text-align:left;margin-left:15px;margin-top:20px;overflow:hidden;">
                  <p style="color:#fff;font-size:16px;">{{$store.state.url.list && $store.state.url.list[2] && $store.state.url.list[2].url}}</p>
                  <p style="color:#86d4ff;">{{$store.state.url.list && $store.state.url.list[2] && $store.state.url.list[2].visitTimes}}次访问次数</p>
                </div>
              </Card>

            </div>
            </Col>

          </Row>

        </div>
        </Col>
        <Col span="6">
        <div class="item_title">
          <span>宗教信仰访问分类</span>
          <h5>
            <i></i>
            <b></b>
          </h5>
        </div>
        <div class="mybar"
             style="width:100%;height:50vh;margin-bottom:10px;font-size:15px;">
          <div @click="goFo(item)"
               v-for="item in listenshowpage7">
            <p style="text-align:left;color:#fff;margin:10px auto;">{{item.religionName}}
              <b style="float:right">{{item.visitTime}}次访问</b>
            </p>
            <el-progress :show-text="false"
                         :text-inside="true"
                         :stroke-width="26"
                         :color="item.religionName | colors"
                         :percentage="item.visitTime/zhanBi4*100"></el-progress>
          </div>
        </div>
        <div class="item_title"
             style="margin-top:-18px">
          <span>宗教信仰个人访问次数TOP3</span>
          <h5>
            <i></i>
            <b></b>
          </h5>
        </div>
        <div style="width:100%;height:-webkit-calc(100vh - 110px - 60px - 50vh);height:calc(100vh - 110px - 60px - 50vh)">
          <Card :padding="20"
                shadow
                class="clearfix"
                @click.native="goDetail(0)"
                style="width: 100%;background:rgba(0,0,0,0);margin-top:20px;cursor:pointer">
            <div style="float:left">
              <Avatar icon="ios-person"
                      size="large" />
            </div>
            <div style="float:left;text-align:left;margin-left:15px">
              <p style="color:#fff;font-size:16px">{{$store.state.person.list && $store.state.person.list[0] && $store.state.person.list[0].srcIP}}</p>
              <p style="color:#86d4ff">{{$store.state.person.list && $store.state.person.list[0] && $store.state.person.list[0].visitTimes}}次访问次数</p>
            </div>
          </Card>
          <Card :padding="20"
                shadow
                class="clearfix"
                @click.native="goDetail(1)"
                style="width: 100%;background:rgba(0,0,0,0);margin-top:10px;cursor:pointer">
            <div style="float:left">
              <Avatar icon="ios-person"
                      size="large" />
            </div>
            <div style="float:left;text-align:left;margin-left:15px">
              <p style="color:#fff;font-size:16px">{{$store.state.person.list && $store.state.person.list[1] && $store.state.person.list[1].srcIP}}</p>
              <p style="color:#86d4ff">{{$store.state.person.list && $store.state.person.list[1] && $store.state.person.list[1].visitTimes}}次访问次数</p>
            </div>
          </Card>
          <Card :padding="20"
                shadow
                class="clearfix"
                @click.native="goDetail(2)"
                style="width: 100%;background:rgba(0,0,0,0);margin-top:10px;cursor:pointer">
            <div style="float:left">
              <Avatar icon="ios-person"
                      size="large" />
            </div>
            <div style="float:left;text-align:left;margin-left:15px">
              <p style="color:#fff;font-size:16px">{{$store.state.person.list && $store.state.person.list[2] && $store.state.person.list[2].srcIP}}</p>
              <p style="color:#86d4ff">{{$store.state.person.list && $store.state.person.list[2] && $store.state.person.list[2].visitTimes}}次访问次数</p>
            </div>
          </Card>

        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import Head from '../components/head'
export default {
  components: {
    Head

  },
  filters: {
    colors (input) {
      const colorArr = [
        { color: '#db3233', name: '基督教' },
        { color: '#60a900', name: '佛教' },
        { color: '#409eff', name: '天主教' },
        { color: '#b7b7b7', name: '道教' },
        { color: '#f68f2b', name: '伊斯兰教' },
        { color: '#8717e0', name: '其他' }
      ]
      const color = colorArr.find(v => v.name === input)
      return (color && color.color) || '#8717e0'
    }
  },
  data () {
    return {
      myChart: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      list: [],
      startTime: '',
      endTime: '',
      religionName: '',
      page: '',
      pageSize: '',
      routers: [],
      zhanBi1: [],
      zhanBi2: [],
      zhanBi3: [],
      zhanBi4: [],
      zongFen1: [],
      zongFen2: [],
      xinQu1: [],
      xinQu2: [],
      xinQu3: [],
      xinQu4: [],
      xinQu5: [],
      xinQu6: [],
      xinQu7: [],
      xinQu8: [],
      xinQu9: [],
      xinQu10: [],
      xinQu11: [],
      xinQu12: [],
      xinQu13: [],
      xinQu14: [],
      xinQu15: [],
      xinQu16: [],
    }
  },
  created () {
    var d = new Date();
    d.setDate(d.getDate() - 8);
    var month = d.getMonth() + 1;
    var day = d.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var val = d.getFullYear() + "-" + month + "-" + day;
    this.startTime = val
    var dd = new Date()
    dd.setDate(dd.getDate() - 1);
    var months = dd.getMonth() + 1;
    var days = dd.getDate();
    if (months < 10) {
      months = "0" + months;
    }
    if (days < 10) {
      days = "0" + days;
    }
    this.endTime = dd.getFullYear() + "-" + months + "-" + days
    this.$ajax.get('api/religion/religionTread', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime
      }
    }).then(res => {
      // console.log(res.data.data);
      this.$store.commit('save_xinQu', res.data)
    }).catch((error) => {
      console.log(error)
    })
    this.$ajax.get('api/religion/religionRank', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime,
        page: 1,
        pageSize: 3
      }
    }).then(res => {
      // console.log(res.data.data);
      this.$store.commit('save_urlTop', res.data)
    }).catch((error) => {
      console.log(error)
    })
    this.$ajax.get('api/religion/peopleVisitTimes', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime,
        page: 1,
        pageSize: 3
      }
    }).then(res => {
      // console.log(res.data.data);
      this.$store.commit('save_personTop', res.data)
    }).catch((error) => {
      console.log(error)
    })
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
  computed: {
    listenshowpage6 (val6) {
      return this.$store.state.zhanBi;
    },
    listenshowpage7 (val7) {
      return this.$store.state.zhanBi;
    },
    listenshowpage8 (val8) {
      return this.$store.state.xinQu;
    },
    listenshowpage9 (val9) {
      return this.$store.state.url;
    },
    listenshowpage10 (val10) {
      return this.$store.state.person;
    },
  },
  watch: {
    listenshowpage6: function (val6) {
      this.zhanBi1 = []
      this.zhanBi2 = []
      this.zhanBi3 = []
      this.zhanBi4 = []
      for (let index = 0; index < val6.length; index++) {
        this.zhanBi1.push(this.$store.state.zhanBi[index].religionName)
        this.zhanBi4.push(this.$store.state.zhanBi[index].visitTime)
        this.zhanBi2.push({
          value: this.$store.state.zhanBi[index].visitTime,
          name: this.$store.state.zhanBi[index].religionName
        })
        this.zhanBi3.push(this.$store.state.zhanBi[index].percentage)
      }
      var getSum = function (ar) {
        var arr = ar;
        var s = 0;
        arr.forEach(function (val, idx, arr) {
          s += val;        }, 0);

        return s;

      };
      this.zhanBi4 = getSum(this.zhanBi4)
      this.leftCenterEcharts(this.zhanBi1, this.zhanBi2, this.zhanBi3, this.zhanBi4)
      // console.log(this.listDate)
    },
    listenshowpage7: function (val7) {
    },
    listenshowpage8: function (val8) {
      // console.log(JSON.stringify(val8))
      this.xinQu1 = []
      this.xinQu2 = []
      this.xinQu3 = []
      this.xinQu4 = []
      this.xinQu5 = []
      this.xinQu6 = []
      this.xinQu7 = []
      this.xinQu8 = []
      this.xinQu9 = []
      this.xinQu10 = []
      this.xinQu11 = []
      this.xinQu12 = []
      this.xinQu13 = []
      this.xinQu14 = []
      this.xinQu15 = []
      this.xinQu16 = []
      for (let index = 0; index < val8.fojiaoList.length; index++) {
        this.xinQu1.push(val8.fojiaoList[index].religionName)
        this.xinQu2.push(val8.fojiaoList[index].visitTime)
        this.xinQu3.push(val8.fojiaoList[index].dateStr)
      }
      for (let index = 0; index < val8.daojiaoList.length; index++) {
        this.xinQu4.push(val8.daojiaoList[index].religionName)
        this.xinQu5.push(val8.daojiaoList[index].visitTime)
        this.xinQu6.push(val8.daojiaoList[index].dateStr)
      }
      for (let index = 0; index < val8.tianzhujiaoList.length; index++) {
        this.xinQu7.push(val8.tianzhujiaoList[index].religionName)
        this.xinQu8.push(val8.tianzhujiaoList[index].visitTime)
        this.xinQu9.push(val8.tianzhujiaoList[index].dateStr)
      }
      for (let index = 0; index < val8.yisilanList.length; index++) {
        this.xinQu10.push(val8.yisilanList[index].religionName)
        this.xinQu11.push(val8.yisilanList[index].visitTime)
        this.xinQu12.push(val8.yisilanList[index].dateStr)
      }
      for (let index = 0; index < val8.jiduList.length; index++) {
        this.xinQu13.push(val8.jiduList[index].religionName)
        this.xinQu14.push(val8.jiduList[index].visitTime)
        this.xinQu15.push(val8.jiduList[index].dateStr)
      }
      function uniq (array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
          if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
          }
        }
        return temp;
      }
      this.xinQu1 = uniq(this.xinQu1)
      this.xinQu4 = uniq(this.xinQu4)
      this.xinQu7 = uniq(this.xinQu7)
      this.xinQu10 = uniq(this.xinQu10)
      this.xinQu13 = uniq(this.xinQu13)
      this.xinQu16 = this.xinQu1.concat(this.xinQu4).concat(this.xinQu7).concat(this.xinQu10).concat(this.xinQu13)
      this.leftTopEcharts(this.xinQu1, this.xinQu2, this.xinQu3, this.xinQu4, this.xinQu5, this.xinQu6, this.xinQu7, this.xinQu8, this.xinQu9, this.xinQu10, this.xinQu11, this.xinQu12, this.xinQu13, this.xinQu14, this.xinQu15)
      // console.log(this.xinQu1)
    },
    listenshowpage9: function (val9) {
    },
    listenshowpage10: function (val10) {
    },
  },
  mounted () {

    let _this = this

    this.tabcloud()
    //生成统计表
    this.leftCenterEcharts()
    this.leftTopEcharts()
    this.buttomCenterEcharts()
    window.onresize = function () {
      console.log('resize')
      _this.resizeEcharts()
    }
  },
  methods: {
    // goFo (item) {
    //   this.$router.push({
    //     path: '/fNumber/' + item.religionName,
    //     query: {
    //       startTime: this.$route.query.startTime,
    //       endTime: this.$route.query.endTime
    //     }
    //   })
    //   // console.log(item.religionName)

    // },
    goDetail (top) {
      // console.log(top)
      this.$router.push({
        name: 'FaithDetail',
        params: { top: top },
        query: {
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime
        }
      })
    },
    goUrl (top) {
      this.$router.push({
        name: 'urlTop',
        params: { top: top },
        query: {
          startTime: this.$route.query.startTime,
          endTime: this.$route.query.endTime
        }
      })
    },
    resizeEcharts () {
      this.myChart.resize()
      this.myChart2.resize()
      this.myChart3.resize()

    },
    leftCenterEcharts () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$Echarts.init(document.getElementById('leftCenterEcharts'), 'macarons')
      let option = {
        title: {
          text: '访问总人次为' + this.zhanBi4 + '人',
          x: 'center',
          y: "bottom",
          textStyle: {
            color: '#86d4ff',
            fontSize: 13
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} 访问人次{c},占比{d}%"
        },
        color: ['rgb(96,169,0)', 'rgb(219,50,51)', 'rgb(64,158,255)', 'rgb(183,183,183)', 'rgb(246,143,43)', 'rgb(135,23,224)'],
        grid: {
          left: 0,
          right: '3%',
          top: '3%',
          bottom: 10,
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          left: '3%',
          top: 'center',
          textStyle: {
            color: '#86d4ff'
          },
          data: this.zhanBi1
        },
        series: [
          {
            name: '访问人次',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: this.zhanBi2,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.myChart2.setOption(option);
    },
    buttomCenterEcharts () {
      console.log('buttomCenterEcharts')
      this.myChart3 = this.$Echarts.init(document.getElementById('buttomCenterEcharts'), 'macarons')
      let option = {
        title: {
          text: '世界信仰宗教人数占比   单位（亿）  数据来源自维基百科',
          x: 'center',
          y: "bottom",
          textStyle: {
            color: '#86d4ff',
            fontSize: 13
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} 信仰人数{c},占比{d}%"
        },
        color: ['rgb(96,169,0)', 'rgb(219,50,51)', 'rgb(64,158,255)', 'rgb(183,183,183)', 'rgb(246,143,43)', 'rgb(135,23,224)'],
        grid: {
          left: 0,
          right: '3%',
          top: '3%',
          bottom: 10,
          containLabel: true
        },
        legend: {
          orient: 'vertical',
          left: '3%',
          top: 'center',
          textStyle: {
            color: '#86d4ff'
          },
          data: ["佛教", '基督教', '天主教', '道教', '伊斯兰教', '其他']
        },
        series: [
          {
            name: '信仰人数',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 5.21, name: '佛教' },
              { value: 24, name: '基督教' },
              { value: 11.53, name: '天主教' },
              { value: 0.9, name: '道教' },
              { value: 18, name: '伊斯兰教' },
              { value: 12, name: '其他' }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.myChart3.setOption(option);
    },
    goXY () {

      this.$router.push({  //核心语句
        path: '/faithIndex',   //跳转的路径
        // query: {           //路由传参时push和query搭配使用 ，作用时传递参数
        //     id: this.id,
        // }
      })
    },
    leftTopEcharts () {
      this.myChart = this.$Echarts.init(document.getElementById('leftTopEcharts'))

      let option = {
        color: ['#60a900', '#db3233', '#0092ff', '#b7b7b7', '#f38817', '#8721e0'],
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: this.xinQu16,
          textStyle: {
            color: '#86d4ff'
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#86d4ff'
            }
          },
          boundaryGap: false,
          data: this.xinQu3
        },
        yAxis: {
          name: '人次',
          axisLine: {
            lineStyle: {
              color: '#86d4ff'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{
          type: 'line',
          symbol: "none",
          name: '佛教',
          showAllSymbol: true,
          smooth: true,
          data: this.xinQu2,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#60a900'
              }
            }
          },
        }, {
          type: 'line',
          name: '基督教',
          symbol: "none",
          showAllSymbol: true,
          smooth: true,
          data: this.xinQu14,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#db3233'
              }
            }
          },
        }, {
          type: 'line',
          name: '天主教',
          symbol: "none",
          showAllSymbol: true,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#0092ff'
              }
            }
          },
          data: this.xinQu8
        },
        {
          type: 'line',
          name: '道教',
          symbol: "none",
          showAllSymbol: true,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#b7b7b7'
              }
            }
          },
          data: this.xinQu5
        },
        {
          type: 'line',
          name: '伊斯兰教',
          symbol: "none",
          showAllSymbol: true,
          smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#f38817'
              }
            }
          },
          data: this.xinQu11
        }]
      };

      this.myChart.setOption(option);
    },
    tabcloud () {


    }
  }


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
  .item_title {
    position: relative;
    text-align: left;
    display: flex;
    span {
      font-size: 0.9vw;
      color: #fff;
      text-shadow: 0 0 0.2em #15d6ff8f, -0 -0 0.2em #15d6ff8f;
      flex: none;
      margin-right: 5px;
      position: relative;
      padding-right: 10px;
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 5px;
        background-color: #07a6ff;
        left: 0;
        bottom: -5px;
        border-bottom-right-radius: 8px;
      }
    }
    h5 {
      flex: 1;
      display: flex;
      i {
        flex: 1;
        background: url(../images/title01.png) repeat-x left center;
      }
      b {
        flex: none;
        width: 15%;
        background: url(../images/title02.png) repeat-x right center;
      }
    }
    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #07a6ff;
      left: 0;
      bottom: 0;
    }
  }
  .mapbox {
    position: relative;
    .line {
      position: absolute;
      background-color: #07a6ff;
      z-index: 999;
    }
    .line1,
    .line2,
    .line3,
    .line4 {
      width: 30px;
      height: 1px;
    }
    .line5,
    .line6,
    .line7,
    .line8 {
      width: 1px;
      height: 30px;
    }
    .line1 {
      top: 0;
      left: 0;
    }
    .line2 {
      bottom: 0;
      left: 0;
    }
    .line3 {
      top: 0;
      right: 0;
    }
    .line4 {
      bottom: 0;
      right: 0;
    }
    .line5 {
      top: 0;
      left: 0;
    }
    .line6 {
      bottom: 0;
      left: 0;
    }
    .line7 {
      top: 0;
      right: 0;
    }
    .line8 {
      bottom: 0;
      right: 0;
    }
  }
}
</style>