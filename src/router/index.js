import Vue from 'vue'
import Router from 'vue-router'
import Admintor from '../components/Admintor'

Vue.use(Router)

const routes = [
  {
    path:'/admintor',
    component: Admintor
  }
]
const router = new Router({
  routes,
})

export default router

