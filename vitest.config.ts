import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [
      // Plain tests for pure logic (utils, stores without Nuxt). Fast, no Nuxt runtime
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      // Runs tests inside a Nuxt app, so auto-imports, plugins and modules are available
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.{test,spec}.ts'],
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
        },
      }),
    ],
  },
})
