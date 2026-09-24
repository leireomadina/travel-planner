# travel-planner

A travel planner built with [Nuxt 4](https://nuxt.com/) (client-side rendered), [Supabase](https://supabase.com/) authentication, [Pinia](https://pinia.vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Testing status

[![Tests](https://github.com/leireomadina/travel-planner/actions/workflows/main.yml/badge.svg)](https://github.com/leireomadina/travel-planner/actions/workflows/main.yml)

## Tech stack

- **Framework:** Nuxt 4 with `ssr: false`, so the app runs as a single-page app
- **Auth:** [`@nuxtjs/supabase`](https://supabase.nuxtjs.org/). Logged-out users are redirected to `/login`; `/login` and `/register` are public
- **State:** Pinia via [`@pinia/nuxt`](https://pinia.vuejs.org/ssr/nuxt.html)
- **i18n:** `vue-i18n`, registered in `src/plugins/i18n.ts` (Spanish by default, English as fallback)
- **Styles:** Tailwind CSS v4
- **Icons:** [Lucide](https://lucide.dev/)
- **Tests:** Vitest with [`@nuxt/test-utils`](https://nuxt.com/docs/getting-started/testing) for unit tests, and Playwright for end-to-end tests

## Project structure

The app code lives in `src/` (set as Nuxt's `srcDir`):

```
src/
├── app.vue        # Root layout (header + <NuxtPage />)
├── pages/         # File-based routes: /home, /login, /register
├── components/    # Auto-imported components
├── stores/        # Auto-imported Pinia stores
├── plugins/       # Nuxt plugins (i18n)
├── locales/       # Translation files
├── assets/css/    # Tailwind entry point
└── __tests__/     # Unit tests
e2e/               # Playwright tests
```

Components, stores, Vue APIs (`ref`, `computed`…) and Nuxt composables are auto-imported, so you don't need to import them manually.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Project Setup

```sh
pnpm install
```

### Environment variables

Copy `.env.example` to `.env` and fill in your Supabase project's values (found in the Supabase dashboard under **Project Settings → API**):

```sh
NUXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NUXT_PUBLIC_SUPABASE_KEY=<your-publishable-or-anon-key>
```

### Develop with hot reload

```sh
pnpm dev
```

The app runs at http://localhost:3000.

> After upgrading dependencies, restart the dev server. A running server can keep old copies of packages cached and fail with confusing errors.

### Type-check, build and preview for production

```sh
pnpm build
pnpm preview
```

`pnpm type-check` runs the type-check on its own.

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

Tests run inside a Nuxt environment, so auto-imports, plugins and modules work. Use `mountSuspended` from `@nuxt/test-utils/runtime` to mount components and pages.

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# Runs the end-to-end tests (starts the dev server, or reuses one on port 3000)
pnpm test:e2e
# Runs the tests only on Chromium
pnpm test:e2e --project=chromium
# Runs the tests of a specific file
pnpm test:e2e e2e/tests/auth.spec.ts
# Runs the tests in debug mode
pnpm test:e2e --debug
```

Supabase API calls are mocked in the e2e tests, so they don't need a real Supabase project.

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Git hooks

[Husky](https://typicode.github.io/husky/) runs `pnpm lint && pnpm test:unit` before each commit and `pnpm test:e2e` before each push.
