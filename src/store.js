import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// vuex
const store = new Vuex.Store({
  state: {
    token: null,
    serverUrl: 'http://192.168.17.187/hqueue/',
    // 记录各个tab的当前Number
    tab: {
         // station页面点击的是那个tab
        tabShowInfoNumber: 0
    }
  },
  mutations: {
    login: (state, data) => {
      localStorage.setItem('token', data)
      state.token = data;
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
    },
    changeTab: (state, data) => {
      console.log(data)
      state.tab[data.whichTab] = data.num
    }
  },
  getters: {
    postUrl(state) {
          return (...url) => {
              let restful = url.join('/')
              return state.serverUrl + restful;
          }
      }
  }
})
export default store

