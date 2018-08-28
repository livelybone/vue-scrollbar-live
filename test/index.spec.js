import { shallowMount } from '@vue/test-utils'
import Index from '../src/Scrollbar.vue'

describe('Index.vue', () => {
  it('Rendered', () => {
    const wrapper = shallowMount(Index)
    expect(wrapper.find('div').exists()).to.equal(true)
  })
})
