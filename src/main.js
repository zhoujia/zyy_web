import Vue from 'vue';
import store from './store/index';
import iView from 'iview';
import axios from 'axios';
import VueRouter from 'vue-router';
import Routers from './router/router';
import Util from './libs/util';
import App from './app.vue';
import Echarts from 'echarts';
import 'iview/dist/styles/iview.css';
import { readToken, deleteToken } from './libs/cookie';
import { DatePicker, Progress, Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './libs/api';
import 'babel-polyfill';
Vue.config.productionTip = false;
// Vue.use(api);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(DatePicker);
Vue.use(Progress);
Vue.use(Loading);
Vue.prototype.$Echarts = Echarts;
Vue.prototype.$api = api;
Vue.prototype.$Util = Util; //时间
Vue.prototype.$ajax = axios;
// header('Access-Control-Allow-Origin:*');
// header('Access-Control-Allow-Headers:content-type');
// header('Access-Control-Request-Method:GET,POST');
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
console.log(store.state.token);
Vue.config.productionTip = false;
axios.interceptors.request.use(
  function(config) {
    if (store.state.token) config.headers.common['token'] = store.state.token;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function(response) {
    if (response.data.retCode == 500) {
      Vue.prototype.$Message.error('登录失效，请重新登录');
      store.commit('del_token');
      deleteToken();
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
    console.log(response.data.retCode);
    return response;
  },
  function(error) {
    // if (!error.response || error.response.data.retCode === 500) {
    //   Vue.prototype.$Message.error('登录失效，请重新登录');
    //   store.commit('del_token');
    //   deleteToken();
    //   setTimeout(() => {
    //     location.reload();
    //   }, 1000);
    // }
    return Promise.reject(error);
  }
);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

const whiteList = ['/Login']; // noredirect list
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  // user login permission
  console.log(store.state.token);
  if (store.state.token) {
    if (to.path === '/Login') {
      Util.title(to.meta.title);
      next({ path: '/' });
    } else {
      Util.title(to.meta.title);
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      Util.title(to.meta.title);
      next();
    } else {
      Util.title(to.meta.title);
      next({ path: '/Login' });
    }
  }
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
// console.log(store);
new Vue({
  el: '#app',
  store,
  router: router,
  render: h => h(App)
});
