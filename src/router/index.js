import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/item',
    name: 'Item',
    component: () => import('../views/Story.vue'),
    props: (route) => ({ id: route.query.id })
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
