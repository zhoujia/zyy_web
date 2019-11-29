import Vue from 'vue';
import Vuex from 'vuex';

import user from './module/user';
// import app from './module/app';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
    data: '',
    token: localStorage.getItem('token') || '',
    yingy: '',
    wang: '',
    fen: '',
    qushi: '',
    zhanBi: '',
    xinQu: '',
    url: '',
    person: ''
  },
  mutations: {
    //
    save_userInfo(state, data) {
      state.data = data.data;
      // console.log(JSON.stringify(state.data));
    },
    save_yingy(state, yingy) {
      state.yingy = yingy.data;
      // console.log(JSON.stringify(state.yingy));
    },
    save_wangTime(state, wang) {
      state.wang = wang.data;
      // console.log(JSON.stringify(state.wang));
    },
    save_fenLei(state, fen) {
      state.fen = fen.data;
      // console.log(JSON.stringify(state.fen));
    },
    save_qushi(state, qushi) {
      state.qushi = qushi.data;
      // console.log(JSON.stringify(state.qushi));
    },
    save_zhanBi(state, zhanBi) {
      state.zhanBi = zhanBi.data;
      // console.log(JSON.stringify(state.zhanBi));
    },
    save_xinQu(state, xinQu) {
      state.xinQu = xinQu.data;
      // console.log(JSON.stringify(state.xinQu));
    },
    save_urlTop(state, url) {
      state.url = url.data;
      // console.log(JSON.stringify(state.url));
    },
    save_personTop(state, person) {
      state.person = person.data;
      // console.log(JSON.stringify(state.person));
    },
    set_token(state, token) {
      state.token = token;
      localStorage.token = token;
      console.log(state.token);
    },
    del_token(state, token) {
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    //
  },
  modules: {
    user
    // app,
  }
});
