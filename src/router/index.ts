import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'Home', path: '/home', component: () => import('../views/HomeView.vue') },
    { path: '/', redirect: '/home' },
    { name: 'Login', path: '/login', component: () => import('../views/LoginView.vue') },
    { name: 'Register', path: '/register', component: () => import('../views/RegisterView.vue') },
  ],
})

export default router
