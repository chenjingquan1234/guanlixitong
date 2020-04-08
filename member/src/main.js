import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import http from "./lib/js/axios.js"
Vue.prototype.$axios = axios
Vue.prototype.$HTTP = http
import { XHeader, Popup, Group, Cell, CellFormPreview, Flexbox, FlexboxItem, XButton, ButtonTab, ButtonTabItem, Scroller, LoadMore, Tab, TabItem,
InlineXNumber, Checker, CheckerItem, Rater, Search, XTextarea, XInput, PopupPicker, ToastPlugin, ConfirmPlugin, Datetime, FormPreview, AlertPlugin } from 'vux'
// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.use(MintUI)

Vue.config.productionTip = false

Vue.component('x-popup', Popup)
Vue.component('x-header', XHeader)
Vue.component('x-group', Group)
Vue.component('x-cell', Cell)
Vue.component('x-cell-form-preview', CellFormPreview)
Vue.component('x-flexbox', Flexbox)
Vue.component('x-flexbox-item', FlexboxItem)
Vue.component('x-button', XButton)
Vue.component('x-button-tab', ButtonTab)
Vue.component('x-button-tab-item', ButtonTabItem)
Vue.component('x-scroller', Scroller)
Vue.component('x-load-more', LoadMore)
Vue.component('x-tab', Tab)
Vue.component('x-tab-item', TabItem)
Vue.component('x-inline-x-number', InlineXNumber)
Vue.component('x-checker', Checker)
Vue.component('x-checker-item', CheckerItem)
Vue.component('x-rater', Rater)
Vue.component('x-search', Search)
Vue.component('x-input', XInput)
Vue.component('x-textarea', XTextarea)
Vue.component('x-popup-picker', PopupPicker)
Vue.component('x-datetime', Datetime)
Vue.component('x-form-preview', FormPreview)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
