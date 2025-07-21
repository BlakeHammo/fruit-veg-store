// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Example pages
import Home from '@/pages/Home.vue'
import Products from '@/pages/Products.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
