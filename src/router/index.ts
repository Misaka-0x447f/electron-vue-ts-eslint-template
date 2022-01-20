import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'

const routes = [
  { path: '/', component: Index }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
