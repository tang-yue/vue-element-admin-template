import axios from 'axios';
import Cookie from 'js-cookie';

const instance = axios.create({
  baseURL: '',
  timeout: 500000
});

instance.interceptors.request.use((req) => {
  req.headers.authorization = Cookie.get('staffToken');
  return req;
}, err => Promise.reject(err));

instance.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export default function request(url, options) {
  const opt = options || {};
  return new Promise((resolve, reject) => {
    instance({
        url,
        method: opt.type || 'get',
        data: opt.params || {},
        headers: {
          'Content-Type': 'application/json',
        }
      }).then((res) => {
        if (res) {
          const h = res.headers;
          // console.log(h, 'hhhh');
          // if(!!h&&h['Content-Type'].startsWith("application/json")) {
            resolve({data: res.data, headers:h})
          // } else {
            // resolve(res.data);
          // }
        } 
        return res;
      })
      .catch((err) => { reject(err) });
  });
}

