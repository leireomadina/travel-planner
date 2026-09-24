import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import LoginPage from '../pages/login.vue'

describe('Login page', () => {
  it('renders the login form', async () => {
    const wrapper = await mountSuspended(LoginPage)

    expect(wrapper.find('[data-cy="login-title"]').text()).toBe('Login')
    expect(wrapper.find('[data-cy="login-email"]').exists()).toBe(true)
    expect(wrapper.find('[data-cy="login-password"]').exists()).toBe(true)
    expect(wrapper.find('[data-cy="login-error"]').exists()).toBe(false)
  })
})
