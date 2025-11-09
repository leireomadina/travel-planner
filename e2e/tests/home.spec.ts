import { test, expect } from '@playwright/test'
import { ROUTES } from '../data/test-data.js'

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto(ROUTES.home)
  await expect(page.locator('h1')).toHaveText('Travel planner')
})
