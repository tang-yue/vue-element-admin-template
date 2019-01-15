import axios from 'axios';
import Cookie from 'js-cookie';

const api = axios.create({
  baseURL: '',
  timeout: 5000
});

api.interceptors.request.use((req) => {
  req.headers.authorization = true ? Cookie('staffToken') : null;
  // req.headers['x-adtag'] = localStorage.getItem('adtag') ? localStorage.getItem('adtag') : null;
  return req;
}, (err) => Promise.reject(err));

api.interceptors.response.use((res) => {
  if (res.status === 401) {
    return res;
  } else {
    return res;
  }
}, (err) => Promise.reject(err));

export function request(url, options) {
  const opt = options || {};
  return new Promise((resolve, reject) => {
    api({
        url,
        method: opt.type || 'get',
        data: opt.params || {}
      }).then((res) => {
        if (res) {
          if (res && res.data || res) {
            resolve(res.data);
          } else {
            reject(res);
          }
        } else {
          return res;
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default api;
