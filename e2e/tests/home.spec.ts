import { test, expect } from '@playwright/test'
import { ROUTES, TEST_USER } from '../data/test-data.js'
import { mockLogin } from '../data/mocks.js'

test('redirects to the login page when not logged in', async ({ page }) => {
  await page.goto(ROUTES.home)
  await expect(page).toHaveURL(ROUTES.login)
  await expect(page.locator('h1')).toHaveText('Travel planner')
  await expect(page).toHaveTitle('Travel planner')
  await expect(page.locator('html')).toHaveAttribute('lang', 'es')
})

test('shows the home page after logging in (mocked)', async ({ page }) => {
  await mockLogin(page)

  await page.goto(ROUTES.login)
  await page.locator('[data-cy="login-email"]').fill(TEST_USER.email)
  await page.locator('[data-cy="login-password"]').fill(TEST_USER.password)
  await page.locator('[data-cy="login-submit"]').click()

  await expect(page).toHaveURL(ROUTES.home)
  await expect(page.locator('[data-cy="logout-submit"]')).toBeVisible()
})
