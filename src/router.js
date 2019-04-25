import Vue from 'vue'
import Router from 'vue-router'
import LogIn from './views/LogIn.vue'
import Register from './views/Register.vue'
import Todos from './views/Todos.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    }
  ]
})
