import axios from 'axios';
import { Loading, Message } from 'element-ui';

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
  return Promise.reject(err);
});

export default axios;
