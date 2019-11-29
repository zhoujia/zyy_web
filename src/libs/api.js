import axios from 'axios';
import qs from 'qs';

//设置默认请求方式，指定Content-Type
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
export function post(action, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)

      .then(response => {
        resolve(response.data);
      })

      .catch(error => {
        reject(error);
      });
  });
}

// 封装 get 请求

export function get(action, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(Domain + action, params)

      .then(response => {
        resolve(response.data);
      })

      .catch(error => {
        reject(error);
      });
  });
}

export default {
  postData(action, params) {
    return post(action, params);
  },

  getData(action, params) {
    return get(action, params);
  }
};
