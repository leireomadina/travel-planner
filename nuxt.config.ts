import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-19',
  srcDir: 'src',
  ssr: false,
  app: {
    head: {
      title: 'Travel planner',
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },
  modules: ['@nuxtjs/supabase', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  supabase: {
    // Sends logged-out users to /login; /login is always public
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/register'],
    },
    // Set to a path like "~/types/database.types.ts" once the Supabase types are generated
    types: false,
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
  devtools: { enabled: true },
})
