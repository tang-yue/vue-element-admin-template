import axios from 'axios';
import Cookie from 'js-cookie';

const api = axios.create({
  baseURL: '',
  timeout: 500000
});

api.interceptors.request.use((req) => {
  req.headers.authorization = Cookie('staffToken');
  return req;
}, err => Promise.reject(err));

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export function request(url, options) {
  const opt = options || {};
  return new Promise((resolve, reject) => {
    api({
        url,
        method: opt.type || 'get',
        data: opt.params || {}
      }).then((res) => {
        if (res) {
            resolve(res.data);
        } 
        return res;
      })
      .catch((err) => { reject(err) });
  });
}

export default api;
