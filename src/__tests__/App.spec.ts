import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../app.vue'

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          NuxtPage: true,
        },
      },
    })
    expect(wrapper.text()).toContain('Travel planner')
    expect(wrapper.find('h1').text()).toBe('Travel planner')
  })
})
