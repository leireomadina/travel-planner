import { test, expect } from '@playwright/test'
import { ROUTES, TEST_USER } from '../data/test-data.js'
import { mockLogin, mockRegister } from '../data/mocks.js'

const simulatedNetworkDelayInMs = 100

test('should successfully register a new user (mocked)', async ({ page }) => {
  await mockRegister(page, { delayInMs: simulatedNetworkDelayInMs })

  await page.goto(ROUTES.register)

  await expect(page.locator('[data-cy="register-title"]')).toBeVisible()

  await page.locator('[data-cy="register-email"]').fill(TEST_USER.email)
  await page.locator('[data-cy="register-password"]').fill(TEST_USER.password)

  await page.locator('[data-cy="register-submit"]').click()

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="register-successful"]')).toBeVisible()
  await expect(page.locator('[data-cy="register-error"]')).toBeHidden()
})

test('should successfully log in an existing user (mocked)', async ({ page }) => {
  await mockLogin(page, { delayInMs: simulatedNetworkDelayInMs })

  await page.goto(ROUTES.login)

  await expect(page.locator('[data-cy="login-title"]')).toBeVisible()

  await page.locator('[data-cy="login-email"]').fill(TEST_USER.email)
  await page.locator('[data-cy="login-password"]').fill(TEST_USER.password)

  await page.locator('[data-cy="login-submit"]').click()

  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'visible' })
  await page.locator('[data-cy="loading-spinner"]').waitFor({ state: 'hidden' })

  await expect(page.locator('[data-cy="login-error"]')).toBeHidden()

  await expect(page).toHaveURL(ROUTES.home)
})
