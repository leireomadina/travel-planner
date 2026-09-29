# Travel planner

[![Tests](https://github.com/leireomadina/travel-planner/actions/workflows/main.yml/badge.svg)](https://github.com/leireomadina/travel-planner/actions/workflows/main.yml)

A web app to plan trips, built with Vue 3 and Supabase.

The project is in an early stage. It currently includes:

- User registration, login and logout with Supabase Auth
- Internationalization (English and Spanish) with vue-i18n
- Unit tests with Vitest and end-to-end tests with Playwright

## Tech stack

| Area | Tools |
|---|---|
| Framework | [Vue 3](https://vuejs.org/), [Vue Router](https://router.vuejs.org/), [Pinia](https://pinia.vuejs.org/), [vue-i18n](https://vue-i18n.intlify.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/), [daisyUI](https://daisyui.com/), [Lucide](https://lucide.dev/) icons |
| Backend | [Supabase](https://supabase.com/) |
| Build | [Vite](https://vite.dev/) |
| Testing | [Vitest](https://vitest.dev/), [Vue Test Utils](https://test-utils.vuejs.org/), [Playwright](https://playwright.dev/) |
| Code quality | [ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [Husky](https://typicode.github.io/husky/) |

## Requirements

- [Node.js](https://nodejs.org/) `^22.22.2` or `>=24.15.0`
- [pnpm](https://pnpm.io/)
- A [Supabase](https://supabase.com/) project

## Getting started

1. Install the dependencies:

   ```sh
   pnpm install
   ```

2. Create a `.env` file from the example and fill in your Supabase project URL and publishable key:

   ```sh
   cp .env.example .env
   ```

   ```sh
   VITE_SUPABASE_URL=
   VITE_SUPABASE_PUBLISHABLE_KEY=
   ```

3. Start the development server at http://localhost:5173:

   ```sh
   pnpm dev
   ```

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server with hot reload |
| `pnpm build` | Type-check and build for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm type-check` | Run type checking with `vue-tsc` |
| `pnpm lint` | Lint and fix the code with ESLint |
| `pnpm format` | Format `src/` with Prettier |
| `pnpm test:unit` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |
| `pnpm test:e2e:ui` | Run end-to-end tests in Playwright UI mode |
| `pnpm test:e2e:headed` | Run end-to-end tests in visible browsers |

## Testing

Unit tests live in `src/__tests__/` and end-to-end tests in `e2e/tests/`.

Before running the end-to-end tests for the first time, install the Playwright browsers:

```sh
pnpm exec playwright install
```

Some useful options:

```sh
# Run only on Chromium
pnpm test:e2e --project=chromium

# Run a specific file
pnpm test:e2e e2e/tests/auth.spec.ts

# Run in debug mode
pnpm test:e2e --debug
```

> [!NOTE]
> Locally, Playwright reuses any server already running on port 5173. Make sure no other app is using that port, or the tests will run against it.

## Git hooks

[Husky](https://typicode.github.io/husky/) runs these checks automatically:

- **pre-commit**: `pnpm lint` and `pnpm test:unit`
- **pre-push**: `pnpm test:e2e`

GitHub Actions runs the unit tests and the build on every push.

## Project structure

```
e2e/                 End-to-end tests and test data
src/
├── __tests__/       Unit tests
├── assets/          Global styles
├── components/      Reusable components
├── lib/             Supabase client
├── locales/         Translations (en, es)
├── router/          Routes
├── stores/          Pinia stores
└── views/           Pages (home, login, register)
```

## Recommended IDE setup

[VS Code](https://code.visualstudio.com/) with the [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) extension.
