export function loginByEmail(username, password) {
  const data = {
    userName,
    password
  };
  return fetch({
    url: 'api/user/login',
    method: 'post',
    data
  });
}
