import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WriteTd from '../views/WriteTd.vue'
import DetailTd from '../views/DetailTd.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/write',
    name: 'write',
    component: WriteTd
  },
  {
    path: '/detail',
    name: 'detail',
    component: DetailTd
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router