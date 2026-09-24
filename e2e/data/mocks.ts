import type { Page } from '@playwright/test'
import { API_ENDPOINTS, TEST_USER } from './test-data.js'

// Delays the mocked response, so tests can see the loading state
type MockOptions = { delayInMs?: number }

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const mockRegister = async (page: Page, { delayInMs = 0 }: MockOptions = {}) => {
  await page.route(API_ENDPOINTS.register, async (route) => {
    await wait(delayInMs)
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        user: { id: TEST_USER.id, email: TEST_USER.email },
        session: { access_token: 'fake-token' },
      }),
    })
  })
}

export const mockLogin = async (page: Page, { delayInMs = 0 }: MockOptions = {}) => {
  await page.route(API_ENDPOINTS.login, async (route) => {
    await wait(delayInMs)
    await route.fulfill({
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
}
