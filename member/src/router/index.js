import Vue from 'vue'
import Router from 'vue-router'
import home from './../components/home.vue'
import enter from './../components/enter.vue'
import daolujiuyuan from './../components/daolujiuyuan.vue'
import xiaofeijilu from './../components/xiaofeijilu.vue'
import taocanxiangmu from './../components/taocanxiangmu.vue'
import zaixianyuyue from './../components/zaixianyuyue.vue'
import jifenshangcheng from './../components/jifenshangcheng.vue'
import shiyongmendian from './../components/shiyongmendian.vue'
import yuyue from './../components/yuyue.vue'

import youhuiquan from './../components/youhuiquan.vue'
import bandinfo from './../components/bandinfo.vue'

Vue.use(Router)

export default new Router({
  // mode: "history",
  routes: [
    {path: '/', name: '/', component: home},
    {path: '/index', name: '/index', component: home},
    {path: '/enter', name: '/enter', component: enter},
    {path: '/daolujiuyuan', name: '/daolujiuyuan', component: daolujiuyuan},
    {path: '/xiaofeijilu', name: '/xiaofeijilu', component: xiaofeijilu},
    {path: '/taocanxiangmu', name: '/taocanxiangmu', component: taocanxiangmu},
    {path: '/zaixianyuyue', name: '/zaixianyuyue', component: zaixianyuyue},
    {path: '/jifenshangcheng', name: '/jifenshangcheng', component: jifenshangcheng},
    {path: '/shiyongmendian', name: '/shiyongmendian', component: shiyongmendian},
    {path: '/yuyue', name: '/yuyue', component: yuyue},

    {path: '/youhuiquan', name: '/youhuiquan', component: youhuiquan},
    {path: '/bandinfo', name: '/bandinfo', component: bandinfo},
  ]
})
