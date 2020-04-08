import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import axios from 'axios'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import store from "./vuex/store"
import 'xe-utils'//vxe-table依赖最小打包项
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css';

console.log(process.env.HOST)


import api from './lib/api.js'
Vue.prototype.$api = api

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VXETable)
// Vue.use(Element, {size: "small", zIndex: 3000}); 全局配置element-ui属性

Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

router.beforeEach((to,from,next)=>{
  if(to.path == '/enter'){
    next();
  }
  else if(localStorage.date === undefined){
    alert("请先登录");
    next('/enter');
  }
  else{
    next();
  }
})

var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

export default vue
