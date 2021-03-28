import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import axios from './http';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;

// 全局过滤器
Vue.filter('dateFormate', (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds()
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
});

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
