import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'

import App from '../app.vue'

describe('App', () => {
  it('renders properly', async () => {
    const wrapper = await mountSuspended(App)
    expect(wrapper.find('h1').text()).toBe('Travel planner')
  })
})
