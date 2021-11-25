import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home.vue'
import Dns from "../views/Dns";
import Setting from "../views/Setting";
import Ddns from "../views/Ddns";
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children:[
      {
        path: 'dns',
        name: 'dns',
        component: Dns
      },
      {
        path: 'ddns',
        name: 'ddns',
        component: Ddns
      },
      {
        path: 'setting',
        name: 'setting',
        component: Setting
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
