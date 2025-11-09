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

  await page.fill('[data-cy="register-email"]', 'test@test.com')
  await page.fill('[data-cy="register-password"]', 'password123')

  await page.click('[data-cy="register-submit"]')

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="register-successful"]')).toBeVisible()
  await expect(page.locator('[data-cy="register-error"]')).toBeHidden()
})
