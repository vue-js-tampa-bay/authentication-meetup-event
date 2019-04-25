import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { axiosInstance } from './lib/axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VueAxios, {
  wrapper: axiosInstance
})

new Vue({
  router,
  store,
  VueCookie,
  axiosInstance,
  render: h => h(App)
}).$mount('#app')
