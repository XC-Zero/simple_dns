import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // path to vuetify export
import 'vuetify/dist/vuetify.min.css'
import axios from "axios";
import Cookies from 'js-cookie'

import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);

const http = axios.create({
    baseURL:"http://192.168.88.99:6061",
  timeout: 8000,
})
http.interceptors.request.use(
    request => {  // 该处为后端返回整个内容
      console.log(request.url)
      return request  // 该处将结果返回，下一步可用于前端页面渲染用
    },
)


Vue.prototype.$http = http
Vue.prototype.$Cookies=Cookies
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
