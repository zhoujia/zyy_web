const routers = [
  {
    path: '/Login',
    name: 'Login',
    meta: {
      title: '用户登录'
    },
    component: resolve => require(['@/views/login.vue'], resolve)
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '上网行为分析'
    },
    component: resolve => require(['@/views/index.vue'], resolve)
  },
  {
    path: '/faithIndex',
    name: 'faithIndex',
    meta: {
      title: '大学生信仰分析'
    },
    component: resolve => require(['@/views/faithIndex.vue'], resolve)
  },
  {
    path: '/FaithDetail',
    name: 'FaithDetail',
    meta: {
      title: '信仰分析明细'
    },
    component: resolve => require(['@/views/faithDetail.vue'], resolve)
  },
  {
    path: '/urlTop',
    name: 'urlTop',
    meta: {
      title: 'url访问排行榜'
    },
    component: resolve => require(['@/views/urlTop.vue'], resolve)
  },
  {
    path: '/fNumber/:name',
    name: 'fNumber',
    meta: {
      // title: '佛教访问次数统计'
    },
    beforeEnter: (to, from, next) => {
      document.title = to.params.name + '访问次数统计';
      next();
    },
    component: resolve => require(['@/views/foNumber.vue'], resolve)
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: { name: 'Home' },
    meta: {
      title: '系统管理'
    },
    component: resolve => require(['@/components/layout.vue'], resolve),
    children: [
      {
        path: '',
        name: 'Home',
        meta: {
          title: '后台首页'
        },
        component: resolve => require(['@/views/admin/home.vue'], resolve)
      },
      {
        path: 'User',
        name: 'User',
        meta: {
          title: '用户管理'
        },
        component: resolve => require(['@/views/admin/user.vue'], resolve)
      },
      {
        path: 'UserInfo',
        name: 'UserInfo',
        meta: {
          title: '用户信息'
        },
        component: resolve => require(['@/views/admin/userInfo.vue'], resolve)
      },
      {
        path: 'Seting',
        name: 'Seting',
        meta: {
          title: '系统设置'
        },
        component: resolve =>
          require(['@/views/admin/seting/index.vue'], resolve)
      }
    ]
  }
];
import store from '../store/index';
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'));
}
export default routers;
