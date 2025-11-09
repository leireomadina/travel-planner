import { test, expect } from '@playwright/test'
import { ROUTES, API_ENDPOINTS, TEST_USER } from '../data/test-data.js'

test('should successfully register a new user (mocked)', async ({ page }) => {
  await page.route(API_ENDPOINTS.register, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { id: TEST_USER.id, email: TEST_USER.email },
        session: { access_token: 'fake-token' },
      }),
    })
  })

  await page.goto(ROUTES.register)

  await expect(page.locator('[data-cy="register-title"]')).toBeVisible()

  await page.fill('[data-cy="register-email"]', TEST_USER.email)
  await page.fill('[data-cy="register-password"]', TEST_USER.password)

  await page.click('[data-cy="register-submit"]')

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="register-successful"]')).toBeVisible()
  await expect(page.locator('[data-cy="register-error"]')).toBeHidden()
})

test('should successfully log in an existing user (mocked)', async ({ page }) => {
  await page.route(API_ENDPOINTS.login, (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'fake-token',
        token_type: 'bearer',
        expires_in: 3600,
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        refresh_token: 'fake-refresh-token',
        user: {
          id: TEST_USER.id,
          email: TEST_USER.email,
        },
      }),
    })
  })

  await page.goto(ROUTES.login)

  await expect(page.locator('[data-cy="login-title"]')).toBeVisible()

  await page.fill('[data-cy="login-email"]', TEST_USER.email)
  await page.fill('[data-cy="login-password"]', TEST_USER.password)

  await page.click('[data-cy="login-submit"]')

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="login-error"]')).toBeHidden()

  await expect(page).toHaveURL(ROUTES.home)
})
