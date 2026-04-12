import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-view': true,
          'router-link': true,
        },
      },
    })
    expect(wrapper.text()).toContain('Travel planner')
  })
})
