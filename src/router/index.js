import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ExternalApiView from "../views/ExternalApi.vue"
import { authGuard } from "../auth/authGuard"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: "/external-api",
    name: "external-api",
    component: ExternalApiView,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
