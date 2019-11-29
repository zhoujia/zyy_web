<template>
  <div class="index">

    <Head></Head>
    <div>
      <Row :gutter="16">
        <Col span="6">
        <div>
          <div class="item_title">
            <span>网络流量监控</span>
            <h5>
              <i></i>
              <b></b>
            </h5>
          </div>
          <div id="leftTopEcharts"
               style="width:100%;height:-webkit-calc((100vh - 110px - 25px * 3)/3);height:calc((100vh - 110px - 25px * 3)/3)">

          </div>
          <div class="item_title">
            <span>应用流量排行</span>
            <h5>
              <i></i>
              <b></b>
            </h5>
          </div>
          <div id="leftCenterEcharts"
               style="width:100%;height:-webkit-calc((100vh - 110px - 25px * 3)/3);height:calc((100vh - 110px - 25px * 3)/3)">

          </div>
          <div class="item_title">
            <span>上网应用平均时长统计</span>
            <h5>
              <i></i>
              <b></b>
            </h5>
          </div>
          <div id="leftBottomEcharts"
               style="width:100%;height:-webkit-calc((100vh - 110px - 25px * 3)/3);height:calc((100vh - 110px - 25px * 3)/3)">

          </div>
        </div>
        </Col>
        <Col span="12">
        <div class="mapbox">
          <div class="line line1"></div>
          <div class="line line2"></div>
          <div class="line line3"></div>
          <div class="line line4"></div>
          <div class="line line5"></div>
          <div class="line line6"></div>
          <div class="line line7"></div>
          <div class="line line8"></div>
          <div id="map"
               style="width:100%;height:50vh"></div>
        </div>
        <div style="margin-top:15px"
             class="item_title">
          <span>网络行为趋势图</span>
          <h5>
            <i></i>
            <b></b>
          </h5>
        </div>
        <div id="centerBottomEcharts"
             style="width:100%;height:-webkit-calc(100vh - 110px - 40px - 50vh);height:calc(100vh - 110px - 40px - 50vh)">

        </div>
        </Col>
        <Col span="6">
        <div class="item_title">
          <span>网络意识形态分类</span>
          <h5>
            <i></i>
            <b></b>
          </h5>
        </div>
        <div id="rightTopEcharts"
             style="width:100%;height:-webkit-calc(100vh - 110px - 40px - 30vh);height:calc(100vh - 110px - 40px - 30vh);margin-top:10px;padding-right:15px">

        </div>
        <div class="item_title">
          <span>宗教信仰访问人次数占比</span>
          <h5>
            <i></i>
            <b></b>
          </h5>
        </div>
        <div id="rightBottomEcharts"
             @click="goIndex()"
             style="width:100%;height:30vh">
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import 'echarts/theme/macarons.js'
import '../../node_modules/echarts/map/js/china.js'
import Head from '../components/head'
export default {
  components: {
    Head
  },
  data () {
    return {
      myChart: null,
      myChart1: null,
      myChart2: null,
      myChart3: null,
      myChart4: null,
      myChart5: null,
      myChart6: null,
      width: '100%',//svg宽度
      height: '100%',//svg高度
      RADIUS: 200,//球的半径
      speedX: Math.PI / 360,//球一帧绕x轴旋转的角度
      speedY: Math.PI / 360,//球-帧绕y轴旋转的角度
      CX: 0,
      CY: 0,
      listDate: [],
      listUpload: [],
      listDown: [],
      yingy1: [],
      yingy2: [],
      yingy3: [],
      wang1: [],
      wang2: [],
      fen1: [],
      fen2: [],
      qushi1: [],
      qushi2: [],
      qushi3: [],
      qushi4: [],
      qushi5: [],
      qushi6: [],
      qushi7: [],
      qushi8: [],
      qushi9: [],
      qushi10: [],
      zhanBi1: [],
      zhanBi2: [],
      zhanBi3: [],
      zhanBi4: [],
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
    this.$ajax.get('api/index/Flux', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime
      }
    }).then(res => {
      console.log(res.data.data[0]);
      this.$store.commit('save_userInfo', res.data)
    }).catch((error) => {
      console.log(error)
    })
    this.$ajax.get('api/index/App', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime
      }
    }).then(res => {
      console.log(res.data.data);
      this.$store.commit('save_yingy', res.data)
    }).catch((error) => {
      console.log(error)
    })
    this.$ajax.get('api/index/Inter', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime
      }
    }).then(res => {
      console.log(res.data.data);
      this.$store.commit('save_wangTime', res.data)
    }).catch((error) => {
      console.log(error)
    })
    this.$ajax.get('api/index/actionTypeList', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime
      }
    }).then(res => {
      console.log(res.data.data);
      this.$store.commit('save_fenLei', res.data)
    }).catch((error) => {
      console.log(error)
    })
    this.$ajax.get('api/index/actionTypeTrend', {
      params: {
        startDate: this.startTime,
        endDate: this.endTime
      }
    }).then(res => {
      console.log(res.data.data);
      this.$store.commit('save_qushi', res.data)
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
  mounted () {
    let _this = this
    this.tabcloud()
    //生成统计表
    _this.setMap()
    this.setLeftTopEcharts()
    this.leftCenterEcharts()
    this.rightBottomEcharts()
    this.setBottomEcharts()
    this.centerBottomEcharts()
    this.rightTopEcharts()
    window.onresize = function () {
      console.log('resize')
      _this.resizeEcharts()
    }
  },
  updated () {
    // console.log(JSON.stringify(this.$store.state.data));

  },
  computed: {
    listenshowpage1 (val1) {
      return this.$store.state.data;
    },
    listenshowpage2 (val2) {
      return this.$store.state.yingy;
    },
    listenshowpage3 (val3) {
      return this.$store.state.wang;
    },
    listenshowpage4 (val4) {
      return this.$store.state.fen;
    },
    listenshowpage5 (val5) {
      return this.$store.state.qushi;
    },
    listenshowpage6 (val6) {
      return this.$store.state.zhanBi;
    }
  },
  watch: {
    listenshowpage1: function (val1) {
      // console.log(JSON.stringify(val1))
      this.listDate = []
      this.listUpload = []
      this.listDown = []
      for (let index = 0; index < val1.length; index++) {
        this.listDate.push(this.$store.state.data[index].date)
        this.listUpload.push(Math.round(this.$store.state.data[index].uploadFlux))
        this.listDown.push(Math.round(this.$store.state.data[index].downFlux))
      }
      this.setLeftTopEcharts(this.listDate, this.listUpload, this.listDown)
      // console.log(this.listDate)
    },
    listenshowpage2: function (val2) {
      // console.log(JSON.stringify(val2))
      this.yingy1 = []
      this.yingy2 = []
      this.yingy3 = []
      for (let index = 0; index < val2.length; index++) {
        this.yingy1.push(this.$store.state.yingy[index].appName)
        this.yingy2.push({
          value: this.$store.state.yingy[index].flux,
          name: this.$store.state.yingy[index].appName
        })
        this.yingy3.push(this.$store.state.yingy[index].fluxPercentage)
      }
      this.leftCenterEcharts(this.yingy1, this.yingy2, this.yingy3)
      // console.log(this.listDate)
    },
    listenshowpage3: function (val3) {
      // console.log(JSON.stringify(val3))
      this.wang1 = []
      this.wang2 = []
      for (let index = 0; index < val3.length; index++) {
        this.wang1.push(this.$store.state.wang[index].date)
        this.wang2.push(this.$store.state.wang[index].avgTime)
      }
      this.setBottomEcharts(this.wang1, this.wang2)
      // console.log(this.listDate)
    },
    listenshowpage4: function (val4) {
      // console.log(JSON.stringify(val4))
      this.fen1 = []
      this.fen2 = []
      for (let index = 0; index < 12; index++) {
        this.fen1.push(this.$store.state.fen[index].app)
        this.fen2.push(this.$store.state.fen[index].num)
        // this.fen1.reverse()
        // this.fen2.reverse()
      }
      this.rightTopEcharts(this.fen1, this.fen2)
      console.log(this.fen1)
    },
    listenshowpage5: function (val5) {
      console.log(JSON.stringify(val5))
      this.qushi1 = []
      this.qushi2 = []
      this.qushi3 = []
      this.qushi4 = []
      this.qushi5 = []
      this.qushi6 = []
      this.qushi7 = []
      this.qushi8 = []
      this.qushi9 = []
      this.qushi10 = []
      for (let index = 0; index < val5.list1.length; index++) {
        this.qushi1.push(val5.list1[index].app)
        this.qushi2.push(val5.list1[index].num)
        this.qushi3.push(val5.list1[index].dateStr)
      }
      for (let index = 0; index < val5.list2.length; index++) {
        this.qushi4.push(val5.list2[index].app)
        this.qushi5.push(val5.list2[index].num)
        this.qushi6.push(val5.list2[index].dateStr)
      }
      for (let index = 0; index < val5.list3.length; index++) {
        this.qushi7.push(val5.list3[index].app)
        this.qushi8.push(val5.list3[index].num)
        this.qushi9.push(val5.list3[index].dateStr)
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
      this.qushi1 = uniq(this.qushi1)
      this.qushi4 = uniq(this.qushi4)
      this.qushi7 = uniq(this.qushi7)
      this.qushi10 = this.qushi1.concat(this.qushi4).concat(this.qushi7)
      this.centerBottomEcharts(this.qushi1, this.qushi2, this.qushi3, this.qushi4, this.qushi5, this.qushi6, this.qushi7, this.qushi8, this.qushi9, this.qushi10)
      console.log(this.qushi1)
    },
    listenshowpage6: function (val6) {
      // console.log(JSON.stringify(val2))
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
      this.rightBottomEcharts(this.zhanBi1, this.zhanBi2, this.zhanBi3, this.zhanBi4)
      // console.log(this.listDate)
    },
  },
  methods: {
    goIndex () {
      this.$router.push({ path: "/faithIndex" })
    },
    listener (event) {//响应鼠标移动
      var x = event.clientX - this.CX;
      var y = event.clientY - this.CY;
      this.speedX = x * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, x * 0.0001) : Math.max(-this.RADIUS * 0.00002, x * 0.0001);
      this.speedY = y * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, y * 0.0001) : Math.max(-this.RADIUS * 0.00002, y * 0.0001);
    },
    resizeEcharts () {
      this.myChart.resize()
      this.myChart1.resize()
      this.myChart2.resize()
      this.myChart3.resize()
      this.myChart4.resize()
      this.myChart5.resize()
      this.myChart6.resize()
    },

    setLeftTopEcharts (data1, data2, data3) {
      // 基于准备好的dom，初始化echarts实例
      // console.log(date)
      this.myChart = this.$Echarts.init(document.getElementById('leftTopEcharts'));
      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['发送', '接收'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#86d4ff'
          }
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#86d4ff'
            }
          },

          data: data1
        },
        yAxis: [{
          type: 'value',
          name: '单位（GB/s）',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#86d4ff'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 12
            }
          },
          splitLine: {
            lineStyle: {
              color: '#031e37'
            }
          }
        }],
        series: [{
          name: '发送',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12

            }
          },
          data: data2
        }, {
          name: '接收',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          },
          data: data3
        },]
      };
      this.myChart.setOption(option)
      // 绘制图表

    },
    rightBottomEcharts () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart6 = this.$Echarts.init(document.getElementById('rightBottomEcharts'), 'macarons')
      let option = {
        title: {
          text: '访问总人数为' + this.zhanBi4 + '人',
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
      this.myChart6.setOption(option);

    },
    leftCenterEcharts () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart2 = this.$Echarts.init(document.getElementById('leftCenterEcharts'), 'macarons')
      console.log(this.yingy1)
      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",

        },
        legend: {
          orient: 'vertical',
          x: 'left',
          y: '15',
          itemWidth: 14,
          itemHeight: 14,
          align: 'left',

          data: this.ying1,
          textStyle: {
            color: '#86d4ff'
          }
        },
        series: [
          {
            name: '应用流量',
            type: 'pie',
            radius: ['42%', '55%'],
            color: ['#d74e67', '#0092ff', '#eba954', '#21b6b9', '#60a900', '#01949b'],
            label: {
              normal: {
                formatter: '{b}\n{d}%'
              },

            },
            data: this.yingy2
          }
        ]
      };
      this.myChart2.setOption(option);
    },
    rightTopEcharts () {
      this.myChart5 = this.$Echarts.init(document.getElementById('rightTopEcharts'))
      // console.log(this.fen2)
      var barColor = ['#ff8299', '#ef4967', '#ef143c', '#ffcf86', '#f7b147', '#ff9900', '#a2d0ff', '#75b1ef', '#409eff', '#c6fb82', '#9ee641', '#60a900'];
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: 'value',
            axisLabel: {
              show: false,
              textStyle: {
                color: '#86d4ff',
                fontSize: 12
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#86d4ff'
              }
            },
            splitLine: {
              show: false, lineStyle: {
                color: '#86d4ff'
              }
            },
            axisTick: {
              show: false, lineStyle: {
                color: '#86d4ff'
              }
            },
          }
        ],
        textStyle: {
          color: '#86d4ff',
          fontSize: 12
        },
        grid: {
          left: 0,
          right: '3%',
          top: '3%',
          bottom: 10,
          containLabel: true
        },
        yAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: this.fen1.reverse(),
            axisLine: {
              show: false
            },
            splitLine: { show: false },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#86d4ff',
                fontSize: 12
              }
            }
          }
        ],
        series: [
          {
            name: '访问人次',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{c}'
              }
            },
            barWidth: 15,
            data: this.fen2.reverse(),
            itemStyle: {
              normal: {
                color: function (params) {
                  var num = barColor.length;
                  return barColor[params.dataIndex % num]
                }
              }
            },
          }
        ]
      }
      this.myChart5.setOption(option);
      let _this = this
      this.myChart5.on('click', function (obj) {
        var selected = obj.selected;
        var legend = obj.name;
        // console.log(obj)
        // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
        // 使得 无 selected 对象
        if (legend == '信仰关注') {
          _this.$router.push({ path: '/FaithIndex' })
        }

      });
    },
    setBottomEcharts () {
      this.myChart3 = this.$Echarts.init(document.getElementById('leftBottomEcharts'))
      let option = {
        color: ['#31a7fe'],
        backgroundColor: 'rgba(0,0,0,0)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.wang1,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: '#86d4ff'
              }
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '单位(小时)',
            axisLine: {
              lineStyle: {
                color: '#86d4ff'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#031e37'
              }
            }
          }
        ],
        series: [
          {
            name: '上网应用平均时长',
            type: 'bar',
            barWidth: '60%',
            data: this.wang2,
            itemStyle: {
              normal: {
                color: new this.$Echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              },
              emphasis: {
                color: new this.$Echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              }
            },
          }
        ]
      };
      this.myChart3.setOption(option);
    },
    centerBottomEcharts () {
      this.myChart4 = this.$Echarts.init(document.getElementById('centerBottomEcharts'))

      let option = {
        color: ['#60a900', '#db3233', '#0092ff'],
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
          data: this.qushi10,
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
          data: this.qushi3
        },
        yAxis: {
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
            formatter: '{value} 次'
          }
        },
        series: [{
          type: 'line',
          symbol: "none",
          name: this.qushi1,
          showAllSymbol: true,
          smooth: true,
          data: this.qushi2,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#60a900'
              }
            }
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }, {
          type: 'line',
          name: this.qushi4,
          symbol: "none",
          showAllSymbol: true,
          smooth: true,
          data: this.qushi5,
          itemStyle: {
            normal: {
              lineStyle: {
                color: '#db3233'
              }
            }
          },
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          }
        }, {
          type: 'line',
          name: this.qushi7,
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
          markLine: {
            data: [{
              type: 'average',
              name: '平均值'
            }]
          },
          data: this.qushi8
        }]
      };

      this.myChart4.setOption(option);
    },
    setMap (json) {

      // 基于准备好的dom，初始化echarts实例
      this.myChart1 = this.$Echarts.init(document.getElementById('map'), 'macarons')
      this.myChart1.hideLoading();
      //this.$Echarts.registerMap('洛阳市', json);

      let allData = {
        "citys": [{
          "name": "河南",
          "value": [113.40, 34.46, 2658],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }, {
          "name": "河北",
          "value": [114.30, 38.02, 56],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }, {
          "name": "山西",
          "value": [112.33, 37.54, 26596],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }, {
          "name": "广东",
          "value": [113.30, 23.20, 2323],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }, {
          "name": "北京",
          "value": [116.24, 39.55, 23],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }, {
          "name": "上海",
          "value": [100, 65, 536],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }, {
          "name": "山东",
          "value": [24, -27, 66],
          "symbolSize": 2,
          "itemStyle": {
            "normal": {
              "color": "#F58158"
            }
          }
        }],
        "moveLines": [{
          "fromName": "河南",
          "toName": "广东",
          "coords": [
            [113.40, 34.46],
            [113.30, 23.20]
          ]
        }, {
          "fromName": "河南",
          "toName": "云南",
          "coords": [
            [113.40, 34.46],
            [102.42, 25.04]
          ]
        }, {
          "fromName": "河南",
          "toName": "西藏",
          "coords": [
            [113.40, 34.46],
            [91.08, 29.39]
          ]
        }, {
          "fromName": "河南",
          "toName": "新疆",
          "coords": [
            [113.40, 34.46],
            [87.36, 43.45]
          ]
        }, {
          "fromName": "河南",
          "toName": "内蒙古",
          "coords": [
            [113.40, 34.46],
            [111.41, 40.48]
          ]
        }, {
          "fromName": "河南",
          "toName": "黑龙江",
          "coords": [
            [113.40, 34.46],
            [126.36, 45.44]
          ]
        }, {
          "fromName": "河南",
          "toName": "广东",
          "coords": [
            [113.40, 34.46],
            [113.14, 23.08]
          ]
        }, {
          "fromName": "河南",
          "toName": "江苏",
          "coords": [
            [113.40, 34.46],
            [118.46, 32.03]
          ]
        },]
      };
      var yData = [];
      var barData = [];

      for (var i = 0; i < 5; i++) {
        barData.push(allData.citys[i].value[2]);
        yData.push(i + allData.citys[i].name);
      }
      //排序
      var max;
      //遍历数组，默认arr中的某一个元素为最大值，进行逐一比较
      for (var i = 0; i < barData.length; i++) {
        //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
        for (var j = i; j < barData.length; j++) {
          if (barData[i] < barData[j]) {
            //如果arr[j]大就把此时的值赋值给最大值变量max
            max = barData[j];
            barData[j] = barData[i];
            barData[i] = max;
          }
        }
      }
      let option = {
        backgroundColor: 'rgba(0,0,0,0)',
        title: [{
          text: '网络访问监控',
          left: 'center',
          textStyle: {
            color: '#86d4ff'
          }
        }],
        legend: {
          show: true,
          orient: 'vertical',
          bottom: '15px',
          left: '15px',
          data: ['目的地', '网络访问路线'],
          textStyle: {
            color: '#86d4ff'
          }
        },
        geo: {
          map: 'china',
          show: true,
          zoom: 1.3,
          label: {
            emphasis: {
              show: true
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#03152e',
              borderColor: '#404a59'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        grid: {
          right: 10,
          top: '70%',
          bottom: 10,
          width: '5%'
        },
        yAxis: {
          type: 'category',
          inverse: true,
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#86d4ff'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#86d4ff'
            }
          },
          axisLabel: {
            interval: 0,
            margin: 80,
            textStyle: {
              color: '#86d4ff',
              align: 'left',
              fontSize: 12
            },
            rich: {
              a: {
                color: '#fff',
                backgroundColor: '#FAAA39',
                width: 15,
                height: 15,
                align: 'center',
                borderRadius: 2
              },
              b: {
                color: '#fff',
                backgroundColor: '#4197FD',
                width: 15,
                height: 15,
                align: 'center',
                borderRadius: 2
              }
            },
            formatter: function (params) {
              if (parseInt(params.slice(0, 1)) < 3) {
                return [
                  '{a|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                ].join('\n')
              } else {
                return [
                  '{b|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1)
                ].join('\n')
              }
            }
          },
          // data: yData
        },
        xAxis: {
          show: false
        },
        series: [{
          name: '目的地',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke',
            period: 7,
            scale: 26
          },
          label: {
            emphasis: {
              show: true,
              position: 'right',
              formatter: function (params) {
                return params.name
              }
            }
          },
          symbolSize: 2,
          showEffectOn: 'render',
          itemStyle: {
            normal: {
              color: '#46bee9'
            }
          },
          data: allData.citys
        }, {
          name: '网络访问路线',
          type: 'lines',
          coordinateSystem: 'geo',
          zlevel: 2,
          large: true,
          effect: {
            show: true,
            constantSpeed: 30,
            symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: 3,
            trailLength: 0,
          },
          lineStyle: {
            normal: {
              color: new this.$Echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'yellow'
              }, {
                offset: 1,
                color: 'red'
              }], false),
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: allData.moveLines
        },
        {
          name: 'barSer',
          type: 'bar',
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 5,
          barGap: 0,
          itemStyle: {
            normal: {
              color: function (params) {
                // build a color map as your need.
                var colorList = [{
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(0,0,0,0)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(0,0,0,0)' // 100% 处的颜色
                  }]
                },
                {
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(0,0,0,0)' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(0,0,0,0)' // 100% 处的颜色
                  }]
                }
                ];
                if (params.dataIndex < 3) {
                  return colorList[0]
                } else {
                  return colorList[1]
                }
              }
            }
          },
          data: barData
        }]
      };
      this.myChart1.setOption(option);
    },
    tabcloud () {
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // console.log(from)
    if (from.path.indexOf("admin") != -1) {
      sessionStorage.removeItem("activeMenuName")
    }
    next()
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