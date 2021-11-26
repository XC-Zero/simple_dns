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
  baseURL: '/api',
  timeout: 8000,
})
http.interceptors.response.use(
    response => {  // 该处为后端返回整个内容
        return response  // 该处将结果返回，下一步可用于前端页面渲染用
    },
    error => {
      console.log(error.response)
      if (error.response.status===401){
        router.push({path: '/'});
        Cookies.remove("token")
      }else
      {
        return Promise.reject(error)
      }
    }
)

Vue.prototype.$http = http
Vue.prototype.$Cookies=Cookies
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  vuetify,
}).$mount('#app')
