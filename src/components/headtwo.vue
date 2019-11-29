<template>
  <div>
    <div class="top clearfix">
      <div class="nav-bar">
        <Tooltip content="退出登录"
                 placement="bottom">
          <Icon @click="logout"
                type="md-power"
                size=30
                color="#01fafe" />
        </Tooltip>
        <Tooltip content="系统设置"
                 placement="bottom">
          <Icon type="ios-settings"
                @click="seting"
                size=30
                color="#01fafe" />
        </Tooltip>
        <Tooltip :content="fullText"
                 placement="bottom">
          <Icon v-show="!isfull"
                @click="open"
                type="md-open"
                size=30
                color="#01fafe" />
          <Icon v-show="isfull"
                @click="close"
                type="md-close-circle"
                size=30
                color="#01fafe" />
        </Tooltip>
      </div>
      <h1 class="title">大学生网络意识形态态势感知系统
        <p class="time">
          <Icon type="md-time" />
          <span v-text="realTime"></span>
        </p>
      </h1>
    </div>
    <Drawer title="选择统计时间"
            v-model="Drawer"
            width="400"
            :mask-closable="false"
            :styles="styles">
      {{time}}
      <el-date-picker :editable="editable"
                      :picker-options="pickerOptions"
                      @blur="getNewData"
                      v-model="time"
                      type="week"
                      format="yyyy 第 WW 周"
                      placeholder="请选择周">
      </el-date-picker>
      <div class="demo-drawer-footer">
        <Button style="margin-right: 8px"
                @click="Drawer = false">取消</Button>
        <Button type="primary"
                @click="getData">确定</Button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { readUser, deleteToken, deleteUser } from '../libs/cookie'
import { full, exitScreen } from '../libs/full'
import qs from 'qs'
export default {
  name: 'Head',
  components: {},
  props: {},
  data () {
    return {
      Drawer: false,
      realTime: '',
      fullText: '最大化',
      isfull: false,
      user: readUser(),
      editable: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      time: new Date(),
      startTime: '',
      endTime: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now();
        },
        firstDayOfWeek: 1
      },
    }
  },
  watch: {},
  computed: {},
  methods: {

    getNewData () {
      this.startTime = this.$Util.getDateByN(0, new Date(this.time))
      this.endTime = this.$Util.getDateByN(-6, new Date(this.time))
      let getStartDate = new Date(this.startTime); //周一开始的此为时间戳
      var start = this.$Util.data(getStartDate, 'yyyy-MM-dd hh:mm:ss');
      console.log(start)
      let getEndDate = new Date(this.endTime); //此为周末结束的时间戳
      var end = this.$Util.data(getEndDate, 'yyyy-MM-dd hh:mm:ss');
      console.log(end)
      this.$ajax.post('/api/data/religion/dashboard', qs.stringify({
        startDate: start,
        endDate: end
      })).then(res => {
        this.$store.commit('save_userInfo', res.data)
      })
    },
    getData () {
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
    },
    showDrawer () {
      this.Drawer = true
    },
    dealWithTime (data) {
      let formatDateTime
      let Y = data.getFullYear()
      let M = data.getMonth() + 1
      let D = data.getDate()
      let H = data.getHours()
      let Min = data.getMinutes()
      let S = data.getSeconds()
      let W = data.getDay()
      if (H < 10) {
        H = '0' + H
      }
      if (Min < 10) {
        Min = '0' + Min
      }
      if (S < 10) {
        S = '0' + S
      }
      if (W === 1) {
        W = '一'
      } else if (W === 2) {
        W = '二'
      } else if (W === 3) {
        W = '三'
      } else if (W === 4) {
        W = '四'
      } else if (W === 5) {
        W = '五'
      } else if (W === 6) {
        W = '六'
      } else if (W === 0) {
        W = '日'
      }
      formatDateTime = Y + '年' + M + '月' + D + '日 ' + H + ':' + Min + ':' + S + ' 星期' + W
      return formatDateTime
    },
    logout () {
      let _this = this;
      this.$Modal.confirm({
        title: '您确定退出系统',
        content: '当前用户' + _this.user + '，是否继续退出系统？',
        onOk: () => {
          //this.$Message.info('Clicked ok');
          deleteToken()
          deleteUser()
          this.$store.commit('del_token')
          if (readUser() == undefined) {
            _this.$Message.success('用户退出系统成功！');
            setTimeout(function () {
              _this.$router.replace({ path: '/Login' })
            }, 500)
          }

        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      });
    },
    open () {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        this.$Message.warning('浏览器不支持，请F11手动触发全屏模式！');
      } else {
        full()
        this.isfull = true;
        this.fullText = '最小化'
        this.$Notice.success({
          title: '开启全屏模式'
        });
      }

    },
    close () {
      exitScreen()
      this.isfull = false;
      this.fullText = '最大化'
      this.$Notice.success({
        title: '退出全屏模式'
      });
    },
    seting () {
      this.$router.push({ name: 'admin' })
    }
  },
  created () {

  },
  mounted () {
    this.startTime = this.$Util.getDateByN(0)
    this.endTime = this.$Util.getDateByN(-6)
    // 页面加载完后显示当前时间
    this.realTime = this.dealWithTime(new Date())
    // 定时刷新时间
    let _this = this
    // this.$ajax.get('/dist/geoJson.json').then(response => {
    //     console.log(response)

    // }).then(err => {
    //     console.log(err)
    // })
    // 定时器
    this.timer = setInterval(function () {
      _this.realTime = _this.dealWithTime(new Date()) // 修改数据date
    }, 1000)
  },
  // 注意在vue实例销毁前，清除定时器。
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  position: relative;
  .title {
    margin: 15px auto;
    display: inline-block;
    padding: 0 150px;
    height: 50px;
    color: #fff;
    background: url(../images/main_title_left.png) no-repeat left center,
      url(../images/main_title_right.png) no-repeat right center;
    line-height: 30px;
    text-shadow: 0 0 0.2em #15d6ff, -0 -0 0.2em #15d6ff;
    position: relative;
    font-size: 1.2vw;
    background-size: 23% 63%;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 15px;
      width: 100%;
      height: 2px;
      background-color: #3dcdff;
    }
  }
  .nav-bar {
    display: inline-block;
    position: absolute;
    top: 15px;
    left: 10px;
  }
  .nav-bar-right {
    display: inline-block;
    position: absolute;
    top: 15px;
    right: 10px;
  }
  .time {
    font-size: 0.7vw;
    color: #fff;
    text-shadow: none;
    font-weight: 300;
  }
}
</style>
