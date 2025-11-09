import { test, expect } from '@playwright/test'

test('should successfully register a new user (mocked)', async ({ page }) => {
  await page.route('**/auth/v1/signup', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { id: 'mock-id', email: 'test@test.com' },
        session: { access_token: 'fake-token' },
      }),
    })
  })

  await page.goto('/register')

  await expect(page.locator('[data-cy="register-title"]')).toBeVisible()

  await page.fill('[data-cy="register-email"]', 'test@test.com')
  await page.fill('[data-cy="register-password"]', 'password123')

  await page.click('[data-cy="register-submit"]')

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="register-successful"]')).toBeVisible()
  await expect(page.locator('[data-cy="register-error"]')).toBeHidden()
})

test('should successfully log in an existing user (mocked)', async ({ page }) => {
  await page.route('**/auth/v1/token?grant_type=password', (route) => {
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
          id: 'mock-id',
          email: 'test@test.com',
        },
      }),
    })
  })

  await page.goto('/login')

  await expect(page.locator('[data-cy="login-title"]')).toBeVisible()

  await page.fill('[data-cy="login-email"]', 'test@test.com')
  await page.fill('[data-cy="login-password"]', 'password123')

  await page.click('[data-cy="login-submit"]')

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="login-error"]')).toBeHidden()

  await expect(page).toHaveURL('/home')
})
