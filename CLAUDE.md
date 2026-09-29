# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is pnpm (version pinned in `package.json` → `packageManager`).

```sh
pnpm dev                    # dev server on http://localhost:3000
pnpm build                  # runs `nuxt typecheck` and `nuxt build` in parallel
pnpm type-check             # type-check only
pnpm lint                   # eslint . --fix (CI runs `pnpm exec eslint .` without --fix)
pnpm format                 # prettier --write src/ test/ (CI runs --check on the same paths)

pnpm test:unit              # Vitest in WATCH mode; use `pnpm vitest run` for a single run
pnpm vitest run test/nuxt/login.spec.ts        # one file
pnpm vitest run -t "renders the login form"    # one test by name
pnpm vitest run --project nuxt                 # one Vitest project (unit | nuxt)

pnpm test:e2e                                  # Playwright on chromium, firefox and webkit
pnpm test:e2e --project=chromium test/e2e/auth.spec.ts
```

Husky runs `pnpm lint && pnpm test:unit` on pre-commit and `pnpm test:e2e` on pre-push.

After upgrading dependencies, restart the dev server; a running server can keep stale package copies and fail with confusing errors.

## Architecture

Nuxt 4 app with `ssr: false` (runs as an SPA) and `srcDir: 'src'`, so `~` resolves to `src/`. `public/` stays at the repo root. Components, Pinia stores, Vue APIs and Nuxt composables are auto-imported.

**Auth flow.** `@nuxtjs/supabase` owns routing protection: with `redirect: true` it sends logged-out users to `/login`; `/register` is excluded from the redirect (see `supabase.redirectOptions` in `nuxt.config.ts`). `/` redirects to `/home` via `routeRules`. The `auth` store (`src/stores/auth.ts`) wraps the Supabase client and **throws** Supabase errors; pages catch them and toggle their own `isLoading` / `*Error` refs. `user` and `session` come from `useSupabaseUser()` / `useSupabaseSession()`, which the module keeps in sync, so the store holds no auth state of its own. The configured confirm callback is `/confirm`.

**Routing by name.** Pages set `definePageMeta({ name: 'Home' | 'Login' | 'Register' })` and navigate with `router.push({ name: ... })`, not by path.

**i18n.** Plain `vue-i18n` (not `@nuxtjs/i18n`), created in `src/locales/index.ts` and installed by `src/plugins/i18n.ts`, which also syncs `<html lang>` with the active locale. Default locale is `es`, fallback `en`. Message keys are typed from `es.json` (`MessageSchema` in `src/locales/vue-i18n.d.ts`), so add new keys to `es.json` first and mirror them in `en.json`. Most UI text is still hardcoded English.

**Supabase config.** Needs `NUXT_PUBLIC_SUPABASE_URL` and `NUXT_PUBLIC_SUPABASE_KEY` (see `.env.example`). CI and the Vitest `nuxt` project use placeholder values; no test talks to a real Supabase project.

## Testing

- `test/unit/`: Vitest `unit` project, plain Node, no Nuxt runtime. For pure logic.
- `test/nuxt/`: Vitest `nuxt` project (`environment: 'nuxt'`, jsdom), so auto-imports and plugins work. Mount with `mountSuspended` from `@nuxt/test-utils/runtime` and import app files via `~/...`.
- `test/e2e/`: Playwright. Supabase HTTP calls are mocked with `page.route` helpers in `test/e2e/data/mocks.ts` (`mockLogin`, `mockRegister`); routes, endpoint globs and the test user are in `test/e2e/data/test-data.ts`. Locally Playwright reuses the dev server on port 3000 and runs **headed**; with `CI` set it builds, serves `pnpm preview` and runs headless.

Elements are selected with `data-cy="..."` attributes in both Vitest and Playwright. Keep them when editing templates.

## Code style

Enforced by ESLint + Prettier (`eslint.config.ts`, `.prettierrc.json`): no semicolons, single quotes, trailing commas, 100-char lines, indented `<script>` in SFCs, and one attribute per line. `vue/attributes-order` is enforced **alphabetically within groups** (e.g. `v-model`, then `:bindings`, then `id`, then static attributes, then `@events`); `pnpm lint` fixes the order automatically. Use `import type` for type-only imports.
