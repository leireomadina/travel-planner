import type { ModuleOptions } from '@nuxtjs/supabase'

declare module 'nuxt/schema' {
  interface NuxtConfig {
    supabase?: Partial<ModuleOptions>
  }
}

export {}
