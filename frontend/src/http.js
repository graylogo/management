import axios from 'axios';
import { Loading, Message } from 'element-ui';
import router from './http';

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0.7)'
  });
}
function endLoading() {
  loading.close();
}

//  请求拦截
axios.interceptors.request.use((config) => {
  startLoading();
  const isLogin = localStorage.getItem('eleToken');
  if (isLogin) {
    config.headers.Authorization = isLogin;
  }
  return config;
},
(error) => Promise.reject(error));

// 响应拦截
axios.interceptors.response.use((res) => {
  endLoading();
  return res;
}, (err) => {
  endLoading();
  Message.error(err.response.data);
  // 获取错误状态码
  const { status } = err.response;
  if (status === 401) {
    Message.error('Token失效，请重新登陆！');
    localStorage.removeItem('eleToken');
    router.push('/login');
  }
  return Promise.reject(err);
});

export default axios;
