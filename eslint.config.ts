import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'travel-planner',
    files: ['**/*.{ts,mts,tsx,vue}'],

    // Global ESLint rules
    rules: {
      semi: ['error', 'never'], // disable semicolons
      quotes: ['error', 'single'], // use single quotes
      'comma-dangle': ['error', 'always-multiline'], // trailing commas
      'arrow-parens': ['error', 'always'], // always use parentheses in arrow functions
      'max-len': ['warn', { code: 100 }], // maximum line length
      'no-console': ['warn'], // warn on console.log
      'no-debugger': 'error', // prevent debugger statements
      'prefer-const': 'error', // prefer const over let when possible
      eqeqeq: 'error', // enforce strict equality
      'no-unused-vars': 'warn', // warn on unused variables

      // Vue 3 rules
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: { max: 1, allowFirstLine: false }
      }],
      'vue/no-unused-components': 'warn',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'off',

      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },

  // Ignore build, cache, and coverage folders
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    '**/node_modules/**',
    '**/.vite/**',
    '**/.cache/**'
  ]),

  // Vue plugin essential config
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,

  // Vitest unit tests
  { ...pluginVitest.configs.recommended, files: ['src/**/__tests__/*'] },

  // Playwright end-to-end tests
  { ...pluginPlaywright.configs['flat/recommended'], files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'] },

  // Skip Prettier formatting in ESLint to avoid conflicts
  skipFormatting
)
