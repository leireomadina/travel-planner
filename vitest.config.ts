import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    // Runs tests inside a Nuxt app, so auto-imports, plugins and modules are available
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        domEnvironment: 'jsdom',
        // Placeholder credentials so the Supabase plugin can start; tests mock any network calls
        overrides: {
          runtimeConfig: {
            public: {
              supabase: {
                url: 'https://placeholder.supabase.co',
                key: 'placeholder-key',
              },
            },
          },
        },
      },
    },
    exclude: ['e2e/**', '**/node_modules/**'],
  },
})
