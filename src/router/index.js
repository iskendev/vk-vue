import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '../views/Feed.vue'
import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
