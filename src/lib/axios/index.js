import axios from 'axios'
import VueCookie from 'vue-cookie'

const API_URL = 'http://localhost:3000'

const axiosInstance = axios.create({
  baseURL: API_URL
})

axiosInstance.interceptors.request.use(config => {
  config.headers = {
    'Authorization': VueCookie.get('jwt')
  }
  return config
})

export { axiosInstance }