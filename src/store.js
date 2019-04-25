import Vue from 'vue'
import Vuex from 'vuex'
import { axiosInstance } from './lib/axios'
import { authHelpers } from './lib/auth/helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: ''
  },
  mutations: {
    setName(state, name) {
      state.name = name
    }
  },
  actions: {
    async register(context, params) {
      const response = await axiosInstance.post('/register', params)
      const token = authHelpers.setCookie(response.data.auth_token)
      context.commit('setName', token.first_name)
    },
    async logIn(context, params) {
      const response = await axiosInstance.post('/login', params)
      const token = authHelpers.setCookie(response.data.auth_token)
      context.commit('setName', token.first_name)
    }
  }
})
