import Vue from 'vue'
import Router from 'vue-router'
import LogIn from './views/LogIn.vue'
import Register from './views/Register.vue'
import Todos from './views/Todos.vue'
import VueCookie from 'vue-cookie'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: LogIn,
      beforeEnter: (to, from, next) => {
        if (VueCookie.get('jwt')) {
          next({ name: 'todos' })
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter(to, from, next) {
        VueCookie.get('jwt') ? next({ name: 'todos' }) : next()
      }
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
      beforeEnter(to, from, next) {
        !VueCookie.get('jwt') ? next({ name: 'login' }) : next()
      }
    }
  ]
})
