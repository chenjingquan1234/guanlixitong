import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    domainName_http: "https://test.hfbsoftware.com",
    add_tag: {}
  },
  mutations:{
    change_tag(state, data) {
      state.add_tag = data
    }
  }
})
