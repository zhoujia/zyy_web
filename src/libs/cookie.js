/**
 * cookie util
 */
import Cookie from 'js-cookie';
const tokenKey = 'token';
const user = 'user';
/**
 * set cookie
 * @param {*} key
 * @param {*} value
 */
export function setCookie(key, value) {
  Cookie.set(key, value, { expires: 1 });
}

export function getCookie(key) {
  return Cookie.get(key);
}
export function deleteCookie(key) {
  Cookie.remove(key);
}
// 以下是用户的token部分
/**
 * userToken
 * @param {*} key
 * @param {*} value
 */
export function writeToken(value) {
  setCookie(tokenKey, value);
}
export function readToken(key, value) {
  return getCookie(tokenKey);
}
export function deleteToken() {
  //这个清除token
  deleteCookie(tokenKey);
  localStorage.removeItem('activeMenuName');
}
// 以下是用户的用户部分
export function writeUser(value) {
  setCookie(user, value);
}
export function readUser(key, value) {
  return getCookie(user);
}
export function deleteUser() {
  //清除
  deleteCookie(user);
}
