import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'Home', path: '/', component: () => import('../views/HomeView.vue') },
    { name: 'Login', path: '/login', component: () => import('../views/LoginView.vue') },
    { name: 'Register', path: '/register', component: () => import('../views/RegisterView.vue') },
  ],
})

export default router
